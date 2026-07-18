"use client";

import { useEffect, useState } from 'react';

interface DashboardSummary {
  competitions: number;
  contestants: number;
  votes: number;
  users: number;
}

export default function AdminPage() {
  const [token, setToken] = useState('');
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('accessToken');
    if (saved) {
      setToken(saved);
    }
  }, []);

  const loadSummary = async () => {
    if (!token) {
      setError('Please sign in first.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/admin/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Unable to load admin dashboard');
      }

      const data = await response.json();
      setSummary(data);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-20">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Admin Console</p>
            <h1 className="text-3xl font-semibold text-white">Live dashboard</h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={loadSummary}
              className="rounded-full bg-cyan-500 px-5 py-2 font-medium text-slate-950 transition hover:bg-cyan-400"
            >
              Load summary
            </button>
            <a href="/admin/management" className="rounded-full border border-slate-700 px-5 py-2 font-medium text-slate-200 transition hover:border-cyan-400">
              Open management
            </a>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {[
            { label: 'Competitions', value: summary?.competitions ?? 0 },
            { label: 'Contestants', value: summary?.contestants ?? 0 },
            { label: 'Votes', value: summary?.votes ?? 0 },
            { label: 'Users', value: summary?.users ?? 0 },
          ].map((card) => (
            <div key={card.label} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
              <p className="text-sm text-slate-400">{card.label}</p>
              <p className="mt-2 text-3xl font-semibold text-white">{card.value}</p>
            </div>
          ))}
        </div>

        {error ? <p className="mt-6 text-sm text-rose-400">{error}</p> : null}
      </section>
    </main>
  );
}
