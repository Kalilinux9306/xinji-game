class SaveSystem {
    constructor(variableSystem) {
        this.vs = variableSystem;
        this.saveKey = 'xinji_save';
    }

    save(gameState) {
        const data = {
            version: '1.0',
            timestamp: Date.now(),
            perspective: gameState.perspective,
            chapter: gameState.chapter,
            sceneIndex: gameState.sceneIndex,
            variables: this.vs.getAll(),
            customNames: gameState.customNames,
            endings: gameState.endings,
            achievements: gameState.achievements,
            newGamePlus: gameState.newGamePlus,
            firstTime: gameState.firstTime
        };
        localStorage.setItem(this.saveKey, JSON.stringify(data));
        return true;
    }

    load() {
        const raw = localStorage.getItem(this.saveKey);
        if (!raw) return null;
        try {
            return JSON.parse(raw);
        } catch (e) {
            console.error('存档解析失败', e);
            return null;
        }
    }

    exists() {
        return localStorage.getItem(this.saveKey) !== null;
    }

    clear() {
        localStorage.removeItem(this.saveKey);
    }
}