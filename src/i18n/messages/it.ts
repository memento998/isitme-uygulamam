import type { UiMessages } from './types';

export const it = {
  common: {
    cancel: 'Annulla',
    save: 'Salva',
    delete: 'Elimina',
    retry: 'Riprova',
    loading: 'Caricamento…',
    errorGeneric: 'Si è verificato un errore.',
    loadError: 'Si è verificato un problema durante il caricamento dei dati. Riprova.',
    back: 'Indietro',
    today: 'Oggi',
    tomorrow: 'Domani',
    daysLater: 'tra {count} giorni',
    daysLateOne: '1 giorno di ritardo',
    daysLateMany: '{count} giorni di ritardo',
    required: 'Obbligatorio',
    done: 'Fatto',
    continue: 'Continua',
    enable: 'Attiva',
    notNow: 'Non ora',
    seeAll: 'Vedi tutto',
    search: 'Cerca',
    clearSearch: 'Cancella ricerca',
    noResults: 'Nessun risultato',
    close: 'Chiudi',
    systemLanguage: 'Lingua di sistema',
    language: 'Lingua',
    settings: 'Impostazioni',
    confirm: 'Conferma',
    destructive: 'Elimina',
  },
  nav: {
    devices: 'Dispositivi',
    myDevices: 'I miei dispositivi',
    troubleshooting: 'Risoluzione problemi',
    stats: 'Statistiche',
    more: 'Altro',
  },
  home: {
    emptyTitle: 'Non hai ancora aggiunto un dispositivo',
    emptyDescription: 'Aggiungi l’apparecchio acustico per iniziare il monitoraggio di controlli e manutenzione.',
    addDevice: 'Aggiungi dispositivo',
    addDeviceA11y: 'Aggiungi un nuovo dispositivo',
    sampleDataDev: 'Carica dati di esempio (sviluppo)',
    deleteDeviceTitle: 'Elimina dispositivo',
    deleteDeviceMessage:
      '«{name}» e tutti i relativi registri di controllo, manutenzione e assistenza verranno eliminati in modo permanente. L’operazione non può essere annullata.',
    fabA11y: 'Aggiungi un nuovo dispositivo',
    openDeviceA11y: 'Apri i dettagli di {name}',
    editDeviceA11y: 'Modifica {name}',
    deleteDeviceA11y: 'Elimina {name}',
    usageStart: 'Inizio uso: {date}',
    completed: 'Completati',
    pending: 'In attesa',
    overdue: 'In ritardo',
    nextCheckup: 'Prossimo controllo: {date} ({when})',
    noPlannedCheckup: 'Nessun controllo pianificato',
    earLeft: 'Orecchio sinistro',
    earRight: 'Orecchio destro',
    earBoth: 'Entrambe le orecchie',
    powerBattery: 'Batteria',
    powerRechargeable: 'Ricaricabile',
  },
  knowledge: {
    dailyTip: 'Consiglio del giorno',
    seeAllTips: 'Vedi tutti i consigli',
    openedNotification: 'Aperto da una notifica: {date}',
    openInCurrentLanguage: 'Apri nella lingua attuale',
    tipRetired: 'Questo consiglio non è più pubblicato',
    tipRetiredBody:
      'Questo consiglio giornaliero è stato aggiornato o rimosso. Puoi consultare i contenuti aggiornati nella banca della conoscenza.',
    knowledgeBank: 'Banca della conoscenza',
    knowledgeBankSubtitle:
      'Note brevi e affidabili su uso quotidiano, cura e conservazione dell’apparecchio acustico',
    searchTipsPlaceholder: 'Cerca consigli…',
    categoryAll: 'Tutti',
    todayBadge: 'Oggi',
    audienceLabel: 'Destinatari',
    sources: 'Fonti',
    generalInfo: 'Informazioni generali',
    generalInfoBody:
      'Questa sezione riguarda l’uso quotidiano, la cura esterna e la conservazione del dispositivo. Per le operazioni specifiche del tuo dispositivo, fai riferimento al manuale del produttore e all’assistenza autorizzata.',
    forWhom: 'Per chi',
    jurisdictionTR:
      'Questo contenuto riflette l’uso generale in Turchia; norme e servizi del tuo Paese possono differire.',
    sourceLanguageNote: 'Questo testo è una traduzione. La lingua originale di origine è il turco.',
    enableDailyPromptTitle: 'Notifiche del consiglio giornaliero',
    enableDailyPromptBody:
      'Vuoi ricevere ogni giorno un breve consiglio di cura o di uso? Le notifiche sono pianificate solo sul tuo dispositivo.',
    enableDailyNotifications: 'Attiva i consigli giornalieri',
    dailyNotifications: 'Consigli giornalieri',
    dailyNotificationTime: 'Orario del consiglio giornaliero',
    dailyNotificationHelp:
      'All’orario scelto viene inviato un breve consiglio di cura o di uso. Non è un consiglio medico.',
    permissionDeniedOpenSettings:
      'L’autorizzazione alle notifiche è stata rifiutata. Puoi attivarla nelle impostazioni del telefono.',
    knowledgeChannelName: 'Consigli giornalieri',
    knowledgeChannelDescription: 'Consigli di cura e uso quotidiano dell’apparecchio acustico',
    planningHorizonNote:
      'Le notifiche del consiglio giornaliero sono pianificate con alcuni giorni di anticipo e si aggiornano all’apertura dell’app.',
    filterByCategory: 'Filtra per categoria',
    keywords: 'Parole chiave',
    categories: {
      deviceIntro: 'Conoscere il dispositivo',
      cleaning: 'Pulizia',
      filtersAndParts: 'Filtri e parti',
      batteryAndSafety: 'Batteria e sicurezza',
      charging: 'Ricarica',
      moistureAndStorage: 'Umidità e conservazione',
      troubleshooting: 'Risoluzione problemi',
      dailyLife: 'Vita quotidiana',
      usageAndCheck: 'Uso e controllo',
    },
    audience: {
      ALL: 'Tutti',
      BTE_TUBE: 'BTE con tubetto',
      RIC_RITE: 'RIC / RITE',
      ITE: 'ITE (endouricolare)',
      REPLACEABLE_BATTERY: 'Batteria sostituibile',
      RECHARGEABLE: 'Ricaricabile',
      WAX_FILTER: 'Filtro cerume',
      DOME: 'Cupola / oliva in silicone',
      BLUETOOTH: 'Bluetooth',
    },
  },
  language: {
    title: 'Lingua',
    subtitle:
      'Scegli la lingua dei testi dell’app. La lingua di sistema usa la prima lingua supportata tra le preferenze del telefono.',
    systemOption: 'Lingua di sistema',
    restartNeededTitle: 'Riavvia l’app',
    restartNeededBody:
      'Chiudi e riapri l’app affinché il cambio di lingua si applichi a tutte le schermate.',
    saved: 'Lingua salvata.',
  },
  notifications: {
    permission: 'Autorizzazione alle notifiche',
    permissionGranted: 'Autorizzazione concessa',
    permissionDenied: 'Autorizzazione rifiutata',
    permissionUndetermined: 'Autorizzazione non ancora richiesta',
    permissionUnsupported: 'Non supportata su questa piattaforma',
    permissionExplanation:
      'Serve l’autorizzazione alle notifiche per ricordarti le date di controllo e manutenzione. Le notifiche sono usate solo per le attività pianificate dei dispositivi che hai aggiunto.',
    requestPermission: 'Consenti le notifiche',
    permissionStatus: 'Stato: {state}',
    maintenanceTime: 'Orario delle notifiche',
    maintenanceTimeHelp:
      'I promemoria di controllo e manutenzione vengono inviati nel giorno previsto all’orario scelto sotto.',
    timeSaved: 'Orario delle notifiche salvato e promemoria aggiornati.',
    webUnsupported:
      'Le notifiche non sono supportate nell’anteprima web. Puoi usarle su un dispositivo Android o iOS.',
    dailyKnowledgeSection: 'Consiglio giornaliero',
    dailyKnowledgeOffHelp: 'I consigli giornalieri sono disattivati. Puoi attivarli qui sotto.',
    openSystemSettings: 'Apri le impostazioni di sistema',
    remindersChannelName: 'Promemoria',
    remindersChannelDescription: 'Promemoria di controllo e manutenzione',
    checkupReminderTitle: 'Promemoria controllo',
    checkupReminderBody: '{device}: {title} — {date}',
    maintenanceReminderTitle: 'Promemoria manutenzione',
    maintenanceReminderBody: '{device}: {label} — {date}',
  },
  more: {
    calendar: 'Calendario',
    calendarSubtitle: 'Controlli e manutenzione in arrivo',
    notificationSettings: 'Impostazioni notifiche',
    notificationSubtitle: 'Autorizzazione e orario delle notifiche',
    pdfReports: 'Report PDF',
    pdfSubtitle: 'Crea e condividi un report riassuntivo del dispositivo',
    backup: 'Backup e ripristino',
    backupSubtitle: 'Esporta o ripristina i dati come JSON',
    privacy: 'Informativa sulla privacy',
    privacySubtitle: 'I tuoi dati restano solo sul dispositivo',
    terms: 'Condizioni d’uso',
    termsSubtitle: 'Sintesi sull’uso dell’app',
    disclaimer: 'Dichiarazione medica',
    disclaimerSubtitle: 'Informativa legale — l’app non diagnostica',
    about: 'Informazioni sull’app',
    sampleData: 'Carica dati di esempio (sviluppo)',
    sampleDataSubtitle: 'Visibile solo in modalità sviluppo',
    deleteAll: 'Elimina tutti i dati',
    deleteAllSubtitle: 'Tutti i dispositivi e i registri vengono eliminati in modo permanente',
    deleteAllTitle: 'Elimina tutti i dati',
    deleteAllMessage:
      'Tutti i tuoi dispositivi, calendari di controllo, registri di manutenzione e assistenza verranno eliminati in modo permanente. L’operazione non può essere annullata. Vuoi continuare?',
    deleteAllConfirm: 'Sì, elimina tutto',
    dataDeleted: 'Tutti i tuoi dati sono stati eliminati.',
    sampleLoaded: 'Dati di esempio caricati.',
  },
  legal: {
    privacy: {
      title: 'Informativa sulla privacy',
      banner: 'In questa versione i tuoi dati sono memorizzati solo sul tuo dispositivo.',
      storageHeading: 'Dove sono memorizzati i tuoi dati?',
      storageBody:
        'Tutte le informazioni inserite in FixHear (dispositivi, controlli, manutenzione e assistenza) sono memorizzate solo nel database locale del telefono. In questa versione nessun dato viene inviato in internet né conservato su un server.',
      accountHeading: 'Account e iscrizione',
      accountBody:
        'L’app non richiede iscrizione né accesso. Non raccoglie dati di identità personale.',
      controlHeading: 'Il controllo dei dati è tuo',
      controlBody:
        'Puoi esportare i dati come file JSON in qualsiasi momento da Altro > Backup, oppure eliminarli in modo permanente con «Elimina tutti i dati». Disinstallando l’app dal telefono tutti i dati vengono eliminati.',
      notificationsHeading: 'Notifiche',
      notificationsBody:
        'Le notifiche sono pianificate interamente sul dispositivo. I contenuti delle notifiche non vengono inviati da nessuna parte.',
      adsHeading: 'Pubblicità',
      adsBody:
        'L’app può mostrare un banner in basso e, all’avvio, un interstitial una sola volta tramite Google AdMob. Per l’erogazione degli annunci Google può trattare alcuni dati tecnici, come identificatori del dispositivo, secondo la propria informativa sulla privacy; FixHear non raccoglie questi dati. Gli annunci sono richiesti in modalità non personalizzata.',
      otherLegalHeading: 'Altri testi legali',
      otherLegalBody:
        'Puoi aprire le Condizioni d’uso e la Dichiarazione medica / informativa legale dal menu Altro. L’eliminazione dei dati avviene con «Elimina tutti i dati» nella pagina Altro.',
    },
    terms: {
      title: 'Condizioni d’uso',
      banner:
        'Questa pagina è un riassunto provvisorio. Le condizioni d’uso definitive richiedono una revisione legale.',
      usageHeading: 'Uso dell’app',
      usageBody:
        'FixHear è un’app gratuita per il monitoraggio e i promemoria della cura dell’apparecchio acustico. Questa pagina non è un contratto vincolante.',
      notMedicalHeading: 'Non è un dispositivo medico',
      notMedicalBody:
        'L’app non diagnostica, non raccomanda trattamenti e non è un dispositivo medico certificato. Per le impostazioni del dispositivo e le decisioni di salute consulta lo specialista dell’udito.',
      dataHeading: 'Dati e responsabilità',
      dataBody:
        'In questa versione i registri inseriti restano solo sul tuo dispositivo. Dove conservare un file di backup dipende da te. L’utente è responsabile delle decisioni prese sulla base dei registri dell’app.',
      adsHeading: 'Pubblicità',
      adsBody:
        'L’app può mostrare pubblicità. I dati tecnici trattati dal fornitore di annunci sono riassunti nella pagina Informativa sulla privacy.',
    },
    disclaimer: {
      title: 'Dichiarazione medica',
      banner: 'Questa app non diagnostica e non sostituisce lo specialista dell’udito.',
      purposeHeading: 'Scopo dell’app',
      purposeBody:
        'FixHear è uno strumento di promemoria e registrazione che aiuta a seguire le date di controllo e manutenzione dell’apparecchio acustico. Le informazioni fornite sono solo di carattere generale.',
      notAdviceHeading: 'Non è un consiglio medico',
      notAdviceBody:
        'Il calendario dei controlli, i suggerimenti di cura e i passaggi di risoluzione problemi non sono un consiglio medico. Questo programma di controlli è solo un calendario di promemoria di esempio, non un consiglio medico. Definisci la frequenza dei controlli insieme allo specialista dell’udito.',
      problemHeading: 'In caso di problema',
      problemBody:
        'Se non riesci a risolvere un problema del dispositivo, rivolgiti allo specialista o all’assistenza autorizzata senza aprire né tentare di riparare il dispositivo. Se noti qualsiasi cambiamento dell’udito, consulta senza indugio una struttura sanitaria.',
      liabilityHeading: 'Responsabilità',
      liabilityBody:
        'L’utente è responsabile delle decisioni prese in base alle informazioni dell’app. In emergenza rivolgersi immediatamente a una struttura sanitaria.',
    },
    about: {
      title: 'Informazioni sull’app',
      appName: 'FixHear',
      version: 'Versione {version}',
      paragraph1:
        'FixHear è un’app gratuita che aiuta chi usa un apparecchio acustico a seguire i dispositivi, i controlli periodici, la manutenzione e i problemi più comuni.',
      paragraph2:
        'L’app non richiede una connessione a internet; tutti i tuoi dati restano solo sul dispositivo.',
      paragraph3:
        'Questa app non è uno strumento medico né un dispositivo medico certificato. Per la frequenza dei controlli e le impostazioni del dispositivo consulta sempre lo specialista dell’udito.',
      paragraph4:
        'Informativa sulla privacy, Condizioni d’uso e Dichiarazione medica / informativa legale si trovano nel menu Altro.',
    },
  },
  deviceForm: {
    titleNew: 'Nuovo dispositivo',
    titleEdit: 'Modifica dispositivo',
    submitNew: 'Salva dispositivo',
    submitEdit: 'Salva modifiche',
    photoAdd: 'Aggiungi foto',
    photoAddA11y: 'Aggiungi foto del dispositivo',
    photoChangeA11y: 'Cambia la foto del dispositivo',
    photoRemove: 'Rimuovi foto',
    name: 'Nome del dispositivo',
    nameRequired: 'Il nome del dispositivo è obbligatorio.',
    namePlaceholder: 'es. Il mio apparecchio destro',
    brand: 'Marca',
    brandRequired: 'Scegli una marca dall’elenco.',
    brandPlaceholder: 'Seleziona una marca',
    brandHelper: 'Se non è in elenco, scegli Altra.',
    ear: 'Orecchio',
    left: 'Sinistro',
    right: 'Destro',
    both: 'Entrambe le orecchie',
    startDate: 'Data di inizio uso',
    startInvalid: 'Scegli una data di inizio valida.',
    startFuture: 'La data di inizio non può essere futura.',
    startHelper: 'Il calendario dei controlli è creato in base a questa data.',
    serial: 'Numero di serie',
    serialPlaceholder: 'es. PH-2025-004512',
    warranty: 'Fine garanzia',
    dateInvalid: 'Scegli una data valida.',
    powerType: 'Tipo di alimentazione',
    powerBattery: 'Batteria',
    powerRechargeable: 'Ricaricabile',
    clinic: 'Nome del medico o della clinica',
    clinicPlaceholder: 'es. Dott.ssa Anna Rossi',
    phone: 'Numero di telefono',
    phonePlaceholder: 'es. 06 555 12 34',
    phoneInvalid: 'Inserisci un numero di telefono valido.',
    notes: 'Note',
    notesPlaceholder: 'Le tue note sul dispositivo',
    reminders: 'Promemoria',
    remindersHelp: 'Invia notifiche per le date di controllo e manutenzione',
    saveError: 'Si è verificato un problema durante il salvataggio del dispositivo. Riprova.',
    scheduleBanner:
      'Quando aggiungi un dispositivo viene creato un calendario di controlli di esempio per il 1° mese, 3° mese, 6° mese, 1° anno, 1,5 anni, 2° anno e poi ogni 6 mesi. Questo programma di controlli è solo un calendario di promemoria di esempio, non un consiglio medico. Definisci la frequenza dei controlli insieme allo specialista dell’udito.',
  },
  deviceDetail: {
    screenTitle: 'Dettaglio dispositivo',
    notFound: 'Dispositivo non trovato.',
    complete: 'Completa',
    addCheckup: 'Aggiungi controllo',
    edit: 'Modifica',
    delete: 'Elimina',
    pdf: 'Report PDF',
    pdfError: 'Si è verificato un problema durante la creazione del report PDF.',
    switchError: 'Si è verificato un problema durante l’aggiornamento del promemoria. Riprova.',
    upcoming: 'Attività in arrivo',
    upcomingEmpty: 'Nessuna attività in arrivo.',
    completedSection: 'Attività completate',
    completedEmpty: 'Nessuna attività completata ancora.',
    checkups: 'Calendario controlli',
    noPlannedCheckup: 'Nessun controllo pianificato.',
    maintenance: 'Promemoria di manutenzione',
    maintenanceHistory: 'Cronologia manutenzione',
    maintenanceHistoryEmpty: 'Le attività di manutenzione completate compaiono qui.',
    service: 'Registri di assistenza',
    serviceEmpty: 'Nessun registro di assistenza ancora.',
    addService: 'Aggiungi registro',
    reopen: 'Riapri',
    checkupDisclaimer:
      'Questo programma di controlli è solo un calendario di promemoria di esempio, non un consiglio medico. Definisci la frequenza dei controlli insieme allo specialista dell’udito.',
    ear: 'Orecchio',
    startDate: 'Inizio uso',
    powerType: 'Tipo di alimentazione',
    serial: 'Numero di serie',
    warranty: 'Fine garanzia',
    clinic: 'Medico / clinica',
    phone: 'Telefono',
    notes: 'Note',
    reminders: 'Promemoria',
    remindersOn: 'Attivi',
    remindersOff: 'Disattivi',
    intervalDays: 'Ogni {count} giorni',
    nextAt: 'Prossimo: {date}',
    lastDone: 'Ultima volta: {date}',
    warrantyEnd: 'Fine garanzia: {date}',
    warrantyMissing: 'Data di garanzia non inserita',
    planned: 'Pianificato: {date}',
    completedAt: 'Completato: {date}',
    note: 'Nota: {note}',
    deleteDeviceTitle: 'Elimina dispositivo',
    deleteDeviceMessage:
      '«{name}» e tutti i relativi registri di controllo, manutenzione e assistenza verranno eliminati in modo permanente. L’operazione non può essere annullata.',
    deleteCheckupTitle: 'Elimina controllo',
    deleteServiceTitle: 'Elimina registro di assistenza',
    deleteLogTitle: 'Elimina registro di manutenzione',
    deleteRecordMessage: 'Il registro «{title}» verrà eliminato. L’operazione non può essere annullata.',
    checkupEditA11y: 'Modifica il controllo {title}',
    checkupDeleteA11y: 'Elimina il controllo {title}',
    reminderA11y: 'Promemoria {label}',
    reminderEditA11y: 'Modifica il promemoria {label}',
    logDeleteA11y: 'Elimina registro di manutenzione',
    serviceDeleteA11y: 'Elimina il registro di assistenza {title}',
  },
  modals: {
    completeCheckupTitle: 'Completa il controllo',
    completeCheckupTitleNamed: '«{title}» — Completa il controllo',
    completeCheckupDate: 'Data effettiva di completamento',
    completeCheckupNotePlaceholder: 'La tua nota sul controllo (facoltativa)',
    markCompleted: 'Segna come completato',
    reminderDoneTitle: 'Completa la manutenzione',
    reminderDoneTitleNamed: '{label} — Completa',
    reminderDoneDate: 'Data di esecuzione',
    optionalNotePlaceholder: 'Nota facoltativa',
    checkupFormNew: 'Nuovo controllo',
    checkupFormEdit: 'Modifica controllo',
    checkupName: 'Nome del controllo',
    checkupNameRequired: 'Il nome del controllo è obbligatorio.',
    checkupNamePlaceholder: 'es. Controllo a 6 mesi',
    plannedDate: 'Data pianificata',
    reminderTitle: 'Promemoria',
    reminderEnabled: 'Promemoria attivo',
    reminderEnabledHelp: 'Alla scadenza viene inviata una notifica',
    intervalDays: 'Intervallo di ripetizione (giorni)',
    intervalInvalid: 'Inserisci un numero di giorni tra 1 e 365.',
    warrantyHelp:
      'Il promemoria di garanzia è inviato in base alla data di fine garanzia del dispositivo. Puoi modificare la data nei dati del dispositivo.',
    serviceFormTitle: 'Nuovo registro di assistenza',
    date: 'Data',
    note: 'Nota',
    title: 'Titolo',
    save: 'Salva',
    cancel: 'Annulla',
    serviceAction: 'Intervento',
    serviceActionRequired: 'Il nome dell’intervento è obbligatorio.',
    serviceActionPlaceholder: 'es. Sostituzione del ricevitore',
    serviceDescription: 'Descrizione',
    serviceDescriptionPlaceholder: 'Descrizione facoltativa',
  },
  fields: {
    selectPlaceholder: 'Seleziona',
    datePlaceholder: 'Scegli una data',
    dateNotSelected: 'non selezionata',
    clear: 'Cancella',
    clearFieldA11y: 'Cancella {label}',
  },
  calendar: {
    title: 'Calendario',
    emptyTitle: 'Nessuna attività pianificata',
    emptyDescription: 'Quando aggiungi un dispositivo, qui compaiono le date di controllo e manutenzione.',
  },
  stats: {
    totalDevices: 'Dispositivi totali',
    completedCheckups: 'Controlli completati',
    pendingCheckups: 'Controlli in attesa',
    overdueCheckups: 'Controlli in ritardo',
    rates: 'Quote',
    completionRate: 'Tasso complessivo di completamento',
    onTimeRate: 'Tasso di puntualità',
    averageDelay: 'Ritardo medio',
    averageDelayDays: '{count} giorni',
    nearestCheckup: 'Controllo più vicino',
    monthlyCompleted: 'Attività completate al mese',
    noData: 'Dati ancora insufficienti',
    chartHint: 'Il grafico apparirà qui man mano che completi controlli e manutenzione.',
    chartA11yPrefix: 'Grafico mensile',
  },
  pdf: {
    reportTitle: '{name} — Report riassuntivo del dispositivo',
    createdAt: 'Data di creazione: {date} · app {app}',
    deviceInfo: 'Informazioni sul dispositivo',
    deviceName: 'Nome del dispositivo',
    brand: 'Marca',
    ear: 'Orecchio',
    start: 'Inizio uso',
    serial: 'Numero di serie',
    warranty: 'Fine garanzia',
    power: 'Tipo di alimentazione',
    clinic: 'Medico / clinica',
    phone: 'Telefono',
    notes: 'Note',
    checkupHistory: 'Cronologia controlli',
    checkup: 'Controllo',
    planned: 'Pianificato',
    status: 'Stato',
    completedAt: 'Completato',
    note: 'Nota',
    noCheckups: 'Nessun controllo registrato.',
    maintenanceHistory: 'Cronologia manutenzione',
    action: 'Attività',
    date: 'Data',
    noMaintenance: 'Nessuna manutenzione registrata.',
    serviceRecords: 'Registri di assistenza',
    description: 'Descrizione',
    noService: 'Nessun registro di assistenza.',
    disclaimer:
      'Questo report è stato creato dall’app FixHear con i dati inseriti dall’utente. Non costituisce un consiglio medico e non sostituisce la valutazione dello specialista dell’udito.',
    shareTitle: 'Report di {name}',
    appName: 'FixHear',
    reportsTitle: 'Report PDF',
    reportsHelp:
      'Il report include informazioni sul dispositivo, cronologia dei controlli, cronologia della manutenzione e registri di assistenza.',
    preparing: 'Preparazione del report…',
    generateError: 'Si è verificato un problema durante la creazione del report.',
    emptyTitle: 'Nessun dispositivo',
    emptyDescription: 'Aggiungi prima un dispositivo per creare un report.',
  },
  backup: {
    title: 'Backup',
    exportSection: 'Backup',
    exportHelp:
      'Tutti i dispositivi, i calendari di controllo, i registri di manutenzione e assistenza vengono esportati in un unico file JSON. Conserva il file in un posto sicuro.',
    exportButton: 'Esporta i dati come JSON',
    exportOk: 'Il file di backup è stato creato.',
    exportFail: 'Si è verificato un problema durante la creazione del backup.',
    restoreSection: 'Ripristino',
    restoreHelp:
      'Puoi ripristinare i dati scegliendo un file di backup creato in precedenza. Il ripristino sovrascrive tutti i dati attuali.',
    restoreButton: 'Ripristina da backup',
    restoreConfirmTitle: 'Ripristina da backup',
    restoreConfirmMessage:
      'Il ripristino eliminerà tutti i dati attuali e li sostituirà con quelli del file di backup. Vuoi continuare?',
    invalidJson: 'Il file non è un JSON valido.',
    invalidBackup: 'Il file non è un backup FixHear valido.',
    restoreCount: 'Ripristino completato: caricati {count} dispositivi.',
    restoreFail: 'Si è verificato un problema durante il ripristino.',
    shareDialog: 'Condividi backup',
  },
  troubleshooting: {
    searchPlaceholder: 'Cerca un problema…',
    searchA11y: 'Campo di ricerca problemi',
    clearSearch: 'Cancella ricerca',
    banner:
      'I passaggi includono solo controlli sicuri da fare a casa. Non smontare mai il dispositivo e non tentare di ripararlo.',
    stepsCount: 'Percorso di {count} passaggi',
    empty: 'Nessun risultato',
    emptyDescription: 'Prova un altro termine di ricerca.',
    categoryMissing: 'Categoria del problema non trovata.',
    step: 'Passaggio {current} / {total}',
    question: 'Questo passaggio ha risolto il problema?',
    resolved: 'Risolto',
    stillGoing: 'Persiste',
    expertWarning:
      'Potresti non dover smettere di usare il dispositivo, ma rivolgiti allo specialista o all’assistenza autorizzata senza aprire il dispositivo né tentare di ripararlo.',
    restart: 'Ricomincia',
    back: 'Torna all’elenco dei problemi',
    safetyBanner:
      'Non smontare il dispositivo, non aprire parti elettroniche e non effettuare interventi pericolosi.',
    resolvedTitle: 'Ottimo, il problema è risolto!',
    resolvedBody:
      'Se il problema si ripresenta puoi ripetere gli stessi passaggi o consultare lo specialista dell’udito.',
    expertTitle: 'Si consiglia il supporto di uno specialista',
    expertBody:
      'I dati del dispositivo e il numero della clinica si trovano nella scheda del dispositivo, nella scheda Dispositivi.',
    openFlowA11y: 'Apri il percorso di risoluzione {title}',
    categories: {
      'no-sound': {
        title: 'Nessun suono',
        keywords: ['silenzio', 'non funziona', 'non sento', 'nessun suono'],
        steps: [
          {
            instruction: 'Controlla che il dispositivo sia acceso',
            detail:
              'Assicurati che l’interruttore o lo sportello della batteria sia completamente chiuso. Alcuni dispositivi si spengono se lo sportello della batteria è leggermente aperto.',
          },
          {
            instruction: 'Controlla la batteria o il livello di carica',
            detail:
              'Nei dispositivi a batteria sostituiscila con una nuova. Nei ricaricabili inserisci il dispositivo nel caricatore e verifica che l’indicatore di carica sia acceso.',
          },
          {
            instruction: 'Controlla se filtro, tubetto o cupola sono ostruiti',
            detail:
              'Il cerume può ostruire filtro, tubetto o cupola. Se c’è sporco visibile, pulisci delicatamente con lo strumento consigliato dal produttore o sostituisci il filtro.',
          },
          {
            instruction: 'Controlla il volume',
            detail:
              'Se il dispositivo ha un controllo del volume o un’app, assicurati che il volume non sia al minimo.',
          },
          {
            instruction: 'Riavvia il dispositivo',
            detail:
              'Spegni il dispositivo, attendi 10 secondi e riaccendilo. Nei dispositivi a batteria puoi estrarre la batteria e reinserirla.',
          },
        ],
      },
      'low-sound': {
        title: 'Il suono è troppo basso',
        keywords: ['basso', 'debole', 'fatico a sentire', 'volume basso'],
        steps: [
          {
            instruction: 'Controlla il volume',
            detail: 'Alza il volume di un livello con il controllo o con l’app del dispositivo.',
          },
          {
            instruction: 'Controlla se filtro, tubetto o cupola sono ostruiti',
            detail:
              'Il cerume può ostruire filtro, tubetto o cupola. Se c’è sporco visibile, pulisci delicatamente con lo strumento consigliato dal produttore o sostituisci il filtro.',
          },
          {
            instruction: 'Controlla la batteria o il livello di carica',
            detail:
              'Nei dispositivi a batteria sostituiscila con una nuova. Nei ricaricabili inserisci il dispositivo nel caricatore e verifica che l’indicatore di carica sia acceso.',
          },
          {
            instruction: 'Controlla l’inserimento della chiocciola',
            detail:
              'Assicurati che la chiocciola o la cupola siano ben inserite nell’orecchio. Un inserimento errato può ridurre il suono.',
          },
          {
            instruction: 'Riavvia il dispositivo',
            detail:
              'Spegni il dispositivo, attendi 10 secondi e riaccendilo. Nei dispositivi a batteria puoi estrarre la batteria e reinserirla.',
          },
        ],
      },
      'intermittent-sound': {
        title: 'Il suono si interrompe',
        keywords: ['si interrompe', 'va e viene', 'irregolare', 'cadute'],
        steps: [
          {
            instruction: 'Controlla la batteria o il livello di carica',
            detail:
              'Nei dispositivi a batteria sostituiscila con una nuova. Nei ricaricabili inserisci il dispositivo nel caricatore e verifica che l’indicatore di carica sia acceso.',
          },
          {
            instruction: 'Controlla se filtro, tubetto o cupola sono ostruiti',
            detail:
              'Il cerume può ostruire filtro, tubetto o cupola. Se c’è sporco visibile, pulisci delicatamente con lo strumento consigliato dal produttore o sostituisci il filtro.',
          },
          {
            instruction: 'Controlla l’umidità',
            detail:
              'Lascia il dispositivo per la notte in una scatola di essiccazione o con una capsula deumidificante. L’umidità può causare interruzioni del suono.',
          },
          {
            instruction: 'Riavvia il dispositivo',
            detail:
              'Spegni il dispositivo, attendi 10 secondi e riaccendilo. Nei dispositivi a batteria puoi estrarre la batteria e reinserirla.',
          },
          {
            instruction: 'Spegni e riaccendi la connessione del telefono',
            detail:
              'Spegni il Bluetooth del telefono, attendi qualche secondo e riaccendilo. Se serve, rimuovi il dispositivo dall’elenco Bluetooth e abbinarlo di nuovo.',
          },
        ],
      },
      echo: {
        title: 'La mia voce ha un’eco',
        keywords: ['eco', 'vuoto', 'suono strano', 'ovattato'],
        steps: [
          {
            instruction: 'Controlla l’inserimento della chiocciola',
            detail:
              'Togli la chiocciola e reinseriscila. Una chiocciola non ben inserita può dare una sensazione di eco.',
          },
          {
            instruction: 'Controlla se filtro, tubetto o cupola sono ostruiti',
            detail:
              'Il cerume può ostruire filtro, tubetto o cupola. Se c’è sporco visibile, pulisci delicatamente con lo strumento consigliato dal produttore o sostituisci il filtro.',
          },
          {
            instruction: 'Rivedi le impostazioni del suono',
            detail:
              'Se l’app del dispositivo ha un altro programma di ascolto, puoi provarlo. Se l’eco persiste, la regolazione va fatta dallo specialista.',
          },
          {
            instruction: 'Riavvia il dispositivo',
            detail:
              'Spegni il dispositivo, attendi 10 secondi e riaccendilo. Nei dispositivi a batteria puoi estrarre la batteria e reinserirla.',
          },
        ],
      },
      'too-loud-ambient': {
        title: 'I suoni ambientali sono troppo forti',
        keywords: ['rumore', 'fastidio', 'forte', 'troppo suono'],
        steps: [
          {
            instruction: 'Abbassa il volume di un livello',
            detail: 'Riduci gradualmente il volume con il controllo o con l’app.',
          },
          {
            instruction: 'Controlla il programma di ascolto',
            detail:
              'Se il dispositivo ha un programma per ambienti rumorosi, selezionalo. Lo specialista può indicarti quale sia.',
          },
          {
            instruction: 'Riavvia il dispositivo',
            detail:
              'Spegni il dispositivo, attendi 10 secondi e riaccendilo. Nei dispositivi a batteria puoi estrarre la batteria e reinserirla.',
          },
        ],
      },
      whistling: {
        title: 'Il dispositivo fischia',
        keywords: ['fischio', 'feedback', 'sirena', 'acuto'],
        steps: [
          {
            instruction: 'Controlla che il dispositivo sia ben inserito nell’orecchio',
            detail:
              'Togli chiocciola o cupola e reinseriscile. Un inserimento allentato è la causa più comune del fischio.',
          },
          {
            instruction: 'Controlla se filtro, tubetto o cupola sono ostruiti',
            detail:
              'Il cerume può ostruire filtro, tubetto o cupola. Se c’è sporco visibile, pulisci delicatamente con lo strumento consigliato dal produttore o sostituisci il filtro.',
          },
          {
            instruction: 'Controlla il volume',
            detail: 'Se il volume è troppo alto, abbassalo di un livello; un volume alto può innescare il fischio.',
          },
          {
            instruction: 'Controlla il contatto con cappello, sciarpa o telefono',
            detail:
              'Oggetti vicini al dispositivo possono causare fischio. Allontana l’oggetto e riprova.',
          },
        ],
      },
      'not-charging': {
        title: 'Il dispositivo non si ricarica',
        keywords: ['ricarica', 'batteria', 'non carica', 'caricatore'],
        steps: [
          {
            instruction: 'Controlla il collegamento elettrico del caricatore',
            detail:
              'Assicurati che il cavo di ricarica sia ben inserito nella presa e nell’unità. Se possibile, prova un’altra presa.',
          },
          {
            instruction: 'Controlla che il dispositivo sia ben inserito nello slot di ricarica',
            detail:
              'Togli il dispositivo dallo slot e reinseriscilo. Verifica che l’indicatore di carica sia acceso.',
          },
          {
            instruction: 'Pulisci i contatti di ricarica con un panno asciutto',
            detail:
              'Se sui contatti del dispositivo e dello slot c’è sporco o umidità, pulisci delicatamente con un panno asciutto e morbido.',
          },
          {
            instruction: 'Riavvia il dispositivo',
            detail:
              'Spegni il dispositivo, attendi 10 secondi e riaccendilo. Nei dispositivi a batteria puoi estrarre la batteria e reinserirla.',
          },
        ],
      },
      bluetooth: {
        title: 'Bluetooth non si collega',
        keywords: ['telefono', 'abbinamento', 'non si collega', 'musica', 'chiamata'],
        steps: [
          {
            instruction: 'Controlla che il Bluetooth del telefono sia attivo',
            detail: 'Assicurati nelle impostazioni del telefono che il Bluetooth sia acceso.',
          },
          {
            instruction: 'Spegni e riaccendi la connessione del telefono',
            detail:
              'Spegni il Bluetooth del telefono, attendi qualche secondo e riaccendilo. Se serve, rimuovi il dispositivo dall’elenco Bluetooth e abbinalo di nuovo.',
          },
          {
            instruction: 'Riavvia il dispositivo',
            detail:
              'Spegni il dispositivo, attendi 10 secondi e riaccendilo. Nei dispositivi a batteria puoi estrarre la batteria e reinserirla.',
          },
          {
            instruction: 'Abbina di nuovo il dispositivo',
            detail:
              'Rimuovi (dimentica) il dispositivo dall’elenco Bluetooth del telefono e ripeti i passaggi di abbinamento nell’app del produttore.',
          },
          {
            instruction: 'Riavvia il telefono',
            detail: 'Spegnere e riaccendere il telefono può risolvere i problemi di connessione.',
          },
        ],
      },
    },
  },
  maintenance: {
    battery: 'Sostituzione batteria',
    charge: 'Controllo ricarica',
    filter: 'Sostituzione filtro',
    tube: 'Controllo tubetto',
    dome: 'Controllo cupola',
    cleaning: 'Pulizia del dispositivo',
    clinic: 'Controllo in clinica',
    warranty: 'Fine garanzia',
  },
  checkupStatus: {
    pending: 'In attesa',
    completed: 'Completato',
    overdue: 'In ritardo',
  },
  schedule: {
    monthCheckup: 'Controllo del {count}° mese',
    yearCheckup: 'Controllo del {count}° anno',
    yearHalfCheckup: 'Controllo a {years},5 anni',
    disclaimer:
      'Questo programma di controlli è solo un calendario di promemoria di esempio, non un consiglio medico. Definisci la frequenza dei controlli insieme allo specialista dell’udito.',
  },
  months: {
    full: [
      'gennaio',
      'febbraio',
      'marzo',
      'aprile',
      'maggio',
      'giugno',
      'luglio',
      'agosto',
      'settembre',
      'ottobre',
      'novembre',
      'dicembre',
    ],
    short: ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'],
  },
  brand: {
    otherBrand: 'Altra',
  },
  errors: {
    photoUnreadable: 'Impossibile leggere la foto selezionata.',
    photoPersistFailed: 'Impossibile salvare la foto in modo permanente.',
  },
} satisfies UiMessages;
