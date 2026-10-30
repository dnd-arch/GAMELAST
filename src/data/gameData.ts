import { InventoryItem, RoomId, CutsceneSlide } from '../types/game';

export const ASSET_IMAGES = {
  // Title Screen with Ikramo & Emado facing the manor in the rain
  title_screen_rain: '/src/assets/images/title_screen_rain_1793357240281.jpg',

  // Midnight Rainy Night Exteriors & Interiors
  gate: '/src/assets/images/ikramo_arrival_1793354674044.jpg',
  porch: '/src/assets/images/night_porch_rain_1793355708606.jpg',
  hallway: '/src/assets/images/hallway_night_realistic_1793358052666.jpg',
  parlor: '/src/assets/images/parlor_fireplace_1793354675145.jpg',
  study: '/src/assets/images/study_room_1793353251639.jpg',
  kitchen: '/src/assets/images/vintage_kitchen_1793353252683.jpg',
  attic: '/src/assets/images/attic_surveillance_room_1793357182713.jpg',
  crypt: '/src/assets/images/flooded_crypt_passage_1793357183472.jpg',
  basement: '/src/assets/images/underground_basement_1793353253592.jpg',
  sanctum: '/src/assets/images/syndicate_sanctum_1793354676769.jpg',
  dungeon: '/src/assets/images/secret_dungeon_emado_1793354675690.jpg',

  // Macro Closeups & Zooms
  porch_door_lock_zoom: '/src/assets/images/porch_door_lock_zoom_1793358278273.jpg',
  lantern_zoom: '/src/assets/images/lantern_closeup_zoom_1793355710864.jpg',
  briefcase_mud: '/src/assets/images/briefcase_closeup_mud_1793355712422.jpg',
  rainy_window_closeup: '/src/assets/images/rainy_window_closeup_1793357184247.jpg',
  hallway_rug_closeup: '/src/assets/images/hallway_rug_closeup_1793353255106.jpg',
  hallway_table_ledger: '/src/assets/images/hallway_table_ledger_1793358212540.jpg',
  parlor_clock_zoom: '/src/assets/images/parlor_clock_zoom_1793358259287.jpg',
  locked_desk_drawer: '/src/assets/images/locked_desk_drawer_1793353255078.jpg',
  handwritten_clue_note: '/src/assets/images/handwritten_clue_note_1793353256073.jpg',
  kitchen_cabinet_lock: '/src/assets/images/kitchen_cabinet_lock_1793353257708.jpg',
  cellar_padlock_zoom: '/src/assets/images/cellar_padlock_zoom_1793358242037.jpg',
  final_letter_desk: '/src/assets/images/final_letter_desk_1793353256096.jpg',

  // Extended Cinematic Cutscene Frames
  cutscene_emado_stalked: '/src/assets/images/cutscene_emado_stalked_1793357178930.jpg',
  cutscene_suleiman_capture: '/src/assets/images/cutscene_suleiman_capture_1793357180292.jpg',
  cutscene_ikramo_car_arrival: '/src/assets/images/cutscene_ikramo_car_arrival_1793358070728.jpg',
  cutscene_ikramo_search: '/src/assets/images/cutscene_ikramo_search_1793357182035.jpg',
  cutscene_kidnapping: '/src/assets/images/cutscene_emado_stalked_1793357178930.jpg',
  kidnapping_cutscene: '/src/assets/images/cutscene_suleiman_capture_1793357180292.jpg',
  cutscene_suleiman: '/src/assets/images/cutscene_suleiman_rain_1793355713580.jpg',
  cutscene_ikramo_track: '/src/assets/images/cutscene_ikramo_track_1793355711299.jpg',
  ikramo_arrival: '/src/assets/images/ikramo_arrival_1793354674044.jpg',
};

export const INVENTORY_ITEMS: Record<string, InventoryItem> = {
  emado_badge: {
    id: 'emado_badge',
    name: 'شارة وبطاقة عمادو الجنائية',
    description: 'بطاقة تحقيق مبللة عثرتِ عليها داخل حقيبته الملقاة في الوحل.',
    iconName: 'BadgeAlert',
    details: 'البطاقة تخص الباحث الجنائي "عمادو"، تؤكد أنه كان يتعقب الدكتور برهان الكاظم قبل اختطافه مباشرة.',
  },
  lockpick: {
    id: 'lockpick',
    name: 'أداة نقر معدنية',
    description: 'دبوس فولاذي دقيق لفتح المزاليج والميكانيزمات العالقة.',
    iconName: 'Wrench',
    details: 'أداة احترافية يدوية الصنع كانت مخبأة في حقيبة عمادو الجلدية.',
  },
  porch_key: {
    id: 'porch_key' as any,
    name: 'مفتاح الفانوس السري',
    description: 'مفتاح نحاسي صغير عثرتِ عليه مخبأ أسفل قاعدة فانوس الشرفة.',
    iconName: 'Key',
    details: 'مفتاح ميكانيكي صغير يتحكم في قفل الباب البلوطي المقوس للشرفة.',
  },
  brass_key: {
    id: 'brass_key',
    name: 'مفتاح نحاسي قديم',
    description: 'مفتاح كلاسيكي محفور بزهرة الزنبق وُجد تحت سجادة الردهة.',
    iconName: 'Key',
    details: 'مفتاح نحاسي فاخر يطابق أقفال أدراج مكتب دكتور برهان.',
  },
  reel_tape: {
    id: 'reel_tape',
    name: 'شريط تسجيل سري (رقم 4)',
    description: 'بكرة مغناطيسية خرجت من خبيئة ساعة البندول الكبرى (03:45).',
    iconName: 'CassetteTape',
    details: 'شريط مغناطيسي يسجل اعترافات الدكتور برهان بصوته حول زنزانة القبو ومفاتيحه.',
  },
  basement_key: {
    id: 'basement_key',
    name: 'مفتاح القبو الثقيل',
    description: 'مفتاح حديدي أسود ضخم استخرجته من خزانة المطبخ برمز 1986.',
    iconName: 'KeyRound',
    details: 'مفتاح ثقيل يفتح الباب الحديدي لسلالم القبو السفلي.',
  },
  dungeon_keys: {
    id: 'dungeon_keys',
    name: 'طقم مفاتيح زنزانة القبو',
    description: 'حلقة مفاتيح صدئة أخذتها من مكتب برهان في غرفة العمليات.',
    iconName: 'KeySquare',
    details: 'تفتح بوابة الزنزانة الحديدية التي يُحبس بداخلها عمادو.',
  },
  bolt_cutter: {
    id: 'bolt_cutter',
    name: 'مقص حديدي متين (Bolt Cutter)',
    description: 'أداة قطع صناعية حادة من مختبر العمليات.',
    iconName: 'Scissors',
    details: 'قادرة على قطع السلاسل والأغلال الفولاذية الغليظة.',
  },
  master_gate_key: {
    id: 'master_gate_key',
    name: 'المفتاح الرئيسي للبوابة الكبرى',
    description: 'مفتاح ذهبي ضخم سلمه عمادو لإكرامو بعد فك قيوده.',
    iconName: 'ShieldAlert',
    details: 'يفتح البوابة الخارجية الكبرى للهرب وفضح المنظمة الجنائية.',
  },
};

export interface RoomConfig {
  id: RoomId;
  name: string;
  nameEn: string;
  image: string;
  isOutside: boolean;
  ambientDescription: string;
}

export const ROOMS: Record<RoomId, RoomConfig> = {
  gate: {
    id: 'gate',
    name: 'بوابة المزرعة والمدخل الموحل',
    nameEn: 'The Iron Gates',
    image: ASSET_IMAGES.gate,
    isOutside: true,
    ambientDescription: 'منتصف الليل، عاصفة رعدية ومطر متواصل يغسل الحجارة المبتلة. هنا سقطت حقيبة عمادو قبل أن يجره سليمان الأعرج.',
  },
  porch: {
    id: 'porch',
    name: 'شرفة البيت والباب الرئيسي الموصد',
    nameEn: 'Rainy Front Porch',
    image: ASSET_IMAGES.porch,
    isOutside: true,
    ambientDescription: 'أمطار غزيرة تنهمر من حافة السقف القرميدي، الفانوس النحاسي يشتعل بلهب زيتي، والباب البلوطي محكم الإغلاق.',
  },
  hallway: {
    id: 'hallway',
    name: 'ردهة الاستقبال الكبرى والعاصفة',
    nameEn: 'Grand Hallway',
    image: ASSET_IMAGES.hallway,
    isOutside: false,
    ambientDescription: 'وميض البرق يضيء النافذة المقوسة في الخلفية، وصوت المطر يقرع الزجاج. السجادة الفارسية تفترش البلاط الأثري.',
  },
  parlor: {
    id: 'parlor',
    name: 'صالون المدفأة وساعة البندول',
    nameEn: 'The Parlor',
    image: ASSET_IMAGES.parlor,
    isOutside: false,
    ambientDescription: 'ساعة بندول مهيبة تدق في زاوية الغرفة، ورماد المدفأة يخفي أوراقاً محترقة تحت نظرات صورة الدكتور برهان الكاظم.',
  },
  study: {
    id: 'study',
    name: 'مكتبة التحقيقات والأرشيف',
    nameEn: 'Dr. Borhan’s Study',
    image: ASSET_IMAGES.study,
    isOutside: false,
    ambientDescription: 'مجلدات باثولوجية وتقارير تشريح قديمة تعود إلى عام 1986 تحيط بمكتب خشب البلوط.',
  },
  kitchen: {
    id: 'kitchen',
    name: 'المطبخ العتيق وخزانة الأسرار',
    nameEn: 'Vintage Kitchen',
    image: ASSET_IMAGES.kitchen,
    isOutside: false,
    ambientDescription: 'مطبخ عتيق ورائحة مواد كيميائية تتصاعد من الحوض، وخزانة الحائط مؤمنة بقفل أسطواني وسلاسل متينة.',
  },
  attic: {
    id: 'attic',
    name: 'غرفة المراقبة العلوية وشاشات التجسس',
    nameEn: 'Attic Surveillance Room',
    image: ASSET_IMAGES.attic,
    isOutside: false,
    ambientDescription: 'أجهزة مراقبة عتيقة وشاشات CRT تومض في عتمة السندرة. كاميرات خفية ترصد ممرات القصر وأقفاص القبو!',
  },
  crypt: {
    id: 'crypt',
    name: 'سرداب الملاحة والحجارة المغمورة',
    nameEn: 'Flooded Crypt Passage',
    image: ASSET_IMAGES.crypt,
    isOutside: false,
    ambientDescription: 'أقواس حجرية أثرية غارقة بمياه الأمطار المتسربة. الممر السري الذي ينحدر مباشرة إلى زنزانة الاحتجاز السفلية.',
  },
  basement: {
    id: 'basement',
    name: 'القبو الحجري وزنزانة عمادو',
    nameEn: 'Underground Cellar',
    image: ASSET_IMAGES.basement,
    isOutside: false,
    ambientDescription: 'أعماق باردة تحت الأرض وبراميل نبيذ معتقة. صوت أنين عمادو المحتجز يخترق سكون الظلام!',
  },
  sanctum: {
    id: 'sanctum',
    name: 'مختبر العمليات ومسجل الأشرطة',
    nameEn: 'The Syndicate Sanctum',
    image: ASSET_IMAGES.sanctum,
    isOutside: false,
    ambientDescription: 'غرفة سرية تكتظ بأجهزة التسجيل وخرائط التصفية الخاصة بالدكتور برهان وسليمان الأعرج.',
  },
};

export const CUTSCENE_SLIDES: CutsceneSlide[] = [
  {
    id: 1,
    image: ASSET_IMAGES.cutscene_emado_stalked,
    speaker: 'الراوي',
    text: 'ليلة التاسع والعشرين من أكتوبر... عاصفة رعدية هوجاء تجتاح تلال البحر المتوسط المنعزلة.',
    subtext: 'كان الباحث الجنائي "عمادو" يرتدي سترته الزيتية ونظارته الدائرية، يحمل مذكراته في المطر وهو يتعقب أسرار تجارب عام 1986.',
  },
  {
    id: 2,
    image: ASSET_IMAGES.cutscene_suleiman,
    speaker: 'سليمان الأعرج (المنفذ)',
    text: '«توقّف مكانك يا عمادو... خطوت خطوة أبعد مما ينبغي! أوراقك وسجلاتك هذه ستدفن الليلة معك.»',
    subtext: 'صوت أجش يخترق صوت المطر... سليمان الأعرج يقطع عليه طريق العودة تحت وميض البرق.',
  },
  {
    id: 3,
    image: ASSET_IMAGES.cutscene_emado_stalked,
    speaker: 'عمادو (الباحث الجنائي)',
    text: '«سليمان الأعرج! أعلم أنك تنفذ أوامر الدكتور برهان الكاظم... لكن الأدلة سُجلت بالفعل ولن تطمسوا الحقيقة!»',
    subtext: 'حاول عمادو التراجع نحو سيارته وإرسال إشارة استغاثة لزميلته المحققة إكرامو، لكن الوقت نفد.',
  },
  {
    id: 4,
    image: ASSET_IMAGES.cutscene_suleiman_capture,
    speaker: 'الراوي',
    text: 'اشتباك عنيف في الطين المتدفق... استبسل عمادو وانتزع المفتاح الذهبي الرئيسي للبوابة من معطف سليمان!',
    subtext: 'دس عمادو المفتاح في بطانة سترته قبل أن تباغته ضربة حديدية غادرة أفقدته الوعي، وجُرّ مقيداً نحو سراديب القبو.',
  },
  {
    id: 5,
    image: ASSET_IMAGES.briefcase_mud,
    speaker: 'الراوي',
    text: 'في الوحل المبتل أمام البوابة، بقيت حقيبة عمادو الجلدية مفتوحة تغمرها مياه الأمطار...',
    subtext: 'شارته الجنائية وأداة نقر معدنية سقطت بين الحصى تشهد على الكمين الغادر.',
  },
  {
    id: 6,
    image: ASSET_IMAGES.cutscene_ikramo_car_arrival,
    speaker: 'المحققة إكرامو',
    text: '«منتصف الليل تماماً... انقطع جهاز اللاسلكي الخاص بعمادو فجأة بعد آخر إشارة استغاثة مشفرة.»',
    subtext: 'المحققة "إكرامو" بحجابها الأسود وسترتها الرسمية توقف سيارتها أمام البوابة الكبرى، وأضواء المصابيح تشق المطر المنهمر.',
  },
  {
    id: 7,
    image: ASSET_IMAGES.cutscene_ikramo_search,
    speaker: 'المحققة إكرامو',
    text: '«ها هي حقيبة عمادو في الطين! آثار أقدام وحل حديثة تسحب جسداً نحو الشرفة والباب الرئيسي.»',
    subtext: '«سليمان وبرهان ظنوا أنهم أخفوا أثرهم... لكنني أقسمت ألا أغادر هذا البيت إلا وعمادو برفقتي حياً.»',
  },
  {
    id: 8,
    image: ASSET_IMAGES.porch,
    speaker: 'المحققة إكرامو',
    text: '«الباب البلوطي المقوس موصد بإحكام... والفانوس النحاسي يشتعل تحت هدير الرعد والبرق.»',
    subtext: '«عليّ فحص الفانوس والبحث عن مدخل، فالوقت يداهمنا وعمادو يصارع الموت في الأعماق.»',
  },
];
