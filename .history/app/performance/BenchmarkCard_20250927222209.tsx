'use client';

export function BenchmarkCard({ kpis }: { kpis: {
  throughputTarget: number;
  throughputCurrent: number;
  avgDelay: number;
  conflictResolutionRate: number;
  energyGain: number;
}; }) {
  const globalBenchmark = {
    throughput: 360,
    avgDelay: 5.2,
    resolutionRate: 91.4,
    energyGain: 4.1
  };

  const delta = {
    throughput: kpis.throughputCurrent - globalBenchmark.throughput,
    avgDelay: globalBenchmark.avgDelay - kpis.avgDelay,
    resolutionRate: kpis.conflictResolutionRate - globalBenchmark.resolutionRate,
    energyGain: kpis.energyGain - globalBenchmark.energyGain
  };

  const pad = (n: number) => (n > 0 ? '+' : '') + n.toFixed(1);

  return (
    <div className="p-5 rounded-lg bg-bg-secondary border border-bg-tertiary space-y-4">
      <h3 className="text-sm font-semibold tracking-wide uppercase text-slate-400">
        Global Benchmarking
      </h3>
      <p className="text-xs text-slate-400">
        Performance vs. global average (hypothetical dataset). Demonstrates IROO&apos;s optimization edge.
      </p>
      <ul className="text-xs space-y-3">
        <li className="flex justify-between">
          <span>Throughput (today)</span>
          <span className="font-medium">
            {kpis.throughputCurrent} vs {globalBenchmark.throughput}{' '}
            <span className="text-brand.emerald">{pad(delta.throughput)}</span>
          </span>
        </li>
        <li className="flex justify-between">
          <span>Avg Delay</span>
          <span className="font-medium">
            {kpis.avgDelay.toFixed(1)}m vs {globalBenchmark.avgDelay}m{' '}
            <span className="text-brand.emerald">{pad(delta.avgDelay)}</span>
          </span>
        </li>
        <li className="flex justify-between">
          <span>Resolution Rate</span>
          <span className="font-medium">
            {kpis.conflictResolutionRate.toFixed(1)}% vs {globalBenchmark.resolutionRate}%{' '}
            <span className="text-brand.emerald">{pad(delta.resolutionRate)}</span>
          </span>
        </li>
        <li className="flex justify-between">
          <span>Energy Gain</span>
          <span className="font-medium">
            {kpis.energyGain.toFixed(1)}% vs {globalBenchmark.energyGain}%{' '}
            <span className="text-brand.emerald">{pad(delta.energyGain)}</span>
          </span>
        </li>
      </ul>
    </div>
  );
}