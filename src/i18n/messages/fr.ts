import type { UiMessages } from './types';

export const fr = {
  common: {
    cancel: 'Annuler',
    save: 'Enregistrer',
    delete: 'Supprimer',
    retry: 'Réessayer',
    loading: 'Chargement…',
    errorGeneric: 'Une erreur s’est produite.',
    loadError: 'Un problème est survenu lors du chargement des données. Veuillez réessayer.',
    back: 'Retour',
    today: 'Aujourd’hui',
    tomorrow: 'Demain',
    daysLater: 'dans {count} jours',
    daysLateOne: '1 jour de retard',
    daysLateMany: '{count} jours de retard',
    required: 'Obligatoire',
    done: 'Terminé',
    continue: 'Continuer',
    enable: 'Activer',
    notNow: 'Pas maintenant',
    seeAll: 'Tout voir',
    search: 'Rechercher',
    clearSearch: 'Effacer la recherche',
    noResults: 'Aucun résultat',
    close: 'Fermer',
    systemLanguage: 'Langue du système',
    language: 'Langue',
    settings: 'Réglages',
    confirm: 'Confirmer',
    destructive: 'Supprimer',
  },
  nav: {
    devices: 'Appareils',
    myDevices: 'Mes appareils',
    troubleshooting: 'Dépannage',
    stats: 'Statistiques',
    more: 'Plus',
  },
  home: {
    emptyTitle: 'Vous n’avez pas encore ajouté d’appareil',
    emptyDescription: 'Ajoutez votre aide auditive pour suivre les contrôles et l’entretien.',
    addDevice: 'Ajouter un appareil',
    addDeviceA11y: 'Ajouter un nouvel appareil',
    sampleDataDev: 'Charger des données d’exemple (développement)',
    deleteDeviceTitle: 'Supprimer l’appareil',
    deleteDeviceMessage:
      '« {name} » et tous ses enregistrements de contrôle, d’entretien et de service seront définitivement supprimés. Cette action est irréversible.',
    fabA11y: 'Ajouter un nouvel appareil',
    openDeviceA11y: 'Ouvrir les détails de {name}',
    editDeviceA11y: 'Modifier {name}',
    deleteDeviceA11y: 'Supprimer {name}',
    usageStart: 'Début d’utilisation : {date}',
    completed: 'Terminés',
    pending: 'En attente',
    overdue: 'En retard',
    nextCheckup: 'Prochain contrôle : {date} ({when})',
    noPlannedCheckup: 'Aucun contrôle planifié',
    earLeft: 'Oreille gauche',
    earRight: 'Oreille droite',
    earBoth: 'Les deux oreilles',
    powerBattery: 'Pile',
    powerRechargeable: 'Rechargeable',
  },
  knowledge: {
    dailyTip: 'Conseil du jour',
    seeAllTips: 'Voir tous les conseils',
    openedNotification: 'Information de la notification · {date}',
    openInCurrentLanguage: 'Ouvrir dans la langue actuelle',
    tipRetired: 'Ce conseil n’est plus publié',
    tipRetiredBody:
      'Ce conseil quotidien a été mis à jour ou retiré. Vous pouvez consulter le contenu actuel dans la banque de connaissances.',
    knowledgeBank: 'Banque de connaissances',
    knowledgeBankSubtitle:
      'Notes courtes et fiables sur l’usage quotidien, l’entretien et le rangement de l’aide auditive',
    searchTipsPlaceholder: 'Rechercher des conseils…',
    categoryAll: 'Tous',
    todayBadge: 'Aujourd’hui',
    audienceLabel: 'Public',
    sources: 'Sources',
    generalInfo: 'Information générale',
    generalInfoBody:
      'Cette section concerne l’usage quotidien, l’entretien extérieur et le rangement de l’appareil. Pour les opérations propres à votre appareil, suivez le guide du fabricant et le service agréé.',
    forWhom: 'Pour qui',
    jurisdictionTR:
      'Ce contenu reflète un usage général en Türkiye ; les règles et services de votre pays peuvent différer.',
    sourceLanguageNote: 'Les pages sources peuvent être en anglais.',
    enableDailyPromptTitle: 'Notifications du conseil quotidien',
    enableDailyPromptBody:
      'Souhaitez-vous recevoir chaque jour un court conseil d’entretien ou d’usage ? Les notifications sont planifiées uniquement sur votre appareil.',
    enableDailyNotifications: 'Activer les conseils quotidiens',
    dailyNotifications: 'Conseils quotidiens',
    dailyNotificationTime: 'Heure du conseil quotidien',
    dailyNotificationHelp:
      'Un court conseil d’entretien ou d’usage est envoyé à l’heure choisie. Ce n’est pas un avis médical.',
    permissionDeniedOpenSettings:
      'L’autorisation de notification a été refusée. Vous pouvez l’activer dans les réglages du téléphone.',
    knowledgeChannelName: 'Conseils quotidiens',
    knowledgeChannelDescription: 'Conseils d’entretien et d’usage quotidien de l’aide auditive',
    planningHorizonNote:
      'Les notifications du conseil quotidien sont planifiées quelques jours à l’avance et actualisées à l’ouverture de l’application.',
    filterByCategory: 'Filtrer par catégorie',
    keywords: 'Mots-clés',
    categories: {
      deviceIntro: 'Découvrir l’appareil',
      cleaning: 'Nettoyage',
      filtersAndParts: 'Filtres et pièces',
      batteryAndSafety: 'Pile et sécurité',
      charging: 'Charge',
      moistureAndStorage: 'Humidité et rangement',
      troubleshooting: 'Dépannage',
      dailyLife: 'Vie quotidienne',
      usageAndCheck: 'Usage et contrôle',
    },
    audience: {
      ALL: 'Tout le monde',
      BTE_TUBE: 'Contour d’oreille avec tube',
      RIC_RITE: 'RIC / RITE',
      ITE: 'ITE (intra-auriculaire)',
      REPLACEABLE_BATTERY: 'Pile remplaçable',
      RECHARGEABLE: 'Rechargeable',
      WAX_FILTER: 'Filtre à cérumen',
      DOME: 'Dôme / embout en silicone',
      BLUETOOTH: 'Bluetooth',
    },
  },
  language: {
    title: 'Langue',
    subtitle:
      'Choisissez la langue des textes de l’application. La langue du système utilise la première langue prise en charge dans les préférences du téléphone.',
    systemOption: 'Langue du système',
    restartNeededTitle: 'Redémarrez l’application',
    restartNeededBody:
      'Fermez puis rouvrez l’application pour que le changement de langue s’applique à tous les écrans.',
    saved: 'Langue enregistrée.',
  },
  notifications: {
    permission: 'Autorisation de notification',
    permissionGranted: 'Autorisation accordée',
    permissionDenied: 'Autorisation refusée',
    permissionUndetermined: 'Autorisation pas encore demandée',
    permissionUnsupported: 'Non prise en charge sur cette plateforme',
    permissionExplanation:
      'L’autorisation de notification est nécessaire pour les rappels de contrôle et d’entretien ainsi que pour les conseils quotidiens que vous choisissez d’activer. Vous pouvez activer ou désactiver séparément les notifications de conseils quotidiens.',
    requestPermission: 'Autoriser les notifications',
    permissionStatus: 'État : {state}',
    maintenanceTime: 'Heure de notification',
    maintenanceTimeHelp:
      'Les rappels de contrôle et d’entretien sont envoyés le jour prévu à l’heure choisie ci-dessous.',
    timeSaved: 'Heure de notification enregistrée et rappels mis à jour.',
    webUnsupported:
      'Les notifications ne sont pas prises en charge dans l’aperçu web. Vous pouvez les utiliser sur un appareil Android.',
    dailyKnowledgeSection: 'Conseil quotidien',
    dailyKnowledgeOffHelp: 'Les conseils quotidiens sont désactivés. Vous pouvez les activer ci-dessous.',
    openSystemSettings: 'Ouvrir les réglages système',
    remindersChannelName: 'Rappels',
    remindersChannelDescription: 'Rappels de contrôle et d’entretien',
    checkupReminderTitle: 'Rappel de contrôle',
    checkupReminderBody: '{device} : {title} — {date}',
    maintenanceReminderTitle: 'Rappel d’entretien',
    maintenanceReminderBody: '{device} : {label} — {date}',
  },
  more: {
    calendar: 'Calendrier',
    calendarSubtitle: 'Contrôles et entretien à venir',
    notificationSettings: 'Réglages des notifications',
    notificationSubtitle: 'Autorisation et heure de notification',
    pdfReports: 'Rapports PDF',
    pdfSubtitle: 'Créer et partager un rapport récapitulatif de l’appareil',
    backup: 'Sauvegarde et restauration',
    backupSubtitle: 'Exporter ou restaurer les données en JSON',
    privacy: 'Politique de confidentialité',
    privacySubtitle: 'Vos données restent uniquement sur votre appareil',
    terms: 'Conditions d’utilisation',
    termsSubtitle: 'Résumé de l’usage de l’application',
    disclaimer: 'Avertissement médical',
    disclaimerSubtitle: 'Information juridique — l’application ne pose pas de diagnostic',
    about: 'À propos de l’application',
    sampleData: 'Charger des données d’exemple (développement)',
    sampleDataSubtitle: 'Visible uniquement en mode développement',
    deleteAll: 'Supprimer toutes les données',
    deleteAllSubtitle: 'Tous les appareils et enregistrements sont définitivement supprimés',
    deleteAllTitle: 'Supprimer toutes les données',
    deleteAllMessage:
      'Tous vos appareils, calendriers de contrôle, enregistrements d’entretien et de service seront définitivement supprimés. Cette action est irréversible. Voulez-vous continuer ?',
    deleteAllConfirm: 'Oui, tout supprimer',
    dataDeleted: 'Toutes vos données ont été supprimées.',
    sampleLoaded: 'Données d’exemple chargées.',
  },
  legal: {
    privacy: {
      title: 'Politique de confidentialité',
      banner: 'Dans cette version, les enregistrements que vous saisissez restent sur votre appareil.',
      storageHeading: 'Où vos données sont-elles stockées ?',
      storageBody:
        'Les enregistrements d’appareils, de contrôles, d’entretien et de service saisis dans FixHear sont stockés uniquement dans la base locale de votre téléphone. FixHear n’envoie pas ces enregistrements vers un serveur qui lui appartient. La sauvegarde n’a lieu que lorsque vous lancez un partage. Les données techniques que le fournisseur de publicités peut traiter sont décrites séparément dans la section publicités ci-dessous.',
      accountHeading: 'Compte et adhésion',
      accountBody:
        'L’application n’exige ni adhésion ni connexion. Elle ne collecte pas de données d’identité personnelle.',
      controlHeading: 'Vous contrôlez vos données',
      controlBody:
        'Vous pouvez exporter vos données en fichier JSON à tout moment depuis Plus > Sauvegarde, ou les supprimer définitivement avec « Supprimer toutes les données ». Désinstaller l’application du téléphone supprime aussi toutes les données.',
      notificationsHeading: 'Notifications',
      notificationsBody:
        'Les notifications sont entièrement planifiées sur l’appareil. Le contenu des notifications n’est envoyé nulle part.',
      adsHeading: 'Publicités',
      adsBody:
        'L’application peut afficher une bannière en bas et, au lancement, une publicité interstitielle une seule fois via Google AdMob. Pour la diffusion des publicités, Google peut traiter certaines données techniques, comme des identifiants d’appareil, selon sa propre politique de confidentialité ; FixHear ne collecte pas ces données. Les publicités sont demandées en mode non personnalisé.',
      otherLegalHeading: 'Autres textes juridiques',
      otherLegalBody:
        'Vous pouvez ouvrir les Conditions d’utilisation et l’Avertissement médical / information juridique depuis le menu Plus. La suppression des données se fait avec « Supprimer toutes les données » sur la page Plus.',
    },
    terms: {
      title: 'Conditions d’utilisation',
      banner:
        'Cette page est un résumé provisoire. Les conditions d’utilisation définitives nécessitent un examen juridique.',
      usageHeading: 'Usage de l’application',
      usageBody:
        'FixHear est une application gratuite de suivi et de rappel pour l’entretien des aides auditives. Cette page n’est pas un contrat contraignant.',
      notMedicalHeading: 'Ce n’est pas un dispositif médical',
      notMedicalBody:
        'L’application ne pose pas de diagnostic, ne recommande pas de traitement et n’est pas un dispositif médical certifié. Pour les réglages de l’appareil et les décisions de santé, consultez votre spécialiste de l’audition.',
      dataHeading: 'Données et responsabilité',
      dataBody:
        'Dans cette version, les enregistrements saisis restent uniquement sur votre appareil. L’endroit où vous conservez un fichier de sauvegarde vous appartient. L’utilisateur est responsable des décisions prises à partir des enregistrements de l’application.',
      adsHeading: 'Publicités',
      adsBody:
        'L’application peut afficher des publicités. Les données techniques traitées par le fournisseur de publicités sont résumées sur la page Politique de confidentialité.',
    },
    disclaimer: {
      title: 'Avertissement médical',
      banner: 'Cette application ne pose pas de diagnostic et ne remplace pas votre spécialiste de l’audition.',
      purposeHeading: 'Objectif de l’application',
      purposeBody:
        'FixHear est un outil de rappel et d’enregistrement qui vous aide à suivre les dates de contrôle et d’entretien de votre aide auditive. Les informations fournies sont uniquement de nature générale.',
      notAdviceHeading: 'Ce n’est pas un avis médical',
      notAdviceBody:
        'Le calendrier de contrôle, les suggestions d’entretien et les étapes de dépannage ne constituent pas un avis médical. Ce programme de contrôle n’est qu’un calendrier de rappel d’exemple, pas un avis médical. Définissez la fréquence des contrôles avec votre spécialiste de l’audition.',
      problemHeading: 'En cas de problème',
      problemBody:
        'Si vous ne parvenez pas à résoudre un problème avec l’appareil, contactez votre spécialiste ou le service agréé sans ouvrir ni tenter de réparer l’appareil. Si vous remarquez un changement de votre audition, consultez sans délai un établissement de santé.',
      liabilityHeading: 'Responsabilité',
      liabilityBody:
        'L’utilisateur est responsable des décisions prises à partir des informations de l’application. En urgence, consultez immédiatement un établissement de santé.',
    },
    about: {
      title: 'À propos de l’application',
      appName: 'FixHear',
      version: 'Version {version}',
      paragraph1:
        'FixHear est une application gratuite qui aide les personnes utilisant une aide auditive à suivre leurs appareils, contrôles périodiques, entretien et problèmes courants.',
      paragraph2:
        'Les enregistrements que vous saisissez restent sur votre téléphone dans cette version. Afficher des publicités peut nécessiter une connexion internet ; les données techniques du fournisseur sont résumées dans la politique de confidentialité.',
      paragraph3:
        'Cette application n’est pas un outil médical ni un dispositif médical certifié. Consultez toujours votre spécialiste de l’audition pour la fréquence des contrôles et les réglages de l’appareil.',
      paragraph4:
        'La Politique de confidentialité, les Conditions d’utilisation et l’Avertissement médical / information juridique se trouvent dans le menu Plus.',
    },
  },
  deviceForm: {
    titleNew: 'Nouvel appareil',
    titleEdit: 'Modifier l’appareil',
    submitNew: 'Enregistrer l’appareil',
    submitEdit: 'Enregistrer les modifications',
    photoAdd: 'Ajouter une photo',
    photoAddA11y: 'Ajouter une photo de l’appareil',
    photoChangeA11y: 'Changer la photo de l’appareil',
    photoRemove: 'Retirer la photo',
    name: 'Nom de l’appareil',
    nameRequired: 'Le nom de l’appareil est obligatoire.',
    namePlaceholder: 'ex. Mon appareil de l’oreille droite',
    brand: 'Marque',
    brandRequired: 'Choisissez une marque dans la liste.',
    brandPlaceholder: 'Sélectionnez une marque',
    brandHelper: 'Si elle n’est pas dans la liste, choisissez Autre.',
    ear: 'Oreille',
    left: 'Gauche',
    right: 'Droite',
    both: 'Les deux oreilles',
    startDate: 'Date de début d’utilisation',
    startInvalid: 'Choisissez une date de début valide.',
    startFuture: 'La date de début ne peut pas être dans le futur.',
    startHelper: 'Le calendrier de contrôle est créé à partir de cette date.',
    serial: 'Numéro de série',
    serialPlaceholder: 'ex. PH-2025-004512',
    warranty: 'Fin de garantie',
    dateInvalid: 'Choisissez une date valide.',
    powerType: 'Type d’alimentation',
    powerBattery: 'Pile',
    powerRechargeable: 'Rechargeable',
    clinic: 'Nom du médecin ou de la clinique',
    clinicPlaceholder: 'ex. Dr Marie Dupont',
    phone: 'Numéro de téléphone',
    phonePlaceholder: 'ex. 01 23 45 67 89',
    phoneInvalid: 'Saisissez un numéro de téléphone valide.',
    notes: 'Notes',
    notesPlaceholder: 'Vos notes sur l’appareil',
    reminders: 'Rappels',
    remindersHelp: 'Envoyer des notifications pour les dates de contrôle et d’entretien',
    saveError: 'Un problème est survenu lors de l’enregistrement de l’appareil. Veuillez réessayer.',
    scheduleBanner:
      'Lorsque vous ajoutez un appareil, un calendrier de contrôle d’exemple est créé pour le 1er mois, le 3e mois, le 6e mois, la 1re année, 1,5 an, la 2e année, puis tous les 6 mois. Ce programme de contrôle n’est qu’un calendrier de rappel d’exemple, pas un avis médical. Définissez la fréquence des contrôles avec votre spécialiste de l’audition.',
  },
  deviceDetail: {
    screenTitle: 'Détail de l’appareil',
    notFound: 'Appareil introuvable.',
    complete: 'Terminer',
    addCheckup: 'Ajouter un contrôle',
    edit: 'Modifier',
    delete: 'Supprimer',
    pdf: 'Rapport PDF',
    pdfError: 'Un problème est survenu lors de la création du rapport PDF.',
    switchError: 'Un problème est survenu lors de la mise à jour du rappel. Veuillez réessayer.',
    upcoming: 'Tâches à venir',
    upcomingEmpty: 'Aucune tâche à venir.',
    completedSection: 'Tâches terminées',
    completedEmpty: 'Aucune tâche terminée pour le moment.',
    checkups: 'Calendrier de contrôle',
    noPlannedCheckup: 'Aucun contrôle planifié.',
    maintenance: 'Rappels d’entretien',
    maintenanceHistory: 'Historique d’entretien',
    maintenanceHistoryEmpty: 'Les tâches d’entretien terminées apparaissent ici.',
    service: 'Enregistrements de service',
    serviceEmpty: 'Aucun enregistrement de service pour le moment.',
    addService: 'Ajouter un enregistrement',
    reopen: 'Rouvrir',
    checkupDisclaimer:
      'Ce programme de contrôle n’est qu’un calendrier de rappel d’exemple, pas un avis médical. Définissez la fréquence des contrôles avec votre spécialiste de l’audition.',
    ear: 'Oreille',
    startDate: 'Début d’utilisation',
    powerType: 'Type d’alimentation',
    serial: 'Numéro de série',
    warranty: 'Fin de garantie',
    clinic: 'Médecin / clinique',
    phone: 'Téléphone',
    notes: 'Notes',
    reminders: 'Rappels',
    remindersOn: 'Activés',
    remindersOff: 'Désactivés',
    intervalDays: 'Tous les {count} jours',
    nextAt: 'Prochain : {date}',
    lastDone: 'Dernière fois : {date}',
    warrantyEnd: 'Fin de garantie : {date}',
    warrantyMissing: 'Aucune date de garantie saisie',
    planned: 'Prévu : {date}',
    completedAt: 'Terminé : {date}',
    note: 'Note : {note}',
    deleteDeviceTitle: 'Supprimer l’appareil',
    deleteDeviceMessage:
      '« {name} » et tous ses enregistrements de contrôle, d’entretien et de service seront définitivement supprimés. Cette action est irréversible.',
    deleteCheckupTitle: 'Supprimer le contrôle',
    deleteServiceTitle: 'Supprimer l’enregistrement de service',
    deleteLogTitle: 'Supprimer l’enregistrement d’entretien',
    deleteRecordMessage: 'L’enregistrement « {title} » sera supprimé. Cette action est irréversible.',
    checkupEditA11y: 'Modifier le contrôle {title}',
    checkupDeleteA11y: 'Supprimer le contrôle {title}',
    reminderA11y: 'Rappel {label}',
    reminderEditA11y: 'Modifier le rappel {label}',
    logDeleteA11y: 'Supprimer l’enregistrement d’entretien',
    serviceDeleteA11y: 'Supprimer l’enregistrement de service {title}',
  },
  modals: {
    completeCheckupTitle: 'Terminer le contrôle',
    completeCheckupTitleNamed: '« {title} » — Terminer le contrôle',
    completeCheckupDate: 'Date réelle d’achèvement',
    completeCheckupNotePlaceholder: 'Votre note sur le contrôle (facultatif)',
    markCompleted: 'Marquer comme terminé',
    reminderDoneTitle: 'Terminer l’entretien',
    reminderDoneTitleNamed: '{label} — Terminer',
    reminderDoneDate: 'Date de réalisation',
    optionalNotePlaceholder: 'Note facultative',
    checkupFormNew: 'Nouveau contrôle',
    checkupFormEdit: 'Modifier le contrôle',
    checkupName: 'Nom du contrôle',
    checkupNameRequired: 'Le nom du contrôle est obligatoire.',
    checkupNamePlaceholder: 'ex. Contrôle à 6 mois',
    plannedDate: 'Date prévue',
    reminderTitle: 'Rappel',
    reminderEnabled: 'Rappel activé',
    reminderEnabledHelp: 'Une notification est envoyée à l’échéance',
    intervalDays: 'Intervalle de répétition (jours)',
    intervalInvalid: 'Saisissez un nombre de jours entre 1 et 365.',
    warrantyHelp:
      'Le rappel de garantie est envoyé selon la date de fin de garantie de l’appareil. Vous pouvez modifier la date dans les informations de l’appareil.',
    serviceFormTitle: 'Nouvel enregistrement de service',
    date: 'Date',
    note: 'Note',
    title: 'Titre',
    save: 'Enregistrer',
    cancel: 'Annuler',
    serviceAction: 'Intervention',
    serviceActionRequired: 'Le nom de l’intervention est obligatoire.',
    serviceActionPlaceholder: 'ex. Remplacement de l’écouteur',
    serviceDescription: 'Description',
    serviceDescriptionPlaceholder: 'Description facultative',
  },
  fields: {
    selectPlaceholder: 'Sélectionner',
    datePlaceholder: 'Choisir une date',
    dateNotSelected: 'non sélectionnée',
    clear: 'Effacer',
    clearFieldA11y: 'Effacer {label}',
  },
  calendar: {
    title: 'Calendrier',
    emptyTitle: 'Aucune tâche planifiée',
    emptyDescription: 'Lorsque vous ajoutez un appareil, les dates de contrôle et d’entretien apparaissent ici.',
  },
  stats: {
    totalDevices: 'Appareils au total',
    completedCheckups: 'Contrôles terminés',
    pendingCheckups: 'Contrôles en attente',
    overdueCheckups: 'Contrôles en retard',
    rates: 'Taux',
    completionRate: 'Taux global d’achèvement',
    onTimeRate: 'Taux de ponctualité',
    averageDelay: 'Retard moyen',
    averageDelayDays: '{count} jours',
    nearestCheckup: 'Contrôle le plus proche',
    monthlyCompleted: 'Tâches terminées par mois',
    noData: 'Pas encore assez de données',
    chartHint: 'Le graphique apparaîtra ici au fur et à mesure des contrôles et de l’entretien.',
    chartA11yPrefix: 'Graphique mensuel',
  },
  pdf: {
    reportTitle: '{name} — Rapport récapitulatif de l’appareil',
    createdAt: 'Date de création : {date} · application {app}',
    deviceInfo: 'Informations sur l’appareil',
    deviceName: 'Nom de l’appareil',
    brand: 'Marque',
    ear: 'Oreille',
    start: 'Début d’utilisation',
    serial: 'Numéro de série',
    warranty: 'Fin de garantie',
    power: 'Type d’alimentation',
    clinic: 'Médecin / clinique',
    phone: 'Téléphone',
    notes: 'Notes',
    checkupHistory: 'Historique des contrôles',
    checkup: 'Contrôle',
    planned: 'Prévu',
    status: 'État',
    completedAt: 'Terminé',
    note: 'Note',
    noCheckups: 'Aucun contrôle enregistré.',
    maintenanceHistory: 'Historique d’entretien',
    action: 'Tâche',
    date: 'Date',
    noMaintenance: 'Aucun entretien enregistré.',
    serviceRecords: 'Enregistrements de service',
    description: 'Description',
    noService: 'Aucun enregistrement de service.',
    disclaimer:
      'Ce rapport a été créé par l’application FixHear à partir des données saisies par l’utilisateur. Il ne constitue pas un avis médical et ne remplace pas l’évaluation de votre spécialiste de l’audition.',
    shareTitle: 'Rapport {name}',
    appName: 'FixHear',
    reportsTitle: 'Rapports PDF',
    reportsHelp:
      'Le rapport inclut les informations de l’appareil, l’historique des contrôles, l’historique d’entretien et les enregistrements de service.',
    preparing: 'Préparation du rapport…',
    generateError: 'Un problème est survenu lors de la création du rapport.',
    emptyTitle: 'Aucun appareil',
    emptyDescription: 'Ajoutez d’abord un appareil pour créer un rapport.',
  },
  backup: {
    title: 'Sauvegarde',
    exportSection: 'Sauvegarde',
    exportHelp:
      'Tous vos appareils, calendriers de contrôle, enregistrements d’entretien et de service sont exportés dans un seul fichier JSON. Conservez le fichier en lieu sûr.',
    exportButton: 'Exporter les données en JSON',
    exportOk: 'Votre fichier de sauvegarde a été créé.',
    exportFail: 'Un problème est survenu lors de la création de la sauvegarde.',
    restoreSection: 'Restauration',
    restoreHelp:
      'Vous pouvez restaurer vos données en choisissant un fichier de sauvegarde créé auparavant. La restauration écrase toutes les données actuelles.',
    restoreButton: 'Restaurer depuis une sauvegarde',
    restoreConfirmTitle: 'Restaurer depuis une sauvegarde',
    restoreConfirmMessage:
      'La restauration supprimera toutes vos données actuelles et les remplacera par celles du fichier de sauvegarde. Voulez-vous continuer ?',
    invalidJson: 'Le fichier n’est pas un JSON valide.',
    invalidBackup: 'Le fichier n’est pas une sauvegarde FixHear valide.',
    restoreCount: 'Restauration terminée : {count} appareils chargés.',
    restoreFail: 'Un problème est survenu pendant la restauration.',
    shareDialog: 'Partager la sauvegarde',
  },
  troubleshooting: {
    searchPlaceholder: 'Rechercher un problème…',
    searchA11y: 'Champ de recherche des problèmes',
    clearSearch: 'Effacer la recherche',
    banner:
      'Les étapes comprennent uniquement des vérifications sûres à faire à domicile. Ne démontez jamais l’appareil et n’essayez pas de le réparer.',
    stepsCount: 'Parcours en {count} étapes',
    empty: 'Aucun résultat',
    emptyDescription: 'Essayez un autre terme de recherche.',
    categoryMissing: 'Catégorie de problème introuvable.',
    step: 'Étape {current} / {total}',
    question: 'Cette étape a-t-elle résolu le problème ?',
    resolved: 'C’est résolu',
    stillGoing: 'Cela continue',
    expertWarning:
      'Vous n’avez peut-être pas besoin d’arrêter d’utiliser l’appareil, mais contactez votre spécialiste ou le service agréé sans ouvrir l’appareil ni tenter de le réparer.',
    restart: 'Recommencer',
    back: 'Retour à la liste des problèmes',
    safetyBanner:
      'Ne démontez pas l’appareil, n’ouvrez pas les pièces électroniques et n’effectuez pas d’interventions dangereuses.',
    resolvedTitle: 'Parfait, le problème est résolu !',
    resolvedBody:
      'Si le problème revient, vous pouvez répéter les mêmes étapes ou consulter votre spécialiste de l’audition.',
    expertTitle: 'Un avis spécialisé est recommandé',
    expertBody:
      'Les informations de l’appareil et le numéro de la clinique se trouvent dans la fiche de l’appareil, onglet Appareils.',
    openFlowA11y: 'Ouvrir le parcours de dépannage {title}',
    categories: {
      'no-sound': {
        title: 'Aucun son',
        keywords: ['silence', 'ne fonctionne pas', 'je n’entends pas', 'pas de son'],
        steps: [
          {
            instruction: 'Vérifiez que l’appareil est allumé',
            detail:
              'Assurez-vous que l’interrupteur ou le tiroir à pile est bien fermé. Certains appareils s’éteignent si le tiroir à pile est légèrement ouvert.',
          },
          {
            instruction: 'Vérifiez la pile ou le niveau de charge',
            detail:
              'Vérifiez l’état de la pile ou de la charge indiqué par l’appareil en suivant le guide d’utilisation. Si le problème persiste, contactez le centre où vous avez obtenu l’appareil.',
          },
          {
            instruction: 'Vérifiez si le filtre, le tube ou le dôme est bouché',
            detail:
              'Sans démonter l’appareil ni ses pièces, vérifiez s’il y a de la saleté ou des dommages visibles de l’extérieur. N’introduisez pas d’outil de nettoyage dans les ouvertures. En cas de problème, contactez le centre où vous avez obtenu l’appareil.',
          },
          {
            instruction: 'Vérifiez le volume',
            detail:
              'Si l’appareil a un réglage de volume ou une application, assurez-vous que le volume n’est pas au minimum.',
          },
          {
            instruction: 'Redémarrez l’appareil',
            detail:
              'La méthode de redémarrage dépend du modèle. S’il existe une méthode applicable sans retirer de pièces, suivez le guide du fabricant ; en cas de doute, contactez le centre où vous avez obtenu l’appareil.',
          },
        ],
      },
      'low-sound': {
        title: 'Le son est trop faible',
        keywords: ['faible', 'étouffé', 'j’entends mal', 'volume bas'],
        steps: [
          {
            instruction: 'Vérifiez le volume',
            detail: 'Augmentez le volume d’un cran avec le réglage ou l’application de l’appareil.',
          },
          {
            instruction: 'Vérifiez si le filtre, le tube ou le dôme est bouché',
            detail:
              'Sans démonter l’appareil ni ses pièces, vérifiez s’il y a de la saleté ou des dommages visibles de l’extérieur. N’introduisez pas d’outil de nettoyage dans les ouvertures. En cas de problème, contactez le centre où vous avez obtenu l’appareil.',
          },
          {
            instruction: 'Vérifiez la pile ou le niveau de charge',
            detail:
              'Vérifiez l’état de la pile ou de la charge indiqué par l’appareil en suivant le guide d’utilisation. Si le problème persiste, contactez le centre où vous avez obtenu l’appareil.',
          },
          {
            instruction: 'Vérifiez la position de l’embout',
            detail:
              'Vérifiez le placement de l’appareil dans l’oreille selon le mode d’utilisation qui vous a été montré. Ne séparez pas les pièces et ne forcez pas l’appareil. Si le problème persiste, contactez le centre où vous avez obtenu l’appareil.',
          },
          {
            instruction: 'Redémarrez l’appareil',
            detail:
              'La méthode de redémarrage dépend du modèle. S’il existe une méthode applicable sans retirer de pièces, suivez le guide du fabricant ; en cas de doute, contactez le centre où vous avez obtenu l’appareil.',
          },
        ],
      },
      'intermittent-sound': {
        title: 'Le son se coupe',
        keywords: ['se coupe', 'va et vient', 'irrégulier', 'coupures'],
        steps: [
          {
            instruction: 'Vérifiez la pile ou le niveau de charge',
            detail:
              'Vérifiez l’état de la pile ou de la charge indiqué par l’appareil en suivant le guide d’utilisation. Si le problème persiste, contactez le centre où vous avez obtenu l’appareil.',
          },
          {
            instruction: 'Vérifiez si le filtre, le tube ou le dôme est bouché',
            detail:
              'Sans démonter l’appareil ni ses pièces, vérifiez s’il y a de la saleté ou des dommages visibles de l’extérieur. N’introduisez pas d’outil de nettoyage dans les ouvertures. En cas de problème, contactez le centre où vous avez obtenu l’appareil.',
          },
          {
            instruction: 'Vérifiez l’humidité',
            detail:
              'Si vous constatez de l’humidité, suivez la méthode de séchage adaptée indiquée dans le guide de l’appareil. Si vous n’êtes pas sûr que l’accessoire de séchage soit compatible, demandez au centre où vous avez obtenu l’appareil.',
          },
          {
            instruction: 'Redémarrez l’appareil',
            detail:
              'La méthode de redémarrage dépend du modèle. S’il existe une méthode applicable sans retirer de pièces, suivez le guide du fabricant ; en cas de doute, contactez le centre où vous avez obtenu l’appareil.',
          },
          {
            instruction: 'Éteignez puis rallumez la connexion du téléphone',
            detail:
              'Désactivez le Bluetooth du téléphone, attendez quelques secondes, puis réactivez-le. Suivez les consignes d’association de votre téléphone et de votre appareil.',
          },
        ],
      },
      echo: {
        title: 'Ma propre voix a un écho',
        keywords: ['écho', 'creux', 'son étrange', 'étouffé'],
        steps: [
          {
            instruction: 'Vérifiez la position de l’embout',
            detail:
              'Vérifiez le placement de l’appareil dans l’oreille selon le mode d’utilisation qui vous a été montré. Ne séparez pas les pièces et ne forcez pas l’appareil. Si le problème persiste, contactez le centre où vous avez obtenu l’appareil.',
          },
          {
            instruction: 'Vérifiez si le filtre, le tube ou le dôme est bouché',
            detail:
              'Sans démonter l’appareil ni ses pièces, vérifiez s’il y a de la saleté ou des dommages visibles de l’extérieur. N’introduisez pas d’outil de nettoyage dans les ouvertures. En cas de problème, contactez le centre où vous avez obtenu l’appareil.',
          },
          {
            instruction: 'Examinez les réglages du son',
            detail:
              'Si l’application de l’appareil propose un autre programme d’écoute, vous pouvez l’essayer. Si l’écho persiste, le réglage doit être fait par votre spécialiste.',
          },
          {
            instruction: 'Redémarrez l’appareil',
            detail:
              'La méthode de redémarrage dépend du modèle. S’il existe une méthode applicable sans retirer de pièces, suivez le guide du fabricant ; en cas de doute, contactez le centre où vous avez obtenu l’appareil.',
          },
        ],
      },
      'too-loud-ambient': {
        title: 'Les sons ambiants sont trop forts',
        keywords: ['bruit', 'gênant', 'fort', 'trop de son'],
        steps: [
          {
            instruction: 'Baissez le volume d’un cran',
            detail: 'Réduisez progressivement le volume avec le réglage ou l’application.',
          },
          {
            instruction: 'Vérifiez le programme d’écoute',
            detail:
              'Si votre appareil a un programme pour les milieux bruyants, sélectionnez-le. Votre spécialiste peut vous indiquer lequel.',
          },
          {
            instruction: 'Redémarrez l’appareil',
            detail:
              'La méthode de redémarrage dépend du modèle. S’il existe une méthode applicable sans retirer de pièces, suivez le guide du fabricant ; en cas de doute, contactez le centre où vous avez obtenu l’appareil.',
          },
        ],
      },
      whistling: {
        title: 'L’appareil siffle',
        keywords: ['sifflement', 'feedback', 'sirène', 'aigu'],
        steps: [
          {
            instruction: 'Vérifiez que l’appareil est bien en place dans l’oreille',
            detail:
              'Vérifiez le placement de l’appareil dans l’oreille selon le mode d’utilisation qui vous a été montré. Ne séparez pas les pièces et ne forcez pas l’appareil. Si le problème persiste, contactez le centre où vous avez obtenu l’appareil.',
          },
          {
            instruction: 'Vérifiez si le filtre, le tube ou le dôme est bouché',
            detail:
              'Sans démonter l’appareil ni ses pièces, vérifiez s’il y a de la saleté ou des dommages visibles de l’extérieur. N’introduisez pas d’outil de nettoyage dans les ouvertures. En cas de problème, contactez le centre où vous avez obtenu l’appareil.',
          },
          {
            instruction: 'Vérifiez le volume',
            detail: 'Si le volume est trop élevé, baissez-le d’un cran ; un volume élevé peut déclencher le sifflement.',
          },
          {
            instruction: 'Vérifiez le contact avec un chapeau, une écharpe ou le téléphone',
            detail:
              'Les objets proches de l’appareil peuvent provoquer un sifflement. Écartez l’objet et réessayez.',
          },
        ],
      },
      'not-charging': {
        title: 'L’appareil ne se charge pas',
        keywords: ['charge', 'batterie', 'ne charge pas', 'chargeur'],
        steps: [
          {
            instruction: 'Vérifiez la connexion électrique du chargeur',
            detail:
              'Assurez-vous que le câble de charge est bien inséré dans la prise et dans l’unité. Si possible, essayez une autre prise.',
          },
          {
            instruction: 'Vérifiez que l’appareil est bien assis dans le logement de charge',
            detail:
              'Retirez l’appareil du logement et remettez-le. Confirmez que l’indicateur de charge est allumé.',
          },
          {
            instruction: 'Essuyez les contacts de charge avec un chiffon sec',
            detail:
              'Débranchez le chargeur. Essuyez délicatement les points de contact extérieurs de l’appareil et du logement avec un chiffon sec et doux, selon les instructions du fabricant. Ne les lavez pas et ne démontez pas les pièces.',
          },
          {
            instruction: 'Redémarrez l’appareil',
            detail:
              'La méthode de redémarrage dépend du modèle. S’il existe une méthode applicable sans retirer de pièces, suivez le guide du fabricant ; en cas de doute, contactez le centre où vous avez obtenu l’appareil.',
          },
        ],
      },
      bluetooth: {
        title: 'Bluetooth ne se connecte pas',
        keywords: ['téléphone', 'association', 'ne se connecte pas', 'musique', 'appel'],
        steps: [
          {
            instruction: 'Vérifiez que le Bluetooth du téléphone est activé',
            detail: 'Assurez-vous dans les réglages du téléphone que le Bluetooth est activé.',
          },
          {
            instruction: 'Éteignez puis rallumez la connexion du téléphone',
            detail:
              'Désactivez le Bluetooth du téléphone, attendez quelques secondes, puis réactivez-le. Suivez les consignes d’association de votre téléphone et de votre appareil.',
          },
          {
            instruction: 'Redémarrez l’appareil',
            detail:
              'La méthode de redémarrage dépend du modèle. S’il existe une méthode applicable sans retirer de pièces, suivez le guide du fabricant ; en cas de doute, contactez le centre où vous avez obtenu l’appareil.',
          },
          {
            instruction: 'Associez à nouveau l’appareil',
            detail:
              'Reconnectez l’appareil et le téléphone selon les consignes d’association du fabricant ou du téléphone. Il n’est pas nécessaire de le retirer de la liste pour tous les modèles.',
          },
          {
            instruction: 'Redémarrez le téléphone',
            detail: 'Éteindre et rallumer le téléphone peut résoudre des problèmes de connexion.',
          },
        ],
      },
    },
  },
  maintenance: {
    battery: 'Changement de pile',
    charge: 'Vérification de charge',
    filter: 'Changement de filtre',
    tube: 'Vérification du tube',
    dome: 'Vérification du dôme',
    cleaning: 'Nettoyage de l’appareil',
    clinic: 'Contrôle en clinique',
    warranty: 'Fin de garantie',
  },
  checkupStatus: {
    pending: 'En attente',
    completed: 'Terminé',
    overdue: 'En retard',
  },
  schedule: {
    monthCheckup: 'Contrôle du {count}e mois',
    yearCheckup: 'Contrôle de la {count}e année',
    yearHalfCheckup: 'Contrôle à {years},5 ans',
    disclaimer:
      'Ce programme de contrôle n’est qu’un calendrier de rappel d’exemple, pas un avis médical. Définissez la fréquence des contrôles avec votre spécialiste de l’audition.',
  },
  months: {
    full: [
      'janvier',
      'février',
      'mars',
      'avril',
      'mai',
      'juin',
      'juillet',
      'août',
      'septembre',
      'octobre',
      'novembre',
      'décembre',
    ],
    short: ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'],
  },
  brand: {
    otherBrand: 'Autre',
  },
  errors: {
    photoUnreadable: 'La photo sélectionnée n’a pas pu être lue.',
    photoPersistFailed: 'La photo n’a pas pu être enregistrée de façon permanente.',
  },
} satisfies UiMessages;
