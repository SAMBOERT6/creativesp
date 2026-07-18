"use client";

import { useEffect, useMemo, useState } from 'react';

interface Opportunity {
  id: string;
  title: string;
  category: string;
  country?: string;
  province?: string;
  deadline?: string;
  description?: string;
}

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/opportunities')
      .then((response) => response.json())
      .then((data) => setOpportunities(data))
      .catch(() => undefined);
  }, []);

  const filtered = useMemo(() => {
    return opportunities.filter((item) => {
      const haystack = `${item.title} ${item.category} ${item.country ?? ''} ${item.province ?? ''}`.toLowerCase();
      return haystack.includes(query.toLowerCase()) && (category ? item.category.toLowerCase() === category.toLowerCase() : true);
    });
  }, [opportunities, query, category]);

  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Opportunities centre</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Grants, residencies, calls, and creative funding</h1>
        <p className="mt-3 max-w-2xl text-slate-400">Discover funding and professional opportunities tailored to artists and creatives.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search opportunities" className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" />
          <input value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Category" className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" />
        </div>

        <div className="mt-8 grid gap-4">
          {filtered.map((item) => (
            <div key={item.id} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-400">{item.description}</p>
                </div>
                <span className="rounded-full border border-cyan-500/30 px-3 py-1 text-sm text-cyan-400">{item.category}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-400">
                {item.country ? <span className="rounded-full border border-slate-700 px-3 py-1">{item.country}</span> : null}
                {item.province ? <span className="rounded-full border border-slate-700 px-3 py-1">{item.province}</span> : null}
                {item.deadline ? <span className="rounded-full border border-slate-700 px-3 py-1">Deadline: {item.deadline}</span> : null}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
