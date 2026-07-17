class VariableSystem {
    constructor() {
        this.variables = { ...VARIABLE_DEFAULTS };
    }

    get(name) {
        return this.variables[name] ?? 0;
    }

    set(name, value) {
        this.variables[name] = value;
        this._clamp(name);
    }

    add(name, delta) {
        this.variables[name] = (this.variables[name] ?? 0) + delta;
        this._clamp(name);
    }

    _clamp(name) {
        if (this.variables[name] > 100) this.variables[name] = 100;
        if (this.variables[name] < -100) this.variables[name] = -100;
    }

    getAll() {
        return { ...this.variables };
    }

    reset() {
        this.variables = { ...VARIABLE_DEFAULTS };
    }

    load(data) {
        this.variables = { ...VARIABLE_DEFAULTS, ...data };
    }
}