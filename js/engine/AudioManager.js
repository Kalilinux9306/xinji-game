class AudioManager {
    constructor() {
        this.bgmVolume = 0.3;
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

        const styles = {
            1: { name: 'romantic', chordType: 'sine', melodyType: 'sine', chordInterval: 3500, noteInterval: 400, baseVolume: 0.08, melodyVolume: 0.1, chords: [[261.63, 329.63, 392.00, 440.00], [293.66, 349.23, 440.00, 493.88], [329.63, 392.00, 493.88, 554.37], [293.66, 349.23, 440.00, 493.88]], melody: [392.00, 440.00, 493.88, 523.25, 493.88, 440.00, 392.00, 349.23] },
            2: { name: 'sweet', chordType: 'triangle', melodyType: 'sine', chordInterval: 3000, noteInterval: 350, baseVolume: 0.1, melodyVolume: 0.12, chords: [[293.66, 349.23, 440.00, 493.88], [329.63, 392.00, 493.88, 554.37], [349.23, 415.30, 523.25, 587.33], [329.63, 392.00, 493.88, 554.37]], melody: [440.00, 493.88, 523.25, 587.33, 523.25, 493.88, 440.00, 392.00] },
            3: { name: 'warm', chordType: 'triangle', melodyType: 'triangle', chordInterval: 2800, noteInterval: 300, baseVolume: 0.12, melodyVolume: 0.14, chords: [[329.63, 392.00, 493.88, 554.37], [349.23, 415.30, 523.25, 587.33], [392.00, 466.16, 587.33, 659.25], [349.23, 415.30, 523.25, 587.33]], melody: [493.88, 523.25, 587.33, 659.25, 587.33, 523.25, 493.88, 440.00] },
            4: { name: 'joyful', chordType: 'sine', melodyType: 'triangle', chordInterval: 2500, noteInterval: 250, baseVolume: 0.1, melodyVolume: 0.15, chords: [[392.00, 466.16, 587.33, 659.25], [440.00, 523.25, 659.25, 739.99], [493.88, 587.33, 739.99, 830.61], [440.00, 523.25, 659.25, 739.99]], melody: [587.33, 659.25, 739.99, 783.99, 739.99, 659.25, 587.33, 523.25] },
            5: { name: 'tense', chordType: 'sawtooth', melodyType: 'sine', chordInterval: 2000, noteInterval: 350, baseVolume: 0.08, melodyVolume: 0.06, chords: [[329.63, 392.00, 493.88, 554.37], [311.13, 369.99, 466.16, 523.25], [293.66, 349.23, 440.00, 493.88], [261.63, 329.63, 392.00, 440.00]], melody: [440.00, 466.16, 493.88, 466.16, 440.00, 415.30, 392.00, 415.30] },
            6: { name: 'sad', chordType: 'triangle', melodyType: 'sine', chordInterval: 4500, noteInterval: 550, baseVolume: 0.05, melodyVolume: 0.07, chords: [[261.63, 329.63, 392.00, 440.00], [246.94, 293.66, 369.99, 415.30], [220.00, 261.63, 329.63, 392.00], [196.00, 246.94, 293.66, 349.23]], melody: [392.00, 349.23, 293.66, 261.63, 293.66, 349.23, 392.00, 415.30] },
            7: { name: 'heartbroken', chordType: 'sawtooth', melodyType: 'triangle', chordInterval: 5000, noteInterval: 600, baseVolume: 0.04, melodyVolume: 0.05, chords: [[220.00, 261.63, 329.63, 392.00], [196.00, 246.94, 293.66, 349.23], [174.61, 220.00, 261.63, 329.63], [164.81, 196.00, 246.94, 293.66]], melody: [349.23, 293.66, 261.63, 220.00, 196.00, 220.00, 261.63, 293.66] },
            8: { name: 'hopeful', chordType: 'sine', melodyType: 'sine', chordInterval: 4000, noteInterval: 450, baseVolume: 0.1, melodyVolume: 0.12, chords: [[329.63, 392.00, 493.88, 554.37], [392.00, 440.00, 587.33, 659.25], [440.00, 523.25, 659.25, 739.99], [523.25, 659.25, 783.99, 880.00]], melody: [523.25, 587.33, 659.25, 739.99, 783.99, 739.99, 659.25, 587.33] }
        };

        const style = styles[chapter] || styles[1];
        const { chordType, melodyType, chordInterval, noteInterval, baseVolume, melodyVolume, chords, melody } = style;
        
        let chordIndex = 0;
        let melodyIndex = 0;
        
        const playChord = (chord, time) => {
            chord.forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                
                osc.type = chordType;
                osc.frequency.value = freq;
                
                const delay = idx * 0.05;
                gain.gain.setValueAtTime(0, time + delay);
                gain.gain.linearRampToValueAtTime(this.bgmVolume * baseVolume, time + delay + 0.2);
                gain.gain.exponentialRampToValueAtTime(0.001, time + chordInterval / 1000);
                
                osc.connect(gain);
                gain.connect(ctx.destination);
                
                osc.start(time + delay);
                osc.stop(time + chordInterval / 1000);
            });
        };

        const playMelodyNote = (note, time) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.type = melodyType;
            osc.frequency.value = note;
            
            gain.gain.setValueAtTime(0, time);
            gain.gain.linearRampToValueAtTime(this.bgmVolume * melodyVolume, time + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, time + noteInterval / 1000 - 0.05);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start(time);
            osc.stop(time + noteInterval / 1000);
        };

        const schedule = () => {
            if (this.muted || !this.currentBgmKey) return;
            
            const time = ctx.currentTime;
            const chord = chords[chordIndex % chords.length];
            playChord(chord, time);
            
            const noteCount = Math.floor(chordInterval / noteInterval);
            for (let i = 0; i < noteCount; i++) {
                const note = melody[(melodyIndex + i) % melody.length];
                playMelodyNote(note, time + i * noteInterval / 1000);
            }
            
            chordIndex++;
            melodyIndex += noteCount;
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
