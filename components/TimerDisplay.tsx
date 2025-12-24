
import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { TimerStatus } from '../types';

interface TimerDisplayProps {
  secondsRemaining: number;
  status: TimerStatus;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({
  secondsRemaining,
  status,
  onStart,
  onPause,
  onReset,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="relative group">
        <div className="absolute -inset-1 bg-cyan-500/20 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
        <div className="relative font-orbitron text-8xl md:text-9xl tracking-tighter text-cyan-400 glow-cyan">
          {formatTime(secondsRemaining)}
        </div>
      </div>

      <div className="flex items-center space-x-6">
        {status !== TimerStatus.RUNNING ? (
          <button
            onClick={onStart}
            className="p-4 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-all transform active:scale-95 shadow-lg shadow-cyan-900/20"
            title="Start Timer"
          >
            <Play size={32} fill="currentColor" />
          </button>
        ) : (
          <button
            onClick={onPause}
            className="p-4 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-all transform active:scale-95 shadow-lg shadow-cyan-900/20"
            title="Pause Timer"
          >
            <Pause size={32} fill="currentColor" />
          </button>
        )}

        <button
          onClick={onReset}
          className="p-4 rounded-full bg-slate-800/50 border border-slate-700 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all transform active:scale-95"
          title="Reset Timer"
        >
          <RotateCcw size={28} />
        </button>
      </div>
    </div>
  );
};
