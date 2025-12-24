
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TimerStatus } from './types';
import { DEFAULT_WORK_TIME } from './constants';
import { TimerDisplay } from './components/TimerDisplay';
import { SoundMixer } from './components/SoundMixer';
import { TaskInput } from './components/TaskInput';
import { audioEngine } from './core/AudioEngine';
import { Zap, Shield, Cpu } from 'lucide-react';

const App: React.FC = () => {
  const [timeRemaining, setTimeRemaining] = useState(DEFAULT_WORK_TIME);
  const [status, setStatus] = useState<TimerStatus>(TimerStatus.IDLE);
  const [currentTask, setCurrentTask] = useState('');
  const [activeSounds, setActiveSounds] = useState<Set<string>>(new Set());
  
  const timerRef = useRef<number | null>(null);

  // Update tab title
  useEffect(() => {
    const mins = Math.floor(timeRemaining / 60);
    const secs = timeRemaining % 60;
    const timeStr = `(${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')})`;
    document.title = `${timeStr} ZenFocus`;
  }, [timeRemaining]);

  const handleStart = useCallback(() => {
    if (status === TimerStatus.RUNNING) return;
    setStatus(TimerStatus.RUNNING);
    
    timerRef.current = window.setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          if (timerRef.current) clearInterval(timerRef.current);
          setStatus(TimerStatus.IDLE);
          // Play a notification sound
          new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3').play();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [status]);

  const handlePause = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setStatus(TimerStatus.PAUSED);
  }, []);

  const handleReset = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setStatus(TimerStatus.IDLE);
    setTimeRemaining(DEFAULT_WORK_TIME);
  }, []);

  const handleToggleSound = useCallback((id: string, url: string) => {
    setActiveSounds((prev) => {
      const next = new Set(prev);
      const isActivating = !next.has(id);
      
      if (isActivating) next.add(id);
      else next.delete(id);

      audioEngine.toggleTrack(id, url, isActivating);
      return next;
    });
  }, []);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-cyan-400 selection:bg-cyan-500/30">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-950/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-950/10 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
      </div>

      {/* Navbar */}
      <header className="relative z-10 p-6 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="bg-cyan-500/20 p-2 rounded-lg glow-cyan-border">
            <Cpu size={24} className="text-cyan-400" />
          </div>
          <h1 className="font-orbitron text-xl font-bold tracking-widest text-white glow-cyan">
            ZEN<span className="text-cyan-500">FOCUS</span>
          </h1>
        </div>
        <div className="hidden md:flex items-center space-x-6 text-xs font-orbitron text-slate-500 tracking-widest uppercase">
          <span className="flex items-center hover:text-cyan-400 cursor-default transition-colors">
            <Shield size={14} className="mr-1" /> System Secure
          </span>
          <span className="flex items-center text-cyan-500/70">
            <Zap size={14} className="mr-1 animate-pulse" /> Neural Link Active
          </span>
        </div>
      </header>

      {/* Main Grid */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Controls */}
        <div className="lg:col-span-3 space-y-6 order-2 lg:order-1">
          <SoundMixer activeSounds={activeSounds} onToggleSound={handleToggleSound} />
          
          <div className="hidden lg:block glass rounded-2xl p-6 border border-white/5 opacity-40">
            <h4 className="text-xs font-orbitron uppercase tracking-widest text-slate-600 mb-2">Diagnostic</h4>
            <div className="space-y-2">
              <div className="h-1 w-full bg-slate-900 rounded overflow-hidden">
                <div className="h-full bg-cyan-900 w-2/3"></div>
              </div>
              <div className="h-1 w-full bg-slate-900 rounded overflow-hidden">
                <div className="h-full bg-cyan-900 w-1/2"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Center Timer */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center space-y-12 order-1 lg:order-2 py-12 lg:py-0">
          <TimerDisplay 
            secondsRemaining={timeRemaining}
            status={status}
            onStart={handleStart}
            onPause={handlePause}
            onReset={handleReset}
          />
        </div>

        {/* Right Info */}
        <div className="lg:col-span-3 space-y-6 order-3">
          <TaskInput currentTask={currentTask} onUpdateTask={setCurrentTask} />
          
          <div className="glass rounded-2xl p-6 glow-cyan-border bg-cyan-500/5">
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="text-cyan-400" size={18} />
              <h3 className="text-sm font-orbitron uppercase tracking-widest text-white">Efficiency Tip</h3>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed font-light">
              Deep work requires <span className="text-cyan-400">90 minutes</span> to reach peak performance. Start with 25 minutes to build momentum.
            </p>
          </div>

          <div className="p-4 text-center">
             <span className="text-[10px] font-orbitron text-slate-700 tracking-[0.3em] uppercase">
               v3.0.1 Protocol Loaded
             </span>
          </div>
        </div>

      </main>

      {/* Footer / Mobile Hint */}
      <footer className="fixed bottom-0 left-0 w-full p-4 pointer-events-none lg:block hidden">
        <div className="flex justify-center">
           <div className="px-4 py-2 glass rounded-full border border-white/5 text-[10px] text-slate-600 font-orbitron tracking-widest uppercase flex items-center">
             <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
             Global Synch Stable
           </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
