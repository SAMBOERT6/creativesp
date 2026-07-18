"use client";

import { useEffect, useState } from 'react';

const stats = [
  { label: 'Competitions', value: '120+' },
  { label: 'Votes', value: '2.4M' },
  { label: 'Countries', value: '32' },
  { label: 'Active Organizers', value: '85' },
];

const modules = [
  'Authentication and RBAC',
  'Competition management',
  'Online and SMS voting',
  'Arts news and artist profiles',
  'Events and opportunities',
];

export default function HomePage() {
  const [news, setNews] = useState<any[]>([]);
  const [artists, setArtists] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:4000/news'),
      fetch('http://localhost:4000/artists'),
      fetch('http://localhost:4000/events'),
    ])
      .then(async ([newsRes, artistsRes, eventsRes]) => {
        const [newsData, artistsData, eventsData] = await Promise.all([
          newsRes.json(),
          artistsRes.json(),
          eventsRes.json(),
        ]);
        setNews(newsData);
        setArtists(artistsData);
        setEvents(eventsData);
      })
      .catch(() => undefined);
  }, []);

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-20">
      <section className="grid gap-10 rounded-3xl border border-slate-800 bg-slate-900/70 p-10 shadow-2xl shadow-slate-950/40 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-400">Creative Passport Africa</p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-6xl">
            Manage competitions, arts news, artist profiles, and events from one platform.
          </h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Built for poetry, beauty, talent, school, church, and community competitions with online voting, verified artists, and an expanding creative ecosystem.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="http://localhost:4000/docs" className="rounded-full bg-cyan-500 px-6 py-3 font-medium text-slate-950 transition hover:bg-cyan-400">Open API Docs</a>
            <a href="/login" className="rounded-full border border-slate-700 px-6 py-3 font-medium text-slate-200 transition hover:border-cyan-400">Launch Dashboard</a>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6">
          <h2 className="text-xl font-semibold">Platform Highlights</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            {modules.map((module) => (
              <li key={module}>• {module}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-center">
            <p className="text-3xl font-semibold text-white">{stat.value}</p>
            <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
          </div>
        ))}
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
          <h2 className="text-xl font-semibold text-white">Latest news</h2>
          <div className="mt-4 space-y-3">
            {news.map((item) => (
              <div key={item.id} className="rounded-xl border border-slate-800 p-3">
                <p className="font-medium text-white">{item.title}</p>
                <p className="text-sm text-slate-400">{item.category}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
          <h2 className="text-xl font-semibold text-white">Featured artists</h2>
          <div className="mt-4 space-y-3">
            {artists.map((artist) => (
              <div key={artist.id} className="rounded-xl border border-slate-800 p-3">
                <p className="font-medium text-white">{artist.stageName || artist.fullName}</p>
                <p className="text-sm text-slate-400">{artist.discipline}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
          <h2 className="text-xl font-semibold text-white">Upcoming events</h2>
          <div className="mt-4 space-y-3">
            {events.map((event) => (
              <div key={event.id} className="rounded-xl border border-slate-800 p-3">
                <p className="font-medium text-white">{event.title}</p>
                <p className="text-sm text-slate-400">{event.category} • {event.venue}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
