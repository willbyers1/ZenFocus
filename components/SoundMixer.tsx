
import React from 'react';
import { SOUND_TRACKS, getIcon } from '../constants';
import { GlassCard } from './GlassCard';

interface SoundMixerProps {
  activeSounds: Set<string>;
  onToggleSound: (id: string, url: string) => void;
}

export const SoundMixer: React.FC<SoundMixerProps> = ({ activeSounds, onToggleSound }) => {
  return (
    <GlassCard className="w-full">
      <h3 className="text-sm font-orbitron uppercase tracking-widest text-slate-500 mb-6 flex items-center">
        <span className="w-2 h-2 bg-cyan-500 rounded-full mr-2 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
        Ambient Engine
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {SOUND_TRACKS.map((track) => {
          const isActive = activeSounds.has(track.id);
          return (
            <button
              key={track.id}
              onClick={() => onToggleSound(track.id, track.url)}
              className={`flex items-center space-x-3 p-4 rounded-xl border transition-all duration-300 ${
                isActive
                  ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400 glow-cyan-border shadow-lg shadow-cyan-500/5'
                  : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10'
              }`}
            >
              <div className={isActive ? 'text-cyan-400' : 'text-slate-500'}>
                {getIcon(track.icon, "w-5 h-5")}
              </div>
              <span className="text-sm font-medium">{track.name}</span>
            </button>
          );
        })}
      </div>
    </GlassCard>
  );
};
