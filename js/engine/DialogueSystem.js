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
        this._inChatMode = false;
        this._lastChatSender = null;
        this.audio = audioManager;
        this._typeSoundTimer = null;
    }

    clear() {
        this.contentEl.innerHTML = '';
        this.typing = false;
        this.currentPara = null;
        this.onComplete = null;
        this._inChatMode = false;
        this._lastChatSender = null;
        if (this._typeTimer) clearTimeout(this._typeTimer);
        if (this._delayTimer) clearTimeout(this._delayTimer);
        if (this._typeSoundTimer) clearTimeout(this._typeSoundTimer);
    }

    appendParagraph(name, text, onComplete, options = {}) {
        const isChat = options.isChat !== undefined ? options.isChat : this._isChatMessage(name);
        const originalName = options.originalName || name;
        const cssClass = options.cssClass || null;

        if (isChat && !this._inChatMode) {
            this._enterChatMode();
        } else if (!isChat && this._inChatMode) {
            this._exitChatMode();
        }

        if (isChat && this._lastChatSender && this._lastChatSender !== originalName && options.showTyping) {
            this._showTypingIndicator(() => {
                this._appendContent(name, text, onComplete, isChat, originalName, cssClass);
            });
            return;
        }

        this._appendContent(name, text, onComplete, isChat, originalName, cssClass);
    }

    _isChatMessage(name) {
        return false;
    }

    _enterChatMode() {
        this._inChatMode = true;
        const chatContainer = document.createElement('div');
        chatContainer.className = 'chat-container';
        chatContainer.id = 'active-chat-container';
        this.contentEl.appendChild(chatContainer);
    }

    _exitChatMode() {
        this._inChatMode = false;
        this._lastChatSender = null;
        const container = document.getElementById('active-chat-container');
        if (container) {
            container.remove();
        }
    }

    _showTypingIndicator(onDone) {
        const container = document.getElementById('active-chat-container') || this.contentEl;
        const typingEl = document.createElement('div');
        typingEl.className = 'chat-typing';
        typingEl.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
        container.appendChild(typingEl);
        this._scrollToBottom();

        const delay = 1500 + Math.random() * 1500;
        this._delayTimer = setTimeout(() => {
            typingEl.remove();
            if (onDone) onDone();
        }, delay);
    }

    _appendContent(name, text, onComplete, isChat, originalName, cssClass) {
        const para = this._createParagraph(name, text, isChat, originalName, cssClass);

        if (isChat) {
            const container = document.getElementById('active-chat-container') || this.contentEl;
            container.appendChild(para);
            this._lastChatSender = originalName;
        } else {
            this.contentEl.appendChild(para);
        }

        this.onComplete = onComplete;
        this._typeParagraph(para, text, isChat);
    }

    _createParagraph(name, text, isChat, originalName, cssClass) {
        if (isChat) {
            const bubble = document.createElement('div');
            const isSelf = originalName === '你';
            bubble.className = `chat-bubble ${isSelf ? 'chat-self' : 'chat-other'}`;

            const cleanText = text.replace(/[「」]/g, '');
            bubble.dataset.fullText = cleanText;

            if (this._lastChatSender !== originalName) {
                const senderLabel = document.createElement('div');
                senderLabel.className = 'chat-sender-label';
                senderLabel.textContent = isSelf ? '我' : name;
                bubble.appendChild(senderLabel);
            }

            const textSpan = document.createElement('span');
            textSpan.className = 'chat-text';
            bubble.appendChild(textSpan);

            return bubble;
        }

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
        } else if (name.includes('消息') || name.includes('微信')) {
            para.classList.add('novel-chat');
            const cleanText = text.replace(/[「」]/g, '');
            para.dataset.fullText = cleanText;
            para.dataset.sender = name;
        } else {
            para.classList.add('novel-dialogue');
            para.dataset.fullText = `${name}：${text}`;
        }

        return para;
    }

    _typeParagraph(para, text, isChat) {
        this.typing = true;
        this.tapHint.classList.remove('hidden');
        this.currentPara = para;

        const fullText = para.dataset.fullText || text;

        if (isChat) {
            const textSpan = para.querySelector('.chat-text');
            if (textSpan) textSpan.textContent = '';
        } else {
            para.textContent = '';
        }

        let i = 0;
        const type = () => {
            if (i < fullText.length) {
                const char = fullText[i];
                if (isChat) {
                    const textSpan = para.querySelector('.chat-text');
                    if (textSpan) {
                        const span = document.createElement('span');
                        span.textContent = char;
                        span.className = 'type-char';
                        textSpan.appendChild(span);
                    }
                } else {
                    const span = document.createElement('span');
                    span.textContent = char;
                    span.className = 'type-char';
                    para.appendChild(span);
                }
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
            if (this.currentPara.classList.contains('chat-bubble')) {
                const textSpan = this.currentPara.querySelector('.chat-text');
                if (textSpan) textSpan.textContent = fullText;
            } else {
                this.currentPara.textContent = fullText;
            }
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
        if (this._delayTimer) clearTimeout(this._delayTimer);
        if (this._typeSoundTimer) clearTimeout(this._typeSoundTimer);
    }
}