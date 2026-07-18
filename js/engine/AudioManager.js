class AudioManager {
    constructor() {
        this.bgmVolume = 0.25;
        this.sfxVolume = 0.5;
        this.muted = false;
        this.currentBgmKey = null;
        this._audioContext = null;
        this._initAudioContext();
    }

    _initAudioContext() {
        try {
            this._audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio API not supported');
        }
    }

    _ensureContext() {
        if (!this._audioContext) this._initAudioContext();
        if (this._audioContext && this._audioContext.state === 'suspended') {
            this._audioContext.resume();
        }
        return this._audioContext;
    }

    _generateClickSound() {
        const ctx = this._ensureContext();
        if (!ctx) return null;
        
        const bufferSize = ctx.sampleRate * 0.08;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.015));
        }
        
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        
        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(this.sfxVolume * 0.4, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        
        source.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        return source;
    }

    _generateHoverSound() {
        const ctx = this._ensureContext();
        if (!ctx) return null;
        
        const bufferSize = ctx.sampleRate * 0.04;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.sin(i * 600 * Math.PI * 2 / ctx.sampleRate) * Math.exp(-i / (ctx.sampleRate * 0.008));
        }
        
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        
        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(this.sfxVolume * 0.15, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);
        
        source.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        return source;
    }

    _generateTypeSound() {
        const ctx = this._ensureContext();
        if (!ctx) return null;
        
        const bufferSize = ctx.sampleRate * 0.015;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.004));
        }
        
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        
        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(this.sfxVolume * 0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.015);
        
        source.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        return source;
    }

    _generateBGM(chapter) {
        const ctx = this._ensureContext();
        if (!ctx) return null;

        const chordProgressions = {
            1: [[261.63, 329.63, 392.00], [293.66, 349.23, 440.00], [329.63, 392.00, 493.88], [293.66, 349.23, 440.00]],
            2: [[293.66, 349.23, 440.00], [329.63, 392.00, 493.88], [349.23, 440.00, 523.25], [329.63, 392.00, 493.88]],
            3: [[329.63, 392.00, 493.88], [349.23, 440.00, 523.25], [392.00, 493.88, 587.33], [349.23, 440.00, 523.25]],
            4: [[392.00, 493.88, 587.33], [440.00, 523.25, 659.25], [493.88, 587.33, 739.99], [440.00, 523.25, 659.25]],
            5: [[329.63, 392.00, 493.88], [349.23, 440.00, 523.25], [293.66, 349.23, 440.00], [261.63, 329.63, 392.00]],
            6: [[293.66, 349.23, 440.00], [261.63, 329.63, 392.00], [246.94, 293.66, 369.99], [220.00, 261.63, 329.63]],
            7: [[220.00, 261.63, 329.63], [196.00, 246.94, 293.66], [174.61, 220.00, 261.63], [196.00, 246.94, 293.66]],
            8: [[329.63, 392.00, 493.88], [392.00, 440.00, 587.33], [440.00, 523.25, 659.25], [523.25, 659.25, 783.99]]
        };

        const progression = chordProgressions[chapter] || chordProgressions[1];
        const chordInterval = 4000;
        
        let chordIndex = 0;
        
        const playChord = (chord, time) => {
            chord.forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                
                osc.type = 'triangle';
                osc.frequency.value = freq;
                
                const delay = idx * 0.03;
                gain.gain.setValueAtTime(0, time + delay);
                gain.gain.linearRampToValueAtTime(this.bgmVolume * 0.15, time + delay + 0.1);
                gain.gain.exponentialRampToValueAtTime(0.005, time + chordInterval / 1000);
                
                osc.connect(gain);
                gain.connect(ctx.destination);
                
                osc.start(time + delay);
                osc.stop(time + chordInterval / 1000);
            });
            
            const melodyNote = chord[0] * 2;
            const melodyOsc = ctx.createOscillator();
            const melodyGain = ctx.createGain();
            
            melodyOsc.type = 'sine';
            melodyOsc.frequency.value = melodyNote;
            
            melodyGain.gain.setValueAtTime(0, time + 0.5);
            melodyGain.gain.linearRampToValueAtTime(this.bgmVolume * 0.1, time + 0.6);
            melodyGain.gain.exponentialRampToValueAtTime(0.005, time + chordInterval / 1000 - 0.5);
            
            melodyOsc.connect(melodyGain);
            melodyGain.connect(ctx.destination);
            
            melodyOsc.start(time + 0.5);
            melodyOsc.stop(time + chordInterval / 1000);
        };

        const schedule = () => {
            if (this.muted || !this.currentBgmKey) return;
            
            const time = ctx.currentTime;
            const chord = progression[chordIndex % progression.length];
            playChord(chord, time);
            
            chordIndex++;
            this._bgmTimer = setTimeout(schedule, chordInterval);
        };

        schedule();
        return { stop: () => { if (this._bgmTimer) clearTimeout(this._bgmTimer); } };
    }

    playBGM(chapter) {
        if (this.muted) return;
        
        if (this._bgmTimer) {
            clearTimeout(this._bgmTimer);
            this._bgmTimer = null;
        }
        
        if (this._currentBgm) {
            try { this._currentBgm.stop(); } catch (e) {}
        }
        
        this.currentBgmKey = `chapter_${chapter}`;
        this._currentBgm = this._generateBGM(chapter);
    }

    stopBGM() {
        if (this._bgmTimer) {
            clearTimeout(this._bgmTimer);
            this._bgmTimer = null;
        }
        if (this._currentBgm) {
            try { this._currentBgm.stop(); } catch (e) {}
            this._currentBgm = null;
        }
        this.currentBgmKey = null;
    }

    playSFX(type) {
        if (this.muted) return;
        
        let source = null;
        switch (type) {
            case 'click':
                source = this._generateClickSound();
                break;
            case 'hover':
                source = this._generateHoverSound();
                break;
            case 'type':
                source = this._generateTypeSound();
                break;
        }
        
        if (source) {
            source.start();
        }
    }

    setMuted(muted) {
        this.muted = muted;
        if (muted) {
            this.stopBGM();
        }
    }

    setBgmVolume(volume) {
        this.bgmVolume = Math.max(0, Math.min(1, volume));
    }

    setSfxVolume(volume) {
        this.sfxVolume = Math.max(0, Math.min(1, volume));
    }

    unlock() {
        this._ensureContext();
    }
}
