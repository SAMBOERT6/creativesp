"use client";

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type NewsItem = {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  author?: string;
  image?: string;
  publishedAt?: string;
  readingTime?: string;
  views?: number;
  status?: string;
};

const navigation = [
  'Home',
  'News',
  'Artists',
  'Competitions',
  'Events',
  'Videos',
  'Directory',
  'Magazine',
  'About',
  'Contact',
];

export default function HomePage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/news')
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Unable to load news');
        }

        const data = await response.json();
        setNews(Array.isArray(data) ? data : []);
      })
      .catch(() => setNews([]))
      .finally(() => setLoading(false));
  }, []);

  const featured = useMemo(() => news.slice(0, 5), [news]);
  const heroStory = featured[0];
  const secondaryStories = featured.slice(1, 5);
  const latestStories = news.slice(1);
  const trendingStories = [...news].sort((a, b) => (b.views ?? 0) - (a.views ?? 0)).slice(0, 4);

  const formatDate = (value?: string) => {
    if (!value) {
      return 'Recently published';
    }

    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? 'Recently published' : date.toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.12),_transparent_35%)] text-slate-100">
      <header className="border-b border-slate-800/80 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-400">Creatives Portal</p>
            <h1 className="text-xl font-semibold text-white">African creative industry news</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
            <a href="/login" className="rounded-full border border-slate-700 px-4 py-2 transition hover:border-cyan-400">Login</a>
            <a href="/newsletter" className="rounded-full bg-cyan-500 px-4 py-2 font-medium text-slate-950 transition hover:bg-cyan-400">Register</a>
            <button className="rounded-full border border-slate-700 px-4 py-2 transition hover:border-cyan-400">☾</button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-7xl flex-wrap gap-3 px-6 pb-5 text-sm uppercase tracking-[0.25em] text-slate-400 lg:px-8">
          {navigation.map((item) => (
            <a key={item} href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="transition hover:text-white">
              {item}
            </a>
          ))}
        </nav>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
        <div className="overflow-hidden rounded-full border border-cyan-500/30 bg-slate-900/80 px-4 py-3 text-sm text-slate-300">
          <div className="animate-pulse text-cyan-400">● BREAKING</div>
          <div className="mt-2 flex flex-wrap gap-4">
            {loading ? (
              <span>Loading latest stories…</span>
            ) : (
              news.slice(0, 3).map((item) => <span key={item.id} className="text-slate-300">• {item.title}</span>)
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-10 lg:grid-cols-[1.4fr_0.6fr] lg:px-8">
        <article className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 shadow-2xl shadow-slate-950/40">
          {heroStory ? (
            <>
              <div className="relative h-[420px] overflow-hidden">
                <img src={heroStory.image ?? 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80'} alt={heroStory.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-400">{heroStory.category}</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">{heroStory.title}</h2>
                  <p className="mt-3 max-w-2xl text-sm text-slate-200 sm:text-base">{heroStory.excerpt}</p>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-300">
                    <span>{heroStory.author ?? 'Staff Reporter'}</span>
                    <span>•</span>
                    <span>{formatDate(heroStory.publishedAt)}</span>
                    <span>•</span>
                    <span>{heroStory.readingTime ?? '4 min read'}</span>
                  </div>
                  <Link href={`/news/${heroStory.id}`} className="mt-5 inline-flex rounded-full border border-cyan-400/50 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-400/10">
                    Read full story
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className="flex h-[420px] items-center justify-center text-slate-400">No featured story available yet.</div>
          )}
        </article>

        <div className="grid gap-4">
          {secondaryStories.map((item) => (
            <article key={item.id} className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70">
              <div className="flex gap-4 p-4">
                <img src={item.image ?? 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=700&q=80'} alt={item.title} className="h-24 w-24 shrink-0 rounded-xl object-cover transition duration-500 group-hover:scale-105" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">{item.category}</p>
                  <h3 className="mt-1 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{formatDate(item.publishedAt)}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-16 lg:grid-cols-[1.3fr_0.7fr] lg:px-8">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">Latest news</h2>
            <a href="/news" className="text-sm text-cyan-400">View all</a>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {loading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="animate-pulse rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                  <div className="h-36 rounded-xl bg-slate-800" />
                  <div className="mt-4 h-4 w-24 rounded bg-slate-800" />
                  <div className="mt-3 h-6 w-full rounded bg-slate-800" />
                  <div className="mt-2 h-4 w-4/5 rounded bg-slate-800" />
                </div>
              ))
            ) : (
              latestStories.map((item) => (
                <article key={item.id} className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 transition hover:-translate-y-1 hover:border-cyan-400/50">
                  <img src={item.image ?? 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=900&q=80'} alt={item.title} className="h-44 w-full object-cover" />
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">{item.category}</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm text-slate-400">{item.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                      <span>{formatDate(item.publishedAt)}</span>
                      <span>{item.readingTime ?? '4 min read'}</span>
                    </div>
                    <Link href={`/news/${item.id}`} className="mt-4 inline-flex text-sm font-medium text-cyan-400 transition hover:text-cyan-300">
                      Continue reading →
                    </Link>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5">
            <h2 className="text-xl font-semibold text-white">Trending news</h2>
            <div className="mt-4 space-y-3">
              {trendingStories.map((item, index) => (
                <div key={item.id} className="flex gap-3 border-b border-slate-800 pb-3 last:border-b-0 last:pb-0">
                  <span className="text-xl font-semibold text-cyan-400">0{index + 1}</span>
                  <div>
                    <p className="font-medium text-white">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-400">{item.views ?? 0} views • {item.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5">
            <h2 className="text-xl font-semibold text-white">About Creatives Portal</h2>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              A professional digital newspaper for the African creative economy, bringing together news, talent, competitions, and events in one polished experience.
            </p>
          </div>
        </aside>
      </section>

      <footer className="border-t border-slate-800 bg-slate-950/90">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 text-sm text-slate-400 lg:grid-cols-4 lg:px-8">
          <div>
            <h3 className="text-lg font-semibold text-white">About</h3>
            <p className="mt-3 leading-7">Professional editorial coverage for artists, organisers, and culture observers.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Navigate</h3>
            <ul className="mt-3 space-y-2">
              <li><a href="/news" className="hover:text-white">News</a></li>
              <li><a href="/artists" className="hover:text-white">Artists</a></li>
              <li><a href="/opportunities" className="hover:text-white">Opportunities</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <ul className="mt-3 space-y-2">
              <li><a href="/contact" className="hover:text-white">Contact us</a></li>
              <li><a href="/newsletter" className="hover:text-white">Submit news</a></li>
              <li><a href="/about" className="hover:text-white">Become contributor</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Follow</h3>
            <ul className="mt-3 space-y-2">
              <li><a href="https://x.com" className="hover:text-white">X</a></li>
              <li><a href="https://instagram.com" className="hover:text-white">Instagram</a></li>
              <li><a href="https://linkedin.com" className="hover:text-white">LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </main>
  );
}
