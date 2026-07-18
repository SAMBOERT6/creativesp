"use client";

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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
  content?: string;
};

export default function NewsDetailPage() {
  const params = useParams<{ id: string }>();
  const [article, setArticle] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params?.id) {
      return;
    }

    fetch(`http://localhost:4000/news/${params.id}`)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Unable to load article');
        }

        const data = await response.json();
        setArticle(data);
      })
      .catch(() => setArticle(null))
      .finally(() => setLoading(false));
  }, [params?.id]);

  const formatDate = (value?: string) => {
    if (!value) {
      return 'Recently published';
    }

    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? 'Recently published' : date.toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
        <Link href="/news" className="inline-flex rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400">
          ← Back to news
        </Link>

        {loading ? (
          <div className="mt-8 animate-pulse rounded-3xl border border-slate-800 bg-slate-900/80 p-8">
            <div className="h-8 w-32 rounded bg-slate-800" />
            <div className="mt-6 h-12 w-3/4 rounded bg-slate-800" />
            <div className="mt-4 h-4 w-full rounded bg-slate-800" />
            <div className="mt-2 h-4 w-2/3 rounded bg-slate-800" />
          </div>
        ) : article ? (
          <article className="mt-8 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl shadow-slate-950/50">
            <img src={article.image ?? 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1400&q=80'} alt={article.title} className="h-80 w-full object-cover" />
            <div className="p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">{article.category}</p>
              <h1 className="mt-4 text-4xl font-semibold text-white">{article.title}</h1>
              <p className="mt-4 max-w-3xl text-lg text-slate-400">{article.excerpt}</p>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <span>{article.author ?? 'Staff Reporter'}</span>
                <span>•</span>
                <span>{formatDate(article.publishedAt)}</span>
                <span>•</span>
                <span>{article.readingTime ?? '4 min read'}</span>
                <span>•</span>
                <span>{article.views ?? 0} views</span>
              </div>
              <div className="mt-8 space-y-4 text-lg leading-8 text-slate-300">
                <p>
                  {article.content ?? 'This story is now live on the editorial platform, giving readers an in-depth look at the latest developments shaping the African creative economy.'}
                </p>
                <p>
                  The coverage continues to highlight the people, projects, and opportunities driving momentum across the continent while connecting communities to events, competitions, and cultural conversations.
                </p>
              </div>
            </div>
          </article>
        ) : (
          <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-slate-400">
            The requested article could not be found.
          </div>
        )}
      </section>
    </main>
  );
}
