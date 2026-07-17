class SceneManager {
    constructor(layerId) {
        this.layer = document.getElementById(layerId);
        this.moodIndicator = document.getElementById('mood-indicator');
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
                transition: opacity 1s ease;
            `;
            this.layer.appendChild(bg);
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
        }
    }

    transition(callback) {
        this.layer.style.opacity = '0';
        setTimeout(() => {
            if (callback) callback();
            this.layer.style.opacity = '1';
        }, 600);
    }

    clear() {
        this.layer.innerHTML = '';
        if (this.moodIndicator) this.moodIndicator.textContent = '';
    }
}
