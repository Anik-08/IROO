import Link from 'next/link';

export default function LandingRedirect() {
  return (
    <div className="h-full w-full flex items-center justify-center flex-col gap-6 p-12">
      <h1 className="text-4xl font-semibold tracking-tight">
        Intelligent Rail Operations Optimizer
      </h1>
      <p className="text-slate-400 max-w-xl text-center">
        This interface is a high-fidelity visualization layer mock for railway control officers.
        Explore the real-time Digital Twin or the Performance & Optimization dashboards.
      </p>
      <div className="flex gap-4">
        <Link
          href="/operations-map"
          className="px-6 py-3 rounded-md bg-brand.violet/30 hover:bg-brand.violet/40 border border-brand.violet/40 text-brand.violet font-medium transition"
        >
          Real-Time Operations Map
        </Link>
        <Link
          href="/performance"
          className="px-6 py-3 rounded-md bg-brand.blue/30 hover:bg-brand.blue/40 border border-brand.blue/40 text-brand.blue font-medium transition"
        >
          Performance Dashboard
        </Link>
      </div>
    </div>
  );
}