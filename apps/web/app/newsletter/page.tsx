"use client";

import { useState } from 'react';

export default function NewsletterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch('http://localhost:4000/newsletters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });

    if (response.ok) {
      setStatus('Thanks for subscribing — check your inbox for updates.');
      setName('');
      setEmail('');
    } else {
      setStatus('Subscription could not be completed.');
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Newsletter</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Get the latest arts news, opportunities, and event updates</h1>
        <p className="mt-3 max-w-2xl text-slate-400">Subscribe to stay informed about competitions, artist spotlights, funding calls, and cultural events.</p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-4 md:grid-cols-2">
          <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" />
          <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email" className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" />
          <button type="submit" className="md:col-span-2 rounded-full bg-cyan-500 px-5 py-3 font-medium text-slate-950">Subscribe</button>
        </form>

        {status ? <p className="mt-4 text-sm text-cyan-400">{status}</p> : null}
      </section>
    </main>
  );
}
