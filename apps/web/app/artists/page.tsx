"use client";

import { useEffect, useMemo, useState } from 'react';

interface Artist {
  id: string;
  fullName: string;
  stageName?: string;
  discipline: string;
  country?: string;
  province?: string;
  bio?: string;
  verified?: boolean;
}

export default function ArtistsDirectoryPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [query, setQuery] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/artists')
      .then((response) => response.json())
      .then((data) => setArtists(data))
      .catch(() => undefined);
  }, []);

  const filteredArtists = useMemo(() => {
    return artists.filter((artist) => {
      const haystack = `${artist.fullName} ${artist.stageName ?? ''} ${artist.discipline} ${artist.country ?? ''} ${artist.province ?? ''}`.toLowerCase();
      const matchesQuery = haystack.includes(query.toLowerCase());
      const matchesDiscipline = discipline ? artist.discipline.toLowerCase() === discipline.toLowerCase() : true;
      const matchesCountry = country ? (artist.country ?? '').toLowerCase() === country.toLowerCase() : true;
      return matchesQuery && matchesDiscipline && matchesCountry;
    });
  }, [artists, query, discipline, country]);

  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Artist directory</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Search verified artists and creatives</h1>
        <p className="mt-3 max-w-2xl text-slate-400">Browse artists by name, discipline, province, or country.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name or keyword" className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" />
          <input value={discipline} onChange={(event) => setDiscipline(event.target.value)} placeholder="Discipline" className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" />
          <input value={country} onChange={(event) => setCountry(event.target.value)} placeholder="Country" className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" />
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {filteredArtists.map((artist) => (
            <div key={artist.id} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-white">{artist.stageName || artist.fullName}</p>
                  <p className="text-sm text-slate-400">{artist.fullName}</p>
                </div>
                {artist.verified ? <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">Verified</span> : null}
              </div>
              <p className="mt-3 text-sm text-slate-300">{artist.bio}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-400">
                <span className="rounded-full border border-slate-700 px-3 py-1">{artist.discipline}</span>
                {artist.province ? <span className="rounded-full border border-slate-700 px-3 py-1">{artist.province}</span> : null}
                {artist.country ? <span className="rounded-full border border-slate-700 px-3 py-1">{artist.country}</span> : null}
              </div>
              <a href={`/artists/${`${artist.fullName}-${artist.stageName ?? ''}`.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="mt-4 inline-flex rounded-full border border-cyan-500/40 px-3 py-2 text-sm font-medium text-cyan-400">
                View full profile
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
