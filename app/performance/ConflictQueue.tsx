'use client';
import { ConflictRecord } from '../../lib/conflicts';
import { Eye, Play } from 'lucide-react';
import { clsx } from 'clsx';

export function ConflictQueue({ conflicts, onViewDetails }: {
  conflicts: ConflictRecord[];
  onViewDetails: (c: ConflictRecord) => void;
}) {
  return (
    <div className="rounded-lg bg-bg-secondary border border-bg-tertiary overflow-hidden">
      <div className="px-5 py-4 border-b border-bg-tertiary flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-wide uppercase text-slate-400">Active Conflict Queue</h3>
        <span className="text-[10px] text-slate-500">Mock Data Feed</span>
      </div>
      <table className="w-full text-sm">
        <thead className="text-xs uppercase text-slate-400 bg-bg-tertiary/50">
          <tr>
            <th className="text-left px-4 py-3 font-medium">ID / Location</th>
            <th className="text-left px-4 py-3 font-medium">Detected</th>
            <th className="text-left px-4 py-3 font-medium">Proposed Resolution</th>
            <th className="text-left px-4 py-3 font-medium">Status</th>
            <th className="text-right px-4 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {conflicts.map(c => (
            <tr
              key={c.id}
              className="border-b border-bg-tertiary/60 hover:bg-bg-tertiary/40 transition-colors"
            >
              <td className="px-4 py-3">
                <div className="font-medium">{c.id}</div>
                <div className="text-[11px] text-slate-500">{c.location}</div>
              </td>
              <td className="px-4 py-3 text-xs">{c.timeSince}</td>
              <td className="px-4 py-3 text-xs leading-snug max-w-xs">{c.proposedAction}</td>
              <td className="px-4 py-3 text-xs">
                <span className={clsx(
                  "px-2 py-1 rounded text-[10px] font-medium",
                  c.status === 'resolved' && 'bg-brand.emerald/20 text-brand.emerald border border-brand.emerald/30',
                  c.status === 'pending' && 'bg-brand.amber/20 text-brand.amber border border-brand.amber/30',
                  c.status === 'critical' && 'bg-brand.red/20 text-brand.red border border-brand.red/30'
                )}>
                  {c.status}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-2">
                  <button
                    disabled
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-bg-tertiary text-slate-500 text-[11px] font-medium border border-bg-accent cursor-not-allowed"
                  >
                    <Play size={12} />
                    Execute
                  </button>
                  <button
                    onClick={() => onViewDetails(c)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-brand.violet/20 hover:bg-brand.violet/30 text-brand.violet text-[11px] font-medium border border-brand.violet/30"
                  >
                    <Eye size={12} />
                    View Details
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {conflicts.length === 0 && (
            <tr>
              <td colSpan={5} className="py-8 text-center text-xs text-slate-500">
                No active conflicts.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}