class CrossPerspectiveSystem {
    constructor() {
        this.storageKey = 'xinji_cross_perspective';
        this.data = this._load();
        // data 结构: { flags: { male: {...}, female: {...} }, completed: { male: false, female: false } }
        if (!this.data.flags) this.data.flags = {};
        if (!this.data.completed) this.data.completed = { male: false, female: false };
        this.flags = this.data.flags;
    }

    _load() {
        const raw = localStorage.getItem(this.storageKey);
        if (!raw) return {};
        try {
            return JSON.parse(raw);
        } catch (e) {
            console.error('跨视角存档解析失败', e);
            return {};
        }
    }

    _save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    }

    save(perspective, flags) {
        this.data.flags[perspective] = flags;
        this._save();
    }

    getFlags(perspective) {
        return this.data.flags[perspective] || {};
    }

    hasFlags(perspective) {
        const f = this.data.flags[perspective];
        return f && Object.keys(f).length > 0;
    }

    clear() {
        this.data = { flags: {}, completed: { male: false, female: false } };
        this.flags = this.data.flags;
        localStorage.removeItem(this.storageKey);
    }

    // 标记某个视角已通关
    markCompleted(perspective) {
        this.data.completed[perspective] = true;
        this._save();
    }

    isCompleted(perspective) {
        return this.data.completed[perspective] === true;
    }

    isBothCompleted() {
        return this.data.completed.male === true && this.data.completed.female === true;
    }

    isTruthModeUnlocked() {
        return this.isBothCompleted();
    }

    // 记录某个章节的关键选择
    recordChoice(perspective, chapter, choiceKey, value) {
        if (!this.flags[perspective]) {
            this.flags[perspective] = {};
        }
        const key = `${perspective}_ch${chapter}_${choiceKey}`;
        this.flags[perspective][key] = value;
        this.save(perspective, this.flags[perspective]);
    }

    // 检查另一个视角是否有特定标签
    hasOtherPerspectiveFlag(currentPerspective, flagKey) {
        const other = currentPerspective === 'male' ? 'female' : 'male';
        const flags = this.getFlags(other);
        return flags && flags[flagKey] === true;
    }

    // 获取另一个视角的所有标签
    getOtherPerspectiveFlags(currentPerspective) {
        const other = currentPerspective === 'male' ? 'female' : 'male';
        return this.getFlags(other);
    }

    // 生成通关摘要
    generateSummary(perspective) {
        const flags = this.getFlags(perspective);
        const keys = Object.keys(flags);
        if (keys.length === 0) return null;

        const summaries = {
            male: {
                'male_ch1_active': '他选择了主动靠近',
                'male_ch1_passive': '他在初遇时有些犹豫',
                'male_ch2_care': '他认真回复了每一条消息',
                'male_ch2_casual': '他的回复有些敷衍',
                'male_ch3_gentle': '他温柔地表了白',
                'male_ch3_rush': '他表白时有些急躁',
                'male_ch4_remember': '他记得她所有的喜好',
                'male_ch4_forget': '他忽略了她的感受',
                'male_ch5_honest': '误会发生时他选择了坦诚',
                'male_ch5_test': '他发朋友圈试探了她',
                'male_ch5_silent': '他选择了沉默和冷战',
                'male_ch6_apologize': '他主动道歉了',
                'male_ch6_silent': '他冷战到底',
                'male_ch7_chase': '他追了出去',
                'male_ch7_giveup': '他坐着没动'
            },
            female: {
                'female_ch1_active': '她偷偷看了他很久',
                'female_ch1_passive': '她假装没注意到他',
                'female_ch2_care': '她认真回复了每一条消息',
                'female_ch2_casual': '她的回复有些冷淡',
                'female_ch3_yes': '她积极回应了他的表白',
                'female_ch3_doubt': '她表白时有些犹豫',
                'female_ch4_remember': '她记得他所有的喜好',
                'female_ch4_forget': '她忽略了细节',
                'female_ch5_honest': '误会发生时她直接问了原因',
                'female_ch5_pretend': '她装作不在意',
                'female_ch5_silent': '她转身离开，什么也没说',
                'female_ch6_reach': '她主动发消息了',
                'female_ch6_hint': '她发朋友圈暗示他',
                'female_ch6_silent': '她忍住没联系',
                'female_ch7_stay': '她站着没动',
                'female_ch7_leave': '她甩开了他的手'
            }
        };

        const result = [];
        keys.forEach(k => {
            if (flags[k] && summaries[perspective] && summaries[perspective][k]) {
                result.push(summaries[perspective][k]);
            }
        });
        return result;
    }
}
