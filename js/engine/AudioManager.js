class AudioManager {
    constructor() {
        this.bgm = null;
        this.sfx = {};
        this.bgmVolume = 0.4;
        this.sfxVolume = 0.6;
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
        
        const bufferSize = ctx.sampleRate * 0.1;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.02));
        }
        
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        
        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(this.sfxVolume * 0.5, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        
        source.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        return source;
    }

    _generateHoverSound() {
        const ctx = this._ensureContext();
        if (!ctx) return null;
        
        const bufferSize = ctx.sampleRate * 0.05;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.sin(i * 800 * Math.PI * 2 / ctx.sampleRate) * Math.exp(-i / (ctx.sampleRate * 0.01));
        }
        
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        
        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(this.sfxVolume * 0.2, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
        
        source.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        return source;
    }

    _generateTypeSound() {
        const ctx = this._ensureContext();
        if (!ctx) return null;
        
        const bufferSize = ctx.sampleRate * 0.02;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.005));
        }
        
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        
        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(this.sfxVolume * 0.15, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.02);
        
        source.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        return source;
    }

    _generateBGM(chapter) {
        const ctx = this._ensureContext();
        if (!ctx) return null;

        const notes = {
            1: [261.63, 293.66, 329.63, 392.00],
            2: [293.66, 329.63, 349.23, 392.00],
            3: [329.63, 349.23, 392.00, 440.00],
            4: [392.00, 440.00, 493.88, 523.25],
            5: [329.63, 349.23, 392.00, 329.63],
            6: [293.66, 329.63, 293.66, 261.63],
            7: [261.63, 293.66, 261.63, 220.00],
            8: [329.63, 392.00, 440.00, 523.25]
        };

        const chapterNotes = notes[chapter] || notes[1];
        const interval = 2000;
        
        const playNote = (freq, time) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.type = 'sine';
            osc.frequency.value = freq;
            
            gain.gain.setValueAtTime(0, time);
            gain.gain.linearRampToValueAtTime(this.bgmVolume * 0.3, time + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.01, time + 2);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start(time);
            osc.stop(time + 2);
        };

        const startTime = ctx.currentTime;
        let noteIndex = 0;
        
        const schedule = () => {
            if (this.muted || !this.currentBgmKey) return;
            
            const time = ctx.currentTime;
            const note = chapterNotes[noteIndex % chapterNotes.length];
            playNote(note, time);
            
            noteIndex++;
            this._bgmTimer = setTimeout(schedule, interval);
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