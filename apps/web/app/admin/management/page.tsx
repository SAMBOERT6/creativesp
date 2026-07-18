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

  useEffect(() => {
    const saved = localStorage.getItem('accessToken');
    if (saved) setToken(saved);
  }, []);

  useEffect(() => {
    if (!token) return;
    const headers = { Authorization: `Bearer ${token}` };

    Promise.all([
      fetch('http://localhost:4000/competitions', { headers }),
      fetch('http://localhost:4000/contestants', { headers }),
      fetch('http://localhost:4000/votes', { headers }),
    ])
      .then(async ([competitionsRes, contestantsRes, votesRes]) => {
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
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Unknown error'));
  }, [token]);

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

        <div className="mt-8 grid gap-6 xl:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
            <h2 className="text-xl font-semibold text-white">Competitions</h2>
            <div className="mt-4 space-y-3">
              {competitions.map((competition) => (
                <div key={competition.id} className="rounded-xl border border-slate-800 p-3">
                  <p className="font-medium text-white">{competition.name}</p>
                  <p className="text-sm text-slate-400">{competition.category} • {competition.country}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.25em] text-cyan-400">{competition.status}</p>
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
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
            <h2 className="text-xl font-semibold text-white">Votes</h2>
            <div className="mt-4 space-y-3">
              {votes.map((vote) => (
                <div key={vote.id} className="rounded-xl border border-slate-800 p-3">
                  <p className="font-medium text-white">{vote.source}</p>
                  <p className="text-sm text-slate-400">Qty: {vote.quantity}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
