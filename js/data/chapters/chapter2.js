const chapter2 = {
    male: {
        title: '靠近 · 试探',
        scenes: [
            {
                id: 'm_00',
                visual: {
                    background: '#f0e6d2'
                },
                dialogue: [
                    { name: '', text: '加了微信的第一晚，你翻来覆去睡不着。床单被你揉得皱巴巴的，枕头也被翻了个面。' },
                    { name: '内心', text: '（现在发消息会不会太刻意了？）' },
                    { name: '', text: '手机屏幕亮了又暗，你盯着天花板，听着窗外偶尔传来的虫鸣声。' },
                    { name: '内心', text: '（但她昨晚通过了好友申请……应该不讨厌我吧？）' },
                    { name: '', text: '你翻了个身，把脸埋进枕头里，深吸一口气，又猛地坐了起来。' },
                    { name: '内心', text: '（不管了，先发个早安试试。）' }
                  ],
                choices: [
                    { text: '发"早安"', next: 1, effects: { '+affection': 5 }, crossFlag: 'male_ch2_care' },
                    { text: '算了，先去教室', next: 2, crossFlag: 'male_ch2_casual' }
                ]
            },
            {
                id: 'm_01',
                visual: {
                    background: '#f0e6d2'
                },
                dialogue: [
                    { name: '你', text: '「早安」' },
                    { name: '', text: '消息发出去的瞬间，你立刻把手机扣在胸口，不敢看屏幕。' },
                    { name: '苏念', text: '「早呀」' },
                    { name: '', text: '你几乎是弹起来抓过手机，看到那两个字的时候，嘴角不受控制地上扬。' },
                    { name: '内心', text: '（她秒回了！是在等我的消息吗？还是刚好在看手机？）' },
                    { name: '', text: '你对着输入框打了又删，删了又打，不知道该说什么才不会冷场。' },
                    { name: '内心', text: '（不能让她等太久……快想点什么。）' }
                  ],
                choices: [
                    { text: '问她今天课多吗', next: 3, effects: { '+initiative': 10, '+understanding': 5, '+trust': 3 }, crossFlag: 'male_ch2_care' },
                    { text: '吐槽今早好困', next: 4, effects: { '+affection': 2 }, crossFlag: 'male_ch2_casual' }
                ]
            },
            {
                id: 'm_02',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '', text: '教室里晨光熹微，第一缕阳光刚爬上窗台。她已经在座位上了，低着头在整理课本。' },
                    { name: '内心', text: '（还是当面说吧。）' },
                    { name: '', text: '你站在教室门口，深吸了一口气，感觉早晨的空气里带着一丝露水的凉意。' },
                    { name: '', text: '她的侧脸在晨光里显得格外柔和，你突然有些紧张，手心微微出汗。' },
                    { name: '内心', text: '（如果坐过去，她会不会觉得我很奇怪？）' },
                    { name: '', text: '你攥紧了书包带子，迈出了脚步。' }
                  ],
                choices: [
                    { text: '坐她旁边', next: 5, effects: { '+initiative': 10 }, crossFlag: 'male_ch2_care' },
                    { text: '坐回后排老位置', next: 6, crossFlag: 'male_ch2_casual' }
                ]
            },
            {
                id: 'm_03',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '你', text: '「下午课多吗？」' },
                    { name: '', text: '你的拇指悬在发送键上方，犹豫了一秒，还是按了下去。' },
                    { name: '苏念', text: '「只有一节，怎么了？」' },
                    { name: '', text: '你盯着那个"怎么了"看了好几秒，试图从中解读出什么情绪。是好奇？还是敷衍？' },
                    { name: '你', text: '「要不要一起去图书馆？」' },
                    { name: '', text: '发送出去之后，你把手机翻了个面，不敢看。时间一分一秒地过去，等待回复的感觉有点难熬。' },
                    { name: '苏念', text: '「好。」' },
                    { name: '内心', text: '（她答应了！就一个字，但我看了整整十遍。）' },
                    { name: '', text: '你的心脏在胸腔里疯狂跳动，你甚至怀疑隔壁宿舍的人都能听见。' }
                  ],
                crossTruths: [
                    {
                        flag: 'female_ch2_care',
                        dialogue: [
                            { name: '', text: '你不知道的是，她盯着屏幕笑了很久。那句"怎么了"她写了又删，最后选了一个最轻松的样子发过来。' },
                            { name: '内心', text: '（原来她也这么认真。）' }
                        ]
                    },
                    {
                        flag: 'female_ch2_casual',
                        dialogue: [
                            { name: '', text: '你不知道的是，她把手机扣在桌上等了很久。回复来得太快，她反而有点失落，以为你并不在意。' },
                            { name: '内心', text: '（原来她那时是失落的。）' }
                        ]
                    }
                ],
                next: 7
            },
            {
                id: 'm_04',
                visual: {
                    background: '#f0e6d2'
                },
                dialogue: [
                    { name: '你', text: '「今早好困，昨晚失眠了」' },
                    { name: '', text: '消息发出去，你盯着屏幕，看着她头像旁边的"对方正在输入"几个字出现又消失。' },
                    { name: '苏念', text: '「我也是……」' },
                    { name: '', text: '你的心跳漏了一拍。她昨晚也没睡好？' },
                    { name: '你', text: '「在想事情？」' },
                    { name: '苏念', text: '「嗯，一些事。」' },
                    { name: '', text: '你对着屏幕笑了笑，虽然知道她看不见。窗外的阳光突然变得特别明媚。' }
                  ],
                next: 8
            },
            {
                id: 'm_05',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '', text: '你走到她旁边的空位坐下，椅子腿划过地面发出轻微的声响。' },
                    { name: '苏念', text: '（抬头看了你一眼）早。' },
                    { name: '', text: '她的目光在你脸上停留了不到一秒钟，你却莫名有点紧张。' },
                    { name: '你', text: '早……' },
                    { name: '', text: '你的声音有点干，你清了清嗓子，假装在找课本。' },
                    { name: '内心', text: '（她身上有好闻的洗发水味道，像是某种淡淡的花香。）' },
                    { name: '', text: '你深吸了一口气，又赶紧憋住，怕被她发现你在闻什么。' }
                  ],
                next: 9
            },
            {
                id: 'm_06',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '', text: '你坐在后排，看着她的背影。阳光从窗户斜射进来，给她的发梢镀上了一层金边。' },
                    { name: '内心', text: '（算了，就这样远远看着也挺好。）' },
                    { name: '', text: '你的手指无意识地在桌面上画着圈，目光却始终没能从她身上移开。' },
                    { name: '内心', text: '（不对，我应该勇敢一点。一直这样退缩，永远也不会有进展。）' },
                    { name: '', text: '你攥紧了拳头，指节因为用力而微微发白。' },
                    { name: '', text: '下课铃就在这时响了起来，像是一个催促的信号。' }
                  ],
                next: 9
            },
            {
                id: 'm_07',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '', text: '图书馆里安静得能听见翻书的声音。她已经在靠窗的位置坐好了，阳光落在她的肩膀上。' },
                    { name: '', text: '你带了两杯奶茶，冰凉的杯壁上凝着细密的水珠，顺着你的指缝滑下来。' },
                    { name: '苏念', text: '谢谢……你怎么知道我喜欢这个？' },
                    { name: '', text: '她的眼睛瞪大了一些，里面写满了惊讶，还有一丝藏不住的欣喜。' },
                    { name: '你', text: '你朋友圈发过。' },
                    { name: '内心', text: '（糟了，是不是显得我很在意？）' },
                    { name: '', text: '你假装若无其事地把奶茶推到她面前，却不敢看她的眼睛。' },
                    { name: '', text: '她低头喝了一口，嘴角扬起一个很小的弧度。' }
                  ],
                choices: [
                    { text: '主动找话题聊音乐', next: 10, effects: { '+initiative': 15, '+understanding': 10, '+trust': 3 } },
                    { text: '安静自习', next: 11, effects: { '+understanding': 3 } }
                ]
            },
            {
                id: 'm_08',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '', text: '聊了几句，到饭点了。你的肚子不合时宜地叫了一声，你赶紧用手捂住。' },
                    { name: '', text: '食堂里人声鼎沸，各种菜香混合在一起。你排在队伍里，百无聊赖地往前挪动。' },
                    { name: '', text: '一抬头，刚好看到她站在不远处的另一个窗口前，正低头看着菜单。' },
                    { name: '苏念', text: '好巧。' },
                    { name: '', text: '她先发现了你，冲你挥了挥手，嘴角带着笑。你的心跳突然加速了。' }
                  ],
                choices: [
                    { text: '一起吃饭吗', next: 12, effects: { '+affection': 10 }, crossFlag: 'male_ch2_care' },
                    { text: '打个招呼就好', next: 13, crossFlag: 'male_ch2_casual' }
                ]
            },
            {
                id: 'm_09',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '', text: '下课铃响了，你和她前后脚到了食堂门口。' },
                    { name: '苏念', text: '（端着餐盘四处张望）' },
                    { name: '', text: '她的目光扫过一张张桌子，眉头微微皱起，像是在找一个合适的位置。' },
                    { name: '', text: '午后的阳光从食堂的高窗照进来，在她的餐盘上投下一小片光斑。' },
                    { name: '内心', text: '（她在找座位……我要不要过去？）' },
                    { name: '', text: '你的手指无意识地摩挲着餐盘边缘，心跳越来越快。' }
                  ],
                choices: [
                    { text: '坐她对面', next: 14, effects: { '+affection': 5, '+understanding': 3, '+trust': 3 } },
                    { text: '问她要不要一起散步', next: 15, effects: { '+initiative': 15, '+affection': 3, '+understanding': 3 } }
                ]
            },
            {
                id: 'm_10',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '你', text: '你在听什么歌？' },
                    { name: '', text: '你假装不经意地问，实际上这个问题你在心里排练了好几遍。' },
                    { name: '苏念', text: '周杰伦的新歌……你也听吗？' },
                    { name: '你', text: '我也喜欢！特别是那首……' },
                    { name: '', text: '你们聊了很久，从音乐聊到电影，从电影聊到各自喜欢的书。窗外的阳光慢慢西斜。' },
                    { name: '', text: '她说到开心的时候眼睛会弯起来，你发现自己一直在看她。' },
                    { name: '内心', text: '（原来我们有这么多共同点。）' },
                    { name: '', text: '你觉得和她聊天挺舒服的，时间也过得很快。' }
                  ],
                next: 16
            },
            {
                id: 'm_11',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '', text: '你们安静地自习了一下午。' },
                    { name: '', text: '图书馆里只有翻书和笔尖划过纸张的沙沙声，偶尔夹杂着某人轻轻咳嗽的声音。' },
                    { name: '', text: '你假装在做题，实际上心思早就飞到了她那边。' },
                    { name: '', text: '偶尔抬头，发现她也在看你。两人的视线在空中交汇了一瞬，又各自慌乱地低下头。' },
                    { name: '内心', text: '（那种眼神……是错觉吗？）' },
                    { name: '', text: '你的耳朵烧了起来，赶紧拿起水杯喝了一大口，却呛得咳嗽起来。' }
                  ],
                next: 16
            },
            {
                id: 'm_12',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '你', text: '一起吃吗？' },
                    { name: '苏念', text: '好呀。' },
                    { name: '', text: '她坐在你对面，把餐盘轻轻放下。' },
                    { name: '', text: '你注意到她盘子里只有寥寥几根青菜和一小勺米饭。' },
                    { name: '你', text: '你怎么吃这么少？' },
                    { name: '苏念', text: '减肥……' },
                    { name: '你', text: '你已经很瘦了。' },
                    { name: '', text: '话出口的瞬间你就后悔了，这话说得太过直白。但看到她突然红透的耳根，你又不后悔了。' },
                    { name: '内心', text: '（她脸红了！）' },
                    { name: '', text: '她低下头，用筷子戳着碗里的饭，嘴角却悄悄扬了起来。' }
                  ],
                next: 17
            },
            {
                id: 'm_13',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '你', text: '好巧。' },
                    { name: '苏念', text: '嗯，我先去占座了。' },
                    { name: '', text: '她冲你点了点头，转身朝食堂深处走去。你的目光追随着她的背影，直到她消失在人群中。' },
                    { name: '', text: '食堂里的喧闹声仿佛一下子变远了，你独自站在原地，手里还端着没动过的餐盘。' },
                    { name: '内心', text: '（我应该邀请她的。）' },
                    { name: '', text: '你叹了口气，随便找了个角落的位置坐下，食不知味地拨弄着饭菜。' }
                  ],
                next: 18
            },
            {
                id: 'm_14',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '', text: '你端着盘子走到她面前，在她对面坐下。塑料椅子发出轻微的吱呀声。' },
                    { name: '苏念', text: '（愣了一下）这里有人吗？' },
                    { name: '', text: '她的眼睛里闪过一丝惊讶，但你分明看到了一抹藏不住的笑意。' },
                    { name: '你', text: '现在有了。' },
                    { name: '', text: '你努力让自己的语气听起来轻松随意，但握着筷子的手却微微发紧。' },
                    { name: '苏念', text: '（低头笑了）' },
                    { name: '', text: '她低头笑了，你看得有点出神。' }
                  ],
                next: 17
            },
            {
                id: 'm_15',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '你', text: '吃完饭要不要走走？' },
                    { name: '', text: '你的声音比平时轻了一些，像是在怕惊扰了什么。' },
                    { name: '苏念', text: '去哪？' },
                    { name: '你', text: '操场？听说傍晚的夕阳很好看。' },
                    { name: '', text: '她歪着头想了想，发丝从肩头滑落下来。你屏住呼吸等待着她的回答。' },
                    { name: '苏念', text: '好。' },
                    { name: '', text: '就一个字，却让你整个人都亮了起来。' }
                  ],
                next: 19
            },
            {
                id: 'm_16',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '', text: '从图书馆出来，夕阳把走廊染成金色。你们的影子被拉得很长，在墙上交叠在一起。' },
                    { name: '苏念', text: '今天收获挺大的。' },
                    { name: '你', text: '我也是……不仅学了知识。' },
                    { name: '苏念', text: '（看了你一眼）还有什么？' },
                    { name: '', text: '她看着你，你感觉有点不自在。' },
                    { name: '你', text: '还知道你喜欢周杰伦。' },
                    { name: '苏念', text: '（笑了）这算什么收获。' },
                    { name: '', text: '她笑了，你也不自觉地跟着笑了。' },
                    { name: '你', text: '很重要的收获。' },
                    { name: '', text: '说完这句话，你的耳根又红了。' }
                  ],
                choices: [
                    { text: '问她晚上有空聊天吗', next: 20, effects: { '+initiative': 10, '+affection': 3, '+trust': 3 } },
                    { text: '送她到宿舍楼下', next: 21, effects: { '+initiative': 5, '+affection': 3 } }
                ]
            },
            {
                id: 'm_17',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '', text: '从食堂出来，她走在你旁边。晚风带着一丝凉意，吹起她耳边的碎发。' },
                    { name: '苏念', text: '今天的菜有点咸。' },
                    { name: '你', text: '下次我帮你挑一家好吃的？' },
                    { name: '苏念', text: '你还知道哪家好吃？' },
                    { name: '你', text: '我可以带你去。' },
                    { name: '', text: '话一出口你就紧张起来，这话说得也太像在约她了。' },
                    { name: '内心', text: '（她没拒绝！）' },
                    { name: '', text: '她低下头，嘴角却悄悄弯了起来。你的心脏狂跳不止，脚步也变得轻快起来。' }
                  ],
                next: 19
            },
            {
                id: 'm_18',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '', text: '一天就这样过去了。' },
                    { name: '', text: '你躺在床上，盯着天花板，脑海中不断回放着今天发生的每一个细节。' },
                    { name: '内心', text: '（如果当时我主动一点……）' },
                    { name: '', text: '月光从窗帘的缝隙里溜进来，在地板上投下一道银白色的光带。' },
                    { name: '内心', text: '（明天还有机会吗？）' },
                    { name: '', text: '你翻了个身，把脸埋进枕头里，无声地叹了口气。' }
                  ],
                choices: [
                    { text: '重新来过', next: 0 }
                ]
            },
            {
                id: 'm_19',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '', text: '操场上人不多，夕阳把跑道染成橘红色。远处有几个学生在打篮球，球鞋摩擦地面的声音断断续续地传来。' },
                    { name: '苏念', text: '风吹过来好舒服。' },
                    { name: '', text: '她闭上眼睛，微微仰起头，让晚风拂过脸颊。你看着她，觉得这一幕挺好看的。' },
                    { name: '你', text: '是啊。' },
                    { name: '', text: '你们并排走着，影子被拉得很长，在跑道上交叠、分开，又交叠。' },
                    { name: '', text: '你的手指悄悄靠近她的手，又缩了回来，反复几次，始终没敢真的触碰。' },
                    { name: '内心', text: '（如果时间能停在这一刻就好了。）' }
                  ],
                next: 22
            },
            {
                id: 'm_20',
                visual: {
                    background: '#f0e6d2'
                },
                dialogue: [
                    { name: '', text: '晚上十点，你给她发消息。' },
                    { name: '', text: '你盯着手机屏幕，输入框里的光标一闪一闪，像是在催促你。' },
                    { name: '你', text: '「睡了吗？」' },
                    { name: '', text: '发送出去之后，你把手机放在胸口，感受着心跳的节奏。' },
                    { name: '苏念', text: '「还没，在看剧。」' },
                    { name: '', text: '你们从剧聊到演员，从演员聊到各自的生活。话题像是永远不会枯竭的泉水，源源不断地涌出来。' },
                    { name: '苏念', text: '「明天见。」' },
                    { name: '', text: '你盯着那三个字看了好几遍。' },
                    { name: '内心', text: '（明天见。三个字，让人期待了一整晚。）' }
                  ],
                next: 22
            },
            {
                id: 'm_21',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '', text: '你们默默地走到宿舍楼下。路灯把你们的影子拉得很长，在水泥地上交叠在一起。' },
                    { name: '苏念', text: '那我上去了。' },
                    { name: '', text: '她转过身，发丝在夜风里轻轻飘动。你突然有种冲动，想要叫住她。' },
                    { name: '你', text: '嗯……晚安。' },
                    { name: '苏念', text: '晚安。' },
                    { name: '', text: '她朝你挥了挥手，转身走进了楼道。你站在原地，看着她的背影消失在楼梯拐角。' },
                    { name: '内心', text: '（是不是应该说点什么？）' },
                    { name: '', text: '夜风有点凉，你裹紧了外套，却挡不住心底那一丝淡淡的遗憾。' }
                  ],
                next: 22
            },
            {
                id: 'm_22',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '', text: '手机震动，是她发来的消息。' },
                    { name: '', text: '你几乎是条件反射般地抓起手机，屏幕上跳出她的头像。' },
                    { name: '苏念', text: '「今天很开心。」' },
                    { name: '', text: '你盯着那四个字看了很久，拇指悬在屏幕上方，迟迟不知道该回复什么。' },
                    { name: '内心', text: '（我也是。）' },
                    { name: '你', text: '「我也是。」' },
                    { name: '', text: '发送出去之后，你放下手机，看着天花板发呆。' },
                    { name: '', text: '靠近，原来就是这样一点一点发生的。' }
                  ],
                choices: [
                    { text: '第二章 完', next: 'chapter_end' }
                ]
            }
        ]
    },

    female: {
        title: '靠近 · 试探',
        scenes: [
            {
                id: 'f_00',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '', text: '新一天的课，你故意早到了几分钟。教室里空荡荡的，只有风扇在头顶嗡嗡作响。' },
                    { name: '', text: '你选了一个靠窗的位置坐下，把课本一本一本摆在桌上，像是在布置某种仪式。' },
                    { name: '内心', text: '（他今天会发消息吗？）' },
                    { name: '', text: '你的手指无意识地敲着桌面，发出轻微的哒哒声。窗外传来几声鸟鸣，你抬头看了一眼，又迅速低下头。' },
                    { name: '内心', text: '（如果他不发，我要主动吗？会不会显得太刻意？）' },
                    { name: '', text: '你咬了咬下唇，从书包里掏出手机，屏幕亮起的瞬间，你的心跳漏了一拍。' }
                  ],
                choices: [
                    { text: '假装看书等他', next: 1, effects: { '+understanding': 3 }, crossFlag: 'female_ch2_casual' },
                    { text: '主动发消息', next: 2, effects: { '+initiative': 10, '+trust': 3 }, crossFlag: 'female_ch2_care' }
                ]
            },
            {
                id: 'f_01',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '', text: '你翻开书，却一个字都没看进去。那些黑色的字符在眼前浮动，你完全不知道它们在说什么。' },
                    { name: '内心', text: '（他怎么还没来……）' },
                    { name: '', text: '你的目光时不时飘向教室门口，每一次有人经过，你的心脏都会不由自主地收紧一下。' },
                    { name: '', text: '门口传来脚步声。' },
                    { name: '', text: '那脚步声由远及近，不紧不慢。你赶紧低下头，假装对书上的某个段落产生了浓厚兴趣。' },
                    { name: '内心', text: '（是他吗？我要不要抬头？）' },
                    { name: '', text: '你的手指紧紧攥着书页边缘，指节因为用力而微微发白。' }
                  ],
                choices: [
                    { text: '抬头看他', next: 3, effects: { '+affection': 5 }, crossFlag: 'female_ch2_care' },
                    { text: '继续低头', next: 4, crossFlag: 'female_ch2_casual' }
                ]
            },
            {
                id: 'f_02',
                visual: {
                    background: '#f0e6d2'
                },
                dialogue: [
                    { name: '你', text: '「早安」' },
                    { name: '', text: '消息发出去，你立刻把手机扣在桌上，像是怕烫手一样。' },
                    { name: '内心', text: '（他会回吗？万一不回怎么办？我会不会很尴尬？）' },
                    { name: '', text: '你盯着反扣在桌上的手机，仿佛要用目光穿透黑色的屏幕。时间一分一秒地过去，每一秒都像是在煎熬。' },
                    { name: '', text: '手机震动。' },
                    { name: '', text: '你几乎是扑过去抓起手机，动作大到差点把桌上的水杯碰倒。' },
                    { name: '林远', text: '「早呀」' },
                    { name: '', text: '你盯着那个"早呀"看了好几遍，嘴角不受控制地上扬。' },
                    { name: '内心', text: '（秒回！他一直在看手机吗？）' }
                  ],
                crossTruths: [
                    {
                        flag: 'male_ch2_care',
                        dialogue: [
                            { name: '', text: '你不知道的是，他几乎是弹起来抓过手机的。那句"早呀"他看了好几遍，嘴角不受控制地上扬。' },
                            { name: '内心', text: '（原来他比我想象的还在意。）' }
                        ]
                    },
                    {
                        flag: 'male_ch2_casual',
                        dialogue: [
                            { name: '', text: '你不知道的是，他在教室门口站了很久。没收到你的消息，他有点失落，以为你并不期待。' },
                            { name: '内心', text: '（原来他那时是失落的。）' }
                        ]
                    }
                ],
                next: 5
            },
            {
                id: 'f_03',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '', text: '他走进教室，目光扫了一圈，落在你身上。' },
                    { name: '', text: '那一瞬间，你感觉自己的心跳漏了一拍。你赶紧低下头，假装在整理刘海。' },
                    { name: '内心', text: '（他在看我。）' },
                    { name: '', text: '脚步声越来越近，在你旁边的位置停了下来。' },
                    { name: '', text: '他径直走过来，坐在你旁边。椅子挪动的声音在安静的教室里格外清晰。' },
                    { name: '林远', text: '早。' },
                    { name: '你', text: '早……' },
                    { name: '', text: '你的声音轻得像是蚊子叫。你偷偷瞥了他一眼，发现他也在看你，目光交汇的瞬间，你们同时低下了头。' }
                  ],
                next: 6
            },
            {
                id: 'f_04',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '', text: '他走进教室，目光在你这边停留了一秒，然后移开了。' },
                    { name: '', text: '你看着他径直走向后排，在那个熟悉的位置坐下。心里像是有什么东西轻轻沉了一下。' },
                    { name: '内心', text: '（没坐过来……）' },
                    { name: '', text: '你低下头，假装在看书，却一个字也没看进去。' },
                    { name: '内心', text: '（可能我想多了。他也许只是随便坐坐。）' },
                    { name: '', text: '你咬了咬嘴唇，把那一丝失落咽回肚子里。' }
                  ],
                next: 6
            },
            {
                id: 'f_05',
                visual: {
                    background: '#f0e6d2'
                },
                dialogue: [
                    { name: '林远', text: '「今天课多吗？」' },
                    { name: '', text: '手机屏幕亮起的时候，你正在发呆。看到他的名字，你的眼睛一下子亮了起来。' },
                    { name: '你', text: '「还好，下午没课。」' },
                    { name: '', text: '你打完字，又补了一个猫咪表情包，发出去之后立刻后悔了。' },
                    { name: '内心', text: '（会不会太可爱了？显得我很幼稚？）' },
                    { name: '林远', text: '「要不要一起去图书馆？」' },
                    { name: '', text: '你盯着那条消息看了很久，屏幕都快被你盯出洞来了。' },
                    { name: '内心', text: '（他在约我？）' },
                    { name: '你', text: '「好。」' }
                  ],
                next: 7
            },
            {
                id: 'f_06',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '', text: '下课铃响了，你收拾书包，动作比平时慢了一些。' },
                    { name: '', text: '你一边把课本往包里塞，一边用余光注意着后排的动静。' },
                    { name: '', text: '他走过来。你的心跳随着他的脚步一起加速。' },
                    { name: '林远', text: '一起去食堂吗？' },
                    { name: '', text: '他的声音有点紧张，你注意到他的手指无意识地敲着裤缝。' },
                    { name: '内心', text: '（他在约我吃饭？）' },
                    { name: '', text: '你低下头，假装在拉拉链，实际上是在掩饰自己发烫的脸颊。' }
                  ],
                choices: [
                    { text: '好', next: 8, effects: { '+affection': 10 }, crossFlag: 'female_ch2_care' },
                    { text: '你先去吧，我等人', next: 9, crossFlag: 'female_ch2_casual' }
                ]
            },
            {
                id: 'f_07',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '', text: '你提前到了图书馆，占了个靠窗的位置。阳光透过玻璃洒在桌面上，暖洋洋的。' },
                    { name: '', text: '你整理着桌面，把书本摆得整整齐齐。' },
                    { name: '', text: '他带了奶茶，居然是你喜欢的口味。冰凉的杯壁上凝着水珠，在桌面上留下一小圈水渍。' },
                    { name: '你', text: '谢谢……你怎么知道我喜欢这个？' },
                    { name: '林远', text: '你朋友圈发过。' },
                    { name: '', text: '你的心跳漏了一拍。你确实发过，但那已经是很久以前的事了。' },
                    { name: '内心', text: '（他居然记得……）' },
                    { name: '', text: '你低头喝了一口奶茶，甜意从舌尖一直蔓延到心底。' }
                  ],
                choices: [
                    { text: '主动找话题聊音乐', next: 10, effects: { '+initiative': 10, '+understanding': 10, '+trust': 3 } },
                    { text: '安静自习', next: 11, effects: { '+understanding': 3 } }
                ]
            },
            {
                id: 'f_08',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '', text: '你们面对面坐着。食堂里的喧嚣声像是一道无形的屏障，把你们和外界隔离开来。' },
                    { name: '林远', text: '你怎么吃这么少？' },
                    { name: '', text: '他的目光落在你的餐盘上，眉头微微皱起，像是在担心什么。' },
                    { name: '你', text: '减肥……' },
                    { name: '林远', text: '你已经很瘦了。' },
                    { name: '', text: '你的筷子悬在半空，突然忘了自己接下来要夹什么。' },
                    { name: '内心', text: '（他怎么突然这么说……）' },
                    { name: '', text: '你感觉脸有点烫，赶紧低下头，假装对碗里那几根青菜产生了浓厚兴趣。' }
                  ],
                next: 12
            },
            {
                id: 'f_09',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '林远', text: '好，那我先走了。' },
                    { name: '', text: '他冲你挥了挥手，转身离开。你看着他的背影，嘴巴张了张，却什么也没说出来。' },
                    { name: '', text: '他走远了。食堂里的人来人往，你却觉得周围一下子安静了下来。' },
                    { name: '内心', text: '（我为什么要说等人……明明没人等我。）' },
                    { name: '', text: '你低下头，用筷子戳着碗里的饭，食不知味。' },
                    { name: '', text: '窗外的阳光移走了，你的座位陷入一片阴影。' }
                  ],
                next: 13
            },
            {
                id: 'f_10',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '你', text: '你在听什么歌？' },
                    { name: '', text: '你假装不经意地问，实际上这个问题你在心里排练了好几遍。' },
                    { name: '林远', text: '周杰伦……你也听吗？' },
                    { name: '你', text: '我也喜欢！' },
                    { name: '', text: '你的声音比预想中的大了一些，你赶紧捂住嘴，眼睛却不自觉地弯了起来。' },
                    { name: '', text: '你们聊了很久，从最喜欢的专辑聊到某首歌里的某句歌词。你发现你们喜欢的居然出奇地相似。' },
                    { name: '内心', text: '（原来我们有这么多共同点。）' },
                    { name: '', text: '窗外的阳光慢慢西斜，你们却浑然不觉。' }
                  ],
                next: 14
            },
            {
                id: 'f_11',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '', text: '安静的午后，阳光透过窗户洒进来，在桌面上投下一格格明亮的光斑。' },
                    { name: '', text: '图书馆里安静得能听见翻书的声音。你假装在做题，实际上心思早就飞到了对面。' },
                    { name: '', text: '你偶尔抬头，发现他也在看你。两人的视线在空中交汇了一瞬，又各自慌乱地低下头。' },
                    { name: '内心', text: '（那种眼神……是错觉吗？）' },
                    { name: '', text: '你的耳朵烧了起来，赶紧拿起水杯喝了一口，却发现水杯已经空了。' },
                    { name: '', text: '你尴尬地放下杯子，假装在找笔，实际上是在掩饰自己发烫的脸颊。' }
                  ],
                next: 14
            },
            {
                id: 'f_12',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '', text: '从食堂出来，他走在你旁边。晚风带着一丝凉意，吹起你耳边的碎发。' },
                    { name: '林远', text: '今天的菜有点咸。' },
                    { name: '你', text: '是啊。' },
                    { name: '林远', text: '下次我帮你挑一家好吃的？' },
                    { name: '你', text: '你还知道哪家好吃？' },
                    { name: '林远', text: '我可以带你去。' },
                    { name: '', text: '你的心跳漏了一拍。"带你去"——这话说得也太像在约你了吧。' },
                    { name: '内心', text: '（他没拒绝？不对，是我没拒绝。）' },
                    { name: '', text: '你低下头，嘴角却不受控制地上扬。手指无意识地卷着书包带子，一圈又一圈。' }
                  ],
                next: 15
            },
            {
                id: 'f_13',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '', text: '一天就这样过去了。' },
                    { name: '', text: '你躺在床上，盯着天花板，脑海中不断回放着今天发生的每一个细节。' },
                    { name: '内心', text: '（如果当时我答应了……）' },
                    { name: '', text: '月光从窗帘的缝隙里溜进来，在地板上投下一道银白色的光带。' },
                    { name: '', text: '你翻了个身，把脸埋进枕头里，无声地叹了口气。' },
                    { name: '内心', text: '（明天还有机会吗？）' }
                  ],
                choices: [
                    { text: '重新来过', next: 0 }
                ]
            },
            {
                id: 'f_14',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '', text: '从图书馆出来，夕阳很美。天边被染成了橘红色和粉紫色，看起来挺好看的。' },
                    { name: '林远', text: '今天收获挺大的。' },
                    { name: '你', text: '我也是……' },
                    { name: '林远', text: '还知道你喜欢周杰伦。' },
                    { name: '你', text: '（笑了）这算什么收获。' },
                    { name: '林远', text: '很重要的收获。' },
                    { name: '', text: '他说这句话的时候，目光认真地落在你脸上。你感觉自己的心跳漏了一拍。' },
                    { name: '内心', text: '（他什么意思……）' },
                    { name: '', text: '你低下头，假装在看地上的落叶，实际上嘴角已经悄悄扬了起来。' }
                  ],
                next: 16
            },
            {
                id: 'f_15',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '', text: '操场上人不多，夕阳把影子拉得很长。你们的影子在跑道上交叠、分开，又交叠。' },
                    { name: '林远', text: '风吹过来好舒服。' },
                    { name: '你', text: '是啊。' },
                    { name: '', text: '你们并排走着，距离近得能闻到他身上淡淡的洗衣液香味。' },
                    { name: '', text: '你的手指悄悄靠近他的手，又缩了回来，反复几次，始终没敢真的触碰。' },
                    { name: '内心', text: '（希望能多走一会儿。）' },
                    { name: '', text: '远处的篮球场上传来几声呼喊，你们同时抬头看去，又同时笑了起来。' }
                  ],
                next: 17
            },
            {
                id: 'f_16',
                visual: {
                    background: '#f0e6d2'
                },
                dialogue: [
                    { name: '', text: '晚上十点，手机震动。' },
                    { name: '', text: '你几乎是条件反射般地抓起手机，屏幕上跳出他的头像。' },
                    { name: '林远', text: '「睡了吗？」' },
                    { name: '你', text: '「还没。」' },
                    { name: '', text: '你们聊到挺晚，从今天的课程聊到喜欢的电影，又从电影聊到假期打算做什么。' },
                    { name: '你', text: '「明天见。」' },
                    { name: '', text: '发完这条，你把脸埋进枕头里，手机屏幕的冷光映在你的脸上。' },
                    { name: '内心', text: '（明天见。三个字，心跳得好快。）' }
                  ],
                next: 17
            },
            {
                id: 'f_17',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '', text: '手机又震了一下。' },
                    { name: '', text: '你慌忙从枕头里探出头，抓起手机。' },
                    { name: '林远', text: '「今天很开心。」' },
                    { name: '', text: '你盯着那四个字看了很久，拇指悬在屏幕上方，迟迟不知道该回复什么。' },
                    { name: '你', text: '「我也是。」' },
                    { name: '', text: '发送出去之后，你放下手机，盯着天花板发了会儿呆。' },
                    { name: '', text: '靠近，原来就是这样一点一点发生的。' }
                  ],
                choices: [
                    { text: '第二章 完', next: 'chapter_end' }
                ]
            }
        ]
    }
};

window.chapter2 = chapter2;
