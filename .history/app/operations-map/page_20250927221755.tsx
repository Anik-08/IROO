'use client';
import { useEffect, useState } from 'react';
import { TrainMap } from '@/components/map/TrainMap';
import { TrainDetailsPanel } from '@/components/map/TrainDetailsPanel';
import { ConflictDetailsPanel } from '@/components/map/ConflictDetailsPanel';
import { generateInitialTrains, moveTrains, type TrainAgent, type ConflictZone } from '@/lib/trainSim';

export default function OperationsMapPage() {
  const [trains, setTrains] = useState<TrainAgent[]>(() => generateInitialTrains());
  const [selectedTrainId, setSelectedTrainId] = useState<string | null>(null);
  const [selectedConflict, setSelectedConflict] = useState<ConflictZone | null>(null);
  const [conflicts, setConflicts] = useState<ConflictZone[]>([
    {
      id: 'CZ-12A',
      pathSegmentIndex: 2,
      severity: 'warning',
      description: 'Potential scheduling overlap at Junction Alpha',
      recommendedAction: 'Reduce Train T-103 speed to 70% for next 4 km',
      suggestedSpeed: 70,
      involvedTrains: ['T-101', 'T-103'],
      etaResolutionMinutes: 6
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrains(prev => moveTrains(prev));
      // simulate conflict severity change
      setConflicts(prev =>
        prev.map(c => ({
          ...c,
            severity: Math.random() > 0.85 ? 'critical' : c.severity
        }))
      );
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const selectedTrain = trains.find(t => t.id === selectedTrainId) || null;

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between px-6 py-4 border-b border-bg-tertiary">
        <div>
          <h1 className="text-2xl font-semibold">Real-Time Operations Map</h1>
          <p className="text-xs text-slate-400 mt-1">
            Live Digital Twin Simulation (Mocked Data)
          </p>
        </div>
        <div className="text-xs uppercase tracking-widest text-slate-500">
          System Time: {new Date().toLocaleTimeString()}
        </div>
      </header>
      <div className="flex flex-1 relative">
        <TrainMap
          trains={trains}
          conflicts={conflicts}
          onSelectTrain={id => {
            setSelectedConflict(null);
            setSelectedTrainId(id);
          }}
          onSelectConflict={conflict => {
            setSelectedTrainId(null);
            setSelectedConflict(conflict);
          }}
        />
        {selectedTrain && (
          <TrainDetailsPanel
            train={selectedTrain}
            onClose={() => setSelectedTrainId(null)}
          />
        )}
        {selectedConflict && (
          <ConflictDetailsPanel
            conflict={selectedConflict}
            onClose={() => setSelectedConflict(null)}
          />
        )}
      </div>
    </div>
  );
}