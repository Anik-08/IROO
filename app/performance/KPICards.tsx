'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  kpis: {
    throughputTarget: number;
    throughputCurrent: number;
    avgDelay: number;
    conflictResolutionRate: number;
    energyGain: number;
  };
}

const Card = ({ title, value, suffix, accent, children }: any) => (
  <div className="relative overflow-hidden rounded-lg bg-bg-secondary border border-bg-tertiary p-5">
    <div className="absolute inset-0 pointer-events-none opacity-30 bg-gradient-to-br from-bg-accent to-transparent" />
    <div className="flex items-center justify-between mb-2">
      <p className="text-xs font-semibold tracking-widest uppercase text-slate-400">{title}</p>
      <span className={`w-2 h-2 rounded-full ${accent}`} />
    </div>
    <div className="flex items-end gap-2">
      <AnimatePresence mode="wait">
        <motion.span
          key={value}
          initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35 }}
          className="text-3xl font-semibold"
        >
          {value}{suffix}
        </motion.span>
      </AnimatePresence>
    </div>
    <div className="mt-3">{children}</div>
  </div>
);

export function KPICards({ kpis }: Props) {
  const throughputPct = Math.round((kpis.throughputCurrent / kpis.throughputTarget) * 100);
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
      <Card
        title="Network Throughput"
        value={`${kpis.throughputCurrent}/${kpis.throughputTarget}`}
        accent="bg-brand.blue"
      >
        <div className="h-2 bg-bg-tertiary rounded overflow-hidden">
          <div
            className="h-full bg-brand.blue transition-all duration-700"
            style={{ width: `${throughputPct}%` }}
          />
        </div>
        <p className="text-[10px] text-slate-400 mt-1">{throughputPct}% of target achieved</p>
      </Card>
      <Card
        title="Average System Delay"
        value={kpis.avgDelay.toFixed(2)}
        suffix="m"
        accent="bg-brand.amber"
      >
        <p className="text-[11px] text-slate-400">
          Rolling 30-min aggregated delay across active trains
        </p>
      </Card>
      <Card
        title="Conflict Resolution Rate"
        value={kpis.conflictResolutionRate.toFixed(2)}
        suffix="%"
        accent="bg-brand.emerald"
      >
        <p className="text-[11px] text-slate-400">
          Automated resolutions via MARL & heuristics
        </p>
      </Card>
      <Card
        title="Energy Efficiency Gain"
        value={kpis.energyGain.toFixed(2)}
        suffix="%"
        accent="bg-brand.violet"
      >
        <p className="text-[11px] text-slate-400">
          Relative baseline energy usage (eco pacing optimization)
        </p>
      </Card>
    </div>
  );
}