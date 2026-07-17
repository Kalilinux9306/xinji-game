class GameEngine {
    constructor() {
        this.state = {
            perspective: null,
            chapter: 1,
            sceneIndex: 0,
            customNames: { ...CUSTOM_NAME_DEFAULTS },
            endings: [],
            achievements: [],
            newGamePlus: false,
            firstTime: true
        };

        this._chapterStartVars = null;
        this._tutorialStep = 1;
        this._pendingChapterEndCallback = null;

        this.vs = new VariableSystem();
        this.save = new SaveSystem(this.vs);
        this.crossPerspective = new CrossPerspectiveSystem();
        this.audio = new AudioManager();
        this.scenes = new SceneManager('scene-layer');
        this.dialogue = new DialogueSystem();
        this.choice = new ChoiceSystem('choice-area');

        this.chapterData = null;
        this.running = false;
        this._crossFlags = {}; // 当前视角的关键选择标签
        this._mutualMatch = false; // 双向奔赴是否触发
    }

    init() {
        document.getElementById('btn-male').addEventListener('click', () => {
            this.startPerspective('male');
        });
        document.getElementById('btn-female').addEventListener('click', () => {
            this.startPerspective('female');
        });

        document.getElementById('btn-save').addEventListener('click', () => {
            this.saveGame();
            alert('进度已保存');
        });
        document.getElementById('btn-load').addEventListener('click', () => {
            this.loadGame();
        });
        document.getElementById('btn-restart').addEventListener('click', () => {
            if (confirm('确定要重新开始吗？当前进度将丢失。')) {
                this.save.clear();
                this.crossPerspective.clear();
                location.reload();
            }
        });
        document.getElementById('btn-close-menu').addEventListener('click', () => {
            document.getElementById('settings-menu').classList.add('hidden');
        });
        document.getElementById('btn-menu').addEventListener('click', () => {
            document.getElementById('settings-menu').classList.remove('hidden');
        });

        // 收集册
        document.getElementById('btn-collection').addEventListener('click', () => {
            this._showCollection();
        });
        document.getElementById('btn-close-collection').addEventListener('click', () => {
            document.getElementById('collection-modal').classList.add('hidden');
        });

        // 引导
        document.getElementById('btn-tutorial-next').addEventListener('click', () => {
            this._nextTutorialStep();
        });

        // 情感曲线
        document.getElementById('btn-close-emotion').addEventListener('click', () => {
            document.getElementById('emotion-curve-modal').classList.add('hidden');
            if (this._pendingChapterEndCallback) {
                const cb = this._pendingChapterEndCallback;
                this._pendingChapterEndCallback = null;
                cb();
            }
        });

        // 首次引导检查
        const saveData = this.save.load();
        if (saveData && saveData.firstTime === false) {
            this.state.firstTime = false;
        } else if (this.state.firstTime) {
            this._showTutorial();
        }
    }

    startPerspective(perspective) {
        this.state.perspective = perspective;
        this._crossFlags = {}; // 清空当前视角标记，避免跨视角污染
        document.getElementById('perspective-select').classList.add('hidden');

        // 如果另一个视角已通关，显示跨视角介绍和真相段落
        const other = perspective === 'male' ? 'female' : 'male';
        if (this.crossPerspective.isCompleted(other)) {
            this._showCrossPerspectiveIntro(other);
        } else {
            this.loadChapter(1);
        }
    }

    _showCrossPerspectiveIntro(otherPerspective) {
        const otherName = otherPerspective === 'male' ? '男生' : '女生';
        const summary = this.crossPerspective.generateSummary(otherPerspective);

        this.dialogue.clear();

        // 显示跨视角提示标题
        this.dialogue.appendParagraph('', '—— 新的旅程 ——', () => {
            this.dialogue.appendParagraph('', `你已完成${otherName}视角的游玩。`, () => {
                this.dialogue.appendParagraph('', `在这个视角中，${otherName}的选择会影响你现在的剧情。`, () => {
                    if (summary && summary.length > 0) {
                        this.dialogue.appendParagraph('', `—— ${otherName}视角的关键选择 ——`, () => {
                            let i = 0;
                            const nextSummary = () => {
                                if (i < summary.length) {
                                    this.dialogue.appendParagraph('', `· ${summary[i]}`, nextSummary);
                                    i++;
                                } else {
                                    this.dialogue.appendParagraph('', '现在，从另一个角度，重新经历这个故事。', () => {
                                        setTimeout(() => this.loadChapter(1), 800);
                                    });
                                }
                            };
                            nextSummary();
                        });
                    } else {
                        this.dialogue.appendParagraph('', '现在，从另一个角度，重新经历这个故事。', () => {
                            setTimeout(() => this.loadChapter(1), 800);
                        });
                    }
                });
            });
        });
    }

    loadChapter(chapterNum) {
        this.state.chapter = chapterNum;
        this.state.sceneIndex = 0;

        // 记录章节开始时的变量，用于情感曲线
        this._recordChapterStartVars();

        const chapterKey = `chapter${chapterNum}`;
        if (window[chapterKey]) {
            this.chapterData = window[chapterKey][this.state.perspective];
            // 显示章节标题
            const titleEl = document.getElementById('chapter-title');
            if (titleEl) {
                titleEl.textContent = this.chapterData.title || '';
            }
            this.dialogue.clear();

            // 显示关系状态提示（从第二章开始）
            if (chapterNum >= 2 && chapterNum < 8) {
                this._showRelationshipHint(() => {
                    this.runScene(0);
                });
            } else {
                this.runScene(0);
            }
        } else {
            console.error(`章节 ${chapterNum} 数据未找到`);
        }
    }

    _showRelationshipHint(onComplete) {
        const stateText = this._getRelationshipState();
        if (!stateText) {
            if (onComplete) onComplete();
            return;
        }

        const reader = document.getElementById('novel-reader');
        const existingHint = reader.querySelector('.relationship-hint');
        if (existingHint) existingHint.remove();

        const hintEl = document.createElement('div');
        hintEl.className = 'relationship-hint';
        hintEl.textContent = stateText;
        // 插入到 chapter-title 之后，novel-content 之前
        const titleEl = document.getElementById('chapter-title');
        const contentEl = document.getElementById('novel-content');
        if (titleEl && titleEl.nextSibling) {
            reader.insertBefore(hintEl, titleEl.nextSibling);
        } else if (contentEl) {
            reader.insertBefore(hintEl, contentEl);
        } else {
            reader.appendChild(hintEl);
        }

        setTimeout(() => {
            if (onComplete) onComplete();
        }, 1500);
    }

    runScene(index) {
        // 章节结束，显示章节结束界面（含日记）
        if (index === 'chapter_end') {
            this.showChapterEnd();
            return;
        }

        if (!this.chapterData || index >= this.chapterData.scenes.length) {
            this.showChapterEnd();
            return;
        }

        this.state.sceneIndex = index;
        const scene = this.chapterData.scenes[index];

        if (!scene) {
            console.error(`场景 ${index} 不存在`);
            return;
        }

        // 加载场景背景和氛围
        if (scene.visual) {
            this.scenes.loadScene(scene.visual);
        }

        // 清空之前的内容，开始新场景
        this.dialogue.clear();
        this.choice.hide();

        // 执行场景逻辑
        this.executeSceneLogic(scene);
    }

    executeSceneLogic(scene) {
        // 处理第八章自定义名称输入
        if (scene.special === 'name_input') {
            this.handleNameInput(scene);
            return;
        }

        // 准备对话数据（深拷贝以避免修改原始数据）
        let dialogues = scene.dialogue ? [...scene.dialogue] : null;

        // 如果另一个视角已通关，插入跨视角真相段落
        const other = this.state.perspective === 'male' ? 'female' : 'male';
        if (this.crossPerspective.isCompleted(other) && scene.crossTruths) {
            dialogues = this._insertCrossTruths(dialogues, scene.crossTruths);
        }

        if (dialogues) {
            this.showDialogueSequence(dialogues, () => {
                if (scene.choices) {
                    this.showChoices(scene.choices);
                } else if (scene.next !== undefined) {
                    setTimeout(() => this.runScene(scene.next), 600);
                }
            });
        } else if (scene.choices) {
            this.showChoices(scene.choices);
        } else if (scene.next !== undefined) {
            setTimeout(() => this.runScene(scene.next), 600);
        }
    }

    _insertCrossTruths(dialogues, crossTruths) {
        if (!dialogues || !crossTruths) return dialogues;

        const otherFlags = this.crossPerspective.getOtherPerspectiveFlags(this.state.perspective);
        if (!otherFlags || Object.keys(otherFlags).length === 0) return dialogues;

        // 收集所有匹配的真相段落
        const matchedTruths = [];
        crossTruths.forEach(truth => {
            if (otherFlags[truth.flag] === true) {
                matchedTruths.push(truth);
            }
        });

        if (matchedTruths.length === 0) return dialogues;

        const result = [];
        let truthInserted = false;

        dialogues.forEach(d => {
            result.push(d);

            // 在第一段对话后插入所有匹配的真相段落
            if (!truthInserted) {
                result.push({ name: '', text: '—— 真相 ——', cssClass: 'truth-title' });
                matchedTruths.forEach(truth => {
                    truth.dialogue.forEach(td => {
                        result.push({ ...td, cssClass: 'truth-para' });
                    });
                });
                truthInserted = true;
            }
        });

        return result;
    }

    handleNameInput(scene) {
        // 先显示引导文字
        this.showDialogueSequence(scene.dialogue, () => {
            // 弹出名称输入界面
            this.showNameInputDialog();
        });
    }

    showNameInputDialog() {
        const choiceArea = document.getElementById('choice-area');
        choiceArea.classList.remove('hidden');
        choiceArea.innerHTML = '';

        const container = document.createElement('div');
        container.style.cssText = 'display:flex;flex-direction:column;gap:12px;padding:10px 0;';

        const maleLabel = document.createElement('label');
        maleLabel.textContent = '男主角名字：';
        maleLabel.style.cssText = 'font-size:0.9rem;color:rgba(93,64,55,0.7);';
        const maleInput = document.createElement('input');
        maleInput.type = 'text';
        maleInput.value = this.state.customNames.male;
        maleInput.placeholder = '林远';
        maleInput.style.cssText = 'padding:10px 14px;border:1.5px solid rgba(141,110,99,0.25);border-radius:8px;font-size:1rem;font-family:inherit;background:rgba(255,255,255,0.8);color:#5d4037;';

        const femaleLabel = document.createElement('label');
        femaleLabel.textContent = '女主角名字：';
        femaleLabel.style.cssText = 'font-size:0.9rem;color:rgba(93,64,55,0.7);';
        const femaleInput = document.createElement('input');
        femaleInput.type = 'text';
        femaleInput.value = this.state.customNames.female;
        femaleInput.placeholder = '苏念';
        femaleInput.style.cssText = 'padding:10px 14px;border:1.5px solid rgba(141,110,99,0.25);border-radius:8px;font-size:1rem;font-family:inherit;background:rgba(255,255,255,0.8);color:#5d4037;';

        const matchCodeLabel = document.createElement('label');
        matchCodeLabel.textContent = '对方的奔赴码（可选）：';
        matchCodeLabel.style.cssText = 'font-size:0.85rem;color:rgba(93,64,55,0.55);margin-top:4px;';
        const matchCodeInput = document.createElement('input');
        matchCodeInput.type = 'text';
        matchCodeInput.placeholder = '如对方已通关，可输入其奔赴码';
        matchCodeInput.style.cssText = 'padding:10px 14px;border:1.5px solid rgba(141,110,99,0.18);border-radius:8px;font-size:0.95rem;font-family:inherit;background:rgba(255,255,255,0.6);color:#5d4037;';

        const confirmBtn = document.createElement('button');
        confirmBtn.textContent = '确认，进入结局';
        confirmBtn.className = 'choice-btn';
        confirmBtn.style.marginTop = '10px';
        confirmBtn.addEventListener('click', () => {
            const mName = maleInput.value.trim();
            const fName = femaleInput.value.trim();
            if (mName) this.state.customNames.male = mName;
            if (fName) this.state.customNames.female = fName;

            // 双向奔赴：验证对方奔赴码
            const matchCode = matchCodeInput.value.trim();
            if (matchCode) {
                this._mutualMatch = this._verifyMatchCode(matchCode, mName, fName);
            }

            // 双向奔赴：同设备检测（另一个视角是否填了一样的名字）
            if (!this._mutualMatch) {
                this._mutualMatch = this._checkSameDeviceMutualMatch(mName, fName);
            }

            // 保存当前名字，供另一个视角比对
            this._saveNamesForMutualMatch();
            this.saveGame();
            choiceArea.innerHTML = '';
            choiceArea.classList.add('hidden');

            // 根据变量决定结局线路
            const endingScene = this._determineEndingScene();
            this.runScene(endingScene);
        });

        container.appendChild(maleLabel);
        container.appendChild(maleInput);
        container.appendChild(femaleLabel);
        container.appendChild(femaleInput);
        container.appendChild(matchCodeLabel);
        container.appendChild(matchCodeInput);
        container.appendChild(confirmBtn);
        choiceArea.appendChild(container);
    }

    _determineEndingScene() {
        const affection = this.vs.get('affection') || 0;
        const trust = this.vs.get('trust') || 0;
        const understanding = this.vs.get('understanding') || 0;
        const initiative = this.vs.get('initiative') || 0;

        // HE 重修于好: 好感高 + 信任高 + 理解高
        if (affection >= 45 && trust >= 25 && understanding >= 15) return 1;
        // BE1 沉默的螺旋: 好感中 + 信任低 + 主动性低
        if (affection >= 20 && trust < 20 && initiative < 20) return 3;
        // BE2 陌生人: 好感低 + 信任低
        if (affection < 20 || trust < 0) return 5;
        // Hidden BE 朋友以上: 好感高 + 信任低 + 理解低 (最痛)
        if (affection >= 35 && trust < 15 && understanding < 10) return 7;
        // 默认结局: 暧昧不明
        return 3;
    }

    _getRelationshipState() {
        const affection = this.vs.get('affection') || 0;
        const trust = this.vs.get('trust') || 0;
        const understanding = this.vs.get('understanding') || 0;

        // 根据章节返回不同的关系状态描述
        const chapter = this.state.chapter;

        if (chapter <= 2) {
            if (affection >= 15) return '你们之间有种微妙的吸引力';
            if (affection >= 5) return '你对TA有些在意';
            return '你们还是陌生人';
        }

        if (chapter <= 4) {
            if (affection >= 35 && trust >= 15) return '你们彼此信任，感情日渐深厚';
            if (affection >= 25) return '你们在一起了，但还有些小心翼翼';
            if (affection >= 10) return '关系刚刚起步';
            return '你们之间似乎隔着什么';
        }

        if (chapter <= 6) {
            if (trust >= 25) return '虽然遇到了波折，但你们依然相信彼此';
            if (trust >= 10) return '信任出现了裂痕，但还没破碎';
            if (trust >= 0) return '你们之间隔着一道越来越厚的墙';
            return '信任已经崩塌，只剩沉默';
        }

        // Chapter 7+
        if (affection >= 40 && trust >= 25 && understanding >= 15) return '经历了风雨，你们依然选择彼此';
        if (affection >= 30 && trust < 15) return '还爱着，但已经无法信任';
        if (affection < 15) return '曾经亲密的人，如今形同陌路';
        return '故事还没写完';
    }

    _getMemoryFragments(chapter, perspective) {
        const fragments = [];
        const affection = this.vs.get('affection') || 0;
        const trust = this.vs.get('trust') || 0;
        const understanding = this.vs.get('understanding') || 0;
        const initiative = this.vs.get('initiative') || 0;

        // Ch1 伏笔 → Ch5/Ch6 体现
        if (chapter >= 5) {
            if (initiative >= 10) {
                fragments.push('你曾在初遇时选择了主动，这份勇气让后来的你们有了开始。');
            } else {
                fragments.push('你曾在初遇时有些犹豫，那些错过的时机，后来成了遗憾的种子。');
            }
        }

        // Ch2 伏笔 → Ch5 体现
        if (chapter >= 5) {
            if (understanding >= 8) {
                fragments.push('你们曾在靠近时认真倾听彼此，那些了解让信任有了根基。');
            } else {
                fragments.push('你们曾在靠近时忽略了太多细节，那些不了解，后来成了误会的温床。');
            }
        }

        // Ch3 伏笔 → Ch6 体现
        if (chapter >= 6) {
            if (affection >= 30) {
                fragments.push('表白时的真心不会骗人，那份喜欢是真切的，只是后来忘了怎么表达。');
            } else {
                fragments.push('或许从一开始，你们就不够确定。不确定的心，经不起风浪。');
            }
        }

        // Ch4 伏笔 → Ch7 体现
        if (chapter >= 7) {
            if (understanding >= 15) {
                fragments.push('热恋时你曾认真看过TA的侧脸，那些专注的时刻，是后来最珍贵的记忆。');
            } else {
                fragments.push('热恋时你们都在看手机，那些错过的眼神，后来成了再也找不回的瞬间。');
            }
        }

        // Ch5 伏笔 → Ch6/Ch7 体现
        if (chapter >= 6) {
            if (trust >= 15) {
                fragments.push('误会发生时，你选择了沟通。那一刻的坦诚，是后来所有和解的起点。');
            } else if (trust >= 5) {
                fragments.push('误会发生时，你们都沉默了。沉默比争吵更伤人，因为它意味着放弃。');
            } else {
                fragments.push('误会发生时，你选择了试探和猜疑。那些没有说出口的质问，最后变成了刺向彼此的刀。');
            }
        }

        return fragments;
    }

    showDialogueSequence(dialogues, onComplete) {
        let i = 0;
        const next = () => {
            if (i < dialogues.length) {
                const d = dialogues[i];
                const nextD = dialogues[i + 1];
                i++;
                const name = this._resolveName(d.name);

                // 使用原始名字检测是否是聊天消息
                const isCurrentChat = this._isChatName(d.name);
                const isNextChat = nextD ? this._isChatName(nextD.name) : false;
                const showTyping = isCurrentChat && isNextChat && d.name !== nextD.name;

                this.dialogue.appendParagraph(name, d.text, next, {
                    showTyping,
                    isChat: isCurrentChat,
                    originalName: d.name,
                    cssClass: d.cssClass || null
                });
            } else {
                if (onComplete) onComplete();
            }
        };
        next();
    }

    _isChatName(name) {
        if (!name) return false;
        return name === '你' || name === '？' || name.includes('消息') || name.includes('微信') || name.includes('闺蜜');
    }

    _resolveName(name) {
        if (name === '内心') return '内心';
        if (name === '你') {
            return this.state.perspective === 'male'
                ? this.state.customNames.male
                : this.state.customNames.female;
        }
        if (name === '？') {
            return this.state.perspective === 'male'
                ? this.state.customNames.female
                : this.state.customNames.male;
        }
        return name;
    }

    showChoices(choices) {
        // 保存原始选择的 crossFlag 映射
        this._currentChoiceFlags = {};
        choices.forEach((c, idx) => {
            if (c.crossFlag) {
                this._currentChoiceFlags[idx] = c.crossFlag;
            }
        });

        const processedChoices = choices.map(c => ({
            text: c.text,
            next: c.next,
            effects: c.effects
        }));

        this.choice.show(processedChoices, (choice, index) => {
            // 记录关键选择标签
            if (this._currentChoiceFlags && this._currentChoiceFlags[index]) {
                const flag = this._currentChoiceFlags[index];
                this._crossFlags[flag] = true;
            }
            if (choice.effects) {
                this.applyEffects(choice.effects);
            }
            if (choice.next !== undefined) {
                this.runScene(choice.next);
            }
        });
    }

    applyEffects(effects) {
        Object.entries(effects).forEach(([key, value]) => {
            if (key.startsWith('+')) {
                this.vs.add(key.slice(1), value);
            } else if (key.startsWith('-')) {
                this.vs.add(key.slice(1), -value);
            } else {
                this.vs.set(key, value);
            }
        });
    }

    showChapterEnd() {
        // 第八章不在这里处理，有自己的结局流程
        if (this.state.chapter >= 8) {
            // 保存跨视角标签并标记通关
            this._saveCrossPerspectiveFlags();
            this.crossPerspective.markCompleted(this.state.perspective);
            this._recordEnding();
            this.showFinalEnd();
            return;
        }

        // 保存跨视角标签
        this._saveCrossPerspectiveFlags();

        const chapterTitles = ['', '一', '二', '三', '四', '五', '六', '七'];
        const title = `第${chapterTitles[this.state.chapter]}章 完`;

        // 先显示章节结束，然后显示日记，再显示记忆碎片，最后显示情感曲线
        this.dialogue.appendParagraph('', title, () => {
            this._showDiary(() => {
                this._showMemoryFragments(() => {
                    this._showEmotionCurve();
                    this._pendingChapterEndCallback = () => {
                        this.choice.show([
                            { text: '继续下一章', next: 'next' },
                            { text: '保存并退出', next: 'save' }
                        ], (choice) => {
                            if (choice.next === 'next') {
                                this.loadChapter(this.state.chapter + 1);
                            } else {
                                this.saveGame();
                                alert('进度已保存');
                                location.reload();
                            }
                        });
                    };
                });
            });
        });
    }

    _saveCrossPerspectiveFlags() {
        const existing = this.crossPerspective.getFlags(this.state.perspective);
        const merged = { ...existing, ...this._crossFlags };
        this.crossPerspective.save(this.state.perspective, merged);
    }

    _showMemoryFragments(onComplete) {
        const fragments = this._getMemoryFragments(this.state.chapter, this.state.perspective);
        if (!fragments || fragments.length === 0) {
            if (onComplete) onComplete();
            return;
        }

        // 显示记忆碎片标题
        const titlePara = document.createElement('div');
        titlePara.className = 'memory-title';
        titlePara.textContent = '—— 过往回响 ——';
        this.dialogue.contentEl.appendChild(titlePara);

        fragments.forEach(text => {
            const para = document.createElement('div');
            para.className = 'memory-fragment';
            para.textContent = text;
            this.dialogue.contentEl.appendChild(para);
        });

        this.dialogue._scrollToBottom();

        setTimeout(() => {
            if (onComplete) onComplete();
        }, 800);
    }

    _showDiary(onComplete) {
        const diaries = this._getDiaryContent(this.state.chapter, this.state.perspective);
        if (!diaries || diaries.length === 0) {
            if (onComplete) onComplete();
            return;
        }

        // 添加日记标题
        const titlePara = document.createElement('div');
        titlePara.className = 'diary-title';
        titlePara.textContent = '—— 日记 ——';
        this.dialogue.contentEl.appendChild(titlePara);

        this._diaryTyping = true;
        this._diarySkip = false;
        this._diaryTimers = [];
        this._diaryParas = [];

        // 绑定点击跳过
        const reader = document.getElementById('novel-reader');
        this._diaryClickHandler = () => {
            if (this._diaryTyping) {
                this._diarySkip = true;
            }
        };
        reader.addEventListener('click', this._diaryClickHandler);
        // 显示点击提示
        this.dialogue.tapHint.classList.remove('hidden');

        let i = 0;
        const next = () => {
            if (i < diaries.length) {
                const text = diaries[i];
                i++;
                const para = document.createElement('p');
                para.className = 'diary-para';
                para.textContent = '';
                this.dialogue.contentEl.appendChild(para);
                this._diaryParas.push(para);
                this.dialogue._scrollToBottom();

                // 打字机效果
                let j = 0;
                const type = () => {
                    if (this._diarySkip) {
                        // 跳过所有剩余日记内容
                        this._diaryParas.forEach(p => {
                            const fullText = p.dataset.fullText || '';
                            if (fullText) p.textContent = fullText;
                        });
                        if (onComplete) onComplete();
                        this._cleanupDiary();
                        return;
                    }
                    if (j < text.length) {
                        para.textContent += text[j];
                        j++;
                        const timer = setTimeout(type, 30);
                        this._diaryTimers.push(timer);
                        if (j % 3 === 0) this.dialogue._scrollToBottom();
                    } else {
                        next();
                    }
                };
                para.dataset.fullText = text;
                type();
            } else {
                // 日记结束分隔线
                const endLine = document.createElement('div');
                endLine.className = 'diary-end';
                endLine.textContent = '——';
                this.dialogue.contentEl.appendChild(endLine);
                this.dialogue._scrollToBottom();
                this.dialogue.tapHint.classList.add('hidden');

                const timer = setTimeout(() => {
                    this._cleanupDiary();
                    if (onComplete) onComplete();
                }, 600);
                this._diaryTimers.push(timer);
            }
        };
        next();
    }

    _cleanupDiary() {
        this._diaryTyping = false;
        this._diarySkip = false;
        if (this._diaryTimers) {
            this._diaryTimers.forEach(t => clearTimeout(t));
            this._diaryTimers = [];
        }
        this._diaryParas = [];
        if (this._diaryClickHandler) {
            const reader = document.getElementById('novel-reader');
            reader.removeEventListener('click', this._diaryClickHandler);
            this._diaryClickHandler = null;
        }
        this.dialogue.tapHint.classList.add('hidden');
    }

    _getDiaryContent(chapter, perspective) {
        const maleName = this.state.customNames.male;
        const femaleName = this.state.customNames.female;

        const diaries = {
            1: {
                male: [
                    `今天开学第一天，教室前排来了个新女生。`,
                    `她整理课本的时候，发丝晃了一下，阳光正好落在她脸上。`,
                    `我假装在看窗外，其实余光一直在瞟她。`,
                    `不知道她叫什么。`
                ],
                female: [
                    `今天坐在教室前排，总感觉后排有人在看我。`,
                    `回头的时候他刚好低下头，装得挺像的。`,
                    `其实……他长得还挺干净的。`,
                    `希望明天还能坐在这个位置。`
                ]
            },
            2: {
                male: [
                    `今天和她一起去图书馆了。`,
                    `她看书的时候很安静，偶尔用笔在纸上划几下。`,
                    `我不敢靠太近，怕她发现我在看她。`,
                    `晚上回宿舍，翻了翻和她的聊天记录，不多，但每条我都看了好几遍。`
                ],
                female: [
                    `今天他居然主动约我去图书馆。`,
                    `我故意带了两本书，一本看，一本挡脸。`,
                    `他偷偷看我的样子，有点可爱。`,
                    `晚上闺蜜问我进度，我说"还早"。其实心里挺急的。`
                ]
            },
            3: {
                male: [
                    `今天表白了。`,
                    `话说出口的时候，手一直在抖。`,
                    `她愣了一下，然后笑了。`,
                    `原来她也在等我开口。`,
                    `现在是我的女朋友了。`
                ],
                female: [
                    `今天他表白了。`,
                    `我其实早就猜到了，但他真的说出口的时候，我还是愣了一下。`,
                    `心脏跳得好快，差点装不了矜持。`,
                    `现在是我的男朋友了。`,
                    `希望不要让我失望。`
                ]
            },
            4: {
                male: [
                    `在一起一个月了。`,
                    `今天牵了她的手，手心全是汗。`,
                    `她没甩开我。`,
                    `晚上送她回宿舍，在楼下抱了一下。`,
                    `她的头发有股淡淡的香味。`,
                    `我想……我是真的喜欢她了。`
                ],
                female: [
                    `在一起一个月了。`,
                    `今天他牵了我的手，手心全是汗，还装得很镇定。`,
                    `我其实也想牵他，但一直在等他主动。`,
                    `晚上在宿舍楼下抱了一下，他的心跳好快。`,
                    `原来男生紧张的时候也会心跳加速。`,
                    `我想……我是真的很喜欢他了。`
                ]
            },
            5: {
                male: [
                    `她最近好像不太对劲。`,
                    `消息回得慢了，态度也冷淡了。`,
                    `我问了几次"怎么了"，她都说"没事"。`,
                    `我不知道我做错了什么。`,
                    `表妹来的那天，我没有提前告诉她，是我的问题吗？`,
                    `但她为什么不来问我？`
                ],
                female: [
                    `今天看到他和一个女生吃饭。`,
                    `我没走进去，也没发消息问他。`,
                    `我不知道以什么身份问。`,
                    `晚上发了条朋友圈，仅他可见。`,
                    `他没点赞，也没评论。`,
                    `也许……我只是他无聊时的消遣吧。`
                ]
            },
            6: {
                male: [
                    `冷战第五天了。`,
                    `我发了三条消息，她都没回。`,
                    `朋友圈也停了，像消失了一样。`,
                    `我不敢再发了，怕她烦。`,
                    `但我真的很想知道，她到底怎么了。`,
                    `也许……她已经不想理我了。`
                ],
                female: [
                    `冷战第五天了。`,
                    `他发了三条消息，我都没回。`,
                    `不是不想回，是不知道怎么回。`,
                    `我怕我一开口，就显得我很在意。`,
                    `但我真的很在意。`,
                    `如果他再来一次，我可能就忍不住了。`
                ]
            },
            7: {
                male: [
                    `今天去医院找她，她已经走了。`,
                    `转账被退回了。`,
                    `我在她楼下等了三个小时，她没下来。`,
                    `后来在咖啡店看到她了，她坐在角落，面前放着一杯美式。`,
                    `我想走过去，但腿像灌了铅。`,
                    `最后她先走了，我坐在她坐过的位置上，咖啡已经凉了。`
                ],
                female: [
                    `今天在医院输液，一个人。`,
                    `输液室的椅子很硬，旁边坐了个老奶奶，一直在咳嗽。`,
                    `我把他的转账退回了。`,
                    `删微信的时候，手抖得厉害。`,
                    `后来在咖啡店看到他了，他坐在角落，面前放着一杯美式。`,
                    `我没走过去，先离开了。`,
                    `我怕我一走过去，就再也走不开了。`
                ]
            }
        };

        const chapterDiaries = diaries[chapter];
        if (!chapterDiaries) return null;
        return perspective === 'male' ? chapterDiaries.male : chapterDiaries.female;
    }

    showFinalEnd() {
        const other = this.state.perspective === 'male' ? 'female' : 'male';
        const otherCompleted = this.crossPerspective.isCompleted(other);

        this.dialogue.appendParagraph('', '故事到此结束。', () => {
            // 双向奔赴彩蛋
            if (this._mutualMatch) {
                this._showMutualMatchEasterEgg(() => {
                    this._showFinalEndChoices(otherCompleted, other);
                });
            } else {
                this._showFinalEndChoices(otherCompleted, other);
            }
        });
    }

    _showFinalEndChoices(otherCompleted, other) {
        if (!otherCompleted) {
            this.dialogue.appendParagraph('', '——', () => {
                const otherName = other === 'male' ? '男生' : '女生';
                this.dialogue.appendParagraph('', `你已通关${this.state.perspective === 'male' ? '男生' : '女生'}视角。`, () => {
                    this.dialogue.appendParagraph('', `去试试${otherName}视角吧，你会发现另一个角度的故事。`, () => {
                        this._showEndChoices();
                    });
                });
            });
        } else {
            this._showEndChoices();
        }
    }

    _showEndChoices() {
        const choices = [
            { text: '返回主菜单', next: 'menu' },
            { text: '保存进度', next: 'save' }
        ];

        // 如果未触发双向奔赴，显示奔赴码供分享
        if (!this._mutualMatch) {
            choices.unshift({
                text: '生成奔赴码，邀请TA',
                next: 'match_code'
            });
        }

        this.choice.show(choices, (choice) => {
            if (choice.next === 'menu') {
                location.reload();
            } else if (choice.next === 'save') {
                this.saveGame();
                alert('进度已保存');
            } else if (choice.next === 'match_code') {
                this._showMatchCodeDialog();
            }
        });
    }

    saveGame() {
        this.save.save(this.state);
    }

    loadGame() {
        const data = this.save.load();
        if (data) {
            this.state.perspective = data.perspective;
            this.state.chapter = data.chapter;
            this.state.sceneIndex = data.sceneIndex || 0;
            this.state.customNames = data.customNames || { ...CUSTOM_NAME_DEFAULTS };
            this.state.endings = data.endings || [];
            this.state.achievements = data.achievements || [];
            this.state.newGamePlus = data.newGamePlus || false;
            this.state.firstTime = data.firstTime !== undefined ? data.firstTime : true;
            this.vs.load(data.variables);

            document.getElementById('perspective-select').classList.add('hidden');
            document.getElementById('settings-menu').classList.add('hidden');
            this.loadChapter(data.chapter);
            // 恢复存档时的具体场景
            if (this.state.sceneIndex > 0 && this.chapterData && this.state.sceneIndex < this.chapterData.scenes.length) {
                this.runScene(this.state.sceneIndex);
            }
        } else {
            alert('没有找到存档');
        }
    }

    // ===== 收集册 =====
    _showCollection() {
        const modal = document.getElementById('collection-modal');
        modal.classList.remove('hidden');
        this._updateCollectionUI();
    }

    _updateCollectionUI() {
        const endings = this.state.endings || [];
        const uniqueEndings = [...new Set(endings)];
        const total = 4;
        const unlocked = uniqueEndings.length;

        const fill = document.getElementById('collection-progress-fill');
        const text = document.getElementById('collection-progress-text');
        if (fill) fill.style.width = `${(unlocked / total) * 100}%`;
        if (text) text.textContent = `已收集 ${unlocked} / ${total}`;

        const endingMap = {
            'he': { name: '重修于好', icon: '✦', hint: '好感度高于45，信任高于25，理解高于15' },
            'be1': { name: '沉默的螺旋', icon: '✧', hint: '信任崩塌后的遗憾' },
            'be2': { name: '陌生人', icon: '○', hint: '好感或信任跌至谷底' },
            'hidden': { name: '朋友以上', icon: '◈', hint: '最痛的一种结局' }
        };

        document.querySelectorAll('.ending-card').forEach(card => {
            const key = card.dataset.ending;
            const isUnlocked = uniqueEndings.includes(key);
            card.classList.toggle('locked', !isUnlocked);
            card.classList.toggle('unlocked', isUnlocked);

            const icon = card.querySelector('.card-icon');
            const title = card.querySelector('h3');
            const hint = card.querySelector('.card-hint');

            if (isUnlocked && endingMap[key]) {
                if (icon) icon.textContent = endingMap[key].icon;
                if (title) title.textContent = endingMap[key].name;
                if (hint) hint.textContent = endingMap[key].hint;
            } else {
                if (icon) icon.textContent = '?';
                if (title) title.textContent = key === 'he' ? 'Happy Ending' :
                    key === 'be1' ? '沉默的螺旋' :
                    key === 'be2' ? '陌生人' : '朋友以上';
                if (hint) hint.textContent = '???';
            }
        });
    }

    // ===== 首次引导 =====
    _showTutorial() {
        this._tutorialStep = 1;
        document.getElementById('tutorial-overlay').classList.remove('hidden');
        this._updateTutorialStep();
    }

    _nextTutorialStep() {
        if (this._tutorialStep < 3) {
            this._tutorialStep++;
            this._updateTutorialStep();
        } else {
            document.getElementById('tutorial-overlay').classList.add('hidden');
            this.state.firstTime = false;
            this.saveGame();
        }
    }

    _updateTutorialStep() {
        for (let i = 1; i <= 3; i++) {
            const step = document.getElementById(`tutorial-step-${i}`);
            if (step) step.classList.toggle('hidden', i !== this._tutorialStep);
        }
        const btn = document.getElementById('btn-tutorial-next');
        if (btn) btn.textContent = this._tutorialStep === 3 ? '开始游戏' : '下一步';
    }

    // ===== 章节情感曲线 =====
    _recordChapterStartVars() {
        this._chapterStartVars = {
            affection: this.vs.get('affection') || 0,
            trust: this.vs.get('trust') || 0,
            initiative: this.vs.get('initiative') || 0,
            understanding: this.vs.get('understanding') || 0
        };
    }

    _showEmotionCurve() {
        const modal = document.getElementById('emotion-curve-modal');
        const chart = document.getElementById('emotion-chart');
        if (!chart) return;
        chart.innerHTML = '';

        const vars = [
            { key: 'affection', label: '好感' },
            { key: 'trust', label: '信任' },
            { key: 'initiative', label: '主动' },
            { key: 'understanding', label: '理解' }
        ];
        const start = this._chapterStartVars || {};
        const maxVal = 60;

        vars.forEach((v, i) => {
            const before = start[v.key] || 0;
            const after = this.vs.get(v.key) || 0;
            const diff = after - before;

            const group = document.createElement('div');
            group.className = 'emotion-bar-group';

            const bar = document.createElement('div');
            bar.className = `emotion-bar ${v.key}`;
            const heightPct = Math.min(Math.max((after / maxVal) * 100, 4), 100);
            bar.style.height = '0%';
            bar.dataset.value = `${after} (${diff >= 0 ? '+' : ''}${diff})`;

            const label = document.createElement('div');
            label.className = 'emotion-bar-label';
            label.textContent = v.label;

            group.appendChild(bar);
            group.appendChild(label);
            chart.appendChild(group);

            setTimeout(() => {
                bar.style.height = `${heightPct}%`;
            }, 100 + i * 120);
        });

        if (modal) modal.classList.remove('hidden');
    }

    // ===== 结局记录 =====
    _recordEnding() {
        const sceneIdx = this._determineEndingScene();
        const keyMap = { 1: 'he', 3: 'be1', 5: 'be2', 7: 'hidden' };
        const key = keyMap[sceneIdx] || 'be1';
        if (!this.state.endings.includes(key)) {
            this.state.endings.push(key);
        }
        this.saveGame();
    }

    // ===== 双向奔赴系统 =====
    _generateMatchCode(male, female) {
        try {
            return btoa(encodeURIComponent(male + '|' + female));
        } catch (e) {
            return '';
        }
    }

    _verifyMatchCode(code, male, female) {
        try {
            const decoded = decodeURIComponent(atob(code));
            const [expectedMale, expectedFemale] = decoded.split('|');
            return expectedMale === male && expectedFemale === female;
        } catch (e) {
            return false;
        }
    }

    _saveNamesForMutualMatch() {
        const key = `xinji_names_${this.state.perspective}`;
        localStorage.setItem(key, JSON.stringify(this.state.customNames));
    }

    _checkSameDeviceMutualMatch(male, female) {
        const other = this.state.perspective === 'male' ? 'female' : 'male';
        const otherKey = `xinji_names_${other}`;
        const raw = localStorage.getItem(otherKey);
        if (!raw) return false;
        try {
            const otherNames = JSON.parse(raw);
            return otherNames.male === male && otherNames.female === female;
        } catch (e) {
            return false;
        }
    }

    _showMutualMatchEasterEgg(onComplete) {
        const maleName = this.state.customNames.male;
        const femaleName = this.state.customNames.female;

        this.dialogue.appendParagraph('', '—— 双向奔赴 ——', () => {
            this.dialogue.appendParagraph('', `在这个世界的某个角落，另一个人正用着和你相同的名字，书写着同一段故事。`, () => {
                this.dialogue.appendParagraph('', `${maleName} 和 ${femaleName}，不只是游戏里的人物。`, () => {
                    this.dialogue.appendParagraph('', '也许这就是缘分。你们选择了彼此，也选择了同一个未来。', () => {
                        this.dialogue.appendParagraph('', '愿现实中的你们，也能像这个故事一样，找到属于自己的结局。', () => {
                            if (onComplete) onComplete();
                        });
                    });
                });
            });
        });
    }

    _showMatchCodeDialog() {
        const code = this._generateMatchCode(this.state.customNames.male, this.state.customNames.female);
        const choiceArea = document.getElementById('choice-area');
        choiceArea.classList.remove('hidden');
        choiceArea.innerHTML = '';

        const container = document.createElement('div');
        container.style.cssText = 'display:flex;flex-direction:column;gap:14px;padding:10px 0;align-items:center;';

        const title = document.createElement('div');
        title.textContent = '你的奔赴码';
        title.style.cssText = 'font-size:1.05rem;color:#5d4037;font-weight:600;letter-spacing:0.1em;';

        const codeBox = document.createElement('div');
        codeBox.textContent = code;
        codeBox.style.cssText = 'padding:12px 20px;background:rgba(139,90,43,0.06);border:1.5px dashed rgba(139,90,43,0.25);border-radius:8px;font-size:0.9rem;color:#5d4037;word-break:break-all;max-width:100%;text-align:center;font-family:monospace;';

        const hint = document.createElement('div');
        hint.textContent = '复制上方代码发给对方，如果对方在游戏中填写了相同的名字并输入此码，将触发「双向奔赴」彩蛋。';
        hint.style.cssText = 'font-size:0.8rem;color:rgba(93,64,55,0.55);line-height:1.6;text-align:center;';

        const copyBtn = document.createElement('button');
        copyBtn.textContent = '复制奔赴码';
        copyBtn.className = 'choice-btn';
        copyBtn.style.cssText = 'width:auto;padding:10px 28px;';
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(code).then(() => {
                copyBtn.textContent = '已复制';
                setTimeout(() => { copyBtn.textContent = '复制奔赴码'; }, 2000);
            }).catch(() => {
                // fallback
                const ta = document.createElement('textarea');
                ta.value = code;
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                document.body.removeChild(ta);
                copyBtn.textContent = '已复制';
                setTimeout(() => { copyBtn.textContent = '复制奔赴码'; }, 2000);
            });
        });

        const closeBtn = document.createElement('button');
        closeBtn.textContent = '返回';
        closeBtn.className = 'choice-btn';
        closeBtn.style.cssText = 'width:auto;padding:10px 28px;';
        closeBtn.addEventListener('click', () => {
            choiceArea.innerHTML = '';
            choiceArea.classList.add('hidden');
            this._showEndChoices();
        });

        container.appendChild(title);
        container.appendChild(codeBox);
        container.appendChild(hint);
        container.appendChild(copyBtn);
        container.appendChild(closeBtn);
        choiceArea.appendChild(container);
    }
}
