// Web Audio API lightweight tactile feedback synthesizer
class SoundFX {
  private ctx: AudioContext | null = null
  private enabled: boolean = true

  constructor() {
    // Check localStorage preference
    const saved = localStorage.getItem('mohit_portfolio_sound')
    this.enabled = saved !== 'false'
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  public isEnabled(): boolean {
    return this.enabled
  }

  public toggle(): boolean {
    this.enabled = !this.enabled
    localStorage.setItem('mohit_portfolio_sound', String(this.enabled))
    if (this.enabled) {
      this.click(800)
    }
    return this.enabled
  }

  public click(freq = 600, duration = 0.04) {
    if (!this.enabled) return
    try {
      this.initCtx()
      if (!this.ctx) return

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, this.ctx.currentTime + duration)

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + duration)
    } catch {
      // AudioContext policy gracefully handled
    }
  }

  public success() {
    if (!this.enabled) return
    this.click(520, 0.05)
    setTimeout(() => this.click(780, 0.08), 50)
  }
}

export const soundFX = new SoundFX()
