/**
 * Web Audio API Ambient Soundscape Generator for Kage
 * Fully procedural: requires zero external audio files.
 */
class KageAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private droneOsc: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;
  private rainNode: AudioNode | null = null;
  private rainGain: GainNode | null = null;

  private init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    
    this.ctx = new AudioCtx();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    this.createDrone();
    this.createRain();
  }

  private createDrone() {
    if (!this.ctx || !this.masterGain) return;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 note

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    this.droneOsc = osc;
    this.droneGain = gain;
  }

  private createRain() {
    if (!this.ctx || !this.masterGain) return;

    // Create 2-second buffer of white noise for ambient rain
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.2, this.ctx.currentTime);

    const rainGain = this.ctx.createGain();
    rainGain.gain.setValueAtTime(0.05, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(rainGain);
    rainGain.connect(this.masterGain);

    whiteNoise.start();
    this.rainNode = whiteNoise;
    this.rainGain = rainGain;
  }

  public toggle(): boolean {
    if (!this.ctx) {
      this.init();
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isPlaying = !this.isPlaying;
    if (this.masterGain && this.ctx) {
      const targetGain = this.isPlaying ? 0.18 : 0;
      this.masterGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.3);
    }

    if (this.isPlaying) {
      this.playTempleBell(440);
    }

    return this.isPlaying;
  }

  public playTempleBell(freq = 440) {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;

    const now = this.ctx.currentTime;
    const bellOsc = this.ctx.createOscillator();
    const bellGain = this.ctx.createGain();
    const harmonicOsc = this.ctx.createOscillator();
    const harmonicGain = this.ctx.createGain();

    bellOsc.type = 'sine';
    bellOsc.frequency.setValueAtTime(freq, now);

    harmonicOsc.type = 'sine';
    harmonicOsc.frequency.setValueAtTime(freq * 2.75, now);

    bellGain.gain.setValueAtTime(0.12, now);
    bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);

    harmonicGain.gain.setValueAtTime(0.04, now);
    harmonicGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

    bellOsc.connect(bellGain);
    harmonicOsc.connect(harmonicGain);

    bellGain.connect(this.masterGain);
    harmonicGain.connect(this.masterGain);

    bellOsc.start(now);
    harmonicOsc.start(now);
    bellOsc.stop(now + 3.6);
    harmonicOsc.stop(now + 1.9);
  }

  public getActiveState(): boolean {
    return this.isPlaying;
  }
}

export const KageAudio = new KageAudioEngine();
