
import React, { useState } from 'react';
import { Target, CheckCircle2 } from 'lucide-react';
import { GlassCard } from './GlassCard';

interface TaskInputProps {
  currentTask: string;
  onUpdateTask: (task: string) => void;
}

export const TaskInput: React.FC<TaskInputProps> = ({ currentTask, onUpdateTask }) => {
  const [isEditing, setIsEditing] = useState(!currentTask);
  const [inputValue, setInputValue] = useState(currentTask);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onUpdateTask(inputValue);
      setIsEditing(false);
    }
  };

  return (
    <GlassCard className="w-full">
      <h3 className="text-sm font-orbitron uppercase tracking-widest text-slate-500 mb-4 flex items-center">
        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
        Neural Focus
      </h3>
      
      {isEditing ? (
        <form onSubmit={handleSubmit} className="relative group">
          <input
            autoFocus
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="What is your current objective?"
            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-3 px-4 pl-11 text-cyan-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
          />
          <Target className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-cyan-500 transition-colors" size={20} />
          <button type="submit" className="hidden">Submit</button>
        </form>
      ) : (
        <div 
          onClick={() => setIsEditing(true)}
          className="flex items-center justify-between group cursor-pointer bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4 hover:border-cyan-500/40 transition-all"
        >
          <div className="flex items-center space-x-3 overflow-hidden">
            <CheckCircle2 size={20} className="text-cyan-500 shrink-0" />
            <span className="text-cyan-100 font-semibold truncate uppercase tracking-wide">
              {currentTask}
            </span>
          </div>
          <span className="text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ml-4">
            CLICK TO EDIT
          </span>
        </div>
      )}
    </GlassCard>
  );
};
