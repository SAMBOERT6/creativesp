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
};

export default function NewsPage() {
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

  const featured = useMemo(() => news.slice(0, 1), [news]);

  const formatDate = (value?: string) => {
    if (!value) {
      return 'Recently published';
    }

    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? 'Recently published' : date.toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-400">News</p>
            <h1 className="mt-2 text-4xl font-semibold text-white">Latest editorial coverage</h1>
          </div>
          <Link href="/" className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400">
            Back to home
          </Link>
        </div>

        {featured[0] ? (
          <article className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl shadow-slate-950/50">
            <img src={featured[0].image ?? 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1400&q=80'} alt={featured[0].title} className="h-72 w-full object-cover" />
            <div className="p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">{featured[0].category}</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">{featured[0].title}</h2>
              <p className="mt-4 max-w-3xl text-lg text-slate-400">{featured[0].excerpt}</p>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <span>{featured[0].author ?? 'Staff Reporter'}</span>
                <span>•</span>
                <span>{formatDate(featured[0].publishedAt)}</span>
                <span>•</span>
                <span>{featured[0].readingTime ?? '4 min read'}</span>
              </div>
              <Link href={`/news/${featured[0].id}`} className="mt-6 inline-flex rounded-full bg-cyan-500 px-5 py-2.5 font-medium text-slate-950 transition hover:bg-cyan-400">
                Read story
              </Link>
            </div>
          </article>
        ) : null}

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="animate-pulse rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
                <div className="h-36 rounded-xl bg-slate-800" />
                <div className="mt-4 h-4 w-24 rounded bg-slate-800" />
                <div className="mt-3 h-6 w-full rounded bg-slate-800" />
                <div className="mt-2 h-4 w-4/5 rounded bg-slate-800" />
              </div>
            ))
          ) : (
            news.map((item) => (
              <article key={item.id} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">{item.category}</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm text-slate-400">{item.excerpt}</p>
                <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                  <span>{formatDate(item.publishedAt)}</span>
                  <span>{item.readingTime ?? '4 min read'}</span>
                </div>
                <Link href={`/news/${item.id}`} className="mt-5 inline-flex text-sm font-medium text-cyan-400 transition hover:text-cyan-300">
                  Continue reading →
                </Link>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
