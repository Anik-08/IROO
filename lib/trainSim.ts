export interface TrainAgent {
  id: string;
  status: 'On Time' | 'Delayed' | 'Conflict Alert';
  suggestedSpeed: number;
  destination: string;
  position: { x: number; y: number };
  pathIndex: number;
  progress: number; // 0..1 along path segment
  notes: string[];
}

export interface ConflictZone {
  id: string;
  pathSegmentIndex: number;
  severity: 'warning' | 'critical';
  description: string;
  recommendedAction: string;
  suggestedSpeed: number;
  involvedTrains: string[];
  etaResolutionMinutes: number;
}

const PATH_COORDS = [
  // Path 0 simplified segment coordinates for interpolation
  [
    { x: 40, y: 380 }, { x: 200, y: 300 }, { x: 400, y: 310 }, { x: 620, y: 250 }, { x: 900, y: 260 }
  ],
  [
    { x: 120, y: 120 }, { x: 300, y: 180 }, { x: 500, y: 160 }, { x: 780, y: 120 }
  ],
  [
    { x: 80, y: 450 }, { x: 240, y: 420 }, { x: 480, y: 400 }, { x: 760, y: 380 }, { x: 960, y: 360 }
  ]
];

function interpolatePoints(points: { x: number; y: number }[], t: number) {
  const n = points.length - 1;
  const scaled = t * n;
  const idx = Math.min(Math.floor(scaled), n - 1);
  const localT = scaled - idx;
  const p1 = points[idx];
  const p2 = points[idx + 1];
  return {
    x: p1.x + (p2.x - p1.x) * localT,
    y: p1.y + (p2.y - p1.y) * localT
  };
}

const DESTINATIONS = ['Yard Alpha', 'Depot West', 'Terminal C', 'Gate South', 'Hub Nexus'];

export function generateInitialTrains(): TrainAgent[] {
  return Array.from({ length: 7 }).map((_, i) => {
    const pathIndex = i % PATH_COORDS.length;
    const progress = Math.random();
    return {
      id: `T-10${i + 1}`,
      status: 'On Time' as const,
      suggestedSpeed: Math.round(60 + Math.random() * 40),
      destination: DESTINATIONS[i % DESTINATIONS.length],
      position: interpolatePoints(PATH_COORDS[pathIndex], progress),
      pathIndex,
      progress,
      notes: ['Initialized route session', 'Nominal schedule alignment']
    };
  });
}

export function moveTrains(trains: TrainAgent[]): TrainAgent[] {
  return trains.map(t => {
    let newProgress = t.progress + (0.01 + Math.random() * 0.02);
    let newPathIndex = t.pathIndex;
    if (newProgress >= 1) {
      newProgress = 0;
      newPathIndex = (t.pathIndex + 1) % PATH_COORDS.length;
    }

    const statusRoll = Math.random();
    const status: TrainAgent['status'] =
      statusRoll > 0.96 ? 'Conflict Alert'
        : statusRoll > 0.88 ? 'Delayed'
        : 'On Time';

    const newNotes = [...t.notes];
    if (status === 'Delayed' && Math.random() > 0.7) {
      newNotes.push('Minor speed regulation due to path congestion');
    }
    if (status === 'Conflict Alert' && Math.random() > 0.6) {
      newNotes.push('Awaiting resolution from MARL policy arbitration');
    }
    if (newNotes.length > 10) newNotes.shift();

    return {
      ...t,
      status,
      pathIndex: newPathIndex,
      progress: newProgress,
      position: interpolatePoints(PATH_COORDS[newPathIndex], newProgress),
      suggestedSpeed: Math.round(t.suggestedSpeed + (Math.random() - 0.5) * 5),
      notes: newNotes
    };
  });
}