import { ACTIVE_TIP_IDS, getTipMeta, isActiveTipId, isRemovedTipId, TIP_META } from '../catalog';
import { getLocalizedTip, getTipCopy, TIPS_BY_LOCALE } from '../content';
import { TERMS } from '../glossary';
import { TIPS_TR } from '../locales/tr';
import { SOURCE_RECORDS } from '../sources';
import { KNOWLEDGE_CATALOG_VERSION, REMOVED_TIP_IDS, type KnowledgeTipId } from '../types';

const EXPECTED_TR: Record<KnowledgeTipId, { title: string; message: string; detail: string }> = {
  fh_tip_001: {
    title: 'Cihazın temel parçaları',
    message:
      'İşitme cihazında mikrofon sesi alır, işlemci sesi işler ve hoparlör kulağa iletir.',
    detail:
      'Parçaların yerini kullanım kılavuzundan öğrenin. Tanımadığınız bir açıklığa temizleme aracı sokmayın.',
  },
  fh_tip_002: {
    title: 'Hortumlu cihazı tanıyın',
    message:
      'Hortumlu kulak arkası cihazlarda ses, cihazdan kulak ucuna veya kalıbına bir tüple taşınır.',
    detail:
      'Bu tüpün bakımı, içinde elektrik kablosu bulunan RIC/RITE bağlantısının bakımından farklıdır.',
  },
  fh_tip_003: {
    title: 'İnce bağlantı her zaman hortum değildir',
    message:
      'RIC/RITE cihazlarda kulağa uzanan ince bağlantı bir kablo içerir; temizleme telini içine sokmayın.',
    detail:
      'Hoparlör kulaktaki uç bölümündedir. Boş ses hortumu için verilen temizleme yöntemi bu bağlantıya uygulanmaz.',
  },
  fh_tip_004: {
    title: 'Kulak içi cihazlar',
    message:
      'Kulak içi cihazın gövdesi elektronik parçalar içerir; cihazı yıkamayın veya suya batırmayın.',
    detail:
      'Dış yüzey bakımı dışında işlem gerekiyorsa cihazı temin ettiğiniz merkeze danışın; parça sökmeyin.',
  },
  fh_tip_005: {
    title: 'Gerçekçi beklentiler',
    message:
      'İşitme cihazı duymayı kolaylaştırabilir; işitmeyi her ortamda tamamen normale döndürmez.',
    detail:
      'Kalabalıkta zorlanmanız tek başına cihazın arızalı olduğunu göstermez. İhtiyacınıza uygun ayarları odyoloğunuzla görüşün.',
  },
  fh_tip_006: {
    title: 'Kullanmayı birlikte deneyin',
    message:
      'Cihazı kulağa takmayı ve kulaktan çıkarmayı cihazı temin ettiğiniz merkezde uygulamalı olarak öğrenin.',
    detail:
      'Anlamadığınız adımı tekrar göstermesini isteyin. Cihazı kullanma biçimi modele ve kulak ucuna göre değişebilir.',
  },
  fh_tip_007: {
    title: 'Temiz ve kuru eller',
    message:
      'Cihaza veya piline dokunmadan önce ellerinizin temiz ve kuru olmasına dikkat edin.',
    detail:
      'Islak veya kirli ellerle cihazı tutmaktan kaçının; dış yüzey bakımını temiz bir yerde yapın.',
  },
  fh_tip_008: {
    title: 'Düşürme riskini azaltın',
    message:
      'Cihazı elinize aldığınızda veya dış yüzeyini temizlerken yumuşak bir yüzey üzerinde çalışın.',
    detail: 'Sert zemine düşmesi küçük parçalarına zarar verebilir.',
  },
  fh_tip_009: {
    title: 'Gövde temizliği',
    message:
      'Cihazın dış yüzeyini yumuşak ve kuru bir bezle nazikçe silin; hiçbir parçasını ayırmayın.',
    detail:
      'Dış yüzey bakımı yeterli değilse daha derin temizlik için cihazı temin ettiğiniz merkeze danışın.',
  },
  fh_tip_011: {
    title: 'Elektronik parçaları yıkamayın',
    message:
      'İşitme cihazının elektronik gövdesini ve hoparlör içeren kulak parçasını suya batırmayın.',
    detail:
      'Parçaları ayırmayın; dış yüzey bakımı yeterli değilse servis desteği alın.',
  },
  fh_tip_014: {
    title: 'Ev temizleyicilerini kullanmayın',
    message:
      'Cihazın elektronik gövdesini ev tipi deterjan veya sabunla temizlemeyin.',
    detail:
      'Yoğun kirlenmede uygun temizleme ürünü ve yöntemi için işitme uzmanınıza danışın.',
  },
  fh_tip_015: {
    title: 'Saç ürünlerine dikkat',
    message:
      'Saç spreyi gibi ürünleri uygularken işitme cihazınızı kulağınızdan çıkarın; ürünü doğrudan cihaza püskürtmeyin.',
    detail: 'Cihazı yeniden takmadan önce ellerinizdeki ürün kalıntılarını temizleyin.',
  },
  fh_tip_016: {
    title: 'Kir filtresinin görevi',
    message:
      'Kir filtresi bulunan cihazlarda filtre, hoparlörün kulak kirinden korunmasına yardımcı olur.',
    detail:
      'Bu bilgi, filtrenin görevini açıklar. Filtreyi çıkarma, temizleme veya değiştirme işlemi için servis desteği alın.',
  },
  fh_tip_019: {
    title: 'Silikon ucu kontrol edin',
    message:
      'Silikon uçta gevşeme, hasar veya kötü oturma fark ederseniz uygunluk kontrolü yaptırın.',
    detail:
      'Sorun devam ediyorsa cihazı zorlayarak yerleştirmeyin; işitme uzmanınızdan destek alın.',
  },
  fh_tip_021: {
    title: 'Hortumda çatlak veya kıvrılma',
    message:
      'Hortumlu cihazlarda gevşek, çatlamış veya kıvrılmış tüp ses sorunlarına yol açabilir.',
    detail:
      'Dışarıdan görünen hasarda cihazı temin ettiğiniz merkezle görüşün; hortumu sökmeyin veya kesmeyin.',
  },
  fh_tip_027: {
    title: 'Pil ömrü değişebilir',
    message:
      'İşitme cihazı pilinin kullanım süresi, cihazın kullanımına ve ses aktarımı gibi özelliklere göre değişebilir.',
    detail:
      'Her pilin aynı sayıda gün dayanmasını beklemeyin. Belirgin değişiklikleri kontrol görüşmesinde paylaşın.',
  },
  fh_tip_028: {
    title: 'Pil değişimini kaydedin',
    message:
      'Pil değişim tarihlerini kaydetmek, kendi kullanımınızdaki pil süresini takip etmeyi kolaylaştırır.',
    detail:
      'Birkaç değişimin kaydını karşılaştırın. Bu kayıt, pilin ne zaman biteceğini kesin olarak göstermez.',
  },
  fh_tip_029: {
    title: 'Küçük pilleri güvenle saklayın',
    message: 'İşitme cihazı pillerini çocukların ulaşamayacağı güvenli bir yerde saklayın.',
    detail: 'Yedek pilleri kapalı bir kapta, çocukların erişemeyeceği yerde tutun.',
  },
  fh_tip_031: {
    title: 'Bitmiş pil de güvenli değildir',
    message:
      'Bitmiş pilleri de çocukların erişiminden uzak tutun; boşalmış olmaları yutulmalarını güvenli yapmaz.',
    detail:
      'Kullanılmış pilleri güvenle saklayın ve yerel pil toplama sistemine uygun şekilde teslim edin.',
  },
  fh_tip_032: {
    title: 'Şarja koymadan önce',
    message:
      'Şarjlı cihazı şarja yerleştirmeden önce cihazın ve şarj ünitesinin temiz ve kuru olduğundan emin olun.',
    detail: 'Islak cihazı doğrudan şarja koymayın; modelin kurutma talimatını izleyin.',
  },
  fh_tip_033: {
    title: 'Şarj yuvasına doğru yerleştirin',
    message: 'Şarj başlamıyorsa cihazın doğru yuvaya tam yerleştiğini kontrol edin.',
    detail: 'Şarj ünitesindeki sol/sağ işaretlerini izleyin; cihazı yuvaya zorlamayın.',
  },
  fh_tip_034: {
    title: 'Güç bağlantısını kontrol edin',
    message: 'Şarj sorunu olduğunda şarj ünitesinin güç bağlantısını da kontrol edin.',
    detail:
      'Cihaz arızası sonucuna varmadan önce uygun kablo ve güç kaynağının doğru bağlandığından emin olun.',
  },
  fh_tip_035: {
    title: 'Her şarj kutusu taşınabilir batarya değildir',
    message:
      'Şarj kutusunun prizden bağımsız çalışması, içinde batarya bulunmasına ve bu bataryanın dolu olmasına bağlıdır.',
    detail:
      'Kutunuzun özelliklerini kılavuzundan kontrol edin; bütün modellerin aynı işlevi olduğunu varsaymayın.',
  },
  fh_tip_036: {
    title: 'Şarj ünitesi temizliği',
    message:
      'Şarj ünitesini temizlemeden önce güç bağlantısını kesin ve üreticinin temizlik talimatını izleyin.',
    detail:
      'Yuva yüzeyindeki tozu uygun, tüy bırakmayan bezle temizleyin; şarj ünitesini yıkamayın.',
  },
  fh_tip_037: {
    title: 'Gösterge ışıklarının anlamı',
    message:
      'Şarj ışıklarının renk ve yanıp sönme anlamlarını kendi modelinizin kılavuzundan kontrol edin.',
    detail:
      'Başka modelin ışık kodunu veya sıfırlama adımını uygulamayın. Sorun sürerse işitme merkezinize danışın.',
  },
  fh_tip_038: {
    title: 'Terleme sonrası nem kontrolü',
    message:
      'Spor veya terleme sonrasında cihazın üzerinde nem birikip birikmediğini kontrol edin.',
    detail: 'Kurutma için modelinize uygun yöntemi kullanın.',
  },
  fh_tip_039: {
    title: 'Sıcak araçta bırakmayın',
    message: 'İşitme cihazınızı sıcak araç içinde veya doğrudan güneş altında bırakmayın.',
    detail: 'Aşırı sıcaklık cihazınıza zarar verebilir.',
  },
  fh_tip_040: {
    title: 'Uygun kurutma yöntemi',
    message: 'Kurutma kutusu kullanacaksanız cihazınızla uyumlu olduğunu doğrulayın.',
    detail:
      'Şarj ve kurutma işlevlerinin aynı kutuda bulunduğunu varsaymayın; üretici talimatını kontrol edin.',
  },
  fh_tip_041: {
    title: 'Güvenli saklama',
    message:
      'Cihazı kullanmadığınızda uygun koruyucu kutusunda veya üreticinin önerdiği yerde saklayın.',
    detail: 'Düşme ve ezilme riski olan yüzeylerde bırakmayın.',
  },
  fh_tip_042: {
    title: 'Isıyla kurutmayın',
    message: 'Islanan işitme cihazını saç kurutma makinesi veya mikrodalgayla kurutmayın.',
    detail: 'Modeliniz için önerilen kurutma yöntemini izleyin.',
  },
  fh_tip_043: {
    title: 'Ses gelmiyorsa ilk kontrol',
    message:
      'Ses gelmiyorsa cihazın açık olduğunu, pil veya şarj durumunu ve sessize alınmadığını kontrol edin.',
    detail:
      'Sessiz mod özelliği modele göre değişir. Dışarıdan yapılabilen kontroller sonuç vermezse servis desteği alın; cihazın parçalarını açmayın.',
  },
  fh_tip_045: {
    title: 'Kesilen veya bozuk ses',
    message:
      'Kesilen veya bozuk ses; güç, tıkanıklık ya da nemle ilişkili olabilir, tek bir nedeni yoktur.',
    detail:
      'Dışarıdan yapılabilen kontroller sorunu çözmüyorsa servis desteği alın; cihazı açmayın.',
  },
  fh_tip_046: {
    title: 'Cihaz neden ötüyor?',
    message:
      'Cihazdaki ıslık sesi, yerleşim veya kulak ucuyla ilgili olabilir; tek başına arıza kanıtı değildir.',
    detail:
      'Cihazın kulağınıza doğru yerleştiğini kontrol edin. Süren ötmede cihazı temin ettiğiniz merkezden destek alın; parça sökmeyin.',
  },
  fh_tip_048: {
    title: 'Telefon bağlantısı',
    message:
      'Bluetooth bağlantısında sorun varsa telefonun ve işitme cihazının eşleştirme talimatını birlikte kontrol edin.',
    detail:
      'Bağlantı yolu modele ve telefon sistemine göre değişir. Tek bir markanın adımlarını bütün cihazlara uygulamayın.',
  },
  fh_tip_051: {
    title: 'Arka plan sesleri',
    message: 'İşitme cihazı istenen sesi bütün arka plan seslerinden tamamen ayıramaz.',
    detail:
      'Gürültülü ortamda sürekli zorlanıyorsanız program ve ayar seçeneklerini odyoloğunuzla görüşün.',
  },
  fh_tip_052: {
    title: 'Konuşanın yüzünü görün',
    message:
      'Konuşurken karşınızdakinin yüzünü görebilmek, dudak hareketleri ve mimiklerden yararlanmanızı sağlar.',
    detail: 'Yüzün iyi aydınlandığı ve ağzın kapatılmadığı bir konum seçin.',
  },
  fh_tip_053: {
    title: 'Ortam sesini azaltın',
    message:
      'Konuşurken televizyon veya radyo gibi arka plan seslerini azaltmak anlamayı kolaylaştırabilir.',
    detail:
      'Mümkünse daha sakin bir yerde yüz yüze konuşun; bağırmak her zaman daha anlaşılır konuşmak değildir.',
  },
  fh_tip_054: {
    title: 'Farklı kelimelerle tekrar',
    message:
      'Bir cümleyi anlamadıysanız aynı sözü daha yüksek sesle tekrarlamak yerine farklı kelimelerle açıklanmasını isteyin.',
    detail: 'Anlamadığınızı belirtmek, konuşmayı takip etmeyi kolaylaştırır.',
  },
  fh_tip_055: {
    title: 'Grup konuşmaları',
    message:
      'Grup içinde herkesin aynı anda konuşması yerine sırayla konuşulmasını isteyin.',
    detail:
      'Konuşmacıyı görebileceğiniz oturma düzeni ve uygun aydınlatma yardımcı olabilir.',
  },
  fh_tip_056: {
    title: 'Önemli bilgiyi yazıyla doğrulayın',
    message:
      'Tarih, adres veya randevu gibi önemli bilgileri gerekirse yazılı olarak da isteyin.',
    detail:
      'Yazı veya konuşmayı metne dönüştüren araçlar iletişimi destekleyebilir; otomatik metindeki hataları kontrol edin.',
  },
  fh_tip_061: {
    title: 'Düzenli bakımın yararı',
    message:
      'Düzenli bakım ve önerilen kontroller, işitme cihazınızın iyi çalışmasına ve kullanım ömrünün korunmasına yardımcı olabilir.',
    detail:
      'Bu, belirli bir kullanım ömrü veya performans artışı garantisi değildir. Dış bakımın ötesindeki işlemler için cihazı temin ettiğiniz merkezden destek alın.',
  },
  fh_tip_062: {
    title: 'İşitme cihazının sağladığı destek',
    message:
      'İşitme cihazı kalıcı işitme kaybını ortadan kaldırmaz; sesleri duymayı ve konuşmayı anlamayı destekler.',
    detail:
      'İletişimi kolaylaştırabilir. Konuşmayı algılama becerisinin zaman içinde mutlaka korunacağı veya kaybın ilerlemesinin duracağı garanti edilemez.',
  },
  fh_tip_063: {
    title: 'Başkasının ayarı size uygun olmayabilir',
    message:
      'Başkasına göre ayarlanmış bir işitme cihazını, size uygunluğu uzman tarafından değerlendirilmeden kullanmayın.',
    detail:
      'Cihaz seçimi, ayarı ve kulak parçasının uyumu kişiye göre değerlendirilir. Bir cihazın size uygun olması, başka biri için de uygun olduğu anlamına gelmez.',
  },
  fh_tip_064: {
    title: 'Değerlendirmeyi ertelemeyin',
    message:
      'İşitme güçlüğünüz varsa değerlendirmeyi ertelemeyin; size uygun desteğin zamanında belirlenmesi önemlidir.',
    detail:
      'Cihaz gerekip gerekmediği ve beklenen yarar kişisel değerlendirmeyle belirlenir. Erken başlamak herkeste aynı sonucu garanti etmez.',
  },
  fh_tip_065: {
    title: 'İşitme kontrolü için kişisel plan',
    message:
      'İşitme testinizin tekrar zamanını KBB hekiminiz veya odyoloğunuzla belirleyin; önerilen kontrolleri aksatmayın.',
    detail:
      'Herkes için tek bir yıllık takvim belirlemek yerine size önerilen takip planını uygulayın. Yıllık kontrol önerildiyse bu tarihi kaydedebilirsiniz.',
  },
  fh_tip_066: {
    title: 'Bakım aralığını cihazınıza göre belirleyin',
    message:
      'Cihaz bakım ve servis aralığını üreticinin talimatı ve cihazı temin ettiğiniz merkezin önerisiyle belirleyin.',
    detail:
      'Bütün cihazlar için en fazla üç ayda bir bakım zorunluluğu varsaymayın. Size üç aylık bakım planı verilmişse hatırlatıcınızı buna göre ayarlayabilirsiniz.',
  },
  fh_tip_067: {
    title: 'İşitme, denge ve çınlama',
    message:
      'İç kulak, işitme ve dengeyle ilgilidir; bazı durumlarda işitme kaybı, çınlama ve denge sorunları birlikte görülebilir.',
    detail:
      'Bu sorunlar her zaman aynı nedenden kaynaklanmaz. Böyle yakınmalarınızı KBB hekiminizle paylaşın; uygulama bunların nedenini belirleyemez.',
  },
  fh_tip_068: {
    title: 'Türkiye’de ruhsatlı işitme cihazı merkezleri',
    message:
      'Türkiye’de işitme cihazı merkezleri ruhsatla faaliyet gösterir. Hizmet alacağınız merkezin ruhsatını kontrol edin.',
    detail:
      'Ruhsat işlemleri İl Sağlık Müdürlüğü üzerinden yürütülür; merkez ruhsatı görünür yerde bulunmalıdır. Bu bilgi Türkiye’ye aittir; diğer ülkelerde kurallar farklı olabilir.',
  },
  fh_tip_069: {
    title: 'Konuşmayı ayırt etme sonuçları',
    message:
      'Konuşmayı ayırt etme skorunuzun işitme eşiklerinize göre beklenenden düşük olduğu belirtilmişse sonucu KBB hekiminiz ve odyoloğunuzla değerlendirin.',
    detail:
      'Bu karşılaştırma uzman yorumunu gerektirir. Sonuç tek başına belirli bir hastalık göstermez; uygulama skor hesabı veya tanı yapmaz.',
  },
};

const TURKEY_MARKERS: Record<string, string[]> = {
  tr: ['Türkiye'],
  en: ['Turkey'],
  de: ['Türkei'],
  es: ['Turquía'],
  it: ['Turchia'],
  fr: ['Turquie'],
  ar: ['تركيا'],
  'zh-Hans': ['土耳其'],
  hi: ['तुर्की'],
  te: ['టర్కీ'],
};

describe('knowledge bank', () => {
  it('has 49 active tips in the specified daily order', () => {
    expect(ACTIVE_TIP_IDS).toHaveLength(49);
    expect([...ACTIVE_TIP_IDS]).toEqual([
      'fh_tip_001',
      'fh_tip_002',
      'fh_tip_003',
      'fh_tip_004',
      'fh_tip_005',
      'fh_tip_006',
      'fh_tip_007',
      'fh_tip_008',
      'fh_tip_009',
      'fh_tip_011',
      'fh_tip_014',
      'fh_tip_015',
      'fh_tip_016',
      'fh_tip_019',
      'fh_tip_021',
      'fh_tip_027',
      'fh_tip_028',
      'fh_tip_029',
      'fh_tip_031',
      'fh_tip_032',
      'fh_tip_033',
      'fh_tip_034',
      'fh_tip_035',
      'fh_tip_036',
      'fh_tip_037',
      'fh_tip_038',
      'fh_tip_039',
      'fh_tip_040',
      'fh_tip_041',
      'fh_tip_042',
      'fh_tip_043',
      'fh_tip_045',
      'fh_tip_046',
      'fh_tip_048',
      'fh_tip_051',
      'fh_tip_052',
      'fh_tip_053',
      'fh_tip_054',
      'fh_tip_055',
      'fh_tip_056',
      'fh_tip_061',
      'fh_tip_062',
      'fh_tip_063',
      'fh_tip_064',
      'fh_tip_065',
      'fh_tip_066',
      'fh_tip_067',
      'fh_tip_068',
      'fh_tip_069',
    ]);
  });

  it('keeps removed IDs unused', () => {
    expect(REMOVED_TIP_IDS).toHaveLength(20);
    for (const id of REMOVED_TIP_IDS) {
      expect(isRemovedTipId(id)).toBe(true);
      expect(isActiveTipId(id)).toBe(false);
      expect(ACTIVE_TIP_IDS).not.toContain(id);
    }
  });

  it('matches Turkish source copy exactly', () => {
    for (const id of ACTIVE_TIP_IDS) {
      expect(TIPS_TR[id]).toEqual(EXPECTED_TR[id]);
    }
  });

  it('has complete non-empty copy for every locale', () => {
    const locales = Object.keys(TIPS_BY_LOCALE);
    expect(locales).toHaveLength(10);
    const counts: Record<string, number> = {};
    for (const locale of locales) {
      const table = TIPS_BY_LOCALE[locale as keyof typeof TIPS_BY_LOCALE];
      const ids = Object.keys(table);
      expect(ids).toHaveLength(49);
      counts[locale] = 0;
      for (const id of ACTIVE_TIP_IDS) {
        const copy = table[id];
        expect(copy.title.trim().length).toBeGreaterThan(0);
        expect(copy.message.trim().length).toBeGreaterThan(0);
        expect(copy.detail.trim().length).toBeGreaterThan(0);
        expect(`${copy.title} ${copy.message} ${copy.detail}`).not.toMatch(
          /(^|\s)(TODO|FIXME|TBD)(\s|$)/i,
        );
        counts[locale] += 1;
      }
    }
    expect(counts).toEqual({
      tr: 49,
      en: 49,
      de: 49,
      es: 49,
      it: 49,
      fr: 49,
      ar: 49,
      'zh-Hans': 49,
      hi: 49,
      te: 49,
    });
  });

  it('does not copy English into other locales', () => {
    const en = TIPS_BY_LOCALE.en;
    for (const locale of ['de', 'es', 'it', 'fr', 'ar', 'zh-Hans', 'hi', 'te'] as const) {
      for (const id of ACTIVE_TIP_IDS) {
        const copy = TIPS_BY_LOCALE[locale][id];
        expect(copy.title).not.toEqual(en[id].title);
        expect(copy.message).not.toEqual(en[id].message);
        expect(copy.detail).not.toEqual(en[id].detail);
      }
    }
  });

  it('keeps catalog metadata and Turkey jurisdiction', () => {
    expect(KNOWLEDGE_CATALOG_VERSION).toBe(1);
    for (const id of ACTIVE_TIP_IDS) {
      const meta = TIP_META[id];
      expect(meta.id).toBe(id);
      expect(meta.contentVersion).toBe(1);
      expect(meta.sourceIds.length).toBeGreaterThan(0);
      for (const sourceId of meta.sourceIds) {
        expect(SOURCE_RECORDS[sourceId as keyof typeof SOURCE_RECORDS]).toBeDefined();
      }
      if (id === 'fh_tip_068') {
        expect(meta.jurisdiction).toBe('TR');
      } else {
        expect(meta.jurisdiction).toBe('general');
      }
    }
  });

  it('keeps Turkey-specific scope for fh_tip_068 in every language', () => {
    for (const [locale, markers] of Object.entries(TURKEY_MARKERS)) {
      const copy = getTipCopy('fh_tip_068', locale as keyof typeof TIPS_BY_LOCALE);
      const blob = `${copy.title} ${copy.message} ${copy.detail}`;
      for (const marker of markers) {
        expect(blob).toContain(marker);
      }
      expect(blob).toMatch(/İl Sağlık Müdürlüğü/);
      expect(blob.toLowerCase()).not.toMatch(/germany|almanya|deutschland|fda|united states|amerika/);
    }
  });

  it('preserves safety wording for special tips', () => {
    expect(TIPS_BY_LOCALE.en.fh_tip_062.message).toContain(
      'does not eliminate permanent hearing loss',
    );
    expect(TIPS_BY_LOCALE.en.fh_tip_062.detail).toMatch(/cannot be guaranteed/i);
    expect(TIPS_BY_LOCALE.en.fh_tip_065.detail).toMatch(/Instead of setting a single annual calendar/);
    expect(TIPS_BY_LOCALE.en.fh_tip_066.detail).toMatch(/Do not assume a mandatory maintenance interval/);
    expect(TIPS_BY_LOCALE.en.fh_tip_069.detail).toMatch(/does not calculate scores or make a diagnosis/);
    expect(getLocalizedTip('fh_tip_011', 'en').message).toMatch(/Do not immerse/);
    expect(getTipMeta('fh_tip_016').audience).toBe('WAX_FILTER');
  });

  it('has glossary terms for all 10 locales', () => {
    for (const entry of Object.values(TERMS)) {
      expect(Object.keys(entry)).toHaveLength(10);
      for (const value of Object.values(entry)) {
        expect(value.trim().length).toBeGreaterThan(0);
      }
    }
  });
});
