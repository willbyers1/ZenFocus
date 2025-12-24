
export enum TimerStatus {
  IDLE = 'IDLE',
  RUNNING = 'RUNNING',
  PAUSED = 'PAUSED',
}

export interface SoundTrack {
  id: string;
  name: string;
  url: string;
  icon: string;
}

export interface AppState {
  timeRemaining: number;
  status: TimerStatus;
  currentTask: string;
  activeSounds: Set<string>;
}
