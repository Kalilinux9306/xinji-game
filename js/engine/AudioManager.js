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
            1: [[523.25, 659.25, 783.99], [587.33, 739.99, 880.00], [659.25, 783.99, 987.77], [587.33, 739.99, 880.00]],
            2: [[587.33, 739.99, 880.00], [659.25, 783.99, 987.77], [698.46, 880.00, 1046.50], [659.25, 783.99, 987.77]],
            3: [[659.25, 783.99, 987.77], [698.46, 880.00, 1046.50], [783.99, 987.77, 1174.66], [698.46, 880.00, 1046.50]],
            4: [[783.99, 987.77, 1174.66], [880.00, 1046.50, 1318.51], [987.77, 1174.66, 1479.98], [880.00, 1046.50, 1318.51]],
            5: [[659.25, 783.99, 987.77], [698.46, 880.00, 1046.50], [587.33, 739.99, 880.00], [523.25, 659.25, 783.99]],
            6: [[587.33, 739.99, 880.00], [523.25, 659.25, 783.99], [493.88, 622.25, 749.19], [440.00, 523.25, 659.25]],
            7: [[440.00, 523.25, 659.25], [392.00, 493.88, 587.33], [349.23, 440.00, 523.25], [392.00, 493.88, 587.33]],
            8: [[659.25, 783.99, 987.77], [783.99, 880.00, 1174.66], [880.00, 1046.50, 1318.51], [1046.50, 1318.51, 1567.98]]
        };

        const melodyNotes = {
            1: [659.25, 783.99, 880.00, 783.99, 659.25, 587.33, 523.25],
            2: [783.99, 880.00, 987.77, 880.00, 783.99, 659.25, 587.33],
            3: [880.00, 987.77, 1046.50, 987.77, 880.00, 783.99, 659.25],
            4: [987.77, 1046.50, 1174.66, 1046.50, 987.77, 880.00, 783.99],
            5: [783.99, 659.25, 587.33, 659.25, 783.99, 880.00, 783.99],
            6: [587.33, 523.25, 493.88, 523.25, 587.33, 659.25, 587.33],
            7: [523.25, 440.00, 392.00, 440.00, 523.25, 587.33, 523.25],
            8: [880.00, 987.77, 1046.50, 1174.66, 1318.51, 1174.66, 987.77]
        };

        const progression = chordProgressions[chapter] || chordProgressions[1];
        const melody = melodyNotes[chapter] || melodyNotes[1];
        const chordInterval = 1500;
        const noteInterval = 200;
        
        let chordIndex = 0;
        let melodyIndex = 0;
        
        const playChord = (chord, time) => {
            chord.forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                
                osc.type = 'sine';
                osc.frequency.value = freq;
                
                const delay = idx * 0.02;
                gain.gain.setValueAtTime(0, time + delay);
                gain.gain.linearRampToValueAtTime(this.bgmVolume * 0.08, time + delay + 0.05);
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
            
            osc.type = 'sine';
            osc.frequency.value = note;
            
            gain.gain.setValueAtTime(0, time);
            gain.gain.linearRampToValueAtTime(this.bgmVolume * 0.12, time + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.001, time + noteInterval / 1000 - 0.02);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start(time);
            osc.stop(time + noteInterval / 1000);
        };

        const schedule = () => {
            if (this.muted || !this.currentBgmKey) return;
            
            const time = ctx.currentTime;
            const chord = progression[chordIndex % progression.length];
            playChord(chord, time);
            
            for (let i = 0; i < 7; i++) {
                const note = melody[(melodyIndex + i) % melody.length];
                playMelodyNote(note, time + i * noteInterval / 1000);
            }
            
            chordIndex++;
            melodyIndex += 7;
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
