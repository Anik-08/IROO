export interface ConflictRecord {
  id: string;
  location: string;
  timeSince: string;
  proposedAction: string;
  status: 'pending' | 'resolved' | 'critical';
}

export const mockConflictData: ConflictRecord[] = [
  {
    id: 'CF-301',
    location: 'Junction Alpha',
    timeSince: '2m 10s',
    proposedAction: 'Hold Freight C at Siding 4 for 4 min',
    status: 'pending'
  },
  {
    id: 'CF-302',
    location: 'S Curve Sector',
    timeSince: '5m 42s',
    proposedAction: 'Reduce T-107 speed to 65% for 6 km',
    status: 'critical'
  },
  {
    id: 'CF-298',
    location: 'Inbound Delta',
    timeSince: '14m 09s',
    proposedAction: 'Priority swap with T-101 through Gate 3',
    status: 'resolved'
  },
  {
    id: 'CF-299',
    location: 'Outer Loop West',
    timeSince: '9m 33s',
    proposedAction: 'Synchronize pass window + speed pacing',
    status: 'pending'
  }
];

export function rotateConflicts(conflicts: ConflictRecord[]): ConflictRecord[] {
  // Randomly update statuses & times
  return conflicts.map(c => {
    const seconds = Math.max(0, parseInt(c.timeSince.split('m')[1]) + 4);
    let status = c.status;
    if (status === 'pending' && Math.random() > 0.92) status = 'resolved';
    if (status === 'critical' && Math.random() > 0.6) status = 'pending';
    if (status === 'pending' && Math.random() > 0.94) status = 'critical';

    return {
      ...c,
      status,
      timeSince: c.timeSince.startsWith('0m')
        ? `${Math.floor(Math.random()*3)+1}m ${seconds % 60}s`
        : c.timeSince
    };
  });
}