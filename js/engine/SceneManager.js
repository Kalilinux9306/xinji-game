class SceneManager {
    constructor(layerId) {
        this.layer = document.getElementById(layerId);
        this.moodIndicator = document.getElementById('mood-indicator');
        this.transitionOverlay = null;
        this._createTransitionOverlay();
    }

    _createTransitionOverlay() {
        this.transitionOverlay = document.createElement('div');
        this.transitionOverlay.className = 'scene-transition-overlay';
        this.transitionOverlay.style.cssText = `
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(250, 248, 245, 0.95);
            z-index: 999;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        document.body.appendChild(this.transitionOverlay);
    }

    loadScene(visual) {
        this.layer.innerHTML = '';

        if (visual && visual.background) {
            const bg = document.createElement('div');
            bg.className = 'scene-background';
            const isImage = visual.background.includes('url(');
            bg.style.cssText = `
                position: absolute;
                top: 0; left: 0;
                width: 100%; height: 100%;
                ${isImage ? 'background-image' : 'background'}: ${visual.background};
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                opacity: 0;
                transform: scale(1.05);
                transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), transform 1.5s ease-out;
            `;
            this.layer.appendChild(bg);

            requestAnimationFrame(() => {
                bg.style.opacity = '1';
                bg.style.transform = 'scale(1)';
            });
        }

        if (visual && visual.background) {
            this.updateMood(visual.background);
        }

        this.layer.style.opacity = '0';
        requestAnimationFrame(() => {
            this.layer.style.opacity = '1';
        });
    }

    updateMood(background) {
        if (!background) return;
        const bg = background.toLowerCase();
        let moodText = '';

        if (bg.includes('90a4ae') || bg.includes('cfd8dc') || bg.includes('eceff1')) {
            moodText = '遗憾';
        } else if (bg.includes('ffcd') || bg.includes('f8bbd0')) {
            moodText = '心动';
        } else if (bg.includes('f1f8e9') || bg.includes('dcedc8')) {
            moodText = '午后';
        } else if (bg.includes('ffecb3') || bg.includes('ffcc80')) {
            moodText = '黄昏';
        } else {
            moodText = '';
        }

        if (this.moodIndicator) {
            this.moodIndicator.textContent = moodText;
            if (moodText) {
                this.moodIndicator.classList.add('mood-fade-in');
            }
        }
    }

    transition(callback, direction = 'fade') {
        this.transitionOverlay.style.opacity = '1';
        
        if (direction === 'slide-left') {
            this.transitionOverlay.style.transform = 'translateX(0)';
        } else if (direction === 'slide-right') {
            this.transitionOverlay.style.transform = 'translateX(0)';
        }

        setTimeout(() => {
            if (callback) callback();
            this.transitionOverlay.style.opacity = '0';
            
            if (direction === 'slide-left') {
                this.transitionOverlay.style.transform = 'translateX(-100%)';
            } else if (direction === 'slide-right') {
                this.transitionOverlay.style.transform = 'translateX(100%)';
            }
        }, 600);
    }

    sceneChange(callback) {
        const currentBg = this.layer.querySelector('.scene-background');
        if (currentBg) {
            currentBg.style.opacity = '0';
            currentBg.style.transform = 'scale(1.1)';
        }

        setTimeout(() => {
            if (callback) callback();
        }, 400);
    }

    clear() {
        this.layer.innerHTML = '';
        if (this.moodIndicator) {
            this.moodIndicator.textContent = '';
            this.moodIndicator.classList.remove('mood-fade-in');
        }
    }
}