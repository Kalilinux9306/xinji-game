const chapter1 = {
    male: {
        title: '目光 · 初遇',
        scenes: [
            {
                id: 'm_00',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '', text: '九月的阳光透过教室窗户斜斜地洒进来，在课桌上投下一格格明亮的光斑。空气里还残留着暑假特有的慵懒，连风扇转动的声音都显得格外缓慢。' },
                    { name: '', text: '你坐在教室后排靠窗的位置，百无聊赖地转着笔。笔尖在指间一圈一圈地旋转，发出轻微的咔哒声。' },
                    { name: '内心', text: '（新学期了啊……不知道这学期会不会有什么不一样。）' },
                    { name: '', text: '你的视线不自觉地飘向教室前方。前排靠走廊的位置坐着一个陌生的女生，她正低头整理着刚领来的课本，发丝随着动作轻轻晃动。' },
                    { name: '内心', text: '（等等，那个人……之前没见过。是新转来的吗？）' },
                    { name: '', text: '你握笔的手不自觉地紧了紧。阳光正好落在她的侧脸上，你莫名觉得那个画面有点好看，又赶紧低下头，假装在看窗外的梧桐树。' },
                    { name: '内心', text: '（好像……有点在意啊。）' }
                  ],
                choices: [
                    { text: '继续偷偷看她', next: 1, effects: { '+affection': 5 } },
                    { text: '低头玩手机', next: 2, effects: { '+affection': 0 }, crossFlag: 'male_ch1_passive' }
                ]
            },
            {
                id: 'm_01',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '内心', text: '（忍不住又看过去了……）' },
                    { name: '', text: '阳光偏移了几分，她的发梢被照得微微透明。你注意到她头发上粘着一片很小的叶子，大概是风吹进来的，她似乎完全没发现。' },
                    { name: '内心', text: '（她头发上有片落叶……要去告诉她吗？）' },
                    { name: '', text: '你犹豫了几秒，目光又落在她摊开的笔记本上。字迹清秀整齐，每一行都保持着恰到好处的间距。' },
                    { name: '内心', text: '（她认真记笔记的样子，还挺可爱的。）' },
                    { name: '', text: '讲台上的老师正在板书，粉笔划过黑板的声音在安静的教室里格外清晰。你不自觉地调整了一下坐姿，想看得更清楚一些。' },
                    { name: '内心', text: '（不行，不能一直盯着看，太明显了。）' },
                    { name: '', text: '你强迫自己移开视线，盯着课本上早已看过的同一页，却发现一个字也没读进去。' }
                  ],
                interactables: [
                    {
                        id: 'leaf',
                        x: 28, y: 32, width: 40, height: 40,
                        hint: '一片落叶',
                        visible: false,
                        dialogue: [
                            { name: '', text: '你深吸一口气，轻轻拍了拍她的肩膀。' },
                            { name: '你', text: '那个……你头发上有片叶子。' },
                            { name: '？', text: '啊？' },
                            { name: '', text: '她愣了一下，抬手摸了摸头发，把那片叶子取了下来。脸微微红了。' },
                            { name: '？', text: '谢、谢谢……' },
                            { name: '内心', text: '（她脸红了！好可爱……）' }
                        ],
                        effects: { '+affection': 15, '+initiative': 10 },
                        next: 3
                    },
                    {
                        id: 'notebook',
                        x: 15, y: 55, width: 50, height: 30,
                        hint: '笔记本',
                        visible: false,
                        dialogue: [
                            { name: '', text: '你假装不经意地瞥向她的笔记本。' },
                            { name: '内心', text: '（笔记写得真工整，字也很好看，是那种很秀气的楷书。）' },
                            { name: '', text: '页边还画了一只小小的猫，你差点没忍住笑出声。' }
                        ],
                        effects: { '+understanding': 5 },
                        next: 3
                    }
                ],
                choices: [
                    { text: '直接搭话', next: 4, effects: { '+initiative': 10 }, crossFlag: 'male_ch1_active' },
                    { text: '等下课再说', next: 5 }
                ]
            },
            {
                id: 'm_02',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '内心', text: '（算了，刷会儿手机吧。一直盯着人家看太奇怪了。）' },
                    { name: '', text: '你掏出手机，屏幕的冷光映在脸上。朋友圈里都是新学期的吐槽和立下的flag，你机械地往下滑动，心思却完全不在上面。' },
                    { name: '内心', text: '（也不知道她在做什么……）' },
                    { name: '', text: '一节课就这样浑浑噩噩地过去了。窗外的梧桐叶沙沙作响，你什么都没做，甚至连手机什么时候黑屏了都没注意到。' },
                    { name: '内心', text: '（浪费时间……但刚才要是主动搭话就好了。）' },
                    { name: '', text: '你揉了揉发酸的眼睛，把笔塞回笔袋。教室里的人开始收拾东西，你也慢吞吞地站了起来。' }
                  ],
                choices: [
                    { text: '下课去认识她', next: 5, effects: { '+initiative': 5 } },
                    { text: '算了，随缘吧', next: 6 }
                ]
            },
            {
                id: 'm_03',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '？', text: '你是……？' },
                    { name: '', text: '她的眼睛很干净，带着一点警惕，又有一点好奇。' },
                    { name: '你', text: '我叫林远，坐你后排。' },
                    { name: '', text: '话一出口你就后悔了——这自我介绍也太普通了。你下意识抓了抓后脑勺，指尖触到微微发烫的耳根。' },
                    { name: '？', text: '哦……谢谢。' },
                    { name: '', text: '她抿了抿嘴唇，声音很轻。你注意到她的睫毛很长，在眼下投出一小片阴影。' },
                    { name: '内心', text: '（她好像有点害羞……是我的错觉吗？）' }
                  ],
                crossTruths: [
                    {
                        flag: 'female_ch1_active',
                        dialogue: [
                            { name: '', text: '你不知道的是，她其实早就注意到你了。被搭话的那一刻，她的心跳快得不像话，手指无意识地攥紧了课本边缘。' },
                            { name: '内心', text: '（原来她一直在等我开口。）' }
                        ]
                    },
                    {
                        flag: 'female_ch1_passive',
                        dialogue: [
                            { name: '', text: '你不知道的是，她其实完全没预料到你会过来。被搭话时愣了一下，耳尖悄悄红了起来。' },
                            { name: '内心', text: '（原来她那时是意外的。）' }
                        ]
                    }
                ],
                choices: [
                    { text: '要加微信吗？', next: 7, effects: { '+initiative': 15 }, crossFlag: 'male_ch1_active' },
                    { text: '不打扰你了', next: 5, crossFlag: 'male_ch1_passive' }
                ]
            },
            {
                id: 'm_04',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '', text: '下课铃响起的瞬间，你感觉自己的心跳漏了一拍。' },
                    { name: '你', text: '那个……你好？' },
                    { name: '？', text: '嗯？' },
                    { name: '', text: '她抬起头，阳光从她身后照过来，让她整个人看起来柔和了不少。' },
                    { name: '你', text: '我是后排的，看你好像是新来的？' },
                    { name: '', text: '你的声音比平时稍微高了一点，连自己都能听出其中的紧张。手指不自觉地敲了敲裤缝，像是在给自己打拍子。' },
                    { name: '内心', text: '（加油啊，至少把话说完。）' }
                  ],
                choices: [
                    { text: '自我介绍', next: 7, effects: { '+initiative': 5 } },
                    { text: '问她名字', next: 8, effects: { '+initiative': 3 } }
                ]
            },
            {
                id: 'm_05',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '', text: '下课铃响了。' },
                    { name: '', text: '清脆的铃声在走廊里回荡，教室里顿时嘈杂起来。椅子挪动的声音、书包拉链的哗啦声、同学之间的招呼声交织在一起。' },
                    { name: '内心', text: '（她收拾书包准备走了……）' },
                    { name: '', text: '你看着她弯腰把课本一本一本放进包里，动作不紧不慢。发丝从耳后滑落下来，她抬手别到耳后，露出纤细的颈线。' },
                    { name: '内心', text: '（要追上去吗？还是就这样让她走掉？）' },
                    { name: '', text: '你的手指无意识地抓紧了桌沿，掌心微微出汗。窗外的阳光正好移到了她的座位上，那里很快就会空下来。' }
                  ],
                interactables: [
                    {
                        id: 'follow',
                        x: 50, y: 50, width: 100, height: 100,
                        hint: '跟上她',
                        visible: true,
                        dialogue: [
                            { name: '', text: '你快步跟了上去，保持着不远不近的距离。' },
                            { name: '', text: '走廊里弥漫着阳光晒过的灰尘气味，她的脚步不紧不慢，帆布鞋踩在地砖上发出轻微的声响。' },
                            { name: '', text: '你跟着她走到了走廊。' }
                        ],
                        effects: { '+initiative': 5 },
                        next: 9
                    }
                ],
                choices: [
                    { text: '追上她', next: 9, effects: { '+initiative': 5 }, crossFlag: 'male_ch1_active' },
                    { text: '算了', next: 6, crossFlag: 'male_ch1_passive' }
                ]
            },
            {
                id: 'm_06',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '', text: '教室里的人渐渐走光了。' },
                    { name: '', text: '夕阳从窗户斜射进来，把空荡的课桌染成橘红色。你独自坐在座位上，看着前排那个已经空了的椅子。' },
                    { name: '内心', text: '（就这样错过了吗……）' },
                    { name: '', text: '一阵风吹过，窗外的梧桐叶沙沙作响。' },
                    { name: '内心', text: '（也许缘分就是这样，需要一点勇气。）' },
                    { name: '', text: '你叹了口气，把书包甩到肩上，金属扣撞击的声音在安静的教室里格外响亮。' }
                  ],
                choices: [
                    { text: '重新来过', next: 0 }
                ]
            },
            {
                id: 'm_07',
                visual: {
                    background: '#f0e6d2'
                },
                dialogue: [
                    { name: '你', text: '加个微信吗？以后有作业可以问你。' },
                    { name: '', text: '话刚说出口你就想咬掉舌头。这借口也太蹩脚了——你明明从来没问过别人作业。' },
                    { name: '？', text: '……好吧。' },
                    { name: '', text: '她犹豫了一瞬，还是点了点头。你连忙掏出手机，手指因为紧张而微微发抖，差点没拿稳。' },
                    { name: '内心', text: '（她答应了！等一下，验证消息发什么好呢……）' },
                    { name: '', text: '扫码成功的提示音响起，你盯着那个好友申请界面，心跳比平时快了不少。' },
                    { name: '内心', text: '（不能太随意，也不能太刻意……）' }
                  ],
                choices: [
                    { text: '写"后排的林远"', next: 10, effects: { '+understanding': 5 } },
                    { text: '写"同学你好"', next: 10, effects: { '+understanding': 3 } },
                    { text: '什么都不写', next: 10, effects: { '+affection': 2 } }
                ]
            },
            {
                id: 'm_08',
                visual: {
                    background: '#f0e6d2'
                },
                dialogue: [
                    { name: '？', text: '我叫苏念。' },
                    { name: '', text: '她的声音很轻。' },
                    { name: '你', text: '苏念……很好听的名字。' },
                    { name: '', text: '你在心里默念了一遍。苏念。名字还挺好听的。' },
                    { name: '内心', text: '（苏念……我记住了。）' }
                  ],
                next: 7
            },
            {
                id: 'm_09',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '', text: '走廊里人来人往，你一眼就从人群中锁定了她的背影。' },
                    { name: '你', text: '等一下！' },
                    { name: '', text: '你的声音比想象中大了一些，引得旁边几个同学侧目。你顾不上尴尬，快步追了上去。' },
                    { name: '苏念', text: '……有事吗？' },
                    { name: '', text: '她转过身，眼神里带着一丝疑惑，但更多的是好奇。你站在她面前，突然发现自己的呼吸有些急促。' },
                    { name: '你', text: '我是后排的，想认识一下。' },
                    { name: '内心', text: '（这么说会不会太直接了……）' }
                  ],
                next: 7
            },
            {
                id: 'm_10',
                visual: {
                    background: '#f0e6d2'
                },
                dialogue: [
                    { name: '', text: '手机震动了一下。' },
                    { name: '', text: '你几乎是在第一时间抓起了手机。' },
                    { name: '苏念', text: '「已通过好友申请」' },
                    { name: '', text: '简单的几个字，却让你盯着看了好几秒。你的拇指悬在屏幕上方，不知道该不该立刻发消息。' },
                    { name: '内心', text: '（心跳得好快……现在该说什么？会不会太唐突？）' },
                    { name: '', text: '你全部注意力都集中在那小小的聊天框上。' },
                    { name: '内心', text: '（终于……加上她了。）' }
                  ],
                choices: [
                    { text: '发第一条消息', next: 11 }
                ]
            },
            {
                id: 'm_11',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '', text: '窗外的夕阳把整个教室染成了蜜糖色。' },
                    { name: '', text: '你坐在座位上，看着手机屏幕上那个新添加的头像。她的朋友圈封面是一片海，蓝得让人心醉。' },
                    { name: '内心', text: '（故事，从这里开始。）' },
                    { name: '', text: '秋风从窗户缝隙里溜进来，带着一丝凉意。' },
                    { name: '', text: '远处传来放学的铃声，你收起手机，嘴角不自觉地扬起。' }
                  ],
                choices: [
                    { text: '第一章 完', next: 'chapter_end' }
                ]
            }
        ]
    },
    
    female: {
        title: '目光 · 初遇',
        scenes: [
            {
                id: 'f_00',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '', text: '图书馆的落地窗很大，午后的阳光透过玻璃洒进来，把室内照得明亮而温暖。尘埃在光束里缓慢地漂浮着。' },
                    { name: '', text: '你坐在靠窗的位置，摊开一本刚借来的小说，却一页都没翻过去。' },
                    { name: '内心', text: '（新学期第一天，图书馆居然这么安静。）' },
                    { name: '', text: '你假装在看书，实际上余光一直在注意斜后方的动静。那个男生坐在你后排不远的位置，已经"不小心"看过来好几次了。' },
                    { name: '内心', text: '（后排那个男生……好像一直在看我？）' },
                    { name: '', text: '你的耳尖微微发热，赶紧低下头，假装对书上的某句话产生了浓厚兴趣。' },
                    { name: '内心', text: '（是我的错觉吗？还是……真的有人在看我？）' }
                  ],
                choices: [
                    { text: '假装没发现', next: 1, effects: { '+affection': 5 }, crossFlag: 'female_ch1_passive' },
                    { text: '回头看他一眼', next: 2, effects: { '+initiative': 5 }, crossFlag: 'female_ch1_active' }
                ]
            },
            {
                id: 'f_01',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '内心', text: '（不能被他发现我注意到了……太尴尬了。）' },
                    { name: '', text: '你强行把注意力集中在书页上，眼睛盯着同一行字看了足足半分钟，却完全不知道那句话在说什么。' },
                    { name: '内心', text: '（但他好像还挺好看的？不对，我根本没仔细看。）' },
                    { name: '', text: '你咬着下唇，手指无意识地卷着书页的边角，把那一小块纸都卷得起了毛边。' },
                    { name: '内心', text: '（不能再想了，看书看书。）' },
                    { name: '', text: '窗外传来几声鸟鸣，你借着翻页的动作，眼睛的余光又不受控制地飘了过去。' }
                  ],
                interactables: [
                    {
                        id: 'phone',
                        x: 70, y: 60, width: 30, height: 50,
                        hint: '手机',
                        visible: false,
                        dialogue: [
                            { name: '', text: '你的手机屏幕亮了一下，又暗了。' },
                            { name: '内心', text: '（他好像在玩手机……等等，是在发消息吗？还是在……偷拍？不会吧。）' },
                            { name: '', text: '你的心跳突然快了几拍，脸颊也跟着烫了起来。' }
                        ],
                        effects: { '+understanding': 5 }
                    }
                ],
                choices: [
                    { text: '偷偷看他', next: 3, effects: { '+affection': 3 }, crossFlag: 'female_ch1_active' },
                    { text: '专心看书', next: 4, crossFlag: 'female_ch1_passive' }
                ]
            },
            {
                id: 'f_02',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '', text: '你的视线刚好抬起，他的目光正好撞了过来。' },
                    { name: '', text: '那一秒钟好像被放慢了。你看到他明显愣了一下，然后迅速低下头，耳廓红了。' },
                    { name: '内心', text: '（他脸红了！好可爱……）' },
                    { name: '', text: '你赶紧低下头，假装在整理刘海，实际上自己的脸也在发烫。' },
                    { name: '内心', text: '（完了，他肯定发现我在看他了。）' },
                    { name: '', text: '书上的字在你眼前变成了一团模糊的黑影，你一个字也读不进去了。' }
                  ],
                next: 3
            },
            {
                id: 'f_03',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '', text: '手机在桌上震动了一下，你低头看去。' },
                    { name: '闺蜜消息', text: '「看到没，后排那个男生一直在看你」' },
                    { name: '内心', text: '（果然不是我的错觉……）' },
                    { name: '', text: '你的拇指悬在屏幕上方，不知道该回复什么。闺蜜的消息像是把窗户纸捅破了，让你的心跳彻底乱了节奏。' },
                    { name: '内心', text: '（他为什么看我？我脸上有什么东西吗？）' },
                    { name: '', text: '你下意识地摸了摸脸，又理了理头发，确认自己没有什么奇怪的地方。' }
                  ],
                choices: [
                    { text: '回复闺蜜"真的假的"', next: 5, effects: { '+initiative': 3 }, crossFlag: 'female_ch1_active' },
                    { text: '放下手机，继续看书', next: 4, crossFlag: 'female_ch1_passive' }
                ]
            },
            {
                id: 'f_04',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '', text: '你把手机翻了个面扣在桌上，深吸一口气，重新看向书本。' },
                    { name: '', text: '阳光从窗户移走了大半，图书馆里渐渐多了些凉意。你专注于书本上的文字，努力让自己沉浸到故事里去。' },
                    { name: '', text: '等你终于从书里的情节中回过神来，抬起头时，后排的位置已经空了。' },
                    { name: '内心', text: '（不知道什么时候走的……）' },
                    { name: '', text: '你看着那个空了的座位，心里莫名涌上一丝说不清的情绪，像是遗憾，又像是松了口气。' }
                  ],
                choices: [
                    { text: '有点后悔', next: 6, effects: { '+affection': 3 } },
                    { text: '无所谓', next: 7 }
                ]
            },
            {
                id: 'f_05',
                visual: {
                    background: '#f0e6d2'
                },
                dialogue: [
                    { name: '你', text: '「真的假的，我没注意」' },
                    { name: '', text: '你飞快地打着字，指尖因为紧张而微微发抖，打错了好几次。' },
                    { name: '闺蜜', text: '「真的！我帮你打听一下？」' },
                    { name: '你', text: '「别！太尴尬了……」' },
                    { name: '', text: '消息发出去，你立刻把手机屏幕朝下扣在桌上，像是怕被别人看到似的。' },
                    { name: '内心', text: '（万一她真的去打听怎么办……那我以后还怎么面对他。）' },
                    { name: '', text: '你揉了揉发烫的脸颊，重新拿起书，却一个字也看不进去。' }
                  ],
                next: 8
            },
            {
                id: 'f_06',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '', text: '书上的字看了第三遍，还是没能理解那段话的意思。' },
                    { name: '内心', text: '（应该抬头看一眼的……至少知道长什么样。）' },
                    { name: '', text: '你叹了口气，把书合上，发出轻轻的一声"啪"。' },
                    { name: '内心', text: '（算了，下次吧。如果还有下次的话。）' },
                    { name: '', text: '窗外的天色渐渐暗了下来，图书馆的灯亮了起来，暖黄色的光笼罩着你。' },
                    { name: '', text: '你收拾好东西，把椅子轻轻推回原位，脚步声在安静的阅览室里显得格外清晰。' }
                  ],
                next: 8
            },
            {
                id: 'f_07',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '', text: '你们就这样错过了。' },
                    { name: '', text: '后来的日子里，你偶尔会在校园里看到那个背影，却始终没有勇气上前确认。' },
                    { name: '内心', text: '（有时候，一个眼神就能改变一切。）' },
                    { name: '', text: '风从图书馆的窗户吹进来，翻动了桌上那本书的某一页。' },
                    { name: '', text: '你站在那里，突然有些后悔。' }
                  ],
                choices: [
                    { text: '重新来过', next: 0 }
                ]
            },
            {
                id: 'f_08',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '', text: '下课铃响了。' },
                    { name: '', text: '清脆的铃声在走廊里回荡，你收拾好书包，正准备离开，却感觉到一道视线落在自己身上。' },
                    { name: '内心', text: '（他走过来了？）' },
                    { name: '', text: '你的心跳突然加快了，手指无意识地抓紧了书包带子。脚步声越来越近，你闻到一股淡淡的洗衣液清香。' },
                    { name: '内心', text: '（怎么办，要不要抬头？）' }
                  ],
                next: 9
            },
            {
                id: 'f_09',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '', text: '一个有些紧张的声音在头顶响起。' },
                    { name: '？', text: '那个……你好？' },
                    { name: '', text: '你抬起头，对上了一双干净的眼睛。' },
                    { name: '你', text: '嗯？' },
                    { name: '', text: '你的声音听起来比自己预想的要平静一些，但心跳却快得很明显。' },
                    { name: '？', text: '我叫林远，坐你后排。' },
                    { name: '', text: '他挠了挠后脑勺，嘴角带着一个有些腼腆的笑。你注意到他的睫毛在灯光下投出一小片阴影。' }
                  ],
                crossTruths: [
                    {
                        flag: 'male_ch1_active',
                        dialogue: [
                            { name: '', text: '你不知道的是，他为了这一刻犹豫了很久。走到你面前之前，他在走廊里深呼吸了三次。' },
                            { name: '内心', text: '（原来他比我想象中还要紧张。）' }
                        ]
                    },
                    {
                        flag: 'male_ch1_passive',
                        dialogue: [
                            { name: '', text: '你不知道的是，他其实一直坐在位置上偷偷看你。直到你快走了，他才终于鼓起勇气。' },
                            { name: '内心', text: '（原来他一直在看，只是没敢过来。）' }
                        ]
                    }
                ],
                choices: [
                    { text: '自我介绍', next: 10, effects: { '+initiative': 5 } },
                    { text: '问他有什么事', next: 11, effects: { '+initiative': 3 } }
                ]
            },
            {
                id: 'f_10',
                visual: {
                    background: '#f0e6d2'
                },
                dialogue: [
                    { name: '', text: '你放下书包，重新坐回椅子上。' },
                    { name: '你', text: '我叫苏念。' },
                    { name: '', text: '说出自己名字的时候，你突然感到一阵没来由的紧张，手指无意识地绞在一起。' },
                    { name: '林远', text: '苏念……很好听。' },
                    { name: '', text: '他的声音很轻，像是在自言自语，但你还是听得一清二楚。' },
                    { name: '内心', text: '（他脸又红了。）' },
                    { name: '', text: '你低下头，假装在整理桌上的书本，实际上嘴角已经不受控制地上扬了一个微小的弧度。' }
                  ],
                next: 12
            },
            {
                id: 'f_11',
                visual: {
                    background: '#f0e6d2'
                },
                dialogue: [
                    { name: '林远', text: '没……就是想说，你头发上有片叶子。' },
                    { name: '', text: '他指了指你的头发，眼神飘向一边，不敢直视你。' },
                    { name: '你', text: '啊？谢谢……' },
                    { name: '', text: '你抬手摸了摸头发，果然摸到了一片干枯的落叶。你的脸颊瞬间烧了起来。' },
                    { name: '内心', text: '（原来是为了这个……我还以为……）' },
                    { name: '', text: '你赶紧把叶子丢掉，拍了拍手，假装若无其事的样子。' },
                    { name: '内心', text: '（我在期待什么啊，笨蛋。）' }
                  ],
                effects: { '+affection': 10 },
                next: 12
            },
            {
                id: 'f_12',
                visual: {
                    background: '#f0e6d2'
                },
                dialogue: [
                    { name: '', text: '沉默了几秒，他像是下定了什么决心似的，深吸了一口气。' },
                    { name: '林远', text: '那个……可以加个微信吗？' },
                    { name: '', text: '你的心脏漏跳了一拍。' },
                    { name: '内心', text: '（他居然主动了！）' },
                    { name: '', text: '你眨了眨眼，感觉自己的大脑有一瞬间的空白。手指无意识地摩挲着手机边缘，冰凉的触感让你稍微清醒了一些。' },
                    { name: '内心', text: '（要答应吗？当然要啊！）' }
                  ],
                choices: [
                    { text: '好啊', next: 13, effects: { '+affection': 15 } },
                    { text: '……好吧', next: 13, effects: { '+affection': 5 } }
                ]
            },
            {
                id: 'f_13',
                visual: {
                    background: '#fdfcf8'
                },
                dialogue: [
                    { name: '', text: '手机震动了一下。' },
                    { name: '', text: '你低头看去，屏幕上跳出一个新的好友申请。' },
                    { name: '', text: '「林远 请求添加你为好友」' },
                    { name: '内心', text: '（要通过吗？）' },
                    { name: '', text: '你盯着那个名字看了好几秒，拇指悬在"接受"按钮上方，迟迟按不下去。' },
                    { name: '内心', text: '（当然要通过了……但这显得我太急切了吗？）' },
                    { name: '', text: '你深吸一口气，终于点了下去。' },
                    { name: '', text: '「已添加对方为好友」' },
                    { name: '', text: '你看着那个聊天窗口，心跳快得像是在打鼓。故事，从这里开始。' }
                  ],
                choices: [
                    { text: '第一章 完', next: 'chapter_end' }
                ]
            }
        ]
    }
};

window.chapter1 = chapter1;