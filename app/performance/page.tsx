'use client';
import { useEffect, useState } from 'react';
import { KPICards } from './KPICards';
import { ConflictQueue } from './ConflictQueue';
import { BenchmarkCard } from './BenchmarkCard';
import { XaiModal } from './XaiModal';
import { type ConflictRecord, mockConflictData, rotateConflicts } from '../../lib/conflicts';

export default function PerformancePage() {
  const [kpis, setKpis] = useState({
    throughputTarget: 420,
    throughputCurrent: 398,
    avgDelay: 3.4,
    conflictResolutionRate: 98.5,
    energyGain: 8.2
  });

  const [conflicts, setConflicts] = useState<ConflictRecord[]>(mockConflictData);
  const [selectedConflict, setSelectedConflict] = useState<ConflictRecord | null>(null);
  const [showXai, setShowXai] = useState(false);

  // Simulate live KPI drift
  useEffect(() => {
    const interval = setInterval(() => {
      setKpis(p => ({
        ...p,
        throughputCurrent: p.throughputCurrent + (Math.random() > 0.5 ? 1 : 0),
        avgDelay: parseFloat((p.avgDelay + (Math.random() - 0.5) * 0.2).toFixed(2)),
        conflictResolutionRate: parseFloat((p.conflictResolutionRate + (Math.random() - 0.5) * 0.1).toFixed(2)),
        energyGain: parseFloat((p.energyGain + (Math.random() - 0.5) * 0.05).toFixed(2))
      }));
      setConflicts(prev => rotateConflicts(prev));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between px-6 py-4 border-b border-bg-tertiary">
        <div>
          <h1 className="text-2xl font-semibold">Performance & Optimization</h1>
          <p className="text-xs text-slate-400 mt-1">High-level metrics & MARL optimization insights</p>
        </div>
        <div className="text-xs text-slate-500 uppercase tracking-wider">
          Last Refresh: {new Date().toLocaleTimeString()}
        </div>
      </header>
      <div className="p-6 space-y-8">
        <KPICards kpis={kpis} />
        <div className="grid gap-6 grid-cols-1 2xl:grid-cols-3">
          <div className="2xl:col-span-2 space-y-6">
            <ConflictQueue
              conflicts={conflicts}
              onViewDetails={(c) => {
                setSelectedConflict(c);
                setShowXai(true);
              }}
            />
          </div>
          <div className="space-y-6">
            <BenchmarkCard kpis={kpis} />
            <div className="p-4 rounded-lg bg-bg-secondary border border-bg-tertiary">
              <h3 className="font-semibold mb-2 text-sm uppercase tracking-wide text-slate-400">
                Optimization Engine Status
              </h3>
              <ul className="text-xs space-y-2 text-slate-300">
                <li>MARL Cluster Health: <span className="text-brand.emerald font-medium">Nominal</span></li>
                <li>Inference Latency (p95): 180 ms</li>
                <li>Policy Version: v2.4.1-alpha</li>
                <li>Drift Monitor: No anomalies</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <XaiModal
        open={showXai}
        conflict={selectedConflict}
        onClose={() => setShowXai(false)}
      />
    </div>
  );
}