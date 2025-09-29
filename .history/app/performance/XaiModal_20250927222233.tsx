'use client';
import { ReactNode } from 'react';
import { ConflictRecord } from '@/lib/conflicts';
import { X, BrainCircuit, GitBranch, Timer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  open: boolean;
  conflict: ConflictRecord | null;
  onClose: () => void;
}

const Step = ({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) => (
  <div className="flex gap-4">
    <div className="w-8 h-8 rounded-md bg-bg-tertiary flex items-center justify-center border border-bg-accent text-brand.violet shrink-0">
      {icon}
    </div>
    <div className="space-y-1">
      <p className="text-xs font-semibold tracking-wide uppercase text-slate-400">{title}</p>
      <div className="text-xs text-slate-300 leading-relaxed">
        {children}
      </div>
    </div>
  </div>
);

export function XaiModal({ open, conflict, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && conflict && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur"
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            className="w-full max-w-2xl rounded-xl bg-bg-secondary border border-bg-tertiary shadow-xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-bg-tertiary">
              <div>
                <h3 className="text-sm font-semibold">Explainable AI Decision - {conflict.id}</h3>
                <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">
                  Multi-Agent Reinforcement Learning Resolution Rationale
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-200"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              <Step
                icon={<Timer size={16} />}
                title="Problem Context"
              >
                Conflict detected at {conflict.location}. Train A is 5 minutes behind schedule; Train B projected delay: 3 minutes if precedence is not reassigned. Current headway margin below safety buffer threshold at segment S4.
              </Step>
              <Step
                icon={<BrainCircuit size={16} />}
                title="MARL Policy Analysis"
              >
                Agents evaluated 14 feasible action sequences. The selected policy introduced a temporary holding pattern for a lower-priority freight unit (Train C) at Siding 4. This reduces cumulative propagated delay from 8.0 minutes to 4.5 minutes and restores schedule adherence alignment within 2 cycles.
              </Step>
              <Step
                icon={<GitBranch size={16} />}
                title="Decision Path"
              >
                <ol className="list-decimal ml-4 space-y-1">
                  <li>Detect scheduling compression risk (t-0s)</li>
                  <li>Evaluate conflict cluster (t+120ms)</li>
                  <li>Simulate alternative clearance orders (t+320ms)</li>
                  <li>Energy-delay Pareto scoring (t+460ms)</li>
                  <li>Hold Train C at Siding 4 (t+610ms)</li>
                  <li>Dispatch updated speed advisories (t+700ms)</li>
                </ol>
              </Step>
              <div className="p-4 rounded-lg bg-bg-tertiary border border-bg-accent">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
                  Optimization Outcome
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  <div>
                    <p className="text-slate-500">Δ Total Delay</p>
                    <p className="font-medium text-brand.emerald">-3.5 min</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Energy Overrun Avoided</p>
                    <p className="font-medium text-brand.emerald">1.2%</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Safety Margin Restored</p>
                    <p className="font-medium">Yes</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Resolution Confidence</p>
                    <p className="font-medium">92.4%</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-2">
                  Timeline Visualization (Mock)
                </p>
                <div className="flex items-center gap-2 text-[10px]">
                  {['Detect', 'Simulate', 'Score', 'Select', 'Dispatch'].map((label, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-brand.violet/20 border border-brand.violet/40 flex items-center justify-center text-brand.violet font-semibold">
                        {idx + 1}
                      </div>
                      <span>{label}</span>
                      {idx < 4 && <div className="w-8 h-px bg-slate-600" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-bg-tertiary flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs rounded-md bg-brand.violet/20 hover:bg-brand.violet/30 border border-brand.violet/40 text-brand.violet font-medium"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}