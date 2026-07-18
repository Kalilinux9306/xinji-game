class DialogueSystem {
    constructor(audioManager) {
        this.contentEl = document.getElementById('novel-content');
        this.tapHint = document.getElementById('tap-hint');
        this.typing = false;
        this.typingSpeed = 38;
        this.onComplete = null;
        this.currentPara = null;
        this._clickHandler = this._handleClick.bind(this);
        document.getElementById('novel-reader').addEventListener('click', this._clickHandler);
        this.audio = audioManager;
    }

    clear() {
        this.contentEl.innerHTML = '';
        this.typing = false;
        this.currentPara = null;
        this.onComplete = null;
        if (this._typeTimer) clearTimeout(this._typeTimer);
    }

    appendParagraph(name, text, onComplete, options = {}) {
        const originalName = options.originalName || name;
        const cssClass = options.cssClass || null;
        this._appendContent(name, text, onComplete, originalName, cssClass);
    }

    _appendContent(name, text, onComplete, originalName, cssClass) {
        const para = this._createParagraph(name, text, originalName, cssClass);
        this.contentEl.appendChild(para);
        this.onComplete = onComplete;
        this._typeParagraph(para, text);
    }

    _createParagraph(name, text, originalName, cssClass) {
        const para = document.createElement('p');
        para.className = 'novel-para';

        if (cssClass) {
            para.classList.add(cssClass);
            para.dataset.fullText = text;
            return para;
        }

        if (name === '内心') {
            para.classList.add('novel-thought');
            para.dataset.fullText = text.replace(/[（）]/g, '');
        } else if (name === '' || !name) {
            para.classList.add('novel-scene-desc');
            para.dataset.fullText = text;
        } else {
            para.classList.add('novel-dialogue');
            para.dataset.fullText = `${name}：${text}`;
        }

        return para;
    }

    _typeParagraph(para, text) {
        this.typing = true;
        this.tapHint.classList.remove('hidden');
        this.currentPara = para;

        const fullText = para.dataset.fullText || text;
        para.textContent = '';

        let i = 0;
        const type = () => {
            if (i < fullText.length) {
                const char = fullText[i];
                const span = document.createElement('span');
                span.textContent = char;
                span.className = 'type-char';
                para.appendChild(span);
                i++;

                if (i % 5 === 0 && this.audio) {
                    this.audio.playSFX('type');
                }

                this._typeTimer = setTimeout(type, this.typingSpeed);
                if (i % 3 === 0) this._scrollToBottom();
            } else {
                this.typing = false;
                this.tapHint.classList.add('hidden');
                if (this.onComplete) {
                    const cb = this.onComplete;
                    this.onComplete = null;
                    cb();
                }
            }
        };
        type();
    }

    _handleClick() {
        if (this.typing && this.currentPara) {
            clearTimeout(this._typeTimer);
            const fullText = this.currentPara.dataset.fullText || '';
            this.currentPara.textContent = fullText;
            this.typing = false;
            this.tapHint.classList.add('hidden');
            if (this.onComplete) {
                const cb = this.onComplete;
                this.onComplete = null;
                cb();
            }
        }
    }

    _scrollToBottom() {
        this.contentEl.scrollTop = this.contentEl.scrollHeight;
    }

    setSpeed(speed) {
        this.typingSpeed = speed;
    }

    destroy() {
        document.getElementById('novel-reader').removeEventListener('click', this._clickHandler);
        if (this._typeTimer) clearTimeout(this._typeTimer);
    }
}
