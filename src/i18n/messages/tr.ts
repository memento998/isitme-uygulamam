import type { UiMessages } from './types';

export const tr = {
  common: {
    cancel: 'Vazgeç',
    save: 'Kaydet',
    delete: 'Sil',
    retry: 'Tekrar dene',
    loading: 'Yükleniyor…',
    errorGeneric: 'Bir hata oluştu.',
    loadError: 'Veriler yüklenirken bir sorun oluştu. Lütfen tekrar deneyin.',
    back: 'Geri',
    today: 'Bugün',
    tomorrow: 'Yarın',
    daysLater: '{count} gün sonra',
    daysLateOne: '1 gün gecikti',
    daysLateMany: '{count} gün gecikti',
    required: 'Zorunlu',
    done: 'Tamam',
    continue: 'Devam et',
    enable: 'Etkinleştir',
    notNow: 'Şimdi değil',
    seeAll: 'Tümünü gör',
    search: 'Ara',
    clearSearch: 'Aramayı temizle',
    noResults: 'Sonuç bulunamadı',
    close: 'Kapat',
    systemLanguage: 'Sistem dili',
    language: 'Dil',
    settings: 'Ayarlar',
    confirm: 'Onayla',
    destructive: 'Sil',
  },
  nav: {
    devices: 'Cihazlar',
    myDevices: 'Cihazlarım',
    troubleshooting: 'Sorun Giderme',
    stats: 'İstatistik',
    more: 'Daha Fazla',
  },
  home: {
    emptyTitle: 'Henüz cihaz eklemediniz',
    emptyDescription: 'İşitme cihazınızı ekleyerek kontrol ve bakım takibine başlayın.',
    addDevice: 'Cihaz Ekle',
    addDeviceA11y: 'Yeni cihaz ekle',
    sampleDataDev: 'Örnek veri yükle (geliştirici)',
    deleteDeviceTitle: 'Cihazı sil',
    deleteDeviceMessage:
      '"{name}" cihazı ve tüm kontrol, bakım ve servis kayıtları kalıcı olarak silinecek. Bu işlem geri alınamaz.',
    fabA11y: 'Yeni cihaz ekle',
    openDeviceA11y: '{name} detayına git',
    editDeviceA11y: '{name} cihazını düzenle',
    deleteDeviceA11y: '{name} cihazını sil',
    usageStart: 'Kullanım başlangıcı: {date}',
    completed: 'Tamamlanan',
    pending: 'Bekleyen',
    overdue: 'Geciken',
    nextCheckup: 'En yakın kontrol: {date} ({when})',
    noPlannedCheckup: 'Planlanmış kontrol yok',
    earLeft: 'Sol kulak',
    earRight: 'Sağ kulak',
    earBoth: 'İki kulak',
    powerBattery: 'Pilli',
    powerRechargeable: 'Şarjlı',
  },
  knowledge: {
    dailyTip: 'Günün Bilgisi',
    seeAllTips: 'Tüm bilgileri gör',
    openedNotification: 'Bildirimin bilgisi · {date}',
    openInCurrentLanguage: 'Geçerli dilde aç',
    tipRetired: 'Bu bilgi artık yayında değil',
    tipRetiredBody:
      'Bu günlük bilgi güncellendi veya kaldırıldı. Bilgi bankasından güncel içeriklere bakabilirsiniz.',
    knowledgeBank: 'Bilgi Bankası',
    knowledgeBankSubtitle:
      'İşitme cihazının günlük kullanımı, bakımı ve saklanması üzerine kısa, güvenilir bilgiler',
    searchTipsPlaceholder: 'Bilgi ara…',
    categoryAll: 'Tümü',
    todayBadge: 'Bugün',
    audienceLabel: 'Hedef kitle',
    sources: 'Kaynaklar',
    generalInfo: 'Genel bilgi',
    generalInfoBody:
      'Bu bölüm cihazın günlük kullanımı, dış bakımı ve saklanması içindir. Cihazınıza özel işlemler için üreticinin kullanım kılavuzunu ve yetkili servis desteğini esas alın.',
    forWhom: 'Kimler için',
    jurisdictionTR:
      "Bu içerik Türkiye'deki genel kullanım bağlamına göredir; ülkenize özgü kural ve hizmetler farklılık gösterebilir.",
    sourceLanguageNote: 'Kaynak sayfalarının dili İngilizce olabilir.',
    enableDailyPromptTitle: 'Günlük bilgi bildirimi',
    enableDailyPromptBody:
      'Her gün kısa bir bakım veya kullanım bilgisi almak ister misiniz? Bildirimler yalnızca cihazınızda planlanır.',
    enableDailyNotifications: 'Günlük bilgileri aç',
    dailyNotifications: 'Günlük bilgiler',
    dailyNotificationTime: 'Günlük bilgi saati',
    dailyNotificationHelp:
      'Seçtiğiniz saatte kısa bir bakım veya kullanım bilgisi gönderilir. Tıbbi tavsiye değildir.',
    permissionDeniedOpenSettings:
      'Bildirim izni reddedilmiş. İzni telefonunuzun ayarlar bölümünden açabilirsiniz.',
    knowledgeChannelName: 'Günlük bilgiler',
    knowledgeChannelDescription: 'İşitme cihazı bakımı ve günlük kullanım bilgileri',
    planningHorizonNote:
      'Günlük bilgi bildirimi birkaç gün ilerisi için planlanır ve uygulama açıldığında güncellenir.',
    filterByCategory: 'Kategoriye göre süz',
    keywords: 'Anahtar kelimeler',
    categories: {
      deviceIntro: 'Cihazı Tanıma',
      cleaning: 'Temizlik',
      filtersAndParts: 'Filtre ve Parçalar',
      batteryAndSafety: 'Pil ve Güvenlik',
      charging: 'Şarj',
      moistureAndStorage: 'Nem ve Saklama',
      troubleshooting: 'Sorun Giderme',
      dailyLife: 'Günlük Yaşam',
      usageAndCheck: 'Kullanım ve Kontrol',
    },
    audience: {
      ALL: 'Herkes',
      BTE_TUBE: 'BTE hortumlu',
      RIC_RITE: 'RIC / RITE',
      ITE: 'ITE (kulak içi)',
      REPLACEABLE_BATTERY: 'Değiştirilebilir pilli',
      RECHARGEABLE: 'Şarjlı',
      WAX_FILTER: 'Kulak kiri filtreli',
      DOME: 'Silikon uç',
      BLUETOOTH: 'Bluetooth',
    },
  },
  language: {
    title: 'Dil',
    subtitle:
      'Uygulama metinlerinin dilini seçin. Sistem dili, telefonunuzun tercih ettiği dillerden desteklenen ilkini kullanır.',
    systemOption: 'Sistem dili',
    restartNeededTitle: 'Uygulamayı yeniden başlatın',
    restartNeededBody:
      'Dil değişikliğinin tüm ekranlara yansıması için uygulamayı kapatıp yeniden açın.',
    saved: 'Dil kaydedildi.',
  },
  notifications: {
    permission: 'Bildirim izni',
    permissionGranted: 'İzin verildi',
    permissionDenied: 'İzin reddedildi',
    permissionUndetermined: 'Henüz izin istenmedi',
    permissionUnsupported: 'Bu platformda desteklenmiyor',
    permissionExplanation:
      'Kontrol ve bakım hatırlatmaları ile açmayı seçtiğiniz günlük bilgi bildirimlerini gönderebilmek için bildirim izni gerekir. Günlük bilgi bildirimlerini ayrıca açıp kapatabilirsiniz.',
    requestPermission: 'Bildirim İzni Ver',
    permissionStatus: 'Durum: {state}',
    maintenanceTime: 'Bildirim saati',
    maintenanceTimeHelp:
      'Kontrol ve bakım hatırlatmaları, planlanan günde aşağıda seçtiğiniz saatte gönderilir.',
    timeSaved: 'Bildirim saati kaydedildi ve hatırlatmalar güncellendi.',
    webUnsupported:
      'Web önizlemesinde bildirimler desteklenmez. Bildirimleri Android cihazınızda kullanabilirsiniz.',
    dailyKnowledgeSection: 'Günlük bilgi',
    dailyKnowledgeOffHelp:
      'Günlük bilgi bildirimleri kapalı. İsterseniz aşağıdan açabilirsiniz.',
    openSystemSettings: 'Sistem ayarlarını aç',
    remindersChannelName: 'Hatırlatmalar',
    remindersChannelDescription: 'Kontrol ve bakım hatırlatmaları',
    checkupReminderTitle: 'Kontrol hatırlatması',
    checkupReminderBody: '{device}: {title} — {date}',
    maintenanceReminderTitle: 'Bakım hatırlatması',
    maintenanceReminderBody: '{device}: {label} — {date}',
  },
  more: {
    calendar: 'Takvim',
    calendarSubtitle: 'Yaklaşan kontrol ve bakım işlemleri',
    notificationSettings: 'Bildirim ayarları',
    notificationSubtitle: 'İzin ve bildirim saati',
    pdfReports: 'PDF raporları',
    pdfSubtitle: 'Cihaz özet raporu oluştur ve paylaş',
    backup: 'Yedekleme ve geri yükleme',
    backupSubtitle: 'Verileri JSON olarak dışa aktar veya geri yükle',
    privacy: 'Gizlilik Politikası',
    privacySubtitle: 'Verileriniz yalnızca cihazınızda saklanır',
    terms: 'Kullanım Koşulları',
    termsSubtitle: 'Uygulamanın kullanımına ilişkin özet bilgi',
    disclaimer: 'Tıbbi Sorumluluk Reddi',
    disclaimerSubtitle: 'Yasal bilgilendirme — uygulama tıbbi tanı koymaz',
    about: 'Uygulama hakkında',
    sampleData: 'Örnek veri yükle (geliştirici)',
    sampleDataSubtitle: 'Yalnızca geliştirme modunda görünür',
    deleteAll: 'Tüm verileri sil',
    deleteAllSubtitle: 'Bütün cihaz ve kayıtlar kalıcı olarak silinir',
    deleteAllTitle: 'Tüm verileri sil',
    deleteAllMessage:
      'Tüm cihazlarınız, kontrol takvimleriniz, bakım ve servis kayıtlarınız kalıcı olarak silinecek. Bu işlem geri alınamaz. Devam etmek istiyor musunuz?',
    deleteAllConfirm: 'Evet, hepsini sil',
    dataDeleted: 'Tüm verileriniz silindi.',
    sampleLoaded: 'Örnek veriler yüklendi.',
  },
  legal: {
    privacy: {
      title: 'Gizlilik Politikası',
      banner: 'Girdiğiniz kayıtlar bu sürümde kendi cihazınızda saklanır.',
      storageHeading: 'Verileriniz nerede saklanır?',
      storageBody:
        'FixHear uygulamasına girdiğiniz cihaz, kontrol, bakım ve servis kayıtları yalnızca telefonunuzdaki yerel veritabanında saklanır. FixHear bu kayıtları kendi sunucusuna göndermez. Yedekleme yalnızca sizin başlattığınız paylaşımla yapılır. Reklam sağlayıcısının işleyebileceği teknik veriler aşağıdaki reklam bölümünde ayrı açıklanır.',
      accountHeading: 'Hesap ve üyelik',
      accountBody: 'Uygulama üyelik veya giriş gerektirmez. Kişisel kimlik bilgisi toplamaz.',
      controlHeading: 'Verilerinizin kontrolü sizde',
      controlBody:
        'Verilerinizi dilediğiniz zaman "Daha Fazla > Yedekleme" bölümünden JSON dosyası olarak dışa aktarabilir, "Tüm verileri sil" seçeneğiyle kalıcı olarak silebilirsiniz. Uygulamayı telefonunuzdan kaldırdığınızda tüm veriler de silinir.',
      notificationsHeading: 'Bildirimler',
      notificationsBody:
        'Bildirimler tamamen cihaz üzerinde planlanır. Bildirim içerikleri hiçbir yere gönderilmez.',
      adsHeading: 'Reklamlar',
      adsBody:
        'Uygulama, Google AdMob aracılığıyla alt bant (banner) ve uygulama açılışında bir kez gösterilen geçiş (interstitial) reklamı sunabilir. Reklam sunumu için Google, cihaz tanımlayıcıları gibi bazı teknik verileri kendi gizlilik politikası kapsamında işleyebilir; bu veriler fixhear tarafından toplanmaz. Reklamlar kişiselleştirilmemiş modda istenir.',
      otherLegalHeading: 'Diğer yasal metinler',
      otherLegalBody:
        'Kullanım Koşulları ve Tıbbi Sorumluluk Reddi / Yasal Bilgilendirme metinlerine Daha Fazla menüsünden ulaşabilirsiniz. Veri silme işlemi Daha Fazla sayfasındaki "Tüm verileri sil" seçeneğiyle yapılır.',
    },
    terms: {
      title: 'Kullanım Koşulları',
      banner:
        'Bu sayfa bir özet yer tutucudur. Nihai kullanım koşulları hukuki inceleme gerektirir.',
      usageHeading: 'Uygulamanın kullanımı',
      usageBody:
        'FixHear, işitme cihazı takip ve hatırlatma amaçlı ücretsiz bir uygulamadır. Bu sayfa bağlayıcı bir sözleşme değildir.',
      notMedicalHeading: 'Tıbbi cihaz değildir',
      notMedicalBody:
        'Uygulama tıbbi tanı koymaz, tedavi önermez ve belgelendirilmiş bir tıbbi cihaz değildir. Cihaz ayarları ve sağlık kararları için işitme uzmanınıza danışın.',
      dataHeading: 'Veriler ve sorumluluk',
      dataBody:
        'Girdiğiniz kayıtlar bu sürümde yalnızca cihazınızda saklanır. Yedekleme dosyasını nerede tutacağınız size aittir. Uygulamadaki kayıtlara dayanarak alınan kararlardan kullanıcı sorumludur.',
      adsHeading: 'Reklamlar',
      adsBody:
        'Uygulama reklam gösterebilir. Reklam sağlayıcısının işlediği teknik veriler Gizlilik Politikası sayfasında özetlenir.',
    },
    disclaimer: {
      title: 'Tıbbi Sorumluluk Reddi',
      banner: 'Bu uygulama tıbbi tanı koymaz ve işitme uzmanınızın yerini tutmaz.',
      purposeHeading: 'Uygulamanın amacı',
      purposeBody:
        'FixHear, işitme cihazınızın kontrol ve bakım tarihlerini takip etmenize yardımcı olan bir hatırlatma ve kayıt aracıdır. Sağladığı bilgiler yalnızca genel niteliktedir.',
      notAdviceHeading: 'Tıbbi tavsiye değildir',
      notAdviceBody:
        'Uygulamadaki kontrol takvimi, bakım önerileri ve sorun giderme adımları tıbbi tavsiye değildir. Bu kontrol programı yalnızca örnek bir hatırlatma takvimidir, tıbbi tavsiye değildir. Kontrol sıklığını işitme uzmanınızla birlikte belirleyin.',
      problemHeading: 'Sorun durumunda',
      problemBody:
        'Cihazınızda çözemediğiniz bir sorun varsa cihazı açmadan veya onarmaya çalışmadan işitme uzmanınıza ya da yetkili servise başvurun. İşitmenizle ilgili herhangi bir değişiklik fark ederseniz vakit kaybetmeden bir sağlık kuruluşuna danışın.',
      liabilityHeading: 'Sorumluluk',
      liabilityBody:
        'Uygulamadaki bilgiler nedeniyle alınan kararlardan kullanıcı sorumludur. Acil durumlarda derhal sağlık kuruluşuna başvurun.',
    },
    about: {
      title: 'Uygulama Hakkında',
      appName: 'FixHear',
      version: 'Sürüm {version}',
      paragraph1:
        'FixHear; işitme cihazı kullanan kişilerin cihazlarını, periyodik kontrollerini, bakım işlemlerini ve yaşadıkları temel sorunları takip edebilmesi için geliştirilmiş ücretsiz bir uygulamadır.',
      paragraph2:
        'Girdiğiniz kayıtlar bu sürümde telefonunuzda saklanır. Reklam gösterimi için internet bağlantısı gerekebilir; reklam sağlayıcısının teknik verileri Gizlilik Politikasında özetlenir.',
      paragraph3:
        'Bu uygulama tıbbi bir araç veya belgelendirilmiş bir tıbbi cihaz değildir. Kontrol sıklığı ve cihaz ayarları için her zaman işitme uzmanınıza danışın.',
      paragraph4:
        'Gizlilik Politikası, Kullanım Koşulları ve Tıbbi Sorumluluk Reddi / Yasal Bilgilendirme metinlerine Daha Fazla menüsünden ulaşabilirsiniz.',
    },
  },
  deviceForm: {
    titleNew: 'Yeni Cihaz',
    titleEdit: 'Cihazı Düzenle',
    submitNew: 'Cihazı Kaydet',
    submitEdit: 'Değişiklikleri Kaydet',
    photoAdd: 'Fotoğraf ekle',
    photoAddA11y: 'Cihaz fotoğrafı ekle',
    photoChangeA11y: 'Cihaz fotoğrafını değiştir',
    photoRemove: 'Fotoğrafı kaldır',
    name: 'Cihaz adı',
    nameRequired: 'Cihaz adı zorunludur.',
    namePlaceholder: 'Örn. Sağ kulak cihazım',
    brand: 'Marka',
    brandRequired: 'Listeden bir marka seçin.',
    brandPlaceholder: 'Marka seçin',
    brandHelper: "Listede yoksa Diğer'i seçin.",
    ear: 'Kulak',
    left: 'Sol',
    right: 'Sağ',
    both: 'İki kulak',
    startDate: 'Kullanım başlangıç tarihi',
    startInvalid: 'Geçerli bir başlangıç tarihi seçin.',
    startFuture: 'Başlangıç tarihi gelecekte olamaz.',
    startHelper: 'Kontrol takvimi bu tarihe göre oluşturulur.',
    serial: 'Seri numarası',
    serialPlaceholder: 'Örn. PH-2025-004512',
    warranty: 'Garanti bitiş tarihi',
    dateInvalid: 'Geçerli bir tarih seçin.',
    powerType: 'Güç tipi',
    powerBattery: 'Pilli',
    powerRechargeable: 'Şarjlı',
    clinic: 'Doktor veya klinik adı',
    clinicPlaceholder: 'Örn. Dr. Ayşe Yılmaz',
    phone: 'Telefon numarası',
    phonePlaceholder: 'Örn. 0212 555 12 34',
    phoneInvalid: 'Geçerli bir telefon numarası girin.',
    notes: 'Notlar',
    notesPlaceholder: 'Cihazla ilgili notlarınız',
    reminders: 'Hatırlatıcılar',
    remindersHelp: 'Kontrol ve bakım tarihleri için bildirim gönderilsin',
    saveError: 'Cihaz kaydedilirken bir sorun oluştu. Lütfen tekrar deneyin.',
    scheduleBanner:
      'Cihaz eklendiğinde 1. ay, 3. ay, 6. ay, 1. yıl, 1,5 yıl, 2. yıl ve sonrasında 6 ayda bir olacak şekilde örnek bir kontrol takvimi oluşturulur. Bu kontrol programı yalnızca örnek bir hatırlatma takvimidir, tıbbi tavsiye değildir. Kontrol sıklığını işitme uzmanınızla birlikte belirleyin.',
  },
  deviceDetail: {
    screenTitle: 'Cihaz Detayı',
    notFound: 'Cihaz bulunamadı.',
    complete: 'Tamamla',
    addCheckup: 'Kontrol Ekle',
    edit: 'Düzenle',
    delete: 'Sil',
    pdf: 'PDF Raporu',
    pdfError: 'PDF raporu oluşturulurken bir sorun oluştu.',
    switchError: 'Hatırlatıcı güncellenirken bir sorun oluştu. Lütfen tekrar deneyin.',
    upcoming: 'Yaklaşan işlemler',
    upcomingEmpty: 'Yaklaşan işlem yok.',
    completedSection: 'Tamamlanan işlemler',
    completedEmpty: 'Henüz tamamlanan işlem yok.',
    checkups: 'Kontrol takvimi',
    noPlannedCheckup: 'Planlanmış kontrol yok.',
    maintenance: 'Bakım hatırlatıcıları',
    maintenanceHistory: 'Bakım geçmişi',
    maintenanceHistoryEmpty: 'Tamamlanan bakım işlemleri burada görünür.',
    service: 'Servis kayıtları',
    serviceEmpty: 'Henüz servis kaydı yok.',
    addService: 'Kayıt Ekle',
    reopen: 'Geri Al',
    checkupDisclaimer:
      'Bu kontrol programı yalnızca örnek bir hatırlatma takvimidir, tıbbi tavsiye değildir. Kontrol sıklığını işitme uzmanınızla birlikte belirleyin.',
    ear: 'Kulak',
    startDate: 'Kullanım başlangıcı',
    powerType: 'Güç tipi',
    serial: 'Seri numarası',
    warranty: 'Garanti bitişi',
    clinic: 'Doktor / Klinik',
    phone: 'Telefon',
    notes: 'Notlar',
    reminders: 'Hatırlatıcılar',
    remindersOn: 'Açık',
    remindersOff: 'Kapalı',
    intervalDays: '{count} günde bir',
    nextAt: 'Sıradaki: {date}',
    lastDone: 'Son yapılma: {date}',
    warrantyEnd: 'Garanti bitişi: {date}',
    warrantyMissing: 'Garanti tarihi girilmemiş',
    planned: 'Planlanan: {date}',
    completedAt: 'Tamamlandı: {date}',
    note: 'Not: {note}',
    deleteDeviceTitle: 'Cihazı sil',
    deleteDeviceMessage:
      '"{name}" cihazı ve tüm kontrol, bakım ve servis kayıtları kalıcı olarak silinecek. Bu işlem geri alınamaz.',
    deleteCheckupTitle: 'Kontrolü sil',
    deleteServiceTitle: 'Servis kaydını sil',
    deleteLogTitle: 'Bakım kaydını sil',
    deleteRecordMessage: '"{title}" kaydı silinecek. Bu işlem geri alınamaz.',
    checkupEditA11y: '{title} kontrolünü düzenle',
    checkupDeleteA11y: '{title} kontrolünü sil',
    reminderA11y: '{label} hatırlatıcısı',
    reminderEditA11y: '{label} hatırlatıcısını düzenle',
    logDeleteA11y: 'Bakım kaydını sil',
    serviceDeleteA11y: '{title} servis kaydını sil',
  },
  modals: {
    completeCheckupTitle: 'Kontrolü Tamamla',
    completeCheckupTitleNamed: '"{title}" — Kontrolü Tamamla',
    completeCheckupDate: 'Gerçek tamamlanma tarihi',
    completeCheckupNotePlaceholder: 'Kontrolle ilgili notunuz (isteğe bağlı)',
    markCompleted: 'Tamamlandı Olarak İşaretle',
    reminderDoneTitle: 'Bakımı Tamamla',
    reminderDoneTitleNamed: '{label} — Tamamla',
    reminderDoneDate: 'Yapılma tarihi',
    optionalNotePlaceholder: 'İsteğe bağlı not',
    checkupFormNew: 'Yeni Kontrol',
    checkupFormEdit: 'Kontrolü Düzenle',
    checkupName: 'Kontrol adı',
    checkupNameRequired: 'Kontrol adı zorunludur.',
    checkupNamePlaceholder: 'Örn. 6. ay kontrolü',
    plannedDate: 'Planlanan tarih',
    reminderTitle: 'Hatırlatıcı',
    reminderEnabled: 'Hatırlatıcı açık',
    reminderEnabledHelp: 'Zamanı geldiğinde bildirim gönderilir',
    intervalDays: 'Tekrar aralığı (gün)',
    intervalInvalid: '1 ile 365 arasında bir gün sayısı girin.',
    warrantyHelp:
      'Garanti hatırlatması, cihazın garanti bitiş tarihine göre gönderilir. Tarihi cihaz bilgilerinden düzenleyebilirsiniz.',
    serviceFormTitle: 'Yeni Servis Kaydı',
    date: 'Tarih',
    note: 'Not',
    title: 'Başlık',
    save: 'Kaydet',
    cancel: 'Vazgeç',
    serviceAction: 'İşlem',
    serviceActionRequired: 'İşlem adı zorunludur.',
    serviceActionPlaceholder: 'Örn. Hoparlör değişimi',
    serviceDescription: 'Açıklama',
    serviceDescriptionPlaceholder: 'İsteğe bağlı açıklama',
  },
  fields: {
    selectPlaceholder: 'Seçin',
    datePlaceholder: 'Tarih seçin',
    dateNotSelected: 'seçilmedi',
    clear: 'Temizle',
    clearFieldA11y: '{label} alanını temizle',
  },
  calendar: {
    title: 'Takvim',
    emptyTitle: 'Planlanmış işlem yok',
    emptyDescription: 'Cihaz eklediğinizde kontrol ve bakım tarihleri burada listelenir.',
  },
  stats: {
    totalDevices: 'Toplam cihaz',
    completedCheckups: 'Tamamlanan kontrol',
    pendingCheckups: 'Bekleyen kontrol',
    overdueCheckups: 'Geciken kontrol',
    rates: 'Oranlar',
    completionRate: 'Genel tamamlama oranı',
    onTimeRate: 'Zamanında yapma oranı',
    averageDelay: 'Ortalama gecikme',
    averageDelayDays: '{count} gün',
    nearestCheckup: 'En yakın kontrol',
    monthlyCompleted: 'Aylık tamamlanan işlemler',
    noData: 'Henüz yeterli veri yok',
    chartHint: 'Kontroller ve bakım işlemleri tamamlandıkça grafik burada görünecek.',
    chartA11yPrefix: 'Aylık grafik',
  },
  pdf: {
    reportTitle: '{name} — Cihaz Özet Raporu',
    createdAt: 'Oluşturulma tarihi: {date} · {app} uygulaması',
    deviceInfo: 'Cihaz Bilgileri',
    deviceName: 'Cihaz adı',
    brand: 'Marka',
    ear: 'Kulak',
    start: 'Kullanım başlangıcı',
    serial: 'Seri numarası',
    warranty: 'Garanti bitişi',
    power: 'Güç tipi',
    clinic: 'Doktor / Klinik',
    phone: 'Telefon',
    notes: 'Notlar',
    checkupHistory: 'Kontrol Geçmişi',
    checkup: 'Kontrol',
    planned: 'Planlanan',
    status: 'Durum',
    completedAt: 'Tamamlanma',
    note: 'Not',
    noCheckups: 'Kayıtlı kontrol yok.',
    maintenanceHistory: 'Bakım Geçmişi',
    action: 'İşlem',
    date: 'Tarih',
    noMaintenance: 'Kayıtlı bakım işlemi yok.',
    serviceRecords: 'Servis Kayıtları',
    description: 'Açıklama',
    noService: 'Kayıtlı servis işlemi yok.',
    disclaimer:
      'Bu rapor FixHear uygulaması tarafından kullanıcının girdiği verilerle oluşturulmuştur. Tıbbi tavsiye niteliği taşımaz; işitme uzmanınızın değerlendirmesinin yerini tutmaz.',
    shareTitle: '{name} raporu',
    appName: 'FixHear',
    reportsTitle: 'PDF Raporları',
    reportsHelp:
      'Rapor; cihaz bilgilerini, kontrol geçmişini, bakım geçmişini ve servis kayıtlarını içerir.',
    preparing: 'Rapor hazırlanıyor…',
    generateError: 'Rapor oluşturulurken bir sorun oluştu.',
    emptyTitle: 'Cihaz yok',
    emptyDescription: 'Rapor oluşturmak için önce bir cihaz ekleyin.',
  },
  backup: {
    title: 'Yedekleme',
    exportSection: 'Yedekleme',
    exportHelp:
      'Tüm cihazlarınız, kontrol takvimleriniz, bakım ve servis kayıtlarınız tek bir JSON dosyası olarak dışa aktarılır. Dosyayı güvenli bir yerde saklayabilirsiniz.',
    exportButton: 'Verileri JSON Olarak Dışa Aktar',
    exportOk: 'Yedek dosyanız oluşturuldu.',
    exportFail: 'Yedek oluşturulurken bir sorun oluştu.',
    restoreSection: 'Geri yükleme',
    restoreHelp:
      'Daha önce aldığınız yedek dosyasını seçerek verilerinizi geri yükleyebilirsiniz. Geri yükleme, mevcut tüm verilerin üzerine yazar.',
    restoreButton: 'Yedekten Geri Yükle',
    restoreConfirmTitle: 'Yedekten geri yükle',
    restoreConfirmMessage:
      'Geri yükleme mevcut tüm verilerinizi silecek ve yedek dosyasındaki verilerle değiştirecek. Devam etmek istiyor musunuz?',
    invalidJson: 'Dosya geçerli bir JSON değil.',
    invalidBackup: 'Dosya geçerli bir FixHear yedeği değil.',
    restoreCount: 'Geri yükleme tamamlandı: {count} cihaz yüklendi.',
    restoreFail: 'Geri yükleme sırasında bir sorun oluştu.',
    shareDialog: 'Yedeği paylaş',
  },
  troubleshooting: {
    searchPlaceholder: 'Sorun arayın…',
    searchA11y: 'Sorun arama alanı',
    clearSearch: 'Aramayı temizle',
    banner:
      'Adımlar yalnızca güvenli, evde yapılabilecek kontrolleri içerir. Cihazınızı asla sökmeyin veya onarmaya çalışmayın.',
    stepsCount: '{count} adımlı çözüm akışı',
    empty: 'Sonuç bulunamadı',
    emptyDescription: 'Farklı bir arama terimi deneyin.',
    categoryMissing: 'Sorun kategorisi bulunamadı.',
    step: 'Adım {current} / {total}',
    question: 'Bu adımdan sonra sorun düzeldi mi?',
    resolved: 'Düzeldi',
    stillGoing: 'Devam ediyor',
    expertWarning:
      'Cihazı kullanmayı bırakmanız gerekmeyebilir ancak cihazı açmadan veya onarmaya çalışmadan işitme uzmanınıza ya da yetkili servise başvurun.',
    restart: 'Baştan başla',
    back: 'Sorun listesine dön',
    safetyBanner:
      'Cihazı sökmeyin, elektronik parçalarını açmayın ve tehlikeli müdahalelerde bulunmayın.',
    resolvedTitle: 'Harika, sorun çözüldü!',
    resolvedBody:
      'Sorun tekrar ederse aynı adımları yeniden deneyebilir veya işitme uzmanınıza danışabilirsiniz.',
    expertTitle: 'Uzman desteği önerilir',
    expertBody:
      'Cihaz bilgilerinizi ve klinik iletişim numaranızı Cihazlar sekmesindeki cihaz detayında bulabilirsiniz.',
    openFlowA11y: '{title} sorun giderme akışını aç',
    categories: {
      'no-sound': {
        title: 'Ses hiç gelmiyor',
        keywords: ['sessiz', 'çalışmıyor', 'duymuyorum', 'ses yok'],
        steps: [
          {
            instruction: 'Cihazın açık olduğunu kontrol edin',
            detail:
              'Cihazın açma/kapama düğmesinin veya pil kapağının tam kapalı olduğundan emin olun. Bazı cihazlar pil kapağı aralandığında kapanır.',
          },
          {
            instruction: 'Pili veya şarj seviyesini kontrol edin',
            detail:
              'Cihazınızın gösterdiği pil veya şarj durumunu kullanım kılavuzuna göre kontrol edin. Sorun sürerse cihazı aldığınız merkezden destek alın.',
          },
          {
            instruction: 'Filtre, hortum veya kubbenin tıkalı olup olmadığını kontrol edin',
            detail:
              'Cihazı ve parçalarını ayırmadan, dışarıdan görülebilen kir veya hasar olup olmadığını kontrol edin. Açıklıklara temizlik aracı sokmayın. Sorun varsa cihazı aldığınız merkezden destek alın.',
          },
          {
            instruction: 'Ses seviyesini kontrol edin',
            detail:
              'Cihazın ses düğmesi veya uygulaması varsa sesin tamamen kısılmış olmadığından emin olun.',
          },
          {
            instruction: 'Cihazı yeniden başlatın',
            detail:
              'Yeniden başlatma yöntemi modele göre değişir. Parça çıkarmadan uygulanabilen bir yöntem varsa üreticinin kullanım kılavuzunu izleyin; emin değilseniz cihazı aldığınız merkezden destek alın.',
          },
        ],
      },
      'low-sound': {
        title: 'Ses az geliyor',
        keywords: ['kısık', 'zayıf', 'az duyuyorum', 'düşük ses'],
        steps: [
          {
            instruction: 'Ses seviyesini kontrol edin',
            detail: 'Ses düğmesinden veya cihaz uygulamasından ses seviyesini bir kademe artırın.',
          },
          {
            instruction: 'Filtre, hortum veya kubbenin tıkalı olup olmadığını kontrol edin',
            detail:
              'Cihazı ve parçalarını ayırmadan, dışarıdan görülebilen kir veya hasar olup olmadığını kontrol edin. Açıklıklara temizlik aracı sokmayın. Sorun varsa cihazı aldığınız merkezden destek alın.',
          },
          {
            instruction: 'Pili veya şarj seviyesini kontrol edin',
            detail:
              'Cihazınızın gösterdiği pil veya şarj durumunu kullanım kılavuzuna göre kontrol edin. Sorun sürerse cihazı aldığınız merkezden destek alın.',
          },
          {
            instruction: 'Kulak kalıbının yerleşimini kontrol edin',
            detail:
              'Cihazın kulağınıza yerleşimini, size gösterilen kullanım biçimine göre kontrol edin. Parçaları birbirinden ayırmayın ve cihazı zorlayarak yerleştirmeyin. Sorun sürerse cihazı aldığınız merkezden destek alın.',
          },
          {
            instruction: 'Cihazı yeniden başlatın',
            detail:
              'Yeniden başlatma yöntemi modele göre değişir. Parça çıkarmadan uygulanabilen bir yöntem varsa üreticinin kullanım kılavuzunu izleyin; emin değilseniz cihazı aldığınız merkezden destek alın.',
          },
        ],
      },
      'intermittent-sound': {
        title: 'Ses kesik kesik geliyor',
        keywords: ['kesiliyor', 'gidip geliyor', 'düzensiz', 'kesinti'],
        steps: [
          {
            instruction: 'Pili veya şarj seviyesini kontrol edin',
            detail:
              'Cihazınızın gösterdiği pil veya şarj durumunu kullanım kılavuzuna göre kontrol edin. Sorun sürerse cihazı aldığınız merkezden destek alın.',
          },
          {
            instruction: 'Filtre, hortum veya kubbenin tıkalı olup olmadığını kontrol edin',
            detail:
              'Cihazı ve parçalarını ayırmadan, dışarıdan görülebilen kir veya hasar olup olmadığını kontrol edin. Açıklıklara temizlik aracı sokmayın. Sorun varsa cihazı aldığınız merkezden destek alın.',
          },
          {
            instruction: 'Nem kontrolü yapın',
            detail:
              'Nem fark ederseniz cihazınızın kullanım kılavuzundaki uygun kurutma yöntemini izleyin. Kurutma aksesuarının cihazınızla uyumlu olduğundan emin değilseniz cihazı aldığınız merkeze danışın.',
          },
          {
            instruction: 'Cihazı yeniden başlatın',
            detail:
              'Yeniden başlatma yöntemi modele göre değişir. Parça çıkarmadan uygulanabilen bir yöntem varsa üreticinin kullanım kılavuzunu izleyin; emin değilseniz cihazı aldığınız merkezden destek alın.',
          },
          {
            instruction: 'Telefon bağlantısını kapatıp yeniden açın',
            detail:
              'Telefonunuzun Bluetooth ayarını kapatın, birkaç saniye bekleyin ve yeniden açın. Eşleştirme için telefonunuzun ve cihazınızın kendi yönergelerini izleyin.',
          },
        ],
      },
      echo: {
        title: 'Kendi sesim yankılı geliyor',
        keywords: ['yankı', 'eko', 'tuhaf ses', 'boğuk'],
        steps: [
          {
            instruction: 'Kulak kalıbının yerleşimini kontrol edin',
            detail:
              'Cihazın kulağınıza yerleşimini, size gösterilen kullanım biçimine göre kontrol edin. Parçaları birbirinden ayırmayın ve cihazı zorlayarak yerleştirmeyin. Sorun sürerse cihazı aldığınız merkezden destek alın.',
          },
          {
            instruction: 'Filtre, hortum veya kubbenin tıkalı olup olmadığını kontrol edin',
            detail:
              'Cihazı ve parçalarını ayırmadan, dışarıdan görülebilen kir veya hasar olup olmadığını kontrol edin. Açıklıklara temizlik aracı sokmayın. Sorun varsa cihazı aldığınız merkezden destek alın.',
          },
          {
            instruction: 'Ses ayarlarını gözden geçirin',
            detail:
              'Cihaz uygulamasında farklı bir dinleme programı varsa deneyebilirsiniz. Yankı sürüyorsa ayar uzmanınızca yapılmalıdır.',
          },
          {
            instruction: 'Cihazı yeniden başlatın',
            detail:
              'Yeniden başlatma yöntemi modele göre değişir. Parça çıkarmadan uygulanabilen bir yöntem varsa üreticinin kullanım kılavuzunu izleyin; emin değilseniz cihazı aldığınız merkezden destek alın.',
          },
        ],
      },
      'too-loud-ambient': {
        title: 'Çevre sesleri çok geliyor',
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
          {
            instruction: 'Cihazı yeniden başlatın',
            detail:
              'Yeniden başlatma yöntemi modele göre değişir. Parça çıkarmadan uygulanabilen bir yöntem varsa üreticinin kullanım kılavuzunu izleyin; emin değilseniz cihazı aldığınız merkezden destek alın.',
          },
        ],
      },
      whistling: {
        title: 'Cihaz ötüyor',
        keywords: ['ötme', 'ıslık', 'feedback', 'siren', 'tiz ses'],
        steps: [
          {
            instruction: 'Cihazın kulağınıza tam oturduğunu kontrol edin',
            detail:
              'Cihazın kulağınıza yerleşimini, size gösterilen kullanım biçimine göre kontrol edin. Parçaları birbirinden ayırmayın ve cihazı zorlayarak yerleştirmeyin. Sorun sürerse cihazı aldığınız merkezden destek alın.',
          },
          {
            instruction: 'Filtre, hortum veya kubbenin tıkalı olup olmadığını kontrol edin',
            detail:
              'Cihazı ve parçalarını ayırmadan, dışarıdan görülebilen kir veya hasar olup olmadığını kontrol edin. Açıklıklara temizlik aracı sokmayın. Sorun varsa cihazı aldığınız merkezden destek alın.',
          },
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
      'not-charging': {
        title: 'Cihaz şarj olmuyor',
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
          {
            instruction: 'Cihazı yeniden başlatın',
            detail:
              'Yeniden başlatma yöntemi modele göre değişir. Parça çıkarmadan uygulanabilen bir yöntem varsa üreticinin kullanım kılavuzunu izleyin; emin değilseniz cihazı aldığınız merkezden destek alın.',
          },
        ],
      },
      bluetooth: {
        title: 'Bluetooth bağlantısı kurulmuyor',
        keywords: ['telefon', 'eşleşme', 'bağlanmıyor', 'müzik', 'arama'],
        steps: [
          {
            instruction: 'Telefonun Bluetooth ayarının açık olduğunu kontrol edin',
            detail: 'Telefon ayarlarından Bluetooth özelliğinin açık olduğundan emin olun.',
          },
          {
            instruction: 'Telefon bağlantısını kapatıp yeniden açın',
            detail:
              'Telefonunuzun Bluetooth ayarını kapatın, birkaç saniye bekleyin ve yeniden açın. Eşleştirme için telefonunuzun ve cihazınızın kendi yönergelerini izleyin.',
          },
          {
            instruction: 'Cihazı yeniden başlatın',
            detail:
              'Yeniden başlatma yöntemi modele göre değişir. Parça çıkarmadan uygulanabilen bir yöntem varsa üreticinin kullanım kılavuzunu izleyin; emin değilseniz cihazı aldığınız merkezden destek alın.',
          },
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
    },
  },
  maintenance: {
    battery: 'Pil değiştirme',
    charge: 'Şarj kontrolü',
    filter: 'Filtre değiştirme',
    tube: 'Hortum kontrolü',
    dome: 'Kubbe kontrolü',
    cleaning: 'Cihaz temizliği',
    clinic: 'Klinik kontrolü',
    warranty: 'Garanti bitişi',
  },
  checkupStatus: {
    pending: 'Bekliyor',
    completed: 'Tamamlandı',
    overdue: 'Gecikti',
  },
  schedule: {
    monthCheckup: '{count}. ay kontrolü',
    yearCheckup: '{count}. yıl kontrolü',
    yearHalfCheckup: '{years},5 yıl kontrolü',
    disclaimer:
      'Bu kontrol programı yalnızca örnek bir hatırlatma takvimidir, tıbbi tavsiye değildir. Kontrol sıklığını işitme uzmanınızla birlikte belirleyin.',
  },
  months: {
    full: [
      'Ocak',
      'Şubat',
      'Mart',
      'Nisan',
      'Mayıs',
      'Haziran',
      'Temmuz',
      'Ağustos',
      'Eylül',
      'Ekim',
      'Kasım',
      'Aralık',
    ],
    short: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
  },
  brand: {
    otherBrand: 'Diğer',
  },
  errors: {
    photoUnreadable: 'Seçilen fotoğraf okunamadı.',
    photoPersistFailed: 'Fotoğraf kalıcı olarak kaydedilemedi.',
  },
} satisfies UiMessages;
