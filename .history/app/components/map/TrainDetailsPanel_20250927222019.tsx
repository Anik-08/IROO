'use client';
import { TrainAgent } from '@/lib/trainSim';
import { X } from 'lucide-react';

interface Props {
  train: TrainAgent;
  onClose: () => void;
}

export function TrainDetailsPanel({ train, onClose }: Props) {
  return (
    <div className="absolute right-4 top-4 w-80 bg-bg-tertiary border border-bg-accent rounded-lg shadow-lg animate-in fade-in">
      <div className="flex items-center justify-between px-4 py-3 border-b border-bg-accent">
        <h3 className="font-semibold text-sm">Train {train.id} Status</h3>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-200">
          <X size={16} />
        </button>
      </div>
      <div className="p-4 space-y-3 text-xs">
        <div className="flex justify-between">
          <span className="text-slate-400">Status</span>
          <span className="font-medium">{train.status}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Suggested Speed</span>
          <span className="font-medium">{train.suggestedSpeed} km/h</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Destination</span>
          <span className="font-medium">{train.destination}</span>
        </div>
        <div>
          <p className="text-slate-400 mb-1">Recent Notes</p>
          <ul className="list-disc ml-4 space-y-1">
            {train.notes.slice(-3).map((n, idx) => (
              <li key={idx}>{n}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}