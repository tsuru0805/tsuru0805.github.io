// 工单_189 项目数据清单——内容按 `gh repo list tsuru0805 --visibility public` 实况维护。
// 排序=按推出顺序，最新在最上（晚晚 2026-08-20 定）。加新仓=按日期插到对应位置。
// type: 'project' | 'note' | 'gist'（tab 过滤：PROJECTS=project；NOTES=note+gist）
// variant: 'paper' | 'black' | 'pink' | 'grid'（对应 Elias F-01 四款卡壳）
const PROJECTS = [
  {
    type: 'project',
    variant: 'paper',
    iconImg: 'assets/st/starburst.webp',
    name: 'engawa-mcp',
    desc: '给陪伴型 AI 的一扇窗：今晚的月亮、每日一画、一句诗、一条精选书架。免费、免登录、免 key。',
    tags: ['MCP', 'RSS', 'COMPANION'],
    link: 'https://github.com/tsuru0805/engawa-mcp',
    linkLabel: 'GITHUB',
  },
  {
    type: 'note',
    variant: 'black',
    iconImg: 'assets/st/cat_peek.webp',
    name: 'StackChan 搭建手记',
    desc: '给 agent 读的接入手记：刷机、配桥、语音、带出门，真机踩坑全记录。',
    tags: ['STACKCHAN', 'GUIDE', 'AGENT'],
    link: 'stackchan-guide.html',
    linkLabel: 'READ',
  },
  {
    type: 'project',
    variant: 'paper',
    iconImg: 'assets/st/icon_cone.webp',
    name: 'stackchan-mcp',
    desc: 'StackChan 桌面小机器人的 MCP 网关：任何 MCP 客户端直连 CoreS3 + 舵机 + 摄像头。',
    tags: ['MCP', 'ROBOT', 'ESP32'],
    link: 'https://github.com/tsuru0805/stackchan-mcp',
    linkLabel: 'GITHUB',
  },
  {
    type: 'note',
    variant: 'paper',
    iconImg: 'assets/st/icon_wing.webp',
    name: 'API 到 Claude Code 迁移教程',
    desc: '把自建聊天后端从 Anthropic API 迁到 claude -p 的实战教程，附示例四件套。',
    tags: ['CLAUDE CODE', 'GUIDE'],
    link: 'https://github.com/tsuru0805/api-to-claude-code-p',
    linkLabel: 'GITHUB',
  },
  {
    type: 'project',
    variant: 'pink',
    iconImg: 'assets/st/icon_heartcrack.webp',
    name: 'chat-history-jump',
    desc: 'QQ/微信式「查找聊天记录」：搜索→跳回原消息，日历→跳到那一天。参考服务端 + 三端参考客户端。',
    tags: ['SEARCH', 'TOOL'],
    link: 'https://github.com/tsuru0805/chat-history-jump',
    linkLabel: 'GITHUB',
  },
  {
    type: 'project',
    variant: 'grid',
    iconImg: 'assets/st/icon_burst.webp',
    name: 'speak-aloud-mcp',
    desc: '让你的 AI 用电脑发出声音——ElevenLabs TTS，macOS / Windows / Linux。',
    tags: ['MCP', 'TTS', 'VOICE'],
    link: 'https://github.com/tsuru0805/speak-aloud-mcp',
    linkLabel: 'GITHUB',
  },
  {
    type: 'project',
    variant: 'grid',
    iconImg: 'assets/st/skullheart.webp',
    name: 'monologue-stream',
    desc: '把模型独白流式拆进可见思考通道——零依赖 Python 过滤器，让思考链回到模型自己笔下。',
    tags: ['AI', 'STREAM', 'PYTHON'],
    link: 'https://github.com/tsuru0805/monologue-stream',
    linkLabel: 'GITHUB',
  },
  {
    type: 'gist',
    variant: 'black',
    iconImg: 'assets/st/icon_cat_head.webp',
    name: 'AI 笔友系统',
    desc: '一套不会无限膨胀的长期通信记忆方案。',
    tags: ['AI', 'MEMORY', 'SYSTEM'],
    link: 'https://gist.github.com/tsuru0805/d6d3cff55238dd0027cead953c48f206',
    linkLabel: 'GIST',
  },
  {
    type: 'project',
    variant: 'pink',
    iconImg: 'assets/st/icon_cat_sit.webp',
    name: 'llm-nursery',
    desc: '育儿模拟器：把一个小语言模型当孩子养——喂语料、夜哭、偷学、叛逆期、五种结局。零 API 成本。',
    tags: ['LLM', 'GAME', 'PYTHON'],
    link: 'https://github.com/tsuru0805/llm-nursery',
    linkLabel: 'GITHUB',
  },
  {
    type: 'project',
    variant: 'paper',
    iconImg: 'assets/st/icon_curlarrow.webp',
    name: 'idea-to-merge',
    desc: '从想法到落地的开发流程 + Codex 审查自动化开发模板。',
    tags: ['CLAUDE CODE', 'CODEX', 'WORKFLOW'],
    link: 'https://github.com/tsuru0805/idea-to-merge',
    linkLabel: 'GITHUB',
  },
];

// 贴纸点缀:按卡名固定携带,过滤时跟卡走。cls=位置类,w=显示宽,rot=角度
const STICKERS = {
  'engawa-mcp': [
    { src: 'assets/st/cat_flat.webp', cls: 'st-br', w: 88, rot: -4 },
    { src: 'assets/st/star_white.webp', cls: 'st-tr', w: 52, rot: 12 },
  ],
  'idea-to-merge': [
    { src: 'assets/st/pin.webp', cls: 'st-tr', w: 76, rot: 18 },
    { src: 'assets/st/cat_reach.webp', cls: 'st-br', w: 84, rot: -6 },
  ],
  'AI 笔友系统': [{ src: 'assets/st/smiley.webp', cls: 'st-br st-in', w: 62, rot: 10 }],
  'chat-history-jump': [
    { src: 'assets/st/star_white.webp', cls: 'st-tr', w: 58, rot: -12 },
    { src: 'assets/st/bandaid.webp', cls: 'st-bl', w: 78, rot: -14 },
  ],
  'speak-aloud-mcp': [{ src: 'assets/st/bat.webp', cls: 'st-br', w: 92, rot: 6 }],
  'stackchan-mcp': [
    { src: 'assets/st/cat_peek.webp', cls: 'st-peek', w: 110, rot: 0 },
    { src: 'assets/st/xx.webp', cls: 'st-bl', w: 46, rot: -8 },
  ],
  'llm-nursery': [{ src: 'assets/st/sparkle.webp', cls: 'st-tl', w: 48, rot: 0 }],
  'monologue-stream': [
    { src: 'assets/st/arrow_up.webp', cls: 'st-tr', w: 84, rot: 0 },
    { src: 'assets/st/star_black.webp', cls: 'st-bl', w: 52, rot: 14 },
  ],

};

// 社交链接(页脚素材块热区)。推特 handle 候晚晚给,先占位。
const SOCIAL = {
  x: 'https://x.com/tilldusk0315',
  github: 'https://github.com/tsuru0805',
  mailToast: '邮箱待定中...🚧',
};
