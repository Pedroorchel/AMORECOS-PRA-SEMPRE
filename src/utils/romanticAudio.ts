/**
 * Motor de áudio editorial em Web Audio API com 6 arranjos românticos distintos ao piano,
 * garantindo que todas as faixas das playlists toquem diretamente na página mesmo sem MP3 externo.
 */

interface NoteStep {
  freq: number;
  bassFreq?: number;
  duration: number;
}

const THEMES: NoteStep[][] = [
  // Tema 0: Valsa Íntima em Fá Maior (Aliança / Velha Infância)
  [
    { freq: 349.23, bassFreq: 174.61, duration: 0.7 },  // F4 + F3
    { freq: 440.0, duration: 0.7 },                     // A4
    { freq: 523.25, duration: 0.7 },                    // C5
    { freq: 440.0, bassFreq: 146.83, duration: 0.7 },   // A4 + D3
    { freq: 349.23, duration: 0.7 },                    // F4
    { freq: 329.63, duration: 0.7 },                    // E4
    { freq: 293.66, bassFreq: 116.54, duration: 0.7 },  // D4 + Bb2
    { freq: 349.23, duration: 0.7 },                    // F4
    { freq: 440.0, duration: 0.7 },                     // A4
    { freq: 392.0, bassFreq: 130.81, duration: 0.7 },   // G4 + C3
    { freq: 329.63, duration: 0.7 },                    // E4
    { freq: 261.63, duration: 0.7 },                    // C4
  ],
  // Tema 1: Caixinha de Música em Dó Maior (Trevo / Pupila)
  [
    { freq: 523.25, bassFreq: 130.81, duration: 0.56 }, // C5 + C3
    { freq: 659.25, duration: 0.56 },                   // E5
    { freq: 587.33, duration: 0.56 },                   // D5
    { freq: 523.25, bassFreq: 196.0, duration: 0.56 },  // C5 + G3
    { freq: 440.0, bassFreq: 110.0, duration: 0.56 },   // A4 + A2
    { freq: 523.25, duration: 0.56 },                   // C5
    { freq: 493.88, duration: 0.56 },                   // B4
    { freq: 440.0, bassFreq: 174.61, duration: 0.56 },  // A4 + F3
    { freq: 392.0, duration: 0.56 },                    // G4
    { freq: 440.0, duration: 0.56 },                    // A4
    { freq: 523.25, bassFreq: 196.0, duration: 0.56 },  // C5 + G3
    { freq: 587.33, duration: 0.56 },                   // D5
  ],
  // Tema 2: Noturno Sereno em Ré Maior (Pra Você Guardei o Amor / Perfect)
  [
    { freq: 587.33, bassFreq: 146.83, duration: 0.78 }, // D5 + D3
    { freq: 554.37, duration: 0.78 },                   // C#5
    { freq: 493.88, duration: 0.78 },                   // B4
    { freq: 440.0, bassFreq: 123.47, duration: 0.78 },  // A4 + B2
    { freq: 392.0, duration: 0.78 },                    // G4
    { freq: 369.99, duration: 0.78 },                   // F#4
    { freq: 392.0, bassFreq: 196.0, duration: 0.78 },   // G4 + G3
    { freq: 440.0, duration: 0.78 },                    // A4
    { freq: 493.88, duration: 0.78 },                   // B4
    { freq: 440.0, bassFreq: 110.0, duration: 0.78 },   // A4 + A2
    { freq: 369.99, duration: 0.78 },                   // F#4
    { freq: 293.66, duration: 0.78 },                   // D4
  ],
  // Tema 3: Manhã Luminosa em Sol Maior (Ainda Bem / La Vie En Rose)
  [
    { freq: 392.0, bassFreq: 196.0, duration: 0.64 },   // G4 + G3
    { freq: 493.88, duration: 0.64 },                   // B4
    { freq: 587.33, duration: 0.64 },                   // D5
    { freq: 659.25, duration: 0.64 },                   // E5
    { freq: 587.33, bassFreq: 164.81, duration: 0.64 }, // D5 + E3
    { freq: 493.88, duration: 0.64 },                   // B4
    { freq: 440.0, bassFreq: 130.81, duration: 0.64 },  // A4 + C3
    { freq: 392.0, duration: 0.64 },                    // G4
    { freq: 493.88, duration: 0.64 },                   // B4
    { freq: 440.0, bassFreq: 146.83, duration: 0.64 },  // A4 + D3
    { freq: 369.99, duration: 0.64 },                   // F#4
    { freq: 392.0, duration: 0.64 },                    // G4
  ],
  // Tema 4: Abraço em Lá Maior (Partilhar / De Janeiro a Janeiro)
  [
    { freq: 440.0, bassFreq: 110.0, duration: 0.66 },   // A4 + A2
    { freq: 554.37, duration: 0.66 },                   // C#5
    { freq: 659.25, duration: 0.66 },                   // E5
    { freq: 554.37, bassFreq: 164.81, duration: 0.66 }, // C#5 + E3
    { freq: 493.88, duration: 0.66 },                   // B4
    { freq: 440.0, bassFreq: 146.83, duration: 0.66 },  // A4 + D3
    { freq: 587.33, duration: 0.66 },                   // D5
    { freq: 554.37, duration: 0.66 },                   // C#5
    { freq: 493.88, bassFreq: 164.81, duration: 0.66 }, // B4 + E3
    { freq: 440.0, duration: 0.66 },                    // A4
    { freq: 329.63, duration: 0.66 },                   // E4
    { freq: 440.0, duration: 0.66 },                    // A4
  ],
  // Tema 5: Luar Romântico em Si Bemol (Until I Found You / Lover)
  [
    { freq: 466.16, bassFreq: 116.54, duration: 0.72 }, // Bb4 + Bb2
    { freq: 587.33, duration: 0.72 },                   // D5
    { freq: 698.46, duration: 0.72 },                   // F5
    { freq: 659.25, bassFreq: 174.61, duration: 0.72 }, // E5 + F3
    { freq: 587.33, duration: 0.72 },                   // D5
    { freq: 523.25, bassFreq: 146.83, duration: 0.72 }, // C5 + D3
    { freq: 466.16, duration: 0.72 },                   // Bb4
    { freq: 392.0, bassFreq: 130.81, duration: 0.72 },  // G4 + C3
    { freq: 440.0, duration: 0.72 },                    // A4
    { freq: 523.25, bassFreq: 174.61, duration: 0.72 }, // C5 + F3
    { freq: 466.16, duration: 0.72 },                   // Bb4
    { freq: 440.0, duration: 0.72 },                    // A4
  ],
];

export class RomanticPianoSynth {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private timerId: number | null = null;
  private stepIndex = 0;
  private themeIndex = 0;
  private isPlaying = false;
  private isMuted = false;

  private ensureContext() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.isMuted ? 0 : 0.24;
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
  }

  private playTone(freq: number, duration: number, volume: number, type: OscillatorType) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const env = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1100, now);
    filter.frequency.exponentialRampToValueAtTime(380, now + duration * 1.8);

    env.gain.setValueAtTime(0.0001, now);
    env.gain.linearRampToValueAtTime(volume, now + 0.045);
    env.gain.exponentialRampToValueAtTime(0.0001, now + duration * 2.15);

    osc.connect(filter);
    filter.connect(env);
    env.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration * 2.25);
  }

  private playStep(step: NoteStep) {
    this.playTone(step.freq, step.duration, 0.26, 'triangle');
    this.playTone(step.freq * 2, step.duration * 0.85, 0.05, 'sine');
    if (step.bassFreq) {
      this.playTone(step.bassFreq, step.duration * 2.2, 0.22, 'sine');
    }
  }

  setTheme(index: number) {
    const safeIdx = ((index % THEMES.length) + THEMES.length) % THEMES.length;
    if (safeIdx !== this.themeIndex) {
      this.themeIndex = safeIdx;
      this.stepIndex = 0;
    }
  }

  start(themeIndex?: number) {
    if (typeof themeIndex === 'number') {
      this.setTheme(themeIndex);
    }
    this.ensureContext();
    if (this.isPlaying) {
      this.pause();
    }
    this.isPlaying = true;

    const tick = () => {
      if (!this.isPlaying) return;
      const notes = THEMES[this.themeIndex] ?? THEMES[0];
      const step = notes[this.stepIndex % notes.length];
      this.playStep(step);
      this.stepIndex += 1;
      this.timerId = window.setTimeout(tick, step.duration * 1000);
    };

    tick();
  }

  pause() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(muted ? 0 : 0.24, this.ctx.currentTime, 0.06);
    }
  }

  destroy() {
    this.pause();
    if (this.ctx) {
      void this.ctx.close();
      this.ctx = null;
      this.masterGain = null;
    }
  }
}
