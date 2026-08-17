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

  // 432Hz Healing Spiritual Meditative Ambient Sound Engine (Full Rich Volume)
  public startSpiritualDrone() {
    try {
      const ctx = this.ensureContext();
      if (!ctx || this.isMuted) return;

      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }

      // Stop existing if any
      this.stopSpiritualDrone();

      this.droneGain = ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.01, ctx.currentTime);
      // High, clearly audible, lush meditative master volume (0.80)
      this.droneGain.gain.exponentialRampToValueAtTime(0.80, ctx.currentTime + 1.0);

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(2200, ctx.currentTime);
      filter.Q.setValueAtTime(1.5, ctx.currentTime);

      // Multi-layer Harmonic Solfeggio Tibetan Ambient Scale
      // 108Hz (Deep Sub), 216Hz (Warm Root), 432Hz (Pure Heart Root), 528Hz (Healing Solfeggio), 648Hz (Golden Fifth), 864Hz (Crystal Octave)
      const layers = [
        { freq: 108, type: "sine" as const, gain: 0.35, detune: -4 },
        { freq: 216, type: "sine" as const, gain: 0.30, detune: 3 },
        { freq: 432, type: "triangle" as const, gain: 0.35, detune: -6 },
        { freq: 528, type: "sine" as const, gain: 0.30, detune: 5 },
        { freq: 648, type: "sine" as const, gain: 0.25, detune: -3 },
        { freq: 864, type: "sine" as const, gain: 0.18, detune: 6 },
      ];

      this.oscillators = layers.map((layer) => {
        const osc = ctx.createOscillator();
        osc.type = layer.type;
        osc.frequency.setValueAtTime(layer.freq, ctx.currentTime);
        osc.detune.setValueAtTime(layer.detune, ctx.currentTime);

        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(layer.gain, ctx.currentTime);

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
        this.droneGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.6);
        setTimeout(() => {
          this.oscillators.forEach((o) => {
            try {
              o.stop();
              o.disconnect();
            } catch {}
          });
          this.oscillators = [];
          this.isDronePlaying = false;
        }, 650);
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
      if (ctx.state === "suspended") ctx.resume().catch(() => {});

      const now = ctx.currentTime;
      const notes = [523.25, 659.25]; // C5 -> E5

      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + i * 0.05);

        gain.gain.setValueAtTime(0.22, now + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.05 + 0.14);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.15);
      });
    } catch {}
  }

  // Duolingo-style celebration chime
  public playDuolingoSuccess() {
    if (this.isMuted) return;
    try {
      const ctx = this.ensureContext();
      if (!ctx) return;
      if (ctx.state === "suspended") ctx.resume().catch(() => {});

      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5 -> E5 -> G5 -> C6

      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + i * 0.07);

        gain.gain.setValueAtTime(0.28, now + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.07 + 0.28);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 0.29);
      });
    } catch {}
  }

  // Hover tick / subtle UI ping
  public playHoverTone() {
    if (this.isMuted) return;
    try {
      const ctx = this.ensureContext();
      if (!ctx) return;
      if (ctx.state === "suspended") ctx.resume().catch(() => {});

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.07);
    } catch {}
  }

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
