import { SolarTerm } from './types';

// The "Long Text" content split into sections
export const ENCYCLOPEDIA_CONTENT = {
  intro: {
    title: "时空坐标 · 东方智慧",
    subtitle: "A COSMIC COORDINATE SYSTEM",
    body: "当我们谈论二十四节气时，我们谈论的远不止是日历上的标签或古老的农谚，我们是在解读一套源自中国上古、沿用至今的精密时空坐标系。这门古老的科学，其诞生可追溯至华夏文明的晨曦时期，早在《尚书·尧典》中便有先民“观象授时”的记载。它是理解中华文明如何通过观测宇宙星辰的规律来指导大地上的春耕秋收，并最终将这套自然法则内化为文化血脉与生活哲学的宏大叙事。"
  },
  astronomy: {
    title: "窥天 · 宇宙的刻度",
    subtitle: "ASTRONOMICAL ORIGINS",
    body: [
        "节气的天文学本质，是地球绕太阳公转轨道上的二十四个等分点。古人将太阳在星空背景上的周年视运动轨迹——即“黄道”——视为一个三百六十度的大圆，并将其精确等分为二十四份，每份十五度，太阳每运行十五度，便对应一个节气。",
        "要深入理解古人如何测定这些无形的时空节点，必须探寻他们窥探天机的三大支柱：圭表、北斗与星宿。最根本的莫过于“圭表测影”，通过测量正午日影长度确定冬至与夏至。而北斗七星则如同高悬于北极的天然时钟，“斗柄东指，天下皆春”。此外，二十八宿的观测更是构建了一个立体的、相互印证的天文观测网络。"
    ]
  },
  phenology: {
    title: "察地 · 万物的共鸣",
    subtitle: "PHENOLOGY & CLIMATE",
    body: [
        "节气的真正生命力在于“地”对“天”的响应，即“物候”。古人用诗意的“三候”来描述每个节气的征候。以“惊蛰”为例，“桃始华”与“蛰虫始振”并非被雷声惊醒，而是气温通过关键阈值时生物休眠机制的打破。",
        "气候指标也深刻嵌入节气体系。“三伏”与“数九”是对寒暑的量化；“白露”源于夜间辐射降温效应。甚至杜牧的“清明时节雨纷纷”，也精确对应了长江流域“江淮准静止锋”的活跃期。这是天地之间一场宏大的共鸣。"
    ]
  },
  agriculture: {
    title: "授时 · 耕耘的律动",
    subtitle: "AGRICULTURAL PRECISION",
    body: [
        "这套“窥天察地”的智慧，最终落脚于“授时”。在北方旱作区，围绕冬小麦-夏玉米轮作，形成了“白露早，霜降迟，秋分种麦正当时”的精准节律。在南方稻作区，“双抢”必须赶在立秋前完成晚稻插秧，因为晚稻是短日照植物，延误时机必减产。",
        "土壤与水肥管理也遵循此道。“冬至垦冻，立春施肥”，利用自然冻融改善土壤结构；“春雨贵如油”则道出了春季降水对作物返青的不可替代性。"
    ]
  },
  culture: {
    title: "传承 · 生命的哲学",
    subtitle: "CULTURAL HERITAGE",
    body: [
        "这套源于农耕文明的实用科学，最终升华为一种独特的文化基因。在政治上，历代王朝通过“冬至祭天”彰显合法性；在民俗上，“立春咬春”、“冬至进补”将时间节点转化为生活的仪式感。",
        "时至今日，二十四节气不仅仅关乎“何时播种”，它更是一门关于“如何与自然和谐共处”的永恒哲学，是中华文明贡献给全世界的、融合了科学、文化与生态观的宝贵遗产。"
    ]
  }
};

export const INTRO_CONTENT = {
  title: "时空坐标 · 东方智慧",
  subtitle: "A COSMIC COORDINATE SYSTEM",
  body: "当我们谈论二十四节气时，我们谈论的远不止是日历上的标签或古老的农谚，我们是在解读一套源自中国上古、沿用至今的精密时空坐标系。这门古老的科学，其诞生可追溯至华夏文明的晨曦时期。",
  features: [
    { title: "精密算法", desc: "太阳黄经的二十四等分" },
    { title: "物候指征", desc: "天地万物的生命律动" },
    { title: "生活哲学", desc: "顺应天时的生存智慧" }
  ]
};

export const TCM_CONTENT = {
    title: "医典 · 顺时养生",
    subtitle: "BIO-RHYTHM SYNCHRONIZATION",
    intro: "中医理论认为“人以天地之气生，四时之法成”。人体是一个小宇宙，其生理节律与大自然的昼夜更替、四季轮回严密同构。二十四节气不仅是时间的刻度，更是人体气血运行、脏腑盛衰的导航图。顺应节气进行“养生”（Yang Sheng），即是调整人体内部生物钟与宇宙外部环境频率共振的过程。",
    seasons: [
        {
            season: "Spring",
            element: "Wood (木)",
            organ: "Liver (肝)",
            principle: "生发 (Generation)",
            desc: "春季阳气始生，万物复苏。人体肝气旺盛，功能活跃。养生重点在于疏肝理气，顺应阳气升发之势，防止肝火过旺。",
            advice: "晚睡早起，广步于庭，披发缓行，以使志生。情绪上宜戒怒，保持心情舒畅。饮食上宜少酸多甘，以养脾气。",
            foods: ["韭菜 (Chives)", "菠菜 (Spinach)", "春笋 (Bamboo Shoots)", "豆芽 (Sprouts)"]
        },
        {
            season: "Summer",
            element: "Fire (火)",
            organ: "Heart (心)",
            principle: "生长 (Growth)",
            desc: "夏季阳气最盛，新陈代谢旺盛。心气通于夏，养生重在养心。此时出汗多，易耗气伤阴，需注意补充水分和矿物质。",
            advice: "晚睡早起，无厌于日。调息静心，常如冰雪在心。利用“冬病夏治”的良机，通过艾灸等方法驱除体内寒湿。",
            foods: ["苦瓜 (Bitter Melon)", "绿豆 (Mung Beans)", "莲子 (Lotus Seeds)", "西瓜 (Watermelon)"]
        },
        {
            season: "Autumn",
            element: "Metal (金)",
            organ: "Lung (肺)",
            principle: "收敛 (Harvest)",
            desc: "秋季阳气渐收，阴气渐长，燥气当令。肺喜润恶燥，养生重点在于滋阴润肺，防止秋燥伤肺。",
            advice: "早睡早起，与鸡俱兴。收敛神气，使志安宁。增加有氧运动，增强肺活量。注意保暖，防止“秋冻”过度假感冒。",
            foods: ["梨 (Pear)", "百合 (Lily Bulb)", "银耳 (Tremella)", "蜂蜜 (Honey)"]
        },
        {
            season: "Winter",
            element: "Water (水)",
            organ: "Kidney (肾)",
            principle: "闭藏 (Storage)",
            desc: "冬季万物闭藏，是能量蓄积的季节。肾主藏精，养生重在养肾防寒，封藏精气，为来年春天的生发打下物质基础。",
            advice: "早睡晚起，必待日光。去寒就温，无泄皮肤。节制房事，保全真元。适当进补，膏方调理。",
            foods: ["羊肉 (Mutton)", "黑芝麻 (Black Sesame)", "核桃 (Walnut)", "黑豆 (Black Beans)"]
        }
    ]
};

export const CULTURE_CONTENT = {
  title: "传承 · 生命的哲学",
  subtitle: "CULTURAL HERITAGE",
  paragraphs: [
      "这套源于农耕文明的实用科学，最终升华为一种独特的文化基因。在政治上，历代王朝通过“冬至祭天”彰显合法性；在民俗上，“立春咬春”、“冬至进补”将时间节点转化为生活的仪式感。",
      "时至今日，二十四节气不仅仅关乎“何时播种”，它更是一门关于“如何与自然和谐共处”的永恒哲学，是中华文明贡献给全世界的、融合了科学、文化与生态观的宝贵遗产。"
  ]
};

export const TIMELINE_DATA = [
    {
        year: "11th Century BC",
        cnYear: "西周时期",
        title: "观象授时之始",
        desc: "先民开始使用土圭测日影，确定了冬至和夏至。这是二十四节气体系的物理基点。"
    },
    {
        year: "770-476 BC",
        cnYear: "春秋时期",
        title: "四立确立",
        desc: "在二至（冬夏至）的基础上，增加了二分（春秋分）和四立（立春/夏/秋/冬），八个关键节点构成了早期框架。"
    },
    {
        year: "139 BC",
        cnYear: "西汉 · 淮南子",
        title: "体系完全定型",
        desc: "《淮南子·天文训》首次完整记载了二十四节气的全部名称和顺序，标志着该体系的正式成熟与定型。"
    },
    {
        year: "104 BC",
        cnYear: "太初历",
        title: "入历",
        desc: "汉武帝颁布《太初历》，正式把二十四节气订于历法，明确了天文位置与历法日期的对应关系。"
    },
    {
        year: "1645 AD",
        cnYear: "清 · 时宪历",
        title: "定气法改革",
        desc: "采用“定气法”，即以太阳在黄道上的实际位置为准，每15度为一个节气，修正了以往“平气法”的时间误差。"
    },
    {
        year: "2016 AD",
        cnYear: "现代",
        title: "世界非遗",
        desc: "二十四节气被联合国教科文组织列入人类非物质文化遗产代表作名录，被誉为“中国的第五大发明”。"
    }
];

export const QUOTES = [
    { text: "天不言而四时行，地不语而百物生。", sub: "Nature speaks not, yet the four seasons cycle; Earth speaks not, yet all things grow.", source: "李白 / Li Bai (Tang Dynasty)" },
    { text: "春雨惊春清谷天，夏满芒夏暑相连。", sub: "The Spring Rain startles the Spring; Summer brings full grain and connected heat.", source: "节气歌 / Song of Solar Terms" },
    { text: "顺天时，量地利，则用力少而成功多。", sub: "Follow the time of Heaven, measure the benefit of Earth, and effort will be small while success is great.", source: "贾思勰 / Jia Sixie (Qi Min Yao Shu)" },
    { text: "人以天地之气生，四时之法成。", sub: "Man is born of the Qi of Heaven and Earth, and completed by the laws of the Four Seasons.", source: "黄帝内经 / Yellow Emperor's Inner Canon" }
];

export const SOLAR_TERMS: SolarTerm[] = [
  // Spring
  { 
    id: 1, name: '立春', pinyin: 'Lìchūn', enName: 'Start of Spring', date: '2月 3-5日', 
    description: '春气始而建立也。东风解冻，蛰虫始振，鱼上冰。立春标志着万物闭藏的冬季已过去，开始进入风和日暖、万物生长的春季。', 
    category: 'Spring', color: '#84cc16', poem: '阳和起蛰，品物皆春', 
    pentads: ['东风解冻', '蛰虫始振', '鱼上冰'],
    farming: '春耕备耕，检修农具，兴修水利。',
    diet: '宜食辛甘发散之品，如韭菜、萝卜（咬春），忌酸涩。',
    data: { temperature: 3, rainfall: 10, humidity: 40, sunlight: 10.5 } 
  },
  { 
    id: 2, name: '雨水', pinyin: 'Yǔshuǐ', enName: 'Rain Water', date: '2月 18-20日', 
    description: '天一生水。降雨开始，雨量渐增。此时气温回升、冰雪融化、降水增多，故取名为雨水。鸿雁来，草木萌动。', 
    category: 'Spring', color: '#22c55e', poem: '随风潜入夜，润物细无声',
    pentads: ['獭祭鱼', '鸿雁来', '草木萌动'],
    farming: '小麦返青，需及时中耕除草，追施返青肥。',
    diet: '宜健脾利湿，多食山药、薏米，少食油腻。',
    data: { temperature: 5, rainfall: 25, humidity: 55, sunlight: 10.8 } 
  },
  { 
    id: 3, name: '惊蛰', pinyin: 'Jīngzhé', enName: 'Awakening of Insects', date: '3月 5-7日', 
    description: '春雷乍动，惊醒了蛰伏在土中冬眠的动物。此时桃花红、李花白，黄莺鸣叫，燕飞来。大部分地区进入春耕季节。', 
    category: 'Spring', color: '#16a34a', poem: '微雨众卉新，一雷惊蛰始',
    pentads: ['桃始华', '仓庚鸣', '鹰化为鸠'],
    farming: '春耕大忙，植树造林，防治病虫害（惊蛰春雷动）。',
    diet: '宜清淡，多食梨（润肺止咳），忌辛辣。',
    data: { temperature: 9, rainfall: 35, humidity: 60, sunlight: 11.2 } 
  },
  { 
    id: 4, name: '春分', pinyin: 'Chūnfēn', enName: 'Spring Equinox', date: '3月 20-22日', 
    description: '阴阳相半也，故昼夜均而寒暑平。春分这天太阳直射赤道，昼夜几乎相等。玄鸟至，雷乃发声，始电。', 
    category: 'Spring', color: '#15803d', poem: '春分雨脚落声微，柳岸斜风带客归',
    pentads: ['玄鸟至', '雷乃发声', '始电'],
    farming: '麦田管理关键期，早稻播种育秧（南方）。',
    diet: '保持寒热均衡，宜食时令野菜，如香椿、春笋。',
    data: { temperature: 13, rainfall: 45, humidity: 65, sunlight: 12.0 } 
  },
  { 
    id: 5, name: '清明', pinyin: 'Qīngmíng', enName: 'Pure Brightness', date: '4月 4-6日', 
    description: '万物“吐故纳新”，大地呈现春和景明之象。清明既是节气也是节日，人们扫墓祭祖，踏青郊游。桐始华，田鼠化为鴽。', 
    category: 'Spring', color: '#14532d', poem: '清明时节雨纷纷，路上行人欲断魂',
    pentads: ['桐始华', '田鼠化为鴽', '虹始见'],
    farming: '植树造林最佳时节，棉花播种。',
    diet: '宜柔肝养肺，多食菠菜、荠菜，品明前茶。',
    data: { temperature: 17, rainfall: 50, humidity: 68, sunlight: 12.5 } 
  },
  { 
    id: 6, name: '谷雨', pinyin: 'Gǔyǔ', enName: 'Grain Rain', date: '4月 19-21日', 
    description: '雨生百谷。降水明显增加，利于谷物生长。这是春季的最后一个节气。萍始生，鸣鸠拂其羽，戴胜降于桑。', 
    category: 'Spring', color: '#059669', poem: '杨花落尽子规啼，闻道龙标过五溪',
    pentads: ['萍始生', '鸣鸠拂其羽', '戴胜降于桑'],
    farming: '播种移苗，采收桑叶，春蚕饲养。',
    diet: '祛湿健脾，宜食香椿、黄豆芽，忌生冷。',
    data: { temperature: 20, rainfall: 60, humidity: 70, sunlight: 13.0 } 
  },

  // Summer
  { 
    id: 7, name: '立夏', pinyin: 'Lìxià', enName: 'Start of Summer', date: '5月 5-7日', 
    description: '万物至此皆长大。温度明显升高，炎暑将临，雷雨增多，农作物进入旺季生长。蝼蝈鸣，蚯蚓出，王瓜生。', 
    category: 'Summer', color: '#ef4444', poem: '绿树阴浓夏日长，楼台倒影入池塘',
    pentads: ['蝼蝈鸣', '蚯蚓出', '王瓜生'],
    farming: '夏收作物进入灌浆期，加强水肥管理。',
    diet: '养心补血，多食红豆、樱桃，以“尝三新”为俗。',
    data: { temperature: 24, rainfall: 80, humidity: 72, sunlight: 13.5 } 
  },
  { 
    id: 8, name: '小满', pinyin: 'Xiǎomǎn', enName: 'Grain Buds', date: '5月 20-22日', 
    description: '夏熟作物的籽粒开始灌浆饱满，但还未成熟，只是小满，还未大满。苦菜秀，靡草死，麦秋至。', 
    category: 'Summer', color: '#dc2626', poem: '夜莺啼绿柳，皓月醒长空',
    pentads: ['苦菜秀', '靡草死', '麦秋至'],
    farming: '防御干热风，准备夏收工具（小满动三车）。',
    diet: '清热利湿，宜食苦瓜、冬瓜，忌辛辣肥腻。',
    data: { temperature: 26, rainfall: 90, humidity: 74, sunlight: 13.8 } 
  },
  { 
    id: 9, name: '芒种', pinyin: 'Mángzhòng', enName: 'Grain in Ear', date: '6月 5-7日', 
    description: '有芒的麦子快收，有芒的稻子可种。这是一年中农事最繁忙的季节，“芒种”也称为“忙种”。螳螂生，鹏始鸣，反舌无声。', 
    category: 'Summer', color: '#b91c1c', poem: '家家麦饭美，处处菱歌长',
    pentads: ['螳螂生', '鵙始鸣', '反舌无声'],
    farming: '抢收小麦，抢种夏玉米/晚稻（三夏大忙）。',
    diet: '清热解暑，宜煮青梅，食清淡瓜果。',
    data: { temperature: 28, rainfall: 110, humidity: 78, sunlight: 14.2 } 
  },
  { 
    id: 10, name: '夏至', pinyin: 'Xiàzhì', enName: 'Summer Solstice', date: '6月 21-22日', 
    description: '日北至，日长之至。北半球白昼最长的一天。盛夏来临，气温持续升高。鹿角解，蝉始鸣，半夏生。', 
    category: 'Summer', color: '#991b1b', poem: '东边日出西边雨，道是无晴却有晴',
    pentads: ['鹿角解', '蝉始鸣', '半夏生'],
    farming: '田间管理，防汛抗旱，消除杂草。',
    diet: '冬至饺子夏至面，宜食苦味菜以清心除烦。',
    data: { temperature: 30, rainfall: 130, humidity: 80, sunlight: 14.5 } 
  },
  { 
    id: 11, name: '小暑', pinyin: 'Xiǎoshǔ', enName: 'Minor Heat', date: '7月 6-8日', 
    description: '暑，热也。小暑即为“小热”，意味着天气开始炎热，但还没到最热。温风至，蟋蟀居壁，鹰始挚。', 
    category: 'Summer', color: '#f87171', poem: '倏忽温风至，因循小暑来',
    pentads: ['温风至', '蟋蟀居宇', '鹰始挚'],
    farming: '早稻收获，晚稻插秧，防治棉花害虫。',
    diet: '消暑降火，宜食绿豆汤、荷叶粥、西瓜。',
    data: { temperature: 32, rainfall: 140, humidity: 82, sunlight: 14.2 } 
  },
  { 
    id: 12, name: '大暑', pinyin: 'Dàshǔ', enName: 'Major Heat', date: '7月 22-24日', 
    description: '大暑是一年中最热的时期，“湿热交蒸”在此时到达顶点。腐草为萤，土润溽暑，大雨时行。', 
    category: 'Summer', color: '#ef4444', poem: '赤日几时过，清风无处寻',
    pentads: ['腐草为萤', '土润溽暑', '大雨时行'],
    farming: '抗旱排涝，田间管理（双抢关键期）。',
    diet: '清热健脾，饮伏茶，晒伏姜，烧伏香。',
    data: { temperature: 34, rainfall: 120, humidity: 80, sunlight: 13.8 } 
  },

  // Autumn
  { 
    id: 13, name: '立秋', pinyin: 'Lìqiū', enName: 'Start of Autumn', date: '8月 7-9日', 
    description: '秋，揪也，物于此而揪敛也。阳气渐收，阴气渐长，是秋天的开始。凉风至，白露降，寒蝉鸣。', 
    category: 'Autumn', color: '#eab308', poem: '空山新雨后，天气晚来秋',
    pentads: ['凉风至', '白露降', '寒蝉鸣'],
    farming: '棉花整枝，晚稻追肥，秋耕备播。',
    diet: '滋阴润肺，贴秋膘（适度），食莲藕、秋梨。',
    data: { temperature: 29, rainfall: 90, humidity: 70, sunlight: 13.2 } 
  },
  { 
    id: 14, name: '处暑', pinyin: 'Chùshǔ', enName: 'Limit of Heat', date: '8月 22-24日', 
    description: '处，止也，暑气至此而止矣。炎热的夏天即将过去，气温下降明显。鹰乃祭鸟，天地始肃，禾乃登。', 
    category: 'Autumn', color: '#ca8a04', poem: '离离暑云散，袅袅凉风起',
    pentads: ['鹰乃祭鸟', '天地始肃', '禾乃登'],
    farming: '收获中稻，采摘菱角，防秋旱。',
    diet: '多酸少辛，宜食鸭肉（处暑吃鸭），润肺防燥。',
    data: { temperature: 26, rainfall: 70, humidity: 65, sunlight: 12.8 } 
  },
  { 
    id: 15, name: '白露', pinyin: 'Báilù', enName: 'White Dew', date: '9月 7-9日', 
    description: '阴气渐重，露凝而白。昼夜温差大，水土湿气凝结为露。鸿雁来，玄鸟归，群鸟养羞。', 
    category: 'Autumn', color: '#a16207', poem: '露从今夜白，月是故乡明',
    pentads: ['鸿雁来', '玄鸟归', '群鸟养羞'],
    farming: '白露早，霜降迟，秋分种麦正当时（选种）。',
    diet: '温润补气，宜饮白露茶，食龙眼、红薯。',
    data: { temperature: 22, rainfall: 50, humidity: 60, sunlight: 12.2 } 
  },
  { 
    id: 16, name: '秋分', pinyin: 'Qiūfēn', enName: 'Autumn Equinox', date: '9月 22-24日', 
    description: '昼夜均而寒暑平。太阳再次直射赤道，昼夜等长。秋意渐浓。雷始收声，蛰虫坯户，水始涸。', 
    category: 'Autumn', color: '#854d0e', poem: '长空雁叫霜晨月，霜晨月，马蹄声碎',
    pentads: ['雷始收声', '蛰虫坯户', '水始涸'],
    farming: '秋收秋种大忙，抢收秋熟作物，抢种冬小麦。',
    diet: '阴阳平衡，多食百合、银耳，忌大热大寒。',
    data: { temperature: 18, rainfall: 40, humidity: 55, sunlight: 12.0 } 
  },
  { 
    id: 17, name: '寒露', pinyin: 'Hánlù', enName: 'Cold Dew', date: '10月 8-9日', 
    description: '露气寒冷，将凝结也。气温比白露时更低，地面的露水快要凝结成霜。鸿雁来宾，雀入大水为蛤，菊有黄华。', 
    category: 'Autumn', color: '#713f12', poem: '袅袅凉风动，凄凄寒露零',
    pentads: ['鸿雁来宾', '雀入大水为蛤', '菊有黄华'],
    farming: '摘棉花，种油菜，防寒流侵袭。',
    diet: '养阴防燥，宜食芝麻、核桃、柿子。',
    data: { temperature: 14, rainfall: 25, humidity: 50, sunlight: 11.5 } 
  },
  { 
    id: 18, name: '霜降', pinyin: 'Shuāngjiàng', enName: 'Frost Descent', date: '10月 23-24日', 
    description: '气肃而凝，露结为霜。秋季的最后一个节气，天气渐冷，初霜出现。豺乃祭兽，草木黄落，蛰虫咸俯。', 
    category: 'Autumn', color: '#d97706', poem: '月落乌啼霜满天，江枫渔火对愁眠',
    pentads: ['豺乃祭兽', '草木黄落', '蛰虫咸俯'],
    farming: '红薯收获，冬麦播种结束，树木涂白。',
    diet: '补冬不如补霜降，宜食牛肉、白萝卜、柿子。',
    data: { temperature: 10, rainfall: 20, humidity: 45, sunlight: 11.0 } 
  },

  // Winter
  { 
    id: 19, name: '立冬', pinyin: 'Lìdōng', enName: 'Start of Winter', date: '11月 7-8日', 
    description: '冬，终也，万物收藏也。水始冰，地始冻，雉入大水为蜃。草木凋零，蛰虫休眠，万物活动趋向休止。', 
    category: 'Winter', color: '#3b82f6', poem: '北风潜入悄无声，未品浓秋已立冬',
    pentads: ['水始冰', '地始冻', '雉入大水为蜃'],
    farming: '冬灌护苗，修剪果树，大棚管理。',
    diet: '滋阴潜阳，宜食饺子（交子之时），温补牛羊肉。',
    data: { temperature: 6, rainfall: 15, humidity: 42, sunlight: 10.5 } 
  },
  { 
    id: 20, name: '小雪', pinyin: 'Xiǎoxuě', enName: 'Minor Snow', date: '11月 22-23日', 
    description: '气寒而将雪，地寒未甚而雪未大。虹藏不见，天气上升地气下降，闭塞而成冬。', 
    category: 'Winter', color: '#2563eb', poem: '孤舟蓑笠翁，独钓寒江雪',
    pentads: ['虹藏不见', '天气上升地气下降', '闭塞而成冬'],
    farming: '积肥造肥，果树防冻，贮藏蔬菜。',
    diet: '温润益肾，宜腌制腊肉，食糍粑。',
    data: { temperature: 2, rainfall: 10, humidity: 40, sunlight: 10.2 } 
  },
  { 
    id: 21, name: '大雪', pinyin: 'Dàxuě', enName: 'Major Snow', date: '12月 6-8日', 
    description: '至此而雪盛也。气温显著下降，降雪量增多，地面积雪。鹖鴠不鸣，虎始交，荔挺出。', 
    category: 'Winter', color: '#1d4ed8', poem: '柴门闻犬吠，风雪夜归人',
    pentads: ['鹖鴠不鸣', '虎始交', '荔挺出'],
    farming: '麦田积雪保墒，畜禽防寒保暖。',
    diet: '去寒就温，宜食羊肉、红枣，进补好时机。',
    data: { temperature: -2, rainfall: 8, humidity: 38, sunlight: 9.8 } 
  },
  { 
    id: 22, name: '冬至', pinyin: 'Dōngzhì', enName: 'Winter Solstice', date: '12月 21-23日', 
    description: '日南至，日短之至。北半球白昼最短、黑夜最长的一天。阴极之至，阳气始生。蚯蚓结，麋角解，水泉动。', 
    category: 'Winter', color: '#1e40af', poem: '天时人事日相催，冬至阳生春又来',
    pentads: ['蚯蚓结', '麋角解', '水泉动'],
    farming: '冬至垦冻，兴修水利，积肥沤肥。',
    diet: '冬至大如年，北吃饺子南吃汤圆，坚果补肾。',
    data: { temperature: -5, rainfall: 5, humidity: 35, sunlight: 9.5 } 
  },
  { 
    id: 23, name: '小寒', pinyin: 'Xiǎohán', enName: 'Minor Cold', date: '1月 5-7日', 
    description: '月初寒尚小，故云。标志着季冬时节的正式开始，进入一年中最寒冷的日子。雁北乡，鹊始巢，雉始雊。', 
    category: 'Winter', color: '#60a5fa', poem: '小寒连大吕，欢鹊垒新巢',
    pentads: ['雁北乡', '鹊始巢', '雉始雊'],
    farming: '防止冻害，积肥造肥，准备春耕物资。',
    diet: '温散风寒，宜食腊八粥，糯米饭。',
    data: { temperature: -6, rainfall: 5, humidity: 35, sunlight: 9.8 } 
  },
  { 
    id: 24, name: '大寒', pinyin: 'Dàhán', enName: 'Major Cold', date: '1月 20-21日', 
    description: '寒气之逆极，故谓大寒。一年中最后一个节气，也是最冷的时候，随即迎接立春。鸡乳，征鸟厉疾，水泽腹坚。', 
    category: 'Winter', color: '#93c5fd', poem: '蜡树银山炫皎光，朔风独啸静三江',
    pentads: ['鸡乳', '征鸟厉疾', '水泽腹坚'],
    farming: '加强牲畜过冬管理，大棚蔬菜防冻。',
    diet: '固护脾肾，宜食八宝饭，准备年夜饭。',
    data: { temperature: -4, rainfall: 8, humidity: 38, sunlight: 10.0 } 
  },
];

export const SEASON_DESCRIPTIONS = {
  Spring: "万物生长 · 耕耘伊始 - 阳气回升，自然界复苏，农耕活动开始。",
  Summer: "繁荣盛极 · 暑气蒸腾 - 能量与热量的巅峰，万物生长茂盛。",
  Autumn: "丰收敛藏 · 凉风渐起 - 作物成熟，阳气渐收，气候由热转凉。",
  Winter: "休养生息 · 蓄势待发 - 万物闭藏，在寒冷中积蓄能量，准备下一个轮回。",
};