class ChoiceSystem {
    constructor(containerId, audioManager) {
        this.container = document.getElementById(containerId);
        this.audio = audioManager;
    }

    show(choices, onSelect) {
        this.container.classList.remove('hidden');
        this.container.innerHTML = '';

        choices.forEach((choice, index) => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = choice.text;
            btn.style.animationDelay = `${index * 0.1}s`;

            btn.addEventListener('mouseenter', () => {
                btn.classList.add('choice-hover');
                if (this.audio) this.audio.playSFX('hover');
            });

            btn.addEventListener('mouseleave', () => {
                btn.classList.remove('choice-hover');
            });

            btn.addEventListener('click', () => {
                if (this.audio) this.audio.playSFX('click');
                btn.classList.add('choice-click');
                setTimeout(() => {
                    this.hide();
                    onSelect(choice, index);
                }, 200);
            });

            this.container.appendChild(btn);
        });

        this.container.classList.add('choices-enter');
        setTimeout(() => {
            this.container.classList.remove('choices-enter');
        }, 500);
    }

    hide() {
        this.container.classList.add('choices-exit');
        setTimeout(() => {
            this.container.classList.add('hidden');
            this.container.classList.remove('choices-exit');
            this.container.innerHTML = '';
        }, 300);
    }
}