"use client";

import { useEffect, useState } from 'react';

interface Competition { id: string; name: string; category: string; status: string; country: string; }
interface Contestant { id: string; fullName: string; country?: string | null; competitionId: string; }
interface Vote { id: string; contestantId: string; competitionId: string; source: string; quantity: number; }

export default function ManagementPage() {
  const [token, setToken] = useState('');
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [contestants, setContestants] = useState<Contestant[]>([]);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [error, setError] = useState('');
  const [competitionForm, setCompetitionForm] = useState({ name: '', category: '', country: '', status: 'ACTIVE' });
  const [contestantForm, setContestantForm] = useState({ fullName: '', country: '', competitionId: '' });
  const [editingCompetitionId, setEditingCompetitionId] = useState<string | null>(null);
  const [editingContestantId, setEditingContestantId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('accessToken');
    if (saved) setToken(saved);
  }, []);

  const fetchData = async (authToken: string) => {
    const headers = { Authorization: `Bearer ${authToken}` };
    const [competitionsRes, contestantsRes, votesRes] = await Promise.all([
      fetch('http://localhost:4000/competitions', { headers }),
      fetch('http://localhost:4000/contestants', { headers }),
      fetch('http://localhost:4000/votes', { headers }),
    ]);

    if (!competitionsRes.ok || !contestantsRes.ok || !votesRes.ok) {
      throw new Error('Unable to load management data');
    }

    const [competitionsData, contestantsData, votesData] = await Promise.all([
      competitionsRes.json(),
      contestantsRes.json(),
      votesRes.json(),
    ]);

    setCompetitions(competitionsData);
    setContestants(contestantsData);
    setVotes(votesData);
  };

  useEffect(() => {
    if (!token) return;
    fetchData(token).catch((err) => setError(err instanceof Error ? err.message : 'Unknown error'));
  }, [token]);

  const submitCompetition = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!token) return;

    const response = await fetch(editingCompetitionId ? `http://localhost:4000/competitions/${editingCompetitionId}` : 'http://localhost:4000/competitions', {
      method: editingCompetitionId ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...competitionForm, organizerId: 'organizer-1' }),
    });

    if (response.ok) {
      setCompetitionForm({ name: '', category: '', country: '', status: 'ACTIVE' });
      setEditingCompetitionId(null);
      fetchData(token).catch(() => undefined);
    }
  };

  const submitContestant = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!token) return;

    const response = await fetch(editingContestantId ? `http://localhost:4000/contestants/${editingContestantId}` : 'http://localhost:4000/contestants', {
      method: editingContestantId ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(contestantForm),
    });

    if (response.ok) {
      setContestantForm({ fullName: '', country: '', competitionId: '' });
      setEditingContestantId(null);
      fetchData(token).catch(() => undefined);
    }
  };

  const deleteCompetition = async (id: string) => {
    if (!token) return;
    const response = await fetch(`http://localhost:4000/competitions/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      fetchData(token).catch(() => undefined);
    }
  };

  const deleteContestant = async (id: string) => {
    if (!token) return;
    const response = await fetch(`http://localhost:4000/contestants/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      fetchData(token).catch(() => undefined);
    }
  };

  const startEditCompetition = (competition: Competition) => {
    setCompetitionForm({ name: competition.name, category: competition.category, country: competition.country, status: competition.status });
    setEditingCompetitionId(competition.id);
  };

  const startEditContestant = (contestant: Contestant) => {
    setContestantForm({ fullName: contestant.fullName, country: contestant.country ?? '', competitionId: contestant.competitionId });
    setEditingContestantId(contestant.id);
  };

  const voteTrend = votes.reduce<Record<string, number>>((acc, vote) => {
    acc[vote.source] = (acc[vote.source] ?? 0) + vote.quantity;
    return acc;
  }, {});

  const voteChartData = Object.entries(voteTrend).map(([source, count]) => ({ source, count }));
  const totalVotes = votes.reduce((sum, vote) => sum + vote.quantity, 0);
  const activeCompetitions = competitions.filter((competition) => competition.status === 'ACTIVE').length;
  const maxVoteValue = Math.max(1, ...voteChartData.map((entry) => entry.count));
  const leaderboard = contestants
    .map((contestant) => ({
      ...contestant,
      totalVotes: votes.filter((vote) => vote.contestantId === contestant.id).reduce((sum, vote) => sum + vote.quantity, 0),
    }))
    .sort((a, b) => b.totalVotes - a.totalVotes)
    .slice(0, 5);

  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Management Center</p>
            <h1 className="text-3xl font-semibold text-white">Competition, contestant, and vote oversight</h1>
          </div>
        </div>

        {error ? <p className="mt-6 text-sm text-rose-400">{error}</p> : null}

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
              <h2 className="text-xl font-semibold text-white">Create or edit competition</h2>
              <form onSubmit={submitCompetition} className="mt-4 grid gap-3 md:grid-cols-2">
                <input value={competitionForm.name} onChange={(event) => setCompetitionForm({ ...competitionForm, name: event.target.value })} placeholder="Competition name" className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
                <input value={competitionForm.category} onChange={(event) => setCompetitionForm({ ...competitionForm, category: event.target.value })} placeholder="Category" className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
                <input value={competitionForm.country} onChange={(event) => setCompetitionForm({ ...competitionForm, country: event.target.value })} placeholder="Country" className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
                <input value={competitionForm.status} onChange={(event) => setCompetitionForm({ ...competitionForm, status: event.target.value })} placeholder="Status" className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
                <button type="submit" className="md:col-span-2 rounded-full bg-cyan-500 px-4 py-2 font-medium text-slate-950">{editingCompetitionId ? 'Update competition' : 'Save competition'}</button>
              </form>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
              <h2 className="text-xl font-semibold text-white">Create or edit contestant</h2>
              <form onSubmit={submitContestant} className="mt-4 grid gap-3 md:grid-cols-2">
                <input value={contestantForm.fullName} onChange={(event) => setContestantForm({ ...contestantForm, fullName: event.target.value })} placeholder="Full name" className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
                <input value={contestantForm.country} onChange={(event) => setContestantForm({ ...contestantForm, country: event.target.value })} placeholder="Country" className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
                <input value={contestantForm.competitionId} onChange={(event) => setContestantForm({ ...contestantForm, competitionId: event.target.value })} placeholder="Competition ID" className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
                <button type="submit" className="md:col-span-2 rounded-full bg-cyan-500 px-4 py-2 font-medium text-slate-950">{editingContestantId ? 'Update contestant' : 'Save contestant'}</button>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
              <h2 className="text-xl font-semibold text-white">Vote trends</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                  <p className="text-sm text-slate-400">Total votes</p>
                  <p className="text-2xl font-semibold text-white">{totalVotes}</p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                  <p className="text-sm text-slate-400">Active competitions</p>
                  <p className="text-2xl font-semibold text-white">{activeCompetitions}</p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                  <p className="text-sm text-slate-400">Contestants</p>
                  <p className="text-2xl font-semibold text-white">{contestants.length}</p>
                </div>
              </div>
              <div className="mt-5 flex h-40 items-end gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                {voteChartData.map((entry) => (
                  <div key={entry.source} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex w-full items-end justify-center rounded-t-xl bg-gradient-to-t from-cyan-500 to-cyan-300" style={{ height: `${(entry.count / maxVoteValue) * 100}%`, minHeight: '24px' }} />
                    <p className="text-center text-xs uppercase tracking-[0.2em] text-slate-400">{entry.source}</p>
                    <p className="text-sm font-medium text-white">{entry.count}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
              <h2 className="text-xl font-semibold text-white">Top contestants</h2>
              <div className="mt-4 space-y-3">
                {leaderboard.map((contestant, index) => (
                  <div key={contestant.id} className="rounded-xl border border-slate-800 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="font-medium text-white">#{index + 1} {contestant.fullName}</p>
                        <p className="text-sm text-slate-400">{contestant.country ?? 'Unknown country'}</p>
                      </div>
                      <div className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-400">
                        {contestant.totalVotes} votes
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
              <h2 className="text-xl font-semibold text-white">Competitions</h2>
              <div className="mt-4 space-y-3">
                {competitions.map((competition) => (
                  <div key={competition.id} className="rounded-xl border border-slate-800 p-3">
                    <p className="font-medium text-white">{competition.name}</p>
                    <p className="text-sm text-slate-400">{competition.category} • {competition.country}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.25em] text-cyan-400">{competition.status}</p>
                    <div className="mt-3 flex gap-2">
                      <button onClick={() => startEditCompetition(competition)} className="rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-200">Edit</button>
                      <button onClick={() => deleteCompetition(competition.id)} className="rounded-full border border-rose-700 px-3 py-1 text-sm text-rose-200">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
              <h2 className="text-xl font-semibold text-white">Contestants</h2>
              <div className="mt-4 space-y-3">
                {contestants.map((contestant) => (
                  <div key={contestant.id} className="rounded-xl border border-slate-800 p-3">
                    <p className="font-medium text-white">{contestant.fullName}</p>
                    <p className="text-sm text-slate-400">{contestant.country ?? 'Unknown country'}</p>
                    <div className="mt-3 flex gap-2">
                      <button onClick={() => startEditContestant(contestant)} className="rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-200">Edit</button>
                      <button onClick={() => deleteContestant(contestant.id)} className="rounded-full border border-rose-700 px-3 py-1 text-sm text-rose-200">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
