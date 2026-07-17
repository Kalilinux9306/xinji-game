class AudioManager {
    constructor() {
        this.bgm = null;
        this.sfx = {};
        this.bgmVolume = 0.5;
        this.sfxVolume = 0.7;
        this.muted = false;
    }

    async loadBGM(url) {
        this.bgm = new Audio(url);
        this.bgm.loop = true;
        this.bgm.volume = 0;
    }

    playBGM() {
        if (!this.bgm || this.muted) return;
        this.bgm.play().catch(() => {});
        this._fadeIn(this.bgm, this.bgmVolume, 1000);
    }

    stopBGM() {
        if (!this.bgm) return;
        this._fadeOut(this.bgm, 1000, () => {
            this.bgm.pause();
            this.bgm.currentTime = 0;
        });
    }

    playSFX(name, url) {
        if (this.muted) return;
        const audio = new Audio(url);
        audio.volume = this.sfxVolume;
        audio.play().catch(() => {});
    }

    _fadeIn(audio, targetVolume, duration) {
        const start = audio.volume;
        const startTime = performance.now();
        const step = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            audio.volume = start + (targetVolume - start) * progress;
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }

    _fadeOut(audio, duration, callback) {
        const start = audio.volume;
        const startTime = performance.now();
        const step = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            audio.volume = start * (1 - progress);
            if (progress < 1) {
                requestAnimationFrame(step);
            } else if (callback) {
                callback();
            }
        };
        requestAnimationFrame(step);
    }

    setMuted(muted) {
        this.muted = muted;
        if (this.bgm) {
            this.bgm.volume = muted ? 0 : this.bgmVolume;
        }
    }
}