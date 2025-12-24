
export class AudioEngine {
  private players: Map<string, HTMLAudioElement> = new Map();

  constructor() {}

  toggleTrack(id: string, url: string, active: boolean) {
    let player = this.players.get(id);

    if (!player) {
      player = new Audio(url);
      player.loop = true;
      player.volume = 0.5;
      this.players.set(id, player);
    }

    if (active) {
      player.play().catch(e => console.warn("Audio playback failed", e));
    } else {
      player.pause();
    }
  }

  setVolume(id: string, volume: number) {
    const player = this.players.get(id);
    if (player) {
      player.volume = Math.max(0, Math.min(1, volume));
    }
  }

  stopAll() {
    this.players.forEach(player => {
      player.pause();
      player.currentTime = 0;
    });
  }
}

export const audioEngine = new AudioEngine();
