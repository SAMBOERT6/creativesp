"use client";

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';

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

export default function ArtistDetailPage() {
  const params = useParams<{ slug: string }>();
  const [artist, setArtist] = useState<Artist | null>(null);

  useEffect(() => {
    fetch('http://localhost:4000/artists')
      .then((response) => response.json())
      .then((data) => {
        const match = data.find((entry: Artist) => {
          const slug = `${entry.fullName}-${entry.stageName ?? ''}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          return slug === params.slug;
        });
        setArtist(match ?? null);
      })
      .catch(() => undefined);
  }, [params.slug]);

  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined' || !artist) return '';
    return `${window.location.origin}/artists/${params.slug}`;
  }, [artist, params.slug]);

  if (!artist) {
    return <main className="mx-auto max-w-6xl px-6 py-20 text-white">Loading profile...</main>;
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-20">
      <section className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl shadow-slate-950/40">
        <div className="h-40 bg-gradient-to-r from-cyan-500/30 via-slate-700 to-slate-900" />
        <div className="p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Artist profile</p>
              <h1 className="mt-2 text-3xl font-semibold text-white">{artist.stageName || artist.fullName}</h1>
              <p className="mt-2 text-slate-400">{artist.fullName}</p>
            </div>
            {artist.verified ? <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-400">Verified artist</span> : null}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
                <h2 className="text-xl font-semibold text-white">Biography</h2>
                <p className="mt-3 text-slate-300">{artist.bio || 'A creative profile is being prepared for this artist.'}</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
                <h2 className="text-xl font-semibold text-white">Highlights</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-300">{artist.discipline}</span>
                  {artist.province ? <span className="rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-300">{artist.province}</span> : null}
                  {artist.country ? <span className="rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-300">{artist.country}</span> : null}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
              <h2 className="text-xl font-semibold text-white">Public profile</h2>
              <p className="mt-3 text-sm text-slate-400">Shareable profile URL</p>
              <p className="mt-2 break-all rounded-xl border border-slate-800 bg-slate-900/70 p-3 text-sm text-cyan-400">{shareUrl}</p>
              <div className="mt-6 space-y-3 text-sm text-slate-300">
                <p>• Portfolio gallery</p>
                <p>• Upcoming events</p>
                <p>• Booking information</p>
                <p>• Awards and achievements</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
