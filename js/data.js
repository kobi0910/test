const HOKKAIDO_DATA = [
  {
    id: 'otaru',
    nameJP: '小樽',
    nameRomaji: 'OTARU',
    subTitleJP: '煤氣燈映照的冰封運河 · 歲月玻璃之音',
    issueNo: 'ISSUE 01',
    tagline: '時間在冰雪與玻璃光影間靜止佇立',
    coverImage: 'images/otaru.png',
    coverFallback: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=2000&q=85',
    description: '昔日作為北海道開拓樞紐的北方港口，如今散發著難以言喻的復古浪漫。當黃昏降臨小樽運河，63盞瓦斯燈依序點亮，磚造倉庫的紅褐色與雪地交織出如電影長鏡頭般的寂靜美感。',
    coordinates: '43.1907° N, 140.9947° E',
    bestSeason: '12月 - 2月（小樽雪燈之路）',
    averageTemp: '-4°C ~ 22°C',
    vibeTag: '懷舊復古 / 玻璃風鈴 / 運河暮色',
    editorialQuote: '當煤氣燈點亮夜色，整座城池宛如沉浸於八音盒的優雅旋律中。',
    quoteAuthor: '《北海道風光誌》特約編輯',
    hotspots: [
      {
        id: 'h1',
        x: 35,
        y: 65,
        title: '小樽運河瓦斯燈',
        subtitle: '1986年沿岸重現的63盞傳統氣燈',
        description: '傍晚時分，工作人員會依古法調校燃氣閥。暖黃燈光反射在冰封與微動的水面交界，是小樽最動人的視角。',
        exif: '35mm | f/1.8 | 1/60s | ISO 800',
        tag: '經典地標'
      },
      {
        id: 'h2',
        x: 75,
        y: 45,
        title: '石造紅磚倉庫群',
        subtitle: '明治至大正時期石造建築資產',
        description: '昔日儲放海產與開拓物資的厚重倉庫，內部已被賦予新生，成為精緻的音樂盒堂、啤酒館與工藝工房。',
        exif: '24mm | f/2.8 | 1/125s | ISO 400',
        tag: '歷史建築'
      }
    ],
    seasonalPair: {
      summerImage: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1600&q=80',
      summerTitle: '夏日綠意運河巡航',
      summerDesc: '陽光穿透微風，運河兩岸綠藤鋪展，巡航舟船緩緩劃過明淨水面。',
      winterImage: 'images/otaru.png',
      winterTitle: '冬季雪燈之路燭光',
      winterDesc: '銀白積雪覆蓋河岸，數千盞手工浮球雪燈與積雪交相輝映，冷冽而溫馨。'
    },
    attractions: [
      {
        id: 'otaru-canal',
        nameJP: '小樽運河',
        nameEN: 'Otaru Canal',
        tagline: '沿著歲月水路漫步，體驗港町的百年韻致',
        description: '完成於大正12年（1923年），是用填海造陸的方式所建造。水路呈散開的弧形，兩旁聳立著石造倉庫群，冬夜散步極具詩意。',
        image: 'images/otaru.png',
        fallbackImage: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1600&q=80',
        exif: '35mm f/1.4 | 1/100s | ISO 640',
        bestTime: '17:00 - 19:00（藍調華燈初上）',
        gourmetNote: '運河啤酒館現釀黑啤酒與北海道烤章魚。',
        secretTip: '拍攝最佳角度位於淺草橋交叉口的觀景平台上。'
      },
      {
        id: 'sakaimachi',
        nameJP: '堺町通玻璃街道',
        nameEN: 'Sakaimachi Street',
        tagline: '風鈴與硝子工藝交織的童話商業街',
        description: '保留著眾多大正時代建築，著名的北一硝子、小樽音樂盒堂皆聚集於此。漫步街道，耳邊不時傳來清脆的玻璃風鈴聲。',
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=80',
        fallbackImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=80',
        exif: '50mm f/1.8 | 1/250s | ISO 200',
        bestTime: '午後 14:00 陽光穿透玻璃窗面時',
        gourmetNote: 'LeTAO 本店雙層芝士蛋糕與現泡大吉嶺紅茶。',
        secretTip: '音樂盒堂門口的蒸汽鐘每隔15分鐘會以蒸汽奏響樂音。'
      },
      {
        id: 'tenguyama',
        nameJP: '天狗山纜車展望台',
        nameEN: 'Mount Tengu Ropeway',
        tagline: '俯瞰小樽港灣與鑽石般閃爍的夜景',
        description: '小樽三大夜景之一。乘坐纜車直達山頂，可將小樽市區、石狩灣以及延伸至遠方的海岸線一覽無餘。',
        image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=1600&q=80',
        fallbackImage: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=1600&q=80',
        exif: '70mm f/2.8 | 2s | ISO 100',
        bestTime: '日落前30分鐘至夜幕完全降臨',
        gourmetNote: '山頂展望餐廳的十勝牛排黑咖哩。',
        secretTip: '冬季山頂天狗神社被冰雪包覆，神聖清冽。'
      }
    ]
  },
  {
    id: 'hakodate',
    nameJP: '函館',
    nameRomaji: 'HAKODATE',
    subTitleJP: '百萬璀璨夜景 · 浪漫星型五稜郭港城',
    issueNo: 'ISSUE 02',
    tagline: '陸地與雙海灣交織的璀璨寶石',
    coverImage: 'images/hakodate.png',
    coverFallback: 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=2000&q=85',
    description: '位於北海道最南端的門戶港市，自1859年作為國際貿易港開放以來，融合了濃郁的西洋文化與和風色彩。函館山俯瞰下的沙頸型城市狹線，雙海灣弧線抱懷著萬家燈火。',
    coordinates: '41.7687° N, 140.7288° E',
    bestSeason: '四季皆宜（春櫻與冬夜景最著）',
    averageTemp: '-2°C ~ 24°C',
    vibeTag: '世界三大夜景 / 西洋館斜坡 / 星形城堡',
    editorialQuote: '黑夜如深藍絨布，城市燈火則是傾倒其上的碎鑽與金砂。',
    quoteAuthor: '《函館建築誌》',
    hotspots: [
      {
        id: 'h-hk1',
        x: 50,
        y: 50,
        title: '函館山夜景對稱線',
        subtitle: '津輕海峽與函館灣夾峙的沙洲景緻',
        description: '特殊地貌形成的極致狹長弧線，讓燈火顯得格外密實璀璨，名列世界三大夜景之一。',
        exif: '50mm | f/2.0 | 1s | ISO 200',
        tag: '極致夜景'
      }
    ],
    seasonalPair: {
      summerImage: 'https://images.unsplash.com/photo-1528164344705-475426879e0d?auto=format&fit=crop&w=1600&q=80',
      summerTitle: '夏日斜坡綠蔭與湛藍港灣',
      summerDesc: '八幡坂石板路直通藍天與海面，石造教堂在清爽海風中鳴響報時鐘聲。',
      winterImage: 'images/hakodate.png',
      winterTitle: '冬夜冰雪百萬夜景',
      winterDesc: '冷空氣使星光與城市燈火無比清晰澄澈，海面微光點綴著釣魷魚漁船的光束。'
    },
    attractions: [
      {
        id: 'mount-hakodate',
        nameJP: '函館山展望台',
        nameEN: 'Mount Hakodate Night View',
        tagline: '無可比擬的雙海灣星鑽夜景',
        description: '海拔334公尺的函館山頂，可將被津輕海峽與函館灣夾峙的城市夜景一覽無遺。當夜幕漸沉，光影盛宴達到頂峰。',
        image: 'images/hakodate.png',
        fallbackImage: 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1600&q=80',
        exif: '35mm f/1.4 | 1s | ISO 400',
        bestTime: '日落後20分鐘「魔法紫藍調時刻」',
        gourmetNote: '山頂觀景台的北海道哈密瓜霜淇淋。',
        secretTip: '建議搭乘山頂纜車上山，靠窗位置視角極佳。'
      },
      {
        id: 'goryokaku',
        nameJP: '五稜郭公園',
        nameEN: 'Goryokaku Fort',
        tagline: '星形稜堡歷史遺蹟，春季櫻花滿開勝地',
        description: '日本第一座西洋式星形要塞城堡。春天1600株櫻花綻放成星形粉紅絨毯，冬日則積雪成白銀五角星。',
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=80',
        fallbackImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=80',
        exif: '16mm f/4.0 | 1/500s | ISO 100',
        bestTime: '早上 9:00登上五稜郭塔俯瞰',
        gourmetNote: '五稜郭塔下的函館鹽味拉麵。',
        secretTip: '五稜郭塔高107公尺，玻璃地板展望平台極具震撼感。'
      }
    ]
  },
  {
    id: 'sapporo',
    nameJP: '札幌',
    nameRomaji: 'SAPPORO',
    subTitleJP: '北方現代雪都 · 大通公園雪花祭典',
    issueNo: 'ISSUE 03',
    tagline: '棋盤格都市與大自然優雅和鳴',
    coverImage: 'images/sapporo.png',
    coverFallback: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=2000&q=85',
    description: '北海道最大的政治、經濟與文化中心。精密的棋盤狀街廓中，大通公園如一道綠色與銀白的緞帶貫穿市中心。冬日雪祭時，巨大的冰雕藝術與溫暖的成吉思汗羊肉香氣構成札幌獨特的靈魂。',
    coordinates: '43.0618° N, 141.3545° E',
    bestSeason: '2月（札幌雪祭）/ 7月（啤酒節）',
    averageTemp: '-6°C ~ 26°C',
    vibeTag: '北方雪都 / 時計台古韻 / 璀璨薄野',
    editorialQuote: '雪花落在大通公園的微光裡，這是一座在寒冬中依然跳動著熱情脈搏的北方心臟。',
    quoteAuthor: '《北方建築思潮》',
    hotspots: [
      {
        id: 'h-sp1',
        x: 60,
        y: 40,
        title: '札幌電視塔與大通公園',
        subtitle: '147.2公尺城市立體座標',
        description: '大通公園的起點地標。冬夜塔身點亮璀璨彩燈，下方即是雪祭巨型冰雕會場。',
        exif: '24mm | f/2.8 | 1/50s | ISO 800',
        tag: '都市地標'
      }
    ],
    seasonalPair: {
      summerImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=80',
      summerTitle: '夏日大通公園啤酒花園',
      summerDesc: '紫丁香花開滿公園，露天啤酒節傳出爽朗笑聲，微風帶來清涼山風。',
      winterImage: 'images/sapporo.png',
      winterTitle: '冬季銀白雪祭與霓虹薄野',
      winterDesc: '厚實積雪包裹著現代建築，薄野地標Nikka招牌在雪夜中散發熱情暖光。'
    },
    attractions: [
      {
        id: 'odori-park',
        nameJP: '大通公園與電視塔',
        nameEN: 'Odori Park & TV Tower',
        tagline: '橫貫東西的都市綠洲與冬季雪祭主會場',
        description: '長達1.5公里的城市綠帶，將札幌市中心劃分為南北兩半。四季舉辦各類祭典，展望台可將棋盤狀街道全景收錄眼前。',
        image: 'images/sapporo.png',
        fallbackImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1600&q=80',
        exif: '24mm f/2.8 | 1/60s | ISO 800',
        bestTime: '18:00 電視塔點燈時刻',
        gourmetNote: '公園攤位的現烤十勝玉米與黃油烤馬鈴薯。',
        secretTip: '登上電視塔展望台，能拍出精確對稱的大通公園軸線。'
      }
    ]
  },
  {
    id: 'furano',
    nameJP: '富良野 · 美瑛',
    nameRomaji: 'FURANO & BIEI',
    subTitleJP: '大地的拼布彩丘 · 孤影樹木的極簡詩篇',
    issueNo: 'ISSUE 04',
    tagline: '風吹過連綿丘陵，帶來薰衣草與幾何大地的呼吸',
    coverImage: 'images/furano.png',
    coverFallback: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=2000&q=85',
    description: '位於北海道中央的大地心臟。富良野連綿的紫色薰衣草花海與美瑛如毯子般交織的拼布丘陵，構成極具畫意的大自然地景。冬日裡孤單矗立於雪白荒野上的樹木，更是極簡主義攝影的終極殿堂。',
    coordinates: '43.3423° N, 142.3832° E',
    bestSeason: '7月中旬（花海Peak）/ 1月（極簡雪景）',
    averageTemp: '-8°C ~ 27°C',
    vibeTag: '薰衣草浪潮 / 青池夢幻藍 / 孤樹詩意',
    editorialQuote: '地平線在這裡起伏成一道道優美的弧線，大地像被大地畫家細心打磨的色塊。',
    quoteAuthor: '《日本地理美學》',
    hotspots: [
      {
        id: 'h-fr1',
        x: 45,
        y: 60,
        title: '富田農場彩色花田',
        subtitle: '富良野最古老且宏偉的薰衣草園',
        description: '七彩花海（薰衣草、罌粟花、金魚草）如彩虹般橫亙在傾斜的丘陵面上，遠處是雄偉的十勝岳連峰。',
        exif: '70mm | f/4.0 | 1/400s | ISO 100',
        tag: '大地奇景'
      }
    ],
    seasonalPair: {
      summerImage: 'images/furano.png',
      summerTitle: '夏日七彩彩虹花丘',
      summerDesc: '濃郁紫羅蘭薰衣草香氣瀰漫，小麥田與花海交織成斑斕地毯。',
      winterImage: 'images/biei.png',
      winterTitle: '冬季美瑛極簡孤樹雪景',
      winterDesc: '天地一白，哲學之樹與聖誕樹寂靜獨立於粉雪雪原，呈現畫卷般純粹簡約。'
    },
    attractions: [
      {
        id: 'farm-tomita',
        nameJP: '富田農場',
        nameEN: 'Farm Tomita',
        tagline: '日本最具代表性的薰衣草聖地',
        description: '自1958年開始栽種薰衣草。廣闊的彩色花田鋪滿整個山丘，站在花田頂端可遠眺富良野盆地與十勝岳連峰。',
        image: 'images/furano.png',
        fallbackImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=80',
        exif: '50mm f/2.8 | 1/500s | ISO 100',
        bestTime: '上午 8:30 晨光初現避開人潮',
        gourmetNote: '富田農場限定天然薰衣草霜淇淋。',
        secretTip: '「花人之舍」2樓展覽室可了解北海道香精精油的蒸餾過程。'
      },
      {
        id: 'biei-trees',
        nameJP: '美瑛名樹巡禮',
        nameEN: 'Patchwork Trees of Biei',
        tagline: 'Ken & Mary之樹、七星之樹與聖誕樹',
        description: '美瑛丘陵間點綴著因廣告影片而聞名的樹木。獨自聳立在寬廣土地上的姿態，展現出孤高而沉靜的美學精神。',
        image: 'images/biei.png',
        fallbackImage: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1600&q=80',
        exif: '85mm f/2.0 | 1/800s | ISO 100',
        bestTime: '黃昏日落落日餘暉之際',
        gourmetNote: '美瑛選果（Bi-ble）米其林推薦鄉土蔬菜料理。',
        secretTip: '請勿踏入私人農地拍攝，在指定觀景公路上即可獲得最佳鏡頭。'
      }
    ]
  },
  {
    id: 'asahikawa',
    nameJP: '旭川',
    nameRomaji: 'ASAHIKAWA',
    subTitleJP: '雪國野生帝國 · 大雪山冰雪極地',
    issueNo: 'ISSUE 05',
    tagline: '企鵝雪中漫步，與北方大地靈動生命相遇',
    coverImage: 'images/shiretoko.png',
    coverFallback: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=2000&q=85',
    description: '北海道第二大都市，亦是探索大雪山國立公園的基點。這裡擁有日本最北端且最具行動展示巧思的旭山動物園。冬日極寒天氣造就了無與倫比的粉雪滑雪場與鑽石塵奇觀。',
    coordinates: '43.7706° N, 142.3648° E',
    bestSeason: '12月 - 3月（冬日企鵝散步）',
    averageTemp: '-9°C ~ 25°C',
    vibeTag: '企鵝遊行 / 大雪山門戶 / 醬油拉麵起源',
    editorialQuote: '在零下十度的風雪中，生命的憨態與韌性讓冰雪不再冷冽。',
    quoteAuthor: '《野生動物生態雜誌》',
    hotspots: [
      {
        id: 'h-as1',
        x: 40,
        y: 65,
        title: '國王企鵝雪地遊行',
        subtitle: '冬日限時每日兩場的體能運動展演',
        description: '為了維持冬季運動量，企鵝們會在積雪園道上整隊散步。近距離觀察牠們憨態可掬的搖擺步伐。',
        exif: '135mm | f/2.8 | 1/1000s | ISO 200',
        tag: '極致生態'
      }
    ],
    seasonalPair: {
      summerImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80',
      summerTitle: '夏日大雪山旭岳高山植物花海',
      summerDesc: '姿見池映照火山噴氣孔蒸汽，高山植物在短期夏日里繁花盛開。',
      winterImage: 'images/shiretoko.png',
      winterTitle: '冬季旭山動物園雪白冰世界',
      winterDesc: '漫天飄雪中，白狐與北極熊展現最純粹的極地野性張力。'
    },
    attractions: [
      {
        id: 'asahiyama-zoo',
        nameJP: '旭川市旭山動物園',
        nameEN: 'Asahiyama Zoo',
        tagline: '打破傳統動物園藩籬，展示生命自然本能',
        description: '日本最著名的動物園之一。獨創「行動展示」設計，讓遊客能從企鵝隧道、海豹穿透水管等立體視角觀察動物生動習性。',
        image: 'images/shiretoko.png',
        fallbackImage: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1600&q=80',
        exif: '70-200mm f/2.8 | 1/1000s | ISO 320',
        bestTime: '11:00 / 14:30 企鵝散步表演時間',
        gourmetNote: '園內自製北海道牛奶冰淇淋與海豹造型紅豆饅頭。',
        secretTip: '企鵝散步僅於12月中旬至3月中旬積雪充足時舉行。'
      }
    ]
  },
  {
    id: 'shiretoko',
    nameJP: '知床',
    nameRomaji: 'SHIRETOKO',
    subTitleJP: '大地的盡頭 · 世界自然遺產・流冰與遠古森林',
    issueNo: 'ISSUE 06',
    tagline: '日本最後的自然秘境，海洋與陸地生態完美交融',
    coverImage: 'images/shiretoko.png',
    coverFallback: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2000&q=85',
    description: '愛努語意為「大地的盡頭」（SIR-ETOK）。位於北海道東北端突出的狹長半島，2005年登錄為世界自然遺產。這裡是野生棕熊、虎頭海雕與流冰飄浮的最前線。',
    coordinates: '44.0594° N, 145.1325° E',
    bestSeason: '2月（流冰漫步）/ 6月 - 8月（五湖散策）',
    averageTemp: '-7°C ~ 20°C',
    vibeTag: '世界自然遺產 / 鄂霍次克流冰 / 原始野生',
    editorialQuote: '當天際線被白茫茫的流冰填滿，你才真正體會到自然最初始的敬畏與壯美。',
    quoteAuthor: '《國家地理雜誌》',
    hotspots: [
      {
        id: 'h-sh1',
        x: 50,
        y: 60,
        title: '鄂霍次克海流冰群',
        subtitle: '來自黑龍江口的冬季冰雪奇蹟',
        description: '每年2月，巨大的流冰隨洋流鋪滿海面。穿上特製乾式潛水衣在流冰上行走漫步是極致體驗。',
        exif: '24mm | f/4.0 | 1/1000s | ISO 100',
        tag: '世界遺產'
      }
    ],
    seasonalPair: {
      summerImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
      summerTitle: '夏日知床五湖翠綠高架木道',
      summerDesc: '原始森林簇擁著靜謐湖泊，湖面倒映著知床連山的巍峨綠姿。',
      winterImage: 'images/shiretoko.png',
      winterTitle: '冬季凍結白色流冰海洋',
      winterDesc: '鄂霍次克海被億萬噸白色冰塊封凍，大地與大海融為無垠的白色世界。'
    },
    attractions: [
      {
        id: 'shiretoko-goko',
        nameJP: '知床五湖',
        nameEN: 'Shiretoko Five Lakes',
        tagline: '被原生森林包圍的五顆寶石湖泊',
        description: '知床代表性的景觀。高架木道全長800公尺，可安心欣賞第一湖與知床連山倒影。若參加導覽更可深入其餘四湖密林。',
        image: 'images/shiretoko.png',
        fallbackImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
        exif: '24mm f/4.0 | 1/500s | ISO 100',
        bestTime: '早晨 8:00 湖面晨霧消散之際',
        gourmetNote: '休息站限定的知床苔原高山越橘霜淇淋。',
        secretTip: '高架木道設有電網防護，全天候免費安全開放。'
      }
    ]
  }
];
