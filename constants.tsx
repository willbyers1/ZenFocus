
import React from 'react';
import { CloudRain, Music, Wind, Waves } from 'lucide-react';
import { SoundTrack } from './types';

export const DEFAULT_WORK_TIME = 25 * 60; // 25 minutes

export const SOUND_TRACKS: SoundTrack[] = [
  {
    id: 'rain',
    name: 'Rainfall',
    url: '/zenfocus/sounds/rainfall.mp3',
    icon: 'CloudRain'
  },
  {
    id: 'lofi',
    name: 'Lo-Fi Chill',
    url: '/zenfocus/sounds/lofi.mp3',
    icon: 'Music'
  },
  {
    id: 'noise',
    name: 'White Noise',
    url: '/zenfocus/sounds/whitenoise.mp3',
    icon: 'Wind'
  },
  {
    id: 'waves',
    name: 'Deep Waves',
    url: '/zenfocus/sounds/seawave.mp3',
    icon: 'Waves'
  }
];

export const getIcon = (iconName: string, className?: string) => {
  switch (iconName) {
    case 'CloudRain': return <CloudRain className={className} />;
    case 'Music': return <Music className={className} />;
    case 'Wind': return <Wind className={className} />;
    case 'Waves': return <Waves className={className} />;
    default: return null;
  }
};
