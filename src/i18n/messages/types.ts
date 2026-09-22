export type MonthNames = readonly [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

export interface TroubleshootingStepMessages {
  instruction: string;
  detail: string;
}

export interface TroubleshootingCategoryMessages {
  title: string;
  keywords: readonly string[];
  steps: readonly TroubleshootingStepMessages[];
}

export type TroubleshootingCategoryId =
  | 'no-sound'
  | 'low-sound'
  | 'intermittent-sound'
  | 'echo'
  | 'too-loud-ambient'
  | 'whistling'
  | 'not-charging'
  | 'bluetooth';

export type KnowledgeAudienceId =
  | 'ALL'
  | 'BTE_TUBE'
  | 'RIC_RITE'
  | 'ITE'
  | 'REPLACEABLE_BATTERY'
  | 'RECHARGEABLE'
  | 'WAX_FILTER'
  | 'DOME'
  | 'BLUETOOTH';

export type KnowledgeCategoryId =
  | 'deviceIntro'
  | 'cleaning'
  | 'filtersAndParts'
  | 'batteryAndSafety'
  | 'charging'
  | 'moistureAndStorage'
  | 'troubleshooting'
  | 'dailyLife'
  | 'usageAndCheck';

export interface UiMessages {
  common: {
    cancel: string;
    save: string;
    delete: string;
    retry: string;
    loading: string;
    errorGeneric: string;
    loadError: string;
    back: string;
    today: string;
    tomorrow: string;
    /** `{count}` gün sonra */
    daysLater: string;
    daysLateOne: string;
    /** `{count}` gün gecikti */
    daysLateMany: string;
    required: string;
    done: string;
    continue: string;
    enable: string;
    notNow: string;
    seeAll: string;
    search: string;
    clearSearch: string;
    noResults: string;
    close: string;
    systemLanguage: string;
    language: string;
    settings: string;
    confirm: string;
    destructive: string;
  };
  nav: {
    devices: string;
    myDevices: string;
    troubleshooting: string;
    stats: string;
    more: string;
  };
  home: {
    emptyTitle: string;
    emptyDescription: string;
    addDevice: string;
    addDeviceA11y: string;
    sampleDataDev: string;
    deleteDeviceTitle: string;
    /** `"{name}"` cihazı ve kayıtları silinir */
    deleteDeviceMessage: string;
    fabA11y: string;
    /** `{name}` detayına git */
    openDeviceA11y: string;
    /** `{name}` cihazını düzenle */
    editDeviceA11y: string;
    /** `{name}` cihazını sil */
    deleteDeviceA11y: string;
    /** Kullanım başlangıcı: `{date}` */
    usageStart: string;
    completed: string;
    pending: string;
    overdue: string;
    /** En yakın kontrol: `{date}` (`{when}`) */
    nextCheckup: string;
    noPlannedCheckup: string;
    earLeft: string;
    earRight: string;
    earBoth: string;
    powerBattery: string;
    powerRechargeable: string;
  };
  knowledge: {
    dailyTip: string;
    seeAllTips: string;
    /** Bildirimden açıldı: `{date}` */
    openedNotification: string;
    openInCurrentLanguage: string;
    tipRetired: string;
    tipRetiredBody: string;
    knowledgeBank: string;
    knowledgeBankSubtitle: string;
    searchTipsPlaceholder: string;
    categoryAll: string;
    todayBadge: string;
    audienceLabel: string;
    sources: string;
    generalInfo: string;
    generalInfoBody: string;
    forWhom: string;
    jurisdictionTR: string;
    sourceLanguageNote: string;
    enableDailyPromptTitle: string;
    enableDailyPromptBody: string;
    enableDailyNotifications: string;
    dailyNotifications: string;
    dailyNotificationTime: string;
    dailyNotificationHelp: string;
    permissionDeniedOpenSettings: string;
    knowledgeChannelName: string;
    knowledgeChannelDescription: string;
    planningHorizonNote: string;
    filterByCategory: string;
    keywords: string;
    categories: Record<KnowledgeCategoryId, string>;
    audience: Record<KnowledgeAudienceId, string>;
  };
  language: {
    title: string;
    subtitle: string;
    systemOption: string;
    restartNeededTitle: string;
    restartNeededBody: string;
    saved: string;
  };
  notifications: {
    permission: string;
    permissionGranted: string;
    permissionDenied: string;
    permissionUndetermined: string;
    permissionUnsupported: string;
    permissionExplanation: string;
    requestPermission: string;
    /** Durum: `{state}` */
    permissionStatus: string;
    maintenanceTime: string;
    maintenanceTimeHelp: string;
    timeSaved: string;
    webUnsupported: string;
    dailyKnowledgeSection: string;
    dailyKnowledgeOffHelp: string;
    openSystemSettings: string;
    remindersChannelName: string;
    remindersChannelDescription: string;
    checkupReminderTitle: string;
    /** `{device}`: `{title}` — `{date}` */
    checkupReminderBody: string;
    maintenanceReminderTitle: string;
    /** `{device}`: `{label}` — `{date}` */
    maintenanceReminderBody: string;
  };
  more: {
    calendar: string;
    calendarSubtitle: string;
    notificationSettings: string;
    notificationSubtitle: string;
    pdfReports: string;
    pdfSubtitle: string;
    backup: string;
    backupSubtitle: string;
    privacy: string;
    privacySubtitle: string;
    terms: string;
    termsSubtitle: string;
    disclaimer: string;
    disclaimerSubtitle: string;
    about: string;
    sampleData: string;
    sampleDataSubtitle: string;
    deleteAll: string;
    deleteAllSubtitle: string;
    deleteAllTitle: string;
    deleteAllMessage: string;
    deleteAllConfirm: string;
    dataDeleted: string;
    sampleLoaded: string;
  };
  legal: {
    privacy: {
      title: string;
      banner: string;
      storageHeading: string;
      storageBody: string;
      accountHeading: string;
      accountBody: string;
      controlHeading: string;
      controlBody: string;
      notificationsHeading: string;
      notificationsBody: string;
      adsHeading: string;
      adsBody: string;
      otherLegalHeading: string;
      otherLegalBody: string;
    };
    terms: {
      title: string;
      banner: string;
      usageHeading: string;
      usageBody: string;
      notMedicalHeading: string;
      notMedicalBody: string;
      dataHeading: string;
      dataBody: string;
      adsHeading: string;
      adsBody: string;
    };
    disclaimer: {
      title: string;
      banner: string;
      purposeHeading: string;
      purposeBody: string;
      notAdviceHeading: string;
      notAdviceBody: string;
      problemHeading: string;
      problemBody: string;
      liabilityHeading: string;
      liabilityBody: string;
    };
    about: {
      title: string;
      appName: string;
      /** Sürüm `{version}` */
      version: string;
      paragraph1: string;
      paragraph2: string;
      paragraph3: string;
      paragraph4: string;
    };
  };
  deviceForm: {
    titleNew: string;
    titleEdit: string;
    submitNew: string;
    submitEdit: string;
    photoAdd: string;
    photoAddA11y: string;
    photoChangeA11y: string;
    photoRemove: string;
    name: string;
    nameRequired: string;
    namePlaceholder: string;
    brand: string;
    brandRequired: string;
    brandPlaceholder: string;
    brandHelper: string;
    ear: string;
    left: string;
    right: string;
    both: string;
    startDate: string;
    startInvalid: string;
    startFuture: string;
    startHelper: string;
    serial: string;
    serialPlaceholder: string;
    warranty: string;
    dateInvalid: string;
    powerType: string;
    powerBattery: string;
    powerRechargeable: string;
    clinic: string;
    clinicPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    phoneInvalid: string;
    notes: string;
    notesPlaceholder: string;
    reminders: string;
    remindersHelp: string;
    saveError: string;
    scheduleBanner: string;
  };
  deviceDetail: {
    screenTitle: string;
    notFound: string;
    complete: string;
    addCheckup: string;
    edit: string;
    delete: string;
    pdf: string;
    pdfError: string;
    switchError: string;
    upcoming: string;
    upcomingEmpty: string;
    completedSection: string;
    completedEmpty: string;
    checkups: string;
    noPlannedCheckup: string;
    maintenance: string;
    maintenanceHistory: string;
    maintenanceHistoryEmpty: string;
    service: string;
    serviceEmpty: string;
    addService: string;
    reopen: string;
    checkupDisclaimer: string;
    ear: string;
    startDate: string;
    powerType: string;
    serial: string;
    warranty: string;
    clinic: string;
    phone: string;
    notes: string;
    reminders: string;
    remindersOn: string;
    remindersOff: string;
    /** `{count}` günde bir */
    intervalDays: string;
    /** Sıradaki: `{date}` */
    nextAt: string;
    /** Son yapılma: `{date}` */
    lastDone: string;
    /** Garanti bitişi: `{date}` */
    warrantyEnd: string;
    warrantyMissing: string;
    /** Planlanan: `{date}` */
    planned: string;
    /** Tamamlandı: `{date}` */
    completedAt: string;
    /** Not: `{note}` */
    note: string;
    deleteDeviceTitle: string;
    /** `"{name}"` cihazı… */
    deleteDeviceMessage: string;
    deleteCheckupTitle: string;
    deleteServiceTitle: string;
    deleteLogTitle: string;
    /** `"{title}"` kaydı silinecek… */
    deleteRecordMessage: string;
    /** `{title}` kontrolünü düzenle */
    checkupEditA11y: string;
    /** `{title}` kontrolünü sil */
    checkupDeleteA11y: string;
    /** `{label}` hatırlatıcısı */
    reminderA11y: string;
    /** `{label}` hatırlatıcısını düzenle */
    reminderEditA11y: string;
    logDeleteA11y: string;
    /** `{title}` servis kaydını sil */
    serviceDeleteA11y: string;
  };
  modals: {
    completeCheckupTitle: string;
    /** `"{title}"` — Kontrolü Tamamla */
    completeCheckupTitleNamed: string;
    completeCheckupDate: string;
    completeCheckupNotePlaceholder: string;
    markCompleted: string;
    reminderDoneTitle: string;
    /** `{label}` — Tamamla */
    reminderDoneTitleNamed: string;
    reminderDoneDate: string;
    optionalNotePlaceholder: string;
    checkupFormNew: string;
    checkupFormEdit: string;
    checkupName: string;
    checkupNameRequired: string;
    checkupNamePlaceholder: string;
    plannedDate: string;
    reminderTitle: string;
    reminderEnabled: string;
    reminderEnabledHelp: string;
    intervalDays: string;
    intervalInvalid: string;
    warrantyHelp: string;
    serviceFormTitle: string;
    date: string;
    note: string;
    title: string;
    save: string;
    cancel: string;
    serviceAction: string;
    serviceActionRequired: string;
    serviceActionPlaceholder: string;
    serviceDescription: string;
    serviceDescriptionPlaceholder: string;
  };
  fields: {
    selectPlaceholder: string;
    datePlaceholder: string;
    dateNotSelected: string;
    clear: string;
    /** `{label}` alanını temizle */
    clearFieldA11y: string;
  };
  calendar: {
    title: string;
    emptyTitle: string;
    emptyDescription: string;
  };
  stats: {
    totalDevices: string;
    completedCheckups: string;
    pendingCheckups: string;
    overdueCheckups: string;
    rates: string;
    completionRate: string;
    onTimeRate: string;
    averageDelay: string;
    /** `{count}` gün */
    averageDelayDays: string;
    nearestCheckup: string;
    monthlyCompleted: string;
    noData: string;
    chartHint: string;
    /** Aylık grafik: … */
    chartA11yPrefix: string;
  };
  pdf: {
    /** `{name}` — Cihaz Özet Raporu */
    reportTitle: string;
    /** Oluşturulma tarihi: `{date}` · `{app}` uygulaması */
    createdAt: string;
    deviceInfo: string;
    deviceName: string;
    brand: string;
    ear: string;
    start: string;
    serial: string;
    warranty: string;
    power: string;
    clinic: string;
    phone: string;
    notes: string;
    checkupHistory: string;
    checkup: string;
    planned: string;
    status: string;
    completedAt: string;
    note: string;
    noCheckups: string;
    maintenanceHistory: string;
    action: string;
    date: string;
    noMaintenance: string;
    serviceRecords: string;
    description: string;
    noService: string;
    disclaimer: string;
    /** `{name}` raporu */
    shareTitle: string;
    appName: string;
    reportsTitle: string;
    reportsHelp: string;
    preparing: string;
    generateError: string;
    emptyTitle: string;
    emptyDescription: string;
  };
  backup: {
    title: string;
    exportSection: string;
    exportHelp: string;
    exportButton: string;
    exportOk: string;
    exportFail: string;
    restoreSection: string;
    restoreHelp: string;
    restoreButton: string;
    restoreConfirmTitle: string;
    restoreConfirmMessage: string;
    invalidJson: string;
    invalidBackup: string;
    /** Geri yükleme tamamlandı: `{count}` cihaz yüklendi. */
    restoreCount: string;
    restoreFail: string;
    shareDialog: string;
  };
  troubleshooting: {
    searchPlaceholder: string;
    searchA11y: string;
    clearSearch: string;
    banner: string;
    /** `{count}` adımlı çözüm akışı */
    stepsCount: string;
    empty: string;
    emptyDescription: string;
    categoryMissing: string;
    /** Adım `{current}` / `{total}` */
    step: string;
    question: string;
    resolved: string;
    stillGoing: string;
    expertWarning: string;
    restart: string;
    back: string;
    safetyBanner: string;
    resolvedTitle: string;
    resolvedBody: string;
    expertTitle: string;
    expertBody: string;
    /** `{title}` sorun giderme akışını aç */
    openFlowA11y: string;
    categories: Record<TroubleshootingCategoryId, TroubleshootingCategoryMessages>;
  };
  maintenance: {
    battery: string;
    charge: string;
    filter: string;
    tube: string;
    dome: string;
    cleaning: string;
    clinic: string;
    warranty: string;
  };
  checkupStatus: {
    pending: string;
    completed: string;
    overdue: string;
  };
  schedule: {
    /** `{count}.` ay kontrolü */
    monthCheckup: string;
    /** `{count}.` yıl kontrolü */
    yearCheckup: string;
    /** `{years},5` yıl kontrolü */
    yearHalfCheckup: string;
    disclaimer: string;
  };
  months: {
    full: MonthNames;
    short: MonthNames;
  };
  brand: {
    otherBrand: string;
  };
  errors: {
    photoUnreadable: string;
    photoPersistFailed: string;
  };
}
