'use client';
import { TrainAgent, ConflictZone } from '../../../lib/trainSim';
import { clsx } from 'clsx';

interface Props {
  trains: TrainAgent[];
  conflicts: ConflictZone[];
  onSelectTrain: (id: string) => void;
  onSelectConflict: (conflict: ConflictZone) => void;
}

const TRACK_PATHS = [
  "M 40 380 L 200 300 L 400 310 L 620 250 L 900 260",
  "M 120 120 L 300 180 L 500 160 L 780 120",
  "M 80 450 L 240 420 L 480 400 L 760 380 L 960 360"
];

export function TrainMap({ trains, conflicts, onSelectTrain, onSelectConflict }: Props) {
  return (
    <div className="flex-1 relative overflow-hidden bg-bg-secondary">
      <div className="absolute inset-0 grid-accent opacity-40 pointer-events-none" />
      <svg
        viewBox="0 0 1000 600"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="trackGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2A3038"/>
            <stop offset="100%" stopColor="#3A424D"/>
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {TRACK_PATHS.map((d, idx) => (
          <path
            key={idx}
            d={d}
            fill="none"
            stroke="url(#trackGradient)"
            strokeWidth={6}
            strokeLinecap="round"
            className="opacity-60"
          />
        ))}

        {conflicts.map(c => {
          const targetPath = TRACK_PATHS[c.pathSegmentIndex % TRACK_PATHS.length];
          return (
            <g key={c.id} onClick={() => onSelectConflict(c)} className="cursor-pointer">
              <path
                d={targetPath}
                fill="none"
                stroke={c.severity === 'critical' ? '#FF4D4F' : '#FFB347'}
                strokeWidth={8}
                strokeDasharray="12 10"
                className={clsx(
                  c.severity === 'critical' ? 'animate-blink' : 'animate-pulse-slow'
                )}
                strokeLinecap="round"
                style={{ filter: 'url(#glow)' }}
              />
              <text
                x={500}
                y={c.pathSegmentIndex * 30 + 200}
                textAnchor="middle"
                fontSize={14}
                fill="#FFD36E"
                className="select-none"
              >
                {c.id} ({c.severity})
              </text>
            </g>
          );
        })}

        {trains.map(train => {
          const { x, y } = train.position;
          return (
            <g
              key={train.id}
              className="cursor-pointer"
              onClick={() => onSelectTrain(train.id)}
            >
              <circle
                cx={x}
                cy={y}
                r={14}
                fill={train.status === 'Delayed' ? '#FFB347' :
                      train.status === 'Conflict Alert' ? '#FF4D4F' : '#33F3A7'}
                stroke="#101418"
                strokeWidth={2}
              />
              <text
                x={x}
                y={y - 22}
                fontSize={11}
                textAnchor="middle"
                fill="#fff"
                className="pointer-events-none"
              >
                {train.id}
              </text>
              <text
                x={x}
                y={y + 30}
                fontSize={10}
                textAnchor="middle"
                fill="#94A3B8"
                className="pointer-events-none"
              >
                {train.status}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="absolute top-4 right-4 bg-bg-tertiary/70 backdrop-blur-md border border-bg-tertiary rounded-md p-3 text-xs space-y-2 w-60">
        <p className="uppercase tracking-wider text-[10px] text-slate-400 font-semibold">
          Layer Legend
        </p>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-brand.emerald" /> On Time
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-brand.amber" /> Delayed
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-brand.red" /> Conflict Alert
        </div>
        <div className="flex items-center gap-2">
          <span className="w-5 h-1 bg-brand.red animate-blink" /> Conflict Zone
        </div>
      </div>
    </div>
  );
}