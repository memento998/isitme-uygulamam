/**
 * Sorun giderme kategorileri ve adım adım güvenli çözüm akışları.
 * Adımlar yalnızca kullanıcı tarafından güvenle yapılabilecek işlemleri içerir;
 * cihazı sökme veya elektronik parçalara müdahale önerilmez.
 */

export interface TroubleshootingStep {
  /** Adımda yapılacak işlem. */
  instruction: string;
  /** İşlemin nasıl yapılacağına dair kısa açıklama. */
  detail: string;
}

export interface TroubleshootingCategory {
  id: string;
  title: string;
  /** Ionicons ikon adı. */
  icon: string;
  /** Arama için ek anahtar kelimeler. */
  keywords: string[];
  steps: TroubleshootingStep[];
}

export const EXPERT_WARNING =
  'Cihazı kullanmayı bırakmanız gerekmeyebilir ancak cihazı açmadan veya onarmaya ' +
  'çalışmadan işitme uzmanınıza ya da yetkili servise başvurun.';

const CHECK_POWER: TroubleshootingStep = {
  instruction: 'Cihazın açık olduğunu kontrol edin',
  detail:
    'Cihazın açma/kapama düğmesinin veya pil kapağının tam kapalı olduğundan emin olun. ' +
    'Bazı cihazlar pil kapağı aralandığında kapanır.',
};

const CHECK_BATTERY: TroubleshootingStep = {
  instruction: 'Pili veya şarj seviyesini kontrol edin',
  detail:
    'Cihazınızın gösterdiği pil veya şarj durumunu kullanım kılavuzuna göre kontrol edin. ' +
    'Sorun sürerse cihazı aldığınız merkezden destek alın.',
};

const CHECK_FILTER: TroubleshootingStep = {
  instruction: 'Filtre, hortum veya kubbenin tıkalı olup olmadığını kontrol edin',
  detail:
    'Cihazı ve parçalarını ayırmadan, dışarıdan görülebilen kir veya hasar olup olmadığını kontrol edin. ' +
    'Açıklıklara temizlik aracı sokmayın. Sorun varsa cihazı aldığınız merkezden destek alın.',
};

const RESTART_DEVICE: TroubleshootingStep = {
  instruction: 'Cihazı yeniden başlatın',
  detail:
    'Yeniden başlatma yöntemi modele göre değişir. Parça çıkarmadan uygulanabilen bir yöntem varsa ' +
    'üreticinin kullanım kılavuzunu izleyin; emin değilseniz cihazı aldığınız merkezden destek alın.',
};

const RESTART_BLUETOOTH: TroubleshootingStep = {
  instruction: 'Telefon bağlantısını kapatıp yeniden açın',
  detail:
    'Telefonunuzun Bluetooth ayarını kapatın, birkaç saniye bekleyin ve yeniden açın. ' +
    'Eşleştirme için telefonunuzun ve cihazınızın kendi yönergelerini izleyin.',
};

export const TROUBLESHOOTING_CATEGORIES: TroubleshootingCategory[] = [
  {
    id: 'no-sound',
    title: 'Ses hiç gelmiyor',
    icon: 'volume-mute-outline',
    keywords: ['sessiz', 'çalışmıyor', 'duymuyorum', 'ses yok'],
    steps: [
      CHECK_POWER,
      CHECK_BATTERY,
      CHECK_FILTER,
      {
        instruction: 'Ses seviyesini kontrol edin',
        detail:
          'Cihazın ses düğmesi veya uygulaması varsa sesin tamamen kısılmış olmadığından emin olun.',
      },
      RESTART_DEVICE,
    ],
  },
  {
    id: 'low-sound',
    title: 'Ses az geliyor',
    icon: 'volume-low-outline',
    keywords: ['kısık', 'zayıf', 'az duyuyorum', 'düşük ses'],
    steps: [
      {
        instruction: 'Ses seviyesini kontrol edin',
        detail: 'Ses düğmesinden veya cihaz uygulamasından ses seviyesini bir kademe artırın.',
      },
      CHECK_FILTER,
      CHECK_BATTERY,
      {
        instruction: 'Kulak kalıbının yerleşimini kontrol edin',
        detail:
          'Cihazın kulağınıza yerleşimini, size gösterilen kullanım biçimine göre kontrol edin. Parçaları birbirinden ayırmayın ve cihazı zorlayarak yerleştirmeyin. Sorun sürerse cihazı aldığınız merkezden destek alın.',
      },
      RESTART_DEVICE,
    ],
  },
  {
    id: 'intermittent-sound',
    title: 'Ses kesik kesik geliyor',
    icon: 'pulse-outline',
    keywords: ['kesiliyor', 'gidip geliyor', 'düzensiz', 'kesinti'],
    steps: [
      CHECK_BATTERY,
      CHECK_FILTER,
      {
        instruction: 'Nem kontrolü yapın',
        detail:
          'Nem fark ederseniz cihazınızın kullanım kılavuzundaki uygun kurutma yöntemini izleyin. Kurutma aksesuarının cihazınızla uyumlu olduğundan emin değilseniz cihazı aldığınız merkeze danışın.',
      },
      RESTART_DEVICE,
      RESTART_BLUETOOTH,
    ],
  },
  {
    id: 'echo',
    title: 'Kendi sesim yankılı geliyor',
    icon: 'mic-outline',
    keywords: ['yankı', 'eko', 'tuhaf ses', 'boğuk'],
    steps: [
      {
        instruction: 'Kulak kalıbının yerleşimini kontrol edin',
        detail:
          'Cihazın kulağınıza yerleşimini, size gösterilen kullanım biçimine göre kontrol edin. Parçaları birbirinden ayırmayın ve cihazı zorlayarak yerleştirmeyin. Sorun sürerse cihazı aldığınız merkezden destek alın.',
      },
      CHECK_FILTER,
      {
        instruction: 'Ses ayarlarını gözden geçirin',
        detail:
          'Cihaz uygulamasında farklı bir dinleme programı varsa deneyebilirsiniz. Yankı sürüyorsa ayar uzmanınızca yapılmalıdır.',
      },
      RESTART_DEVICE,
    ],
  },
  {
    id: 'too-loud-ambient',
    title: 'Çevre sesleri çok geliyor',
    icon: 'volume-high-outline',
    keywords: ['gürültü', 'rahatsız', 'yüksek', 'çok ses'],
    steps: [
      {
        instruction: 'Ses seviyesini bir kademe azaltın',
        detail: 'Ses düğmesinden veya uygulamadan sesi kademeli olarak düşürün.',
      },
      {
        instruction: 'Dinleme programını kontrol edin',
        detail:
          'Cihazınızda gürültülü ortam programı varsa onu seçin. Program bilgisini uzmanınızdan öğrenebilirsiniz.',
      },
      RESTART_DEVICE,
    ],
  },
  {
    id: 'whistling',
    title: 'Cihaz ötüyor',
    icon: 'radio-outline',
    keywords: ['ötme', 'ıslık', 'feedback', 'siren', 'tiz ses'],
    steps: [
      {
        instruction: 'Cihazın kulağınıza tam oturduğunu kontrol edin',
        detail:
          'Cihazın kulağınıza yerleşimini, size gösterilen kullanım biçimine göre kontrol edin. Parçaları birbirinden ayırmayın ve cihazı zorlayarak yerleştirmeyin. Sorun sürerse cihazı aldığınız merkezden destek alın.',
      },
      CHECK_FILTER,
      {
        instruction: 'Ses seviyesini kontrol edin',
        detail: 'Ses çok yüksekse bir kademe azaltın; yüksek ses ötmeyi tetikleyebilir.',
      },
      {
        instruction: 'Şapka, atkı veya telefon temasını kontrol edin',
        detail:
          'Cihaza yakın duran nesneler ötmeye yol açabilir. Nesneyi uzaklaştırıp tekrar deneyin.',
      },
    ],
  },
  {
    id: 'not-charging',
    title: 'Cihaz şarj olmuyor',
    icon: 'battery-charging-outline',
    keywords: ['şarj', 'batarya', 'dolmuyor', 'şarj aleti'],
    steps: [
      {
        instruction: 'Şarj ünitesinin elektrik bağlantısını kontrol edin',
        detail:
          'Şarj kablosunun prize ve üniteye tam oturduğundan emin olun. Mümkünse farklı bir priz deneyin.',
      },
      {
        instruction: 'Cihazın şarj yuvasına tam oturduğunu kontrol edin',
        detail:
          'Cihazı yuvadan çıkarıp yeniden yerleştirin. Şarj göstergesinin yandığını doğrulayın.',
      },
      {
        instruction: 'Şarj temas noktalarını kuru bir bezle silin',
        detail:
          'Şarj ünitesinin güç bağlantısını ayırın. Cihazın ve yuvanın dış yüzeyindeki temas noktalarını üreticinin talimatına göre kuru, yumuşak bir bezle nazikçe silin. Yıkamayın ve parçaları sökmeyin.',
      },
      RESTART_DEVICE,
    ],
  },
  {
    id: 'bluetooth',
    title: 'Bluetooth bağlantısı kurulmuyor',
    icon: 'bluetooth-outline',
    keywords: ['telefon', 'eşleşme', 'bağlanmıyor', 'müzik', 'arama'],
    steps: [
      {
        instruction: 'Telefonun Bluetooth ayarının açık olduğunu kontrol edin',
        detail: 'Telefon ayarlarından Bluetooth özelliğinin açık olduğundan emin olun.',
      },
      RESTART_BLUETOOTH,
      RESTART_DEVICE,
      {
        instruction: 'Cihazı yeniden eşleştirin',
        detail:
          'Cihazınızı ve telefonunuzu üreticinin veya telefonun kendi eşleştirme yönergesine göre yeniden bağlayın. Her modelde listeden silmek gerekmez.',
      },
      {
        instruction: 'Telefonu yeniden başlatın',
        detail: 'Telefonu kapatıp açmak bağlantı sorunlarını çözebilir.',
      },
    ],
  },
];

export interface TroubleshootingSearchText {
  title: string;
  keywords: readonly string[];
}

/** Arama metnine göre kategorileri filtreler. Yerelleştirilmiş başlık/anahtar kelime verilebilir. */
export function searchCategories(
  query: string,
  localizedById?: Partial<Record<string, TroubleshootingSearchText>>
): TroubleshootingCategory[] {
  const q = query.trim().toLocaleLowerCase();
  if (!q) return TROUBLESHOOTING_CATEGORIES;
  return TROUBLESHOOTING_CATEGORIES.filter((c) => {
    const loc = localizedById?.[c.id];
    const title = loc?.title ?? c.title;
    const keywords = loc?.keywords ?? c.keywords;
    return (
      title.toLocaleLowerCase().includes(q) ||
      keywords.some((k) => k.toLocaleLowerCase().includes(q))
    );
  });
}

export function getCategory(id: string): TroubleshootingCategory | null {
  return TROUBLESHOOTING_CATEGORIES.find((c) => c.id === id) ?? null;
}
