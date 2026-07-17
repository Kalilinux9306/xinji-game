class InteractionSystem {
    constructor(layerId) {
        this.layer = document.getElementById(layerId);
        this.elements = [];
    }

    clear() {
        this.layer.innerHTML = '';
        this.elements = [];
    }

    addInteractable(config) {
        const el = document.createElement('div');
        el.className = 'interactable';
        el.style.cssText = `
            position: absolute;
            left: ${config.x}%;
            top: ${config.y}%;
            width: ${config.width}px;
            height: ${config.height}px;
            cursor: pointer;
            opacity: ${config.visible ? 0.3 : 0};
            transition: opacity 0.3s ease;
            border-radius: 8px;
        `;
        
        if (config.hint) {
            el.title = config.hint;
        }
        
        el.addEventListener('mouseenter', () => {
            el.style.opacity = '0.6';
            el.style.background = 'rgba(255,255,255,0.15)';
        });
        el.addEventListener('mouseleave', () => {
            el.style.opacity = config.visible ? '0.3' : '0';
            el.style.background = 'transparent';
        });
        el.addEventListener('click', (e) => {
            e.stopPropagation();
            config.onClick();
        });
        
        this.layer.appendChild(el);
        this.elements.push({ el, config });
        return el;
    }

    revealAll() {
        this.elements.forEach(({ el }) => {
            el.style.opacity = '0.3';
        });
    }

    hideAll() {
        this.elements.forEach(({ el, config }) => {
            if (!config.visible) {
                el.style.opacity = '0';
            }
        });
    }

    getElement(id) {
        return this.elements.find(e => e.config.id === id);
    }
}