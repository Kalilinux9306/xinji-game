class ChoiceSystem {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    show(choices, onSelect) {
        this.container.classList.remove('hidden');
        this.container.innerHTML = '';

        choices.forEach((choice, index) => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = choice.text;
            btn.addEventListener('click', () => {
                this.hide();
                onSelect(choice, index);
            });
            this.container.appendChild(btn);
        });
    }

    hide() {
        this.container.classList.add('hidden');
        this.container.innerHTML = '';
    }
}
