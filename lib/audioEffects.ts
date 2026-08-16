"use client";

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isDronePlaying: boolean = false;
  private droneGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];

  private ensureContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // 432Hz Healing Spiritual Meditative Ambient Sound Engine
  public startSpiritualDrone() {
    try {
      const ctx = this.ensureContext();
      if (!ctx || this.isDronePlaying || this.isMuted) return;

      this.droneGain = ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.001, ctx.currentTime);
      // Audible, rich meditative volume
      this.droneGain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 1.5);

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(650, ctx.currentTime);

      // 432Hz Harmonic Solfeggio Scale (Root 432Hz, 216Hz, 108Hz bass, 528Hz Love freq, 648Hz Fifth)
      const frequencies = [108, 216, 432, 528, 648];

      this.oscillators = frequencies.map((freq, i) => {
        const osc = ctx.createOscillator();
        osc.type = i % 2 === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.detune.setValueAtTime((i - 2) * 6, ctx.currentTime);

        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0.25 / frequencies.length, ctx.currentTime);

        osc.connect(oscGain);
        oscGain.connect(filter);
        osc.start();
        return osc;
      });

      filter.connect(this.droneGain);
      this.droneGain.connect(ctx.destination);
      this.isDronePlaying = true;
    } catch (e) {
      console.warn("Audio start error:", e);
    }
  }

  public stopSpiritualDrone() {
    if (this.droneGain && this.ctx) {
      try {
        this.droneGain.gain.setValueAtTime(this.droneGain.gain.value, this.ctx.currentTime);
        this.droneGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
        setTimeout(() => {
          this.oscillators.forEach((o) => {
            try {
              o.stop();
              o.disconnect();
            } catch {}
          });
          this.oscillators = [];
          this.isDronePlaying = false;
        }, 850);
      } catch {
        this.isDronePlaying = false;
      }
    }
  }

  // Duolingo-style crisp, rewarding option select chime
  public playDuolingoSelect() {
    if (this.isMuted) return;
    try {
      const ctx = this.ensureContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const notes = [523.25, 659.25]; // C5 -> E5 quick cheerful pop

      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + i * 0.05);

        gain.gain.setValueAtTime(0.08, now + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.05 + 0.12);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.13);
      });
    } catch {}
  }

  // Duolingo-style celebration chime when completing a step or submitting
  public playDuolingoSuccess() {
    if (this.isMuted) return;
    try {
      const ctx = this.ensureContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5 -> E5 -> G5 -> C6 celebration fanfare!

      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + i * 0.07);

        gain.gain.setValueAtTime(0.1, now + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.07 + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 0.26);
      });
    } catch {}
  }

  // Hover tick / subtle UI ping
  public playHoverTone() {
    if (this.isMuted) return;
    try {
      const ctx = this.ensureContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime);

      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch {}
  }

  // Generic Click Tone
  public playClickTone() {
    this.playDuolingoSelect();
  }

  public toggleMute(): boolean {
    const ctx = this.ensureContext();
    if (ctx && ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopSpiritualDrone();
    } else {
      this.startSpiritualDrone();
    }
    return this.isMuted;
  }

  public isPlaying(): boolean {
    return this.isDronePlaying;
  }
}

export const audioService = new AudioEngine();
