import type { UiMessages } from './types';

export const de = {
  common: {
    cancel: 'Abbrechen',
    save: 'Speichern',
    delete: 'Löschen',
    retry: 'Erneut versuchen',
    loading: 'Wird geladen…',
    errorGeneric: 'Es ist ein Fehler aufgetreten.',
    loadError: 'Beim Laden der Daten ist ein Problem aufgetreten. Bitte versuchen Sie es erneut.',
    back: 'Zurück',
    today: 'Heute',
    tomorrow: 'Morgen',
    daysLater: 'in {count} Tagen',
    daysLateOne: '1 Tag überfällig',
    daysLateMany: '{count} Tage überfällig',
    required: 'Pflichtfeld',
    done: 'Fertig',
    continue: 'Weiter',
    enable: 'Aktivieren',
    notNow: 'Jetzt nicht',
    seeAll: 'Alle anzeigen',
    search: 'Suchen',
    clearSearch: 'Suche löschen',
    noResults: 'Keine Ergebnisse',
    close: 'Schließen',
    systemLanguage: 'Systemsprache',
    language: 'Sprache',
    settings: 'Einstellungen',
    confirm: 'Bestätigen',
    destructive: 'Löschen',
  },
  nav: {
    devices: 'Geräte',
    myDevices: 'Meine Geräte',
    troubleshooting: 'Fehlerbehebung',
    stats: 'Statistik',
    more: 'Mehr',
  },
  home: {
    emptyTitle: 'Sie haben noch kein Gerät hinzugefügt',
    emptyDescription: 'Fügen Sie Ihr Hörgerät hinzu, um Kontrollen und Pflege zu verfolgen.',
    addDevice: 'Gerät hinzufügen',
    addDeviceA11y: 'Neues Gerät hinzufügen',
    sampleDataDev: 'Beispieldaten laden (Entwicklung)',
    deleteDeviceTitle: 'Gerät löschen',
    deleteDeviceMessage:
      '„{name}“ und alle Kontroll-, Pflege- und Servicereinträge werden dauerhaft gelöscht. Das kann nicht rückgängig gemacht werden.',
    fabA11y: 'Neues Gerät hinzufügen',
    openDeviceA11y: 'Details zu {name} öffnen',
    editDeviceA11y: '{name} bearbeiten',
    deleteDeviceA11y: '{name} löschen',
    usageStart: 'Nutzungsbeginn: {date}',
    completed: 'Erledigt',
    pending: 'Ausstehend',
    overdue: 'Überfällig',
    nextCheckup: 'Nächste Kontrolle: {date} ({when})',
    noPlannedCheckup: 'Keine geplante Kontrolle',
    earLeft: 'Linkes Ohr',
    earRight: 'Rechtes Ohr',
    earBoth: 'Beide Ohren',
    powerBattery: 'Batterie',
    powerRechargeable: 'Akku',
  },
  knowledge: {
    dailyTip: 'Tipp des Tages',
    seeAllTips: 'Alle Tipps anzeigen',
    openedNotification: 'Tipp der Benachrichtigung · {date}',
    openInCurrentLanguage: 'In der aktuellen Sprache öffnen',
    tipRetired: 'Dieser Tipp wird nicht mehr veröffentlicht',
    tipRetiredBody:
      'Dieser Tipp des Tages wurde aktualisiert oder entfernt. Aktuelle Inhalte finden Sie in der Wissensbank.',
    knowledgeBank: 'Wissensbank',
    knowledgeBankSubtitle:
      'Kurze, verlässliche Hinweise zu Alltag, Pflege und Aufbewahrung des Hörgeräts',
    searchTipsPlaceholder: 'Tipps suchen…',
    categoryAll: 'Alle',
    todayBadge: 'Heute',
    audienceLabel: 'Zielgruppe',
    sources: 'Quellen',
    generalInfo: 'Allgemeine Information',
    generalInfoBody:
      'Dieser Abschnitt gilt für den täglichen Gebrauch, die äußere Pflege und die Aufbewahrung des Geräts. Für gerätespezifische Schritte gelten die Bedienungsanleitung des Herstellers und der autorisierte Service.',
    forWhom: 'Für wen',
    jurisdictionTR:
      'Dieser Inhalt bezieht sich auf den allgemeinen Gebrauch in der Türkei; Regeln und Dienste in Ihrem Land können abweichen.',
    sourceLanguageNote: 'Die Quellseiten können auf Englisch sein.',
    enableDailyPromptTitle: 'Tägliche Tipp-Benachrichtigungen',
    enableDailyPromptBody:
      'Möchten Sie jeden Tag einen kurzen Pflege- oder Nutzungstipp erhalten? Benachrichtigungen werden nur auf Ihrem Gerät geplant.',
    enableDailyNotifications: 'Tägliche Tipps aktivieren',
    dailyNotifications: 'Tägliche Tipps',
    dailyNotificationTime: 'Uhrzeit für den Tipp des Tages',
    dailyNotificationHelp:
      'Zur gewählten Uhrzeit wird ein kurzer Pflege- oder Nutzungstipp gesendet. Das ist keine medizinische Beratung.',
    permissionDeniedOpenSettings:
      'Die Benachrichtigungsberechtigung wurde abgelehnt. Sie können sie in den Telefoneinstellungen einschalten.',
    knowledgeChannelName: 'Tägliche Tipps',
    knowledgeChannelDescription: 'Pflege- und Alltagstipps zum Hörgerät',
    planningHorizonNote:
      'Tägliche Tipp-Benachrichtigungen werden für einige Tage im Voraus geplant und beim Öffnen der App aktualisiert.',
    filterByCategory: 'Nach Kategorie filtern',
    keywords: 'Stichwörter',
    categories: {
      deviceIntro: 'Das Gerät kennenlernen',
      cleaning: 'Reinigung',
      filtersAndParts: 'Filter und Teile',
      batteryAndSafety: 'Batterie und Sicherheit',
      charging: 'Laden',
      moistureAndStorage: 'Feuchtigkeit und Aufbewahrung',
      troubleshooting: 'Fehlerbehebung',
      dailyLife: 'Alltag',
      usageAndCheck: 'Nutzung und Kontrolle',
    },
    audience: {
      ALL: 'Alle',
      BTE_TUBE: 'HdO mit Schlauch',
      RIC_RITE: 'RIC / RITE',
      ITE: 'IdO (Im-Ohr)',
      REPLACEABLE_BATTERY: 'Wechselbatterie',
      RECHARGEABLE: 'Akku',
      WAX_FILTER: 'Cerumenfilter',
      DOME: 'Schirmchen / Silikonspitze',
      BLUETOOTH: 'Bluetooth',
    },
  },
  language: {
    title: 'Sprache',
    subtitle:
      'Wählen Sie die Sprache der App-Texte. Die Systemsprache verwendet die erste unterstützte Sprache aus den Telefoneinstellungen.',
    systemOption: 'Systemsprache',
    restartNeededTitle: 'App neu starten',
    restartNeededBody:
      'Schließen Sie die App und öffnen Sie sie erneut, damit die Sprachänderung auf allen Bildschirmen gilt.',
    saved: 'Sprache gespeichert.',
  },
  notifications: {
    permission: 'Benachrichtigungsberechtigung',
    permissionGranted: 'Berechtigung erteilt',
    permissionDenied: 'Berechtigung abgelehnt',
    permissionUndetermined: 'Berechtigung noch nicht angefragt',
    permissionUnsupported: 'Auf dieser Plattform nicht unterstützt',
    permissionExplanation:
      'Für Kontroll- und Pflegeerinnerungen sowie für freiwillig aktivierte tägliche Tipps ist eine Benachrichtigungsberechtigung erforderlich. Sie können Benachrichtigungen mit täglichen Tipps separat ein- und ausschalten.',
    requestPermission: 'Benachrichtigungen erlauben',
    permissionStatus: 'Status: {state}',
    maintenanceTime: 'Benachrichtigungszeit',
    maintenanceTimeHelp:
      'Kontroll- und Pflegeerinnerungen werden am geplanten Tag zur unten gewählten Uhrzeit gesendet.',
    timeSaved: 'Benachrichtigungszeit gespeichert und Erinnerungen aktualisiert.',
    webUnsupported:
      'In der Web-Vorschau werden Benachrichtigungen nicht unterstützt. Nutzen Sie sie auf einem Android-Gerät.',
    dailyKnowledgeSection: 'Tipp des Tages',
    dailyKnowledgeOffHelp: 'Tägliche Tipp-Benachrichtigungen sind aus. Sie können sie unten einschalten.',
    openSystemSettings: 'Systemeinstellungen öffnen',
    remindersChannelName: 'Erinnerungen',
    remindersChannelDescription: 'Kontroll- und Pflegeerinnerungen',
    checkupReminderTitle: 'Kontrollerinnerung',
    checkupReminderBody: '{device}: {title} — {date}',
    maintenanceReminderTitle: 'Pflegeerinnerung',
    maintenanceReminderBody: '{device}: {label} — {date}',
  },
  more: {
    calendar: 'Kalender',
    calendarSubtitle: 'Anstehende Kontrollen und Pflege',
    notificationSettings: 'Benachrichtigungseinstellungen',
    notificationSubtitle: 'Berechtigung und Uhrzeit',
    pdfReports: 'PDF-Berichte',
    pdfSubtitle: 'Gerätezusammenfassung erstellen und teilen',
    backup: 'Sichern und wiederherstellen',
    backupSubtitle: 'Daten als JSON exportieren oder wiederherstellen',
    privacy: 'Datenschutzrichtlinie',
    privacySubtitle: 'Ihre Daten bleiben nur auf Ihrem Gerät',
    terms: 'Nutzungsbedingungen',
    termsSubtitle: 'Kurzinformation zur Nutzung der App',
    disclaimer: 'Medizinischer Haftungsausschluss',
    disclaimerSubtitle: 'Rechtlicher Hinweis — die App stellt keine Diagnose',
    about: 'Über die App',
    sampleData: 'Beispieldaten laden (Entwicklung)',
    sampleDataSubtitle: 'Nur im Entwicklungsmodus sichtbar',
    deleteAll: 'Alle Daten löschen',
    deleteAllSubtitle: 'Alle Geräte und Einträge werden dauerhaft gelöscht',
    deleteAllTitle: 'Alle Daten löschen',
    deleteAllMessage:
      'Alle Geräte, Kontrollkalender, Pflege- und Servicereinträge werden dauerhaft gelöscht. Das kann nicht rückgängig gemacht werden. Möchten Sie fortfahren?',
    deleteAllConfirm: 'Ja, alles löschen',
    dataDeleted: 'Alle Ihre Daten wurden gelöscht.',
    sampleLoaded: 'Beispieldaten geladen.',
  },
  legal: {
    privacy: {
      title: 'Datenschutzrichtlinie',
      banner: 'In dieser Version werden Ihre eingegebenen Einträge nur auf Ihrem eigenen Gerät gespeichert.',
      storageHeading: 'Wo werden Ihre Daten gespeichert?',
      storageBody:
        'Geräte-, Kontroll-, Pflege- und Servicereinträge, die Sie in FixHear eingeben, werden nur in der lokalen Datenbank auf Ihrem Telefon gespeichert. FixHear sendet diese Einträge nicht an einen eigenen Server. Eine Sicherung erfolgt nur, wenn Sie selbst eine Freigabe starten. Technische Daten, die der Werbeanbieter verarbeiten kann, werden im Abschnitt Werbung weiter unten getrennt beschrieben.',
      accountHeading: 'Konto und Mitgliedschaft',
      accountBody:
        'Die App erfordert keine Mitgliedschaft und keine Anmeldung. Sie erhebt keine personenbezogenen Identitätsdaten.',
      controlHeading: 'Sie behalten die Kontrolle über Ihre Daten',
      controlBody:
        'Sie können Ihre Daten jederzeit unter „Mehr > Sicherung“ als JSON-Datei exportieren oder mit „Alle Daten löschen“ dauerhaft löschen. Wenn Sie die App vom Telefon entfernen, werden alle Daten ebenfalls gelöscht.',
      notificationsHeading: 'Benachrichtigungen',
      notificationsBody:
        'Benachrichtigungen werden vollständig auf dem Gerät geplant. Benachrichtigungsinhalte werden nirgendwohin gesendet.',
      adsHeading: 'Werbung',
      adsBody:
        'Die App kann über Google AdMob ein unteres Banner und beim Start einmalig eine Interstitial-Werbung anzeigen. Für die Anzeigenauslieferung kann Google technische Daten wie Gerätekennungen nach eigener Datenschutzrichtlinie verarbeiten; FixHear erhebt diese Daten nicht. Werbung wird im nicht personalisierten Modus angefordert.',
      otherLegalHeading: 'Weitere rechtliche Texte',
      otherLegalBody:
        'Die Nutzungsbedingungen und den medizinischen Haftungsausschluss / rechtlichen Hinweis finden Sie im Menü Mehr. Das Löschen der Daten erfolgt auf der Seite Mehr mit „Alle Daten löschen“.',
    },
    terms: {
      title: 'Nutzungsbedingungen',
      banner:
        'Diese Seite ist ein zusammenfassender Platzhalter. Endgültige Nutzungsbedingungen erfordern eine rechtliche Prüfung.',
      usageHeading: 'Nutzung der App',
      usageBody:
        'FixHear ist eine kostenlose App zur Verfolgung und Erinnerung an die Hörgerätepflege. Diese Seite ist kein verbindlicher Vertrag.',
      notMedicalHeading: 'Kein Medizinprodukt',
      notMedicalBody:
        'Die App stellt keine medizinische Diagnose, empfiehlt keine Behandlung und ist kein zertifiziertes Medizinprodukt. Zu Geräteeinstellungen und Gesundheitsentscheidungen wenden Sie sich an Ihre Hörakustikerin oder Ihren Hörakustiker.',
      dataHeading: 'Daten und Verantwortung',
      dataBody:
        'In dieser Version bleiben eingegebene Einträge nur auf Ihrem Gerät. Wo Sie eine Sicherungsdatei aufbewahren, entscheiden Sie. Für Entscheidungen auf Grundlage der Einträge in der App ist die nutzende Person verantwortlich.',
      adsHeading: 'Werbung',
      adsBody:
        'Die App kann Werbung anzeigen. Technische Daten, die der Werbeanbieter verarbeitet, sind auf der Seite Datenschutzrichtlinie zusammengefasst.',
    },
    disclaimer: {
      title: 'Medizinischer Haftungsausschluss',
      banner: 'Diese App stellt keine Diagnose und ersetzt nicht Ihre Hörakustikerin oder Ihren Hörakustiker.',
      purposeHeading: 'Zweck der App',
      purposeBody:
        'FixHear ist ein Erinnerungs- und Protokollhilfsmittel, mit dem Sie Kontroll- und Pflegetermine Ihres Hörgeräts im Blick behalten. Die bereitgestellten Informationen sind nur allgemeiner Natur.',
      notAdviceHeading: 'Keine medizinische Beratung',
      notAdviceBody:
        'Kontrollkalender, Pflegehinweise und Schritte zur Fehlerbehebung in der App sind keine medizinische Beratung. Dieser Kontrollplan ist nur ein Beispiel-Erinnerungskalender, keine medizinische Beratung. Legen Sie die Kontrollhäufigkeit gemeinsam mit Ihrer Hörakustikerin oder Ihrem Hörakustiker fest.',
      problemHeading: 'Bei Problemen',
      problemBody:
        'Wenn Sie ein Problem mit dem Gerät nicht lösen können, wenden Sie sich an Ihre Hörakustikerin, Ihren Hörakustiker oder den autorisierten Service, ohne das Gerät zu öffnen oder zu reparieren. Bei jeder Veränderung Ihres Hörens suchen Sie unverzüglich eine medizinische Einrichtung auf.',
      liabilityHeading: 'Verantwortung',
      liabilityBody:
        'Für Entscheidungen aufgrund der Informationen in der App ist die nutzende Person verantwortlich. Im Notfall suchen Sie sofort medizinische Hilfe auf.',
    },
    about: {
      title: 'Über die App',
      appName: 'FixHear',
      version: 'Version {version}',
      paragraph1:
        'FixHear ist eine kostenlose App, mit der Menschen mit Hörgerät ihre Geräte, regelmäßige Kontrollen, Pflege und häufige Probleme verfolgen können.',
      paragraph2:
        'Ihre eingegebenen Einträge bleiben in dieser Version auf Ihrem Telefon. Für Werbung kann eine Internetverbindung nötig sein; technische Daten des Werbeanbieters sind in der Datenschutzrichtlinie zusammengefasst.',
      paragraph3:
        'Diese App ist kein medizinisches Hilfsmittel und kein zertifiziertes Medizinprodukt. Zu Kontrollhäufigkeit und Geräteeinstellungen wenden Sie sich stets an Ihre Hörakustikerin oder Ihren Hörakustiker.',
      paragraph4:
        'Datenschutzrichtlinie, Nutzungsbedingungen und medizinischen Haftungsausschluss / rechtlichen Hinweis finden Sie im Menü Mehr.',
    },
  },
  deviceForm: {
    titleNew: 'Neues Gerät',
    titleEdit: 'Gerät bearbeiten',
    submitNew: 'Gerät speichern',
    submitEdit: 'Änderungen speichern',
    photoAdd: 'Foto hinzufügen',
    photoAddA11y: 'Gerätefoto hinzufügen',
    photoChangeA11y: 'Gerätefoto ändern',
    photoRemove: 'Foto entfernen',
    name: 'Gerätename',
    nameRequired: 'Gerätename ist erforderlich.',
    namePlaceholder: 'z. B. Mein rechtes Hörgerät',
    brand: 'Marke',
    brandRequired: 'Wählen Sie eine Marke aus der Liste.',
    brandPlaceholder: 'Marke wählen',
    brandHelper: 'Wenn sie fehlt, wählen Sie Sonstige.',
    ear: 'Ohr',
    left: 'Links',
    right: 'Rechts',
    both: 'Beide Ohren',
    startDate: 'Beginn der Nutzung',
    startInvalid: 'Wählen Sie ein gültiges Startdatum.',
    startFuture: 'Das Startdatum darf nicht in der Zukunft liegen.',
    startHelper: 'Der Kontrollkalender wird anhand dieses Datums erstellt.',
    serial: 'Seriennummer',
    serialPlaceholder: 'z. B. PH-2025-004512',
    warranty: 'Garantieende',
    dateInvalid: 'Wählen Sie ein gültiges Datum.',
    powerType: 'Stromversorgung',
    powerBattery: 'Batterie',
    powerRechargeable: 'Akku',
    clinic: 'Name von Arzt oder Klinik',
    clinicPlaceholder: 'z. B. Dr. Anna Müller',
    phone: 'Telefonnummer',
    phonePlaceholder: 'z. B. 030 123456',
    phoneInvalid: 'Geben Sie eine gültige Telefonnummer ein.',
    notes: 'Notizen',
    notesPlaceholder: 'Ihre Notizen zum Gerät',
    reminders: 'Erinnerungen',
    remindersHelp: 'Benachrichtigungen zu Kontroll- und Pflegeterminen senden',
    saveError: 'Beim Speichern des Geräts ist ein Problem aufgetreten. Bitte versuchen Sie es erneut.',
    scheduleBanner:
      'Beim Hinzufügen eines Geräts wird ein Beispiel-Kontrollkalender für den 1. Monat, 3. Monat, 6. Monat, das 1. Jahr, 1,5 Jahre, das 2. Jahr und danach alle 6 Monate erstellt. Dieser Kontrollplan ist nur ein Beispiel-Erinnerungskalender, keine medizinische Beratung. Legen Sie die Kontrollhäufigkeit gemeinsam mit Ihrer Hörakustikerin oder Ihrem Hörakustiker fest.',
  },
  deviceDetail: {
    screenTitle: 'Gerätedetails',
    notFound: 'Gerät nicht gefunden.',
    complete: 'Abschließen',
    addCheckup: 'Kontrolle hinzufügen',
    edit: 'Bearbeiten',
    delete: 'Löschen',
    pdf: 'PDF-Bericht',
    pdfError: 'Beim Erstellen des PDF-Berichts ist ein Problem aufgetreten.',
    switchError: 'Beim Aktualisieren der Erinnerung ist ein Problem aufgetreten. Bitte versuchen Sie es erneut.',
    upcoming: 'Anstehende Aufgaben',
    upcomingEmpty: 'Keine anstehenden Aufgaben.',
    completedSection: 'Erledigte Aufgaben',
    completedEmpty: 'Noch keine erledigten Aufgaben.',
    checkups: 'Kontrollkalender',
    noPlannedCheckup: 'Keine geplante Kontrolle.',
    maintenance: 'Pflegeerinnerungen',
    maintenanceHistory: 'Pflegeverlauf',
    maintenanceHistoryEmpty: 'Erledigte Pflegeaufgaben erscheinen hier.',
    service: 'Serviceeinträge',
    serviceEmpty: 'Noch keine Serviceeinträge.',
    addService: 'Eintrag hinzufügen',
    reopen: 'Wieder öffnen',
    checkupDisclaimer:
      'Dieser Kontrollplan ist nur ein Beispiel-Erinnerungskalender, keine medizinische Beratung. Legen Sie die Kontrollhäufigkeit gemeinsam mit Ihrer Hörakustikerin oder Ihrem Hörakustiker fest.',
    ear: 'Ohr',
    startDate: 'Nutzungsbeginn',
    powerType: 'Stromversorgung',
    serial: 'Seriennummer',
    warranty: 'Garantieende',
    clinic: 'Arzt / Klinik',
    phone: 'Telefon',
    notes: 'Notizen',
    reminders: 'Erinnerungen',
    remindersOn: 'Ein',
    remindersOff: 'Aus',
    intervalDays: 'Alle {count} Tage',
    nextAt: 'Als Nächstes: {date}',
    lastDone: 'Zuletzt erledigt: {date}',
    warrantyEnd: 'Garantieende: {date}',
    warrantyMissing: 'Kein Garantiedatum eingetragen',
    planned: 'Geplant: {date}',
    completedAt: 'Erledigt: {date}',
    note: 'Notiz: {note}',
    deleteDeviceTitle: 'Gerät löschen',
    deleteDeviceMessage:
      '„{name}“ und alle Kontroll-, Pflege- und Servicereinträge werden dauerhaft gelöscht. Das kann nicht rückgängig gemacht werden.',
    deleteCheckupTitle: 'Kontrolle löschen',
    deleteServiceTitle: 'Serviceeintrag löschen',
    deleteLogTitle: 'Pflegeeintrag löschen',
    deleteRecordMessage: 'Der Eintrag „{title}“ wird gelöscht. Das kann nicht rückgängig gemacht werden.',
    checkupEditA11y: 'Kontrolle {title} bearbeiten',
    checkupDeleteA11y: 'Kontrolle {title} löschen',
    reminderA11y: 'Erinnerung {label}',
    reminderEditA11y: 'Erinnerung {label} bearbeiten',
    logDeleteA11y: 'Pflegeeintrag löschen',
    serviceDeleteA11y: 'Serviceeintrag {title} löschen',
  },
  modals: {
    completeCheckupTitle: 'Kontrolle abschließen',
    completeCheckupTitleNamed: '„{title}“ — Kontrolle abschließen',
    completeCheckupDate: 'Tatsächliches Abschlussdatum',
    completeCheckupNotePlaceholder: 'Ihre Notiz zur Kontrolle (optional)',
    markCompleted: 'Als erledigt markieren',
    reminderDoneTitle: 'Pflege abschließen',
    reminderDoneTitleNamed: '{label} — Abschließen',
    reminderDoneDate: 'Erledigt am',
    optionalNotePlaceholder: 'Optionale Notiz',
    checkupFormNew: 'Neue Kontrolle',
    checkupFormEdit: 'Kontrolle bearbeiten',
    checkupName: 'Kontrollname',
    checkupNameRequired: 'Kontrollname ist erforderlich.',
    checkupNamePlaceholder: 'z. B. 6-Monats-Kontrolle',
    plannedDate: 'Geplantes Datum',
    reminderTitle: 'Erinnerung',
    reminderEnabled: 'Erinnerung aktiv',
    reminderEnabledHelp: 'Zum Termin wird eine Benachrichtigung gesendet',
    intervalDays: 'Wiederholungsintervall (Tage)',
    intervalInvalid: 'Geben Sie eine Tageszahl zwischen 1 und 365 ein.',
    warrantyHelp:
      'Die Garantieerinnerung wird anhand des Garantieendes des Geräts gesendet. Das Datum können Sie in den Geräteinformationen ändern.',
    serviceFormTitle: 'Neuer Serviceeintrag',
    date: 'Datum',
    note: 'Notiz',
    title: 'Titel',
    save: 'Speichern',
    cancel: 'Abbrechen',
    serviceAction: 'Vorgang',
    serviceActionRequired: 'Vorgangsname ist erforderlich.',
    serviceActionPlaceholder: 'z. B. Hörerwechsel',
    serviceDescription: 'Beschreibung',
    serviceDescriptionPlaceholder: 'Optionale Beschreibung',
  },
  fields: {
    selectPlaceholder: 'Auswählen',
    datePlaceholder: 'Datum wählen',
    dateNotSelected: 'nicht gewählt',
    clear: 'Löschen',
    clearFieldA11y: '{label} leeren',
  },
  calendar: {
    title: 'Kalender',
    emptyTitle: 'Keine geplanten Aufgaben',
    emptyDescription: 'Wenn Sie ein Gerät hinzufügen, erscheinen hier Kontroll- und Pflegetermine.',
  },
  stats: {
    totalDevices: 'Geräte insgesamt',
    completedCheckups: 'Erledigte Kontrollen',
    pendingCheckups: 'Ausstehende Kontrollen',
    overdueCheckups: 'Überfällige Kontrollen',
    rates: 'Quoten',
    completionRate: 'Gesamt-Erledigungsquote',
    onTimeRate: 'Pünktlichkeitsquote',
    averageDelay: 'Durchschnittliche Verspätung',
    averageDelayDays: '{count} Tage',
    nearestCheckup: 'Nächste Kontrolle',
    monthlyCompleted: 'Monatlich erledigte Aufgaben',
    noData: 'Noch nicht genug Daten',
    chartHint: 'Das Diagramm erscheint hier, sobald Kontrollen und Pflege erledigt werden.',
    chartA11yPrefix: 'Monatsdiagramm',
  },
  pdf: {
    reportTitle: '{name} — Gerätezusammenfassung',
    createdAt: 'Erstellt am: {date} · App {app}',
    deviceInfo: 'Geräteinformationen',
    deviceName: 'Gerätename',
    brand: 'Marke',
    ear: 'Ohr',
    start: 'Nutzungsbeginn',
    serial: 'Seriennummer',
    warranty: 'Garantieende',
    power: 'Stromversorgung',
    clinic: 'Arzt / Klinik',
    phone: 'Telefon',
    notes: 'Notizen',
    checkupHistory: 'Kontrollverlauf',
    checkup: 'Kontrolle',
    planned: 'Geplant',
    status: 'Status',
    completedAt: 'Erledigt',
    note: 'Notiz',
    noCheckups: 'Keine Kontrolleinträge.',
    maintenanceHistory: 'Pflegeverlauf',
    action: 'Vorgang',
    date: 'Datum',
    noMaintenance: 'Keine Pflegeeinträge.',
    serviceRecords: 'Serviceeinträge',
    description: 'Beschreibung',
    noService: 'Keine Serviceeinträge.',
    disclaimer:
      'Dieser Bericht wurde von der App FixHear aus von der nutzenden Person eingegebenen Daten erstellt. Er ist keine medizinische Beratung und ersetzt nicht die Beurteilung durch Ihre Hörakustikerin oder Ihren Hörakustiker.',
    shareTitle: 'Bericht {name}',
    appName: 'FixHear',
    reportsTitle: 'PDF-Berichte',
    reportsHelp:
      'Der Bericht enthält Geräteinformationen, Kontrollverlauf, Pflegeverlauf und Serviceeinträge.',
    preparing: 'Bericht wird erstellt…',
    generateError: 'Beim Erstellen des Berichts ist ein Problem aufgetreten.',
    emptyTitle: 'Keine Geräte',
    emptyDescription: 'Fügen Sie zuerst ein Gerät hinzu, um einen Bericht zu erstellen.',
  },
  backup: {
    title: 'Sicherung',
    exportSection: 'Sicherung',
    exportHelp:
      'Alle Geräte, Kontrollkalender, Pflege- und Servicereinträge werden als eine JSON-Datei exportiert. Bewahren Sie die Datei an einem sicheren Ort auf.',
    exportButton: 'Daten als JSON exportieren',
    exportOk: 'Ihre Sicherungsdatei wurde erstellt.',
    exportFail: 'Beim Erstellen der Sicherung ist ein Problem aufgetreten.',
    restoreSection: 'Wiederherstellung',
    restoreHelp:
      'Sie können Ihre Daten wiederherstellen, indem Sie eine zuvor erstellte Sicherungsdatei wählen. Die Wiederherstellung überschreibt alle aktuellen Daten.',
    restoreButton: 'Aus Sicherung wiederherstellen',
    restoreConfirmTitle: 'Aus Sicherung wiederherstellen',
    restoreConfirmMessage:
      'Die Wiederherstellung löscht alle aktuellen Daten und ersetzt sie durch die Daten in der Sicherungsdatei. Möchten Sie fortfahren?',
    invalidJson: 'Die Datei ist kein gültiges JSON.',
    invalidBackup: 'Die Datei ist keine gültige FixHear-Sicherung.',
    restoreCount: 'Wiederherstellung abgeschlossen: {count} Geräte geladen.',
    restoreFail: 'Bei der Wiederherstellung ist ein Problem aufgetreten.',
    shareDialog: 'Sicherung teilen',
  },
  troubleshooting: {
    searchPlaceholder: 'Problem suchen…',
    searchA11y: 'Suchfeld für Probleme',
    clearSearch: 'Suche löschen',
    banner:
      'Die Schritte enthalten nur sichere Prüfungen, die Sie zu Hause durchführen können. Nehmen Sie das Gerät niemals auseinander und versuchen Sie keine Reparatur.',
    stepsCount: 'Lösungsweg mit {count} Schritten',
    empty: 'Keine Ergebnisse',
    emptyDescription: 'Versuchen Sie einen anderen Suchbegriff.',
    categoryMissing: 'Problemkategorie nicht gefunden.',
    step: 'Schritt {current} / {total}',
    question: 'Hat dieser Schritt das Problem behoben?',
    resolved: 'Behoben',
    stillGoing: 'Besteht weiter',
    expertWarning:
      'Sie müssen das Gerät möglicherweise nicht ablegen, wenden Sie sich aber an Ihre Hörakustikerin, Ihren Hörakustiker oder den autorisierten Service, ohne das Gerät zu öffnen oder zu reparieren.',
    restart: 'Von vorn beginnen',
    back: 'Zur Problemliste',
    safetyBanner:
      'Nehmen Sie das Gerät nicht auseinander, öffnen Sie keine Elektronik und führen Sie keine gefährlichen Eingriffe durch.',
    resolvedTitle: 'Sehr gut, das Problem ist gelöst!',
    resolvedBody:
      'Tritt das Problem erneut auf, können Sie dieselben Schritte wiederholen oder Ihre Hörakustikerin oder Ihren Hörakustiker fragen.',
    expertTitle: 'Fachliche Unterstützung wird empfohlen',
    expertBody:
      'Geräteinformationen und die Kliniktelefonnummer finden Sie in den Gerätedetails im Tab Geräte.',
    openFlowA11y: 'Fehlerbehebung {title} öffnen',
    categories: {
      'no-sound': {
        title: 'Überhaupt kein Ton',
        keywords: ['still', 'funktioniert nicht', 'höre nichts', 'kein Ton'],
        steps: [
          {
            instruction: 'Prüfen Sie, ob das Gerät eingeschaltet ist',
            detail:
              'Stellen Sie sicher, dass der Ein-/Ausschalter oder das Batteriefach vollständig geschlossen ist. Manche Geräte schalten sich aus, wenn das Batteriefach leicht geöffnet ist.',
          },
          {
            instruction: 'Batterie oder Ladezustand prüfen',
            detail:
              'Prüfen Sie den vom Gerät angezeigten Batterie- oder Ladezustand anhand der Bedienungsanleitung. Besteht das Problem weiter, wenden Sie sich an die Stelle, bei der Sie das Gerät erhalten haben.',
          },
          {
            instruction: 'Prüfen, ob Filter, Schlauch oder Schirmchen verstopft sind',
            detail:
              'Prüfen Sie ohne Demontage des Geräts oder seiner Teile, ob außen sichtbarer Schmutz oder Schaden vorliegt. Stecken Sie kein Reinigungswerkzeug in Öffnungen. Bei Problemen wenden Sie sich an die Stelle, bei der Sie das Gerät erhalten haben.',
          },
          {
            instruction: 'Lautstärke prüfen',
            detail:
              'Wenn das Gerät eine Lautstärkeregelung oder App hat, stellen Sie sicher, dass die Lautstärke nicht ganz heruntergedreht ist.',
          },
          {
            instruction: 'Gerät neu starten',
            detail:
              'Die Methode zum Neustart hängt vom Modell ab. Gibt es ein Verfahren ohne Entnahme von Teilen, folgen Sie der Bedienungsanleitung des Herstellers; sind Sie unsicher, wenden Sie sich an die Stelle, bei der Sie das Gerät erhalten haben.',
          },
        ],
      },
      'low-sound': {
        title: 'Ton ist zu leise',
        keywords: ['leise', 'schwach', 'schwer zu hören', 'geringe Lautstärke'],
        steps: [
          {
            instruction: 'Lautstärke prüfen',
            detail: 'Erhöhen Sie die Lautstärke um eine Stufe über die Regelung oder die Geräte-App.',
          },
          {
            instruction: 'Prüfen, ob Filter, Schlauch oder Schirmchen verstopft sind',
            detail:
              'Prüfen Sie ohne Demontage des Geräts oder seiner Teile, ob außen sichtbarer Schmutz oder Schaden vorliegt. Stecken Sie kein Reinigungswerkzeug in Öffnungen. Bei Problemen wenden Sie sich an die Stelle, bei der Sie das Gerät erhalten haben.',
          },
          {
            instruction: 'Batterie oder Ladezustand prüfen',
            detail:
              'Prüfen Sie den vom Gerät angezeigten Batterie- oder Ladezustand anhand der Bedienungsanleitung. Besteht das Problem weiter, wenden Sie sich an die Stelle, bei der Sie das Gerät erhalten haben.',
          },
          {
            instruction: 'Sitz der Otoplastik prüfen',
            detail:
              'Prüfen Sie den Sitz des Geräts im Ohr so, wie Ihnen die Handhabung gezeigt wurde. Trennen Sie die Teile nicht voneinander und zwängen Sie das Gerät nicht hinein. Besteht das Problem weiter, wenden Sie sich an die Stelle, bei der Sie das Gerät erhalten haben.',
          },
          {
            instruction: 'Gerät neu starten',
            detail:
              'Die Methode zum Neustart hängt vom Modell ab. Gibt es ein Verfahren ohne Entnahme von Teilen, folgen Sie der Bedienungsanleitung des Herstellers; sind Sie unsicher, wenden Sie sich an die Stelle, bei der Sie das Gerät erhalten haben.',
          },
        ],
      },
      'intermittent-sound': {
        title: 'Ton setzt aus',
        keywords: ['setzt aus', 'kommt und geht', 'unregelmäßig', 'Unterbrechung'],
        steps: [
          {
            instruction: 'Batterie oder Ladezustand prüfen',
            detail:
              'Prüfen Sie den vom Gerät angezeigten Batterie- oder Ladezustand anhand der Bedienungsanleitung. Besteht das Problem weiter, wenden Sie sich an die Stelle, bei der Sie das Gerät erhalten haben.',
          },
          {
            instruction: 'Prüfen, ob Filter, Schlauch oder Schirmchen verstopft sind',
            detail:
              'Prüfen Sie ohne Demontage des Geräts oder seiner Teile, ob außen sichtbarer Schmutz oder Schaden vorliegt. Stecken Sie kein Reinigungswerkzeug in Öffnungen. Bei Problemen wenden Sie sich an die Stelle, bei der Sie das Gerät erhalten haben.',
          },
          {
            instruction: 'Auf Feuchtigkeit prüfen',
            detail:
              'Wenn Sie Feuchtigkeit bemerken, folgen Sie der geeigneten Trockenmethode in der Bedienungsanleitung. Sind Sie unsicher, ob das Trockenzubehör zu Ihrem Gerät passt, fragen Sie bei der Stelle nach, bei der Sie das Gerät erhalten haben.',
          },
          {
            instruction: 'Gerät neu starten',
            detail:
              'Die Methode zum Neustart hängt vom Modell ab. Gibt es ein Verfahren ohne Entnahme von Teilen, folgen Sie der Bedienungsanleitung des Herstellers; sind Sie unsicher, wenden Sie sich an die Stelle, bei der Sie das Gerät erhalten haben.',
          },
          {
            instruction: 'Telefonverbindung aus- und wieder einschalten',
            detail:
              'Schalten Sie Bluetooth am Telefon aus, warten Sie einige Sekunden und schalten Sie es wieder ein. Folgen Sie den Kopplungsanweisungen Ihres Telefons und Ihres Geräts.',
          },
        ],
      },
      echo: {
        title: 'Die eigene Stimme hallt',
        keywords: ['Echo', 'Hall', 'seltsamer Klang', 'dumpf'],
        steps: [
          {
            instruction: 'Sitz der Otoplastik prüfen',
            detail:
              'Prüfen Sie den Sitz des Geräts im Ohr so, wie Ihnen die Handhabung gezeigt wurde. Trennen Sie die Teile nicht voneinander und zwängen Sie das Gerät nicht hinein. Besteht das Problem weiter, wenden Sie sich an die Stelle, bei der Sie das Gerät erhalten haben.',
          },
          {
            instruction: 'Prüfen, ob Filter, Schlauch oder Schirmchen verstopft sind',
            detail:
              'Prüfen Sie ohne Demontage des Geräts oder seiner Teile, ob außen sichtbarer Schmutz oder Schaden vorliegt. Stecken Sie kein Reinigungswerkzeug in Öffnungen. Bei Problemen wenden Sie sich an die Stelle, bei der Sie das Gerät erhalten haben.',
          },
          {
            instruction: 'Toneinstellungen prüfen',
            detail:
              'Wenn die Geräte-App ein anderes Hörprogramm hat, können Sie es ausprobieren. Hält das Echo an, sollte die Einstellung durch die Fachperson erfolgen.',
          },
          {
            instruction: 'Gerät neu starten',
            detail:
              'Die Methode zum Neustart hängt vom Modell ab. Gibt es ein Verfahren ohne Entnahme von Teilen, folgen Sie der Bedienungsanleitung des Herstellers; sind Sie unsicher, wenden Sie sich an die Stelle, bei der Sie das Gerät erhalten haben.',
          },
        ],
      },
      'too-loud-ambient': {
        title: 'Umgebung ist zu laut',
        keywords: ['Lärm', 'unangenehm', 'laut', 'zu viel Ton'],
        steps: [
          {
            instruction: 'Lautstärke um eine Stufe senken',
            detail: 'Senken Sie die Lautstärke schrittweise über die Regelung oder die App.',
          },
          {
            instruction: 'Hörprogramm prüfen',
            detail:
              'Wenn Ihr Gerät ein Programm für laute Umgebungen hat, wählen Sie es. Welche das ist, erfahren Sie von Ihrer Fachperson.',
          },
          {
            instruction: 'Gerät neu starten',
            detail:
              'Die Methode zum Neustart hängt vom Modell ab. Gibt es ein Verfahren ohne Entnahme von Teilen, folgen Sie der Bedienungsanleitung des Herstellers; sind Sie unsicher, wenden Sie sich an die Stelle, bei der Sie das Gerät erhalten haben.',
          },
        ],
      },
      whistling: {
        title: 'Das Gerät pfeift',
        keywords: ['Pfeifen', 'Feedback', 'Sirene', 'hoher Ton'],
        steps: [
          {
            instruction: 'Prüfen, ob das Gerät vollständig im Ohr sitzt',
            detail:
              'Prüfen Sie den Sitz des Geräts im Ohr so, wie Ihnen die Handhabung gezeigt wurde. Trennen Sie die Teile nicht voneinander und zwängen Sie das Gerät nicht hinein. Besteht das Problem weiter, wenden Sie sich an die Stelle, bei der Sie das Gerät erhalten haben.',
          },
          {
            instruction: 'Prüfen, ob Filter, Schlauch oder Schirmchen verstopft sind',
            detail:
              'Prüfen Sie ohne Demontage des Geräts oder seiner Teile, ob außen sichtbarer Schmutz oder Schaden vorliegt. Stecken Sie kein Reinigungswerkzeug in Öffnungen. Bei Problemen wenden Sie sich an die Stelle, bei der Sie das Gerät erhalten haben.',
          },
          {
            instruction: 'Lautstärke prüfen',
            detail: 'Ist die Lautstärke zu hoch, senken Sie sie um eine Stufe; hohe Lautstärke kann Pfeifen auslösen.',
          },
          {
            instruction: 'Kontakt mit Mütze, Schal oder Telefon prüfen',
            detail:
              'Gegenstände nah am Gerät können Pfeifen verursachen. Entfernen Sie den Gegenstand und versuchen Sie es erneut.',
          },
        ],
      },
      'not-charging': {
        title: 'Gerät lädt nicht',
        keywords: ['laden', 'Akku', 'lädt nicht', 'Ladegerät'],
        steps: [
          {
            instruction: 'Stromanschluss der Ladestation prüfen',
            detail:
              'Stellen Sie sicher, dass das Ladekabel fest in der Steckdose und am Gerät sitzt. Versuchen Sie möglichst eine andere Steckdose.',
          },
          {
            instruction: 'Prüfen, ob das Gerät vollständig in der Ladeschale sitzt',
            detail:
              'Nehmen Sie das Gerät aus der Schale und setzen Sie es wieder ein. Prüfen Sie, ob die Ladeanzeige leuchtet.',
          },
          {
            instruction: 'Ladekontakte mit einem trockenen Tuch abwischen',
            detail:
              'Trennen Sie die Ladestation vom Strom. Wischen Sie die äußeren Kontaktstellen von Gerät und Schale gemäß der Herstelleranleitung vorsichtig mit einem trockenen, weichen Tuch ab. Nicht waschen und keine Teile zerlegen.',
          },
          {
            instruction: 'Gerät neu starten',
            detail:
              'Die Methode zum Neustart hängt vom Modell ab. Gibt es ein Verfahren ohne Entnahme von Teilen, folgen Sie der Bedienungsanleitung des Herstellers; sind Sie unsicher, wenden Sie sich an die Stelle, bei der Sie das Gerät erhalten haben.',
          },
        ],
      },
      bluetooth: {
        title: 'Bluetooth verbindet nicht',
        keywords: ['Telefon', 'Koppeln', 'verbindet nicht', 'Musik', 'Anruf'],
        steps: [
          {
            instruction: 'Prüfen, ob Bluetooth am Telefon eingeschaltet ist',
            detail: 'Stellen Sie in den Telefoneinstellungen sicher, dass Bluetooth eingeschaltet ist.',
          },
          {
            instruction: 'Telefonverbindung aus- und wieder einschalten',
            detail:
              'Schalten Sie Bluetooth am Telefon aus, warten Sie einige Sekunden und schalten Sie es wieder ein. Folgen Sie den Kopplungsanweisungen Ihres Telefons und Ihres Geräts.',
          },
          {
            instruction: 'Gerät neu starten',
            detail:
              'Die Methode zum Neustart hängt vom Modell ab. Gibt es ein Verfahren ohne Entnahme von Teilen, folgen Sie der Bedienungsanleitung des Herstellers; sind Sie unsicher, wenden Sie sich an die Stelle, bei der Sie das Gerät erhalten haben.',
          },
          {
            instruction: 'Gerät erneut koppeln',
            detail:
              'Verbinden Sie Gerät und Telefon erneut nach der Kopplungsanleitung des Herstellers oder des Telefons. Das Entfernen aus der Liste ist nicht bei jedem Modell nötig.',
          },
          {
            instruction: 'Telefon neu starten',
            detail: 'Ein Aus- und Einschalten des Telefons kann Verbindungsprobleme lösen.',
          },
        ],
      },
    },
  },
  maintenance: {
    battery: 'Batteriewechsel',
    charge: 'Ladekontrolle',
    filter: 'Filterwechsel',
    tube: 'Schlauchkontrolle',
    dome: 'Schirmchenkontrolle',
    cleaning: 'Gerätereinigung',
    clinic: 'Klinikkontrolle',
    warranty: 'Garantieende',
  },
  checkupStatus: {
    pending: 'Ausstehend',
    completed: 'Erledigt',
    overdue: 'Überfällig',
  },
  schedule: {
    monthCheckup: 'Kontrolle im {count}. Monat',
    yearCheckup: 'Kontrolle im {count}. Jahr',
    yearHalfCheckup: 'Kontrolle nach {years},5 Jahren',
    disclaimer:
      'Dieser Kontrollplan ist nur ein Beispiel-Erinnerungskalender, keine medizinische Beratung. Legen Sie die Kontrollhäufigkeit gemeinsam mit Ihrer Hörakustikerin oder Ihrem Hörakustiker fest.',
  },
  months: {
    full: [
      'Januar',
      'Februar',
      'März',
      'April',
      'Mai',
      'Juni',
      'Juli',
      'August',
      'September',
      'Oktober',
      'November',
      'Dezember',
    ],
    short: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
  },
  brand: {
    otherBrand: 'Sonstige',
  },
  errors: {
    photoUnreadable: 'Das gewählte Foto konnte nicht gelesen werden.',
    photoPersistFailed: 'Das Foto konnte nicht dauerhaft gespeichert werden.',
  },
} satisfies UiMessages;
