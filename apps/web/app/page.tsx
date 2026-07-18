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
  'Live leaderboards and analytics',
];

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-20">
      <section className="grid gap-10 rounded-3xl border border-slate-800 bg-slate-900/70 p-10 shadow-2xl shadow-slate-950/40 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-400">CreativeSP Enterprise Platform</p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-6xl">
            Manage competitions, voting, and live analytics from one platform.
          </h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Built for poetry, beauty, talent, school, church, and community competitions with online payments, SMS voting, and real-time leaderboards.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="http://localhost:4000/docs" className="rounded-full bg-cyan-500 px-6 py-3 font-medium text-slate-950 transition hover:bg-cyan-400">Open API Docs</a>
            <a href="/" className="rounded-full border border-slate-700 px-6 py-3 font-medium text-slate-200 transition hover:border-cyan-400">Launch Dashboard</a>
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
    </main>
  );
}
