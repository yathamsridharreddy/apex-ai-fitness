// APEX AI FITNESS — PRO (Web Audio API Synthesizer & Voice Coach Speech Engine)

class SoundService {
  private audioCtx: AudioContext | null = null;
  public isVoiceCoachOn: boolean = true;

  private getContext(): AudioContext {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioCtx;
  }

  public playClick(): void {
    try {
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(660, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.07, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {}
  }

  public playSuccess(): void {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      osc1.type = 'triangle';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc1.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc1.frequency.setValueAtTime(783.99, now + 0.16); // G5
      osc2.frequency.setValueAtTime(261.63, now);
      osc2.frequency.setValueAtTime(329.63, now + 0.08);
      osc2.frequency.setValueAtTime(392.00, now + 0.16);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.35);
      osc2.stop(now + 0.35);
    } catch (e) {}
  }

  public playVoiceCue(audioUrl: string, fallbackText: string): void {
    if (!this.isVoiceCoachOn) return;
    try {
      const audio = new Audio(audioUrl);
      audio.play().catch(() => {
        if ('speechSynthesis' in window) {
          const u = new SpeechSynthesisUtterance(fallbackText);
          u.rate = 1.0;
          u.pitch = 1.05;
          window.speechSynthesis.speak(u);
        }
      });
    } catch (err) {
      if ('speechSynthesis' in window) {
        const u = new SpeechSynthesisUtterance(fallbackText);
        window.speechSynthesis.speak(u);
      }
    }
  }

  public toggleVoiceCoach(): boolean {
    this.isVoiceCoachOn = !this.isVoiceCoachOn;
    if (this.isVoiceCoachOn) {
      this.playVoiceCue('/audio/workout_start.mp3', 'Voice coach is now enabled.');
    }
    return this.isVoiceCoachOn;
  }
}

export const soundService = new SoundService();
