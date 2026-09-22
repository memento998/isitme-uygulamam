import type { AppLocale } from '@/i18n/locales';

/**
 * Shared hearing-aid terminology for knowledge-bank copy.
 *
 * receiver — the speaker/receiver unit that delivers amplified sound into the
 * ear. Not a notification, radio, or email receiver.
 *
 * dome — the silicone eartip (Turkish: silikon uç / kubbe). Not an architectural
 * dome.
 *
 * feedback — acoustic whistling / howling from the device (Turkish: ıslık,
 * ötme). Not user comments or in-app ratings.
 *
 * BTE tube — a hollow sound tube on a behind-the-ear aid. Distinct from the
 * thin RIC/RITE cable that contains a wire and must not be cleaned with a
 * tube wire.
 */
export type GlossaryTermId =
  | 'hearingAid'
  | 'receiver'
  | 'dome'
  | 'feedback'
  | 'bte'
  | 'bteTube'
  | 'ricRite'
  | 'ite'
  | 'tube'
  | 'waxFilter'
  | 'ent'
  | 'audiologist'
  | 'hearingSpecialist'
  | 'supplyCenter'
  | 'bluetooth';

export type GlossaryEntry = Record<AppLocale, string>;

export const TERMS: Record<GlossaryTermId, GlossaryEntry> = {
  hearingAid: {
    tr: 'işitme cihazı',
    en: 'hearing aid',
    de: 'Hörgerät',
    es: 'audífono',
    it: 'apparecchio acustico',
    fr: 'aide auditive',
    ar: 'جهاز السمع',
    'zh-Hans': '助听器',
    hi: 'श्रवण यंत्र',
    te: 'వినికిడి పరికరం',
  },
  receiver: {
    tr: 'hoparlör (kulak içindeki hoparlör/alıcı ünite)',
    en: 'speaker / receiver unit',
    de: 'Lautsprecher / Hörer-Einheit',
    es: 'altavoz / unidad receptora',
    it: 'altoparlante / unità ricevitore',
    fr: 'haut-parleur / écouteur (récepteur)',
    ar: 'مكبر الصوت / وحدة المستقبل',
    'zh-Hans': '扬声器（受话器）',
    hi: 'स्पीकर / रिसीवर यूनिट',
    te: 'స్పీకర్ / రిసీవర్ యూనిట్',
  },
  dome: {
    tr: 'silikon uç (kubbe)',
    en: 'silicone eartip (dome)',
    de: 'Silikonaufsatz (Schirmchen)',
    es: 'punta de silicona (cúpula)',
    it: 'puntale in silicone (cupola)',
    fr: 'embout en silicone (dôme)',
    ar: 'الطرف السيليكوني (القبة)',
    'zh-Hans': '硅胶耳塞（耳罩）',
    hi: 'सिलिकॉन ईयरटिप (डोम)',
    te: 'సిలికాన్ ఇయర్‌టిప్ (డోమ్)',
  },
  feedback: {
    tr: 'ıslık / ötme (akustik geri bildirim)',
    en: 'whistling (acoustic feedback)',
    de: 'Pfeifen (akustische Rückkopplung)',
    es: 'silbido (retroalimentación acústica)',
    it: 'fischio (feedback acustico)',
    fr: 'sifflement (larsen / rétroaction acoustique)',
    ar: 'صفير (تغذية راجعة صوتية)',
    'zh-Hans': '啸叫（声反馈）',
    hi: 'सीटी / व्हिसल (ध्वनिक फीडबैक)',
    te: 'ఈల ధ్వని (అకౌస్టిక్ ఫీడ్‌బ్యాక్)',
  },
  bte: {
    tr: 'kulak arkası cihaz (BTE)',
    en: 'behind-the-ear device (BTE)',
    de: 'Hinter-dem-Ohr-Gerät (HdO / BTE)',
    es: 'dispositivo retroauricular (BTE)',
    it: 'dispositivo retroauricolare (BTE)',
    fr: 'appareil contour d’oreille (BTE)',
    ar: 'جهاز خلف الأذن (BTE)',
    'zh-Hans': '耳背式助听器（BTE）',
    hi: 'कान के पीछे वाला यंत्र (BTE)',
    te: 'చెవి వెనుక పరికరం (BTE)',
  },
  bteTube: {
    tr: 'hortumlu kulak arkası (ses tüpü; elektrik kablosu yok)',
    en: 'BTE with sound tube (hollow tube; no electrical cable)',
    de: 'HdO mit Schallschlauch (hohl; ohne Elektrokabel)',
    es: 'BTE con tubo de sonido (tubo hueco; sin cable eléctrico)',
    it: 'BTE con tubetto del suono (tubo cavo; senza cavo elettrico)',
    fr: 'contour d’oreille à tube (tube creux; sans câble électrique)',
    ar: 'جهاز خلف الأذن بأنبوب صوت (أنبوب أجوف؛ بلا كابل كهربائي)',
    'zh-Hans': '带声管的耳背机（空心管；无电缆）',
    hi: 'साउंड ट्यूब वाला BTE (खोखली नली; बिजली केबल नहीं)',
    te: 'సౌండ్ ట్యూబ్‌తో BTE (బోలు ట్యూబ్; ఎలక్ట్రికల్ కేబుల్ లేదు)',
  },
  ricRite: {
    tr: 'RIC/RITE (ince bağlantıda kablo; hoparlör kulak ucunda)',
    en: 'RIC/RITE (thin connector contains a cable; speaker at the earpiece)',
    de: 'RIC/RITE (dünne Verbindung enthält ein Kabel; Lautsprecher im Ohrstück)',
    es: 'RIC/RITE (el conector fino contiene un cable; altavoz en el auricular)',
    it: 'RIC/RITE (il collegamento sottile contiene un cavo; altoparlante nell’auricolare)',
    fr: 'RIC/RITE (la liaison fine contient un câble; haut-parleur dans l’embout)',
    ar: 'RIC/RITE (الوصلة الرفيعة تحتوي على كابل؛ مكبر الصوت في قطعة الأذن)',
    'zh-Hans': 'RIC/RITE（细连接内有电缆；扬声器在耳件）',
    hi: 'RIC/RITE (पतले कनेक्टर में केबल; स्पीकर ईयरपीस में)',
    te: 'RIC/RITE (సన్నని కనెక్టర్‌లో కేబుల్; స్పీకర్ ఇయర్‌పీస్‌లో)',
  },
  ite: {
    tr: 'kulak içi cihaz (ITE)',
    en: 'in-the-ear device (ITE)',
    de: 'Im-Ohr-Gerät (IdO / ITE)',
    es: 'dispositivo intraauricular (ITE)',
    it: 'dispositivo endoauricolare (ITE)',
    fr: 'appareil intra-auriculaire (ITE)',
    ar: 'جهاز داخل الأذن (ITE)',
    'zh-Hans': '耳内式助听器（ITE）',
    hi: 'कान के अंदर वाला यंत्र (ITE)',
    te: 'చెవి లోపలి పరికరం (ITE)',
  },
  tube: {
    tr: 'hortum / ses tüpü',
    en: 'tube / sound tube',
    de: 'Schlauch / Schallschlauch',
    es: 'tubo / tubo de sonido',
    it: 'tubetto / tubo del suono',
    fr: 'tube / tube acoustique',
    ar: 'الأنبوب / أنبوب الصوت',
    'zh-Hans': '导管 / 声管',
    hi: 'ट्यूब / साउंड ट्यूब',
    te: 'ట్యూబ్ / సౌండ్ ట్యూబ్',
  },
  waxFilter: {
    tr: 'kir filtresi (kulak kiri filtresi)',
    en: 'wax filter',
    de: 'Cerumenfilter / Schmutzfilter',
    es: 'filtro de cerumen',
    it: 'filtro anticeume',
    fr: 'filtre anti-cérumen',
    ar: 'مرشح الشمع (شمع الأذن)',
    'zh-Hans': '耳垢滤网',
    hi: 'वैक्स फ़िल्टर (कान के मैल का फ़िल्टर)',
    te: 'వాక్స్ ఫిల్టర్ (చెవి మైనపు ఫిల్టర్)',
  },
  ent: {
    tr: 'KBB hekimi',
    en: 'ENT doctor',
    de: 'HNO-Arzt / HNO-Ärztin',
    es: 'médico ORL',
    it: 'medico ORL',
    fr: 'médecin ORL',
    ar: 'طبيب الأنف والأذن والحنجرة',
    'zh-Hans': '耳鼻喉科医生',
    hi: 'ईएनटी चिकित्सक',
    te: 'ఇఎన్‌టి వైద్యుడు',
  },
  audiologist: {
    tr: 'odyolog',
    en: 'audiologist',
    de: 'Audiologe / Audiologin',
    es: 'audiólogo / audióloga',
    it: 'audiologo / audiologa',
    fr: 'audiologiste',
    ar: 'أخصائي السمع',
    'zh-Hans': '听力学家',
    hi: 'ऑडियोलॉजिस्ट',
    te: 'ఆడియాలజిస్ట్',
  },
  hearingSpecialist: {
    tr: 'işitme uzmanı',
    en: 'hearing specialist',
    de: 'Hörakustiker / Hörakustikerin',
    es: 'especialista en audición',
    it: 'specialista dell’udito',
    fr: 'spécialiste de l’audition',
    ar: 'أخصائي السمع والأجهزة',
    'zh-Hans': '听力验配专家',
    hi: 'श्रवण विशेषज्ञ',
    te: 'వినికిడి నిపుణుడు',
  },
  supplyCenter: {
    tr: 'cihazı temin ettiğiniz merkez',
    en: 'the center that supplied the device',
    de: 'das Zentrum, das das Gerät bereitgestellt hat',
    es: 'el centro que suministró el dispositivo',
    it: 'il centro che ha fornito il dispositivo',
    fr: 'le centre qui a fourni l’appareil',
    ar: 'المركز الذي زوّدك بالجهاز',
    'zh-Hans': '提供该设备的中心',
    hi: 'जिस केंद्र से यंत्र मिला',
    te: 'పరికరం అందించిన కేంద్రం',
  },
  bluetooth: {
    tr: 'Bluetooth',
    en: 'Bluetooth',
    de: 'Bluetooth',
    es: 'Bluetooth',
    it: 'Bluetooth',
    fr: 'Bluetooth',
    ar: 'بلوتوث',
    'zh-Hans': '蓝牙',
    hi: 'ब्लूटूथ',
    te: 'బ్లూటూత్',
  },
};

export function glossaryTerm(id: GlossaryTermId, locale: AppLocale): string {
  return TERMS[id][locale];
}
