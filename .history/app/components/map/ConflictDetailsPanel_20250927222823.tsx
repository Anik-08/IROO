'use client';
import { ConflictZone } from '../../../lib/trainSim';
import { X } from 'lucide-react';

export function ConflictDetailsPanel({ conflict, onClose }: { conflict: ConflictZone; onClose: () => void; }) {
  return (
    <div className="absolute left-4 top-4 w-80 bg-bg-tertiary border border-bg-accent rounded-lg shadow-lg animate-in fade-in">
      <div className="flex items-center justify-between px-4 py-3 border-b border-bg-accent">
        <h3 className="font-semibold text-sm">Conflict {conflict.id}</h3>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-200">
          <X size={16} />
        </button>
      </div>
      <div className="p-4 space-y-3 text-xs">
        <div className="flex justify-between">
          <span className="text-slate-400">Severity</span>
          <span className={conflict.severity === 'critical' ? 'text-brand.red font-medium' : 'text-brand.amber font-medium'}>
            {conflict.severity}
          </span>
        </div>
        <div>
          <p className="text-slate-400 mb-1">Description</p>
          <p>{conflict.description}</p>
        </div>
        <div>
          <p className="text-slate-400 mb-1">Involved Trains</p>
          <p>{conflict.involvedTrains.join(', ')}</p>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">ETA Resolution</span>
          <span>{conflict.etaResolutionMinutes} min</span>
        </div>
        <div>
          <p className="text-slate-400 mb-1">Recommended Action</p>
          <p className="font-medium">{conflict.recommendedAction}</p>
        </div>
      </div>
    </div>
  );
}