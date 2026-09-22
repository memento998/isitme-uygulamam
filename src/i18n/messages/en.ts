import type { UiMessages } from './types';

export const en = {
  common: {
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    retry: 'Try again',
    loading: 'Loading…',
    errorGeneric: 'Something went wrong.',
    loadError: 'There was a problem loading your data. Please try again.',
    back: 'Back',
    today: 'Today',
    tomorrow: 'Tomorrow',
    daysLater: 'in {count} days',
    daysLateOne: '1 day late',
    daysLateMany: '{count} days late',
    required: 'Required',
    done: 'Done',
    continue: 'Continue',
    enable: 'Enable',
    notNow: 'Not now',
    seeAll: 'See all',
    search: 'Search',
    clearSearch: 'Clear search',
    noResults: 'No results found',
    close: 'Close',
    systemLanguage: 'System language',
    language: 'Language',
    settings: 'Settings',
    confirm: 'Confirm',
    destructive: 'Delete',
  },
  nav: {
    devices: 'Devices',
    myDevices: 'My devices',
    troubleshooting: 'Troubleshooting',
    stats: 'Statistics',
    more: 'More',
  },
  home: {
    emptyTitle: 'You have not added a device yet',
    emptyDescription: 'Add your hearing aid to start tracking checkups and maintenance.',
    addDevice: 'Add device',
    addDeviceA11y: 'Add a new device',
    sampleDataDev: 'Load sample data (developer)',
    deleteDeviceTitle: 'Delete device',
    deleteDeviceMessage:
      '"{name}" and all of its checkup, maintenance, and service records will be permanently deleted. This cannot be undone.',
    fabA11y: 'Add a new device',
    openDeviceA11y: 'Open details for {name}',
    editDeviceA11y: 'Edit {name}',
    deleteDeviceA11y: 'Delete {name}',
    usageStart: 'Started using: {date}',
    completed: 'Completed',
    pending: 'Pending',
    overdue: 'Overdue',
    nextCheckup: 'Next checkup: {date} ({when})',
    noPlannedCheckup: 'No planned checkup',
    earLeft: 'Left ear',
    earRight: 'Right ear',
    earBoth: 'Both ears',
    powerBattery: 'Battery',
    powerRechargeable: 'Rechargeable',
  },
  knowledge: {
    dailyTip: "Today's tip",
    seeAllTips: 'See all tips',
    openedNotification: 'Notification tip · {date}',
    openInCurrentLanguage: 'Open in the current language',
    tipRetired: 'This tip is no longer available',
    tipRetiredBody:
      'This daily tip was updated or removed. You can browse current content in the knowledge bank.',
    knowledgeBank: 'Knowledge Bank',
    knowledgeBankSubtitle:
      'Short, reliable notes on everyday hearing-aid use, care, and storage',
    searchTipsPlaceholder: 'Search tips…',
    categoryAll: 'All',
    todayBadge: 'Today',
    audienceLabel: 'Audience',
    sources: 'Sources',
    generalInfo: 'General information',
    generalInfoBody:
      'This section is for everyday use, external care, and storage of the device. For procedures specific to your device, follow the manufacturer’s user guide and authorized service support.',
    forWhom: 'Who it is for',
    jurisdictionTR:
      'This content reflects general use in Türkiye; rules and services in your country may differ.',
    sourceLanguageNote: 'Source pages may be in English.',
    enableDailyPromptTitle: 'Daily tip notifications',
    enableDailyPromptBody:
      'Would you like a short care or usage tip each day? Notifications are scheduled only on your device.',
    enableDailyNotifications: 'Turn on daily tips',
    dailyNotifications: 'Daily tips',
    dailyNotificationTime: 'Daily tip time',
    dailyNotificationHelp:
      'A short care or usage tip is sent at the time you choose. This is not medical advice.',
    permissionDeniedOpenSettings:
      'Notification permission was denied. You can turn it on in your phone’s settings.',
    knowledgeChannelName: 'Daily tips',
    knowledgeChannelDescription: 'Hearing-aid care and everyday-use tips',
    planningHorizonNote:
      'Daily tip notifications are scheduled a few days ahead and are refreshed when you open the app.',
    filterByCategory: 'Filter by category',
    keywords: 'Keywords',
    categories: {
      deviceIntro: 'Getting to know the device',
      cleaning: 'Cleaning',
      filtersAndParts: 'Filters and parts',
      batteryAndSafety: 'Battery and safety',
      charging: 'Charging',
      moistureAndStorage: 'Moisture and storage',
      troubleshooting: 'Troubleshooting',
      dailyLife: 'Daily life',
      usageAndCheck: 'Use and checkups',
    },
    audience: {
      ALL: 'Everyone',
      BTE_TUBE: 'BTE with tube',
      RIC_RITE: 'RIC / RITE',
      ITE: 'ITE (in-the-ear)',
      REPLACEABLE_BATTERY: 'Replaceable battery',
      RECHARGEABLE: 'Rechargeable',
      WAX_FILTER: 'Wax filter',
      DOME: 'Eartip / silicone dome',
      BLUETOOTH: 'Bluetooth',
    },
  },
  language: {
    title: 'Language',
    subtitle:
      'Choose the language for app text. System language uses the first supported language from your phone’s preferences.',
    systemOption: 'System language',
    restartNeededTitle: 'Restart the app',
    restartNeededBody: 'Close and reopen the app so the language change applies on every screen.',
    saved: 'Language saved.',
  },
  notifications: {
    permission: 'Notification permission',
    permissionGranted: 'Permission granted',
    permissionDenied: 'Permission denied',
    permissionUndetermined: 'Permission not requested yet',
    permissionUnsupported: 'Not supported on this platform',
    permissionExplanation:
      'We need notification permission to remind you when checkup and maintenance dates arrive. Notifications are used only for the planned tasks of devices you added.',
    requestPermission: 'Allow notifications',
    permissionStatus: 'Status: {state}',
    maintenanceTime: 'Notification time',
    maintenanceTimeHelp:
      'Checkup and maintenance reminders are sent at the time you choose below on the planned day.',
    timeSaved: 'Notification time saved and reminders updated.',
    webUnsupported:
      'Notifications are not supported in the web preview. You can use them on your Android or iOS device.',
    dailyKnowledgeSection: 'Daily tip',
    dailyKnowledgeOffHelp: 'Daily tip notifications are off. You can turn them on below.',
    openSystemSettings: 'Open system settings',
    remindersChannelName: 'Reminders',
    remindersChannelDescription: 'Checkup and maintenance reminders',
    checkupReminderTitle: 'Checkup reminder',
    checkupReminderBody: '{device}: {title} — {date}',
    maintenanceReminderTitle: 'Maintenance reminder',
    maintenanceReminderBody: '{device}: {label} — {date}',
  },
  more: {
    calendar: 'Calendar',
    calendarSubtitle: 'Upcoming checkups and maintenance',
    notificationSettings: 'Notification settings',
    notificationSubtitle: 'Permission and notification time',
    pdfReports: 'PDF reports',
    pdfSubtitle: 'Create and share a device summary report',
    backup: 'Backup and restore',
    backupSubtitle: 'Export or restore data as JSON',
    privacy: 'Privacy Policy',
    privacySubtitle: 'Your data is stored only on your device',
    terms: 'Terms of Use',
    termsSubtitle: 'A summary of how the app is used',
    disclaimer: 'Medical disclaimer',
    disclaimerSubtitle: 'Legal notice — the app does not diagnose',
    about: 'About the app',
    sampleData: 'Load sample data (developer)',
    sampleDataSubtitle: 'Visible only in development mode',
    deleteAll: 'Delete all data',
    deleteAllSubtitle: 'All devices and records are permanently deleted',
    deleteAllTitle: 'Delete all data',
    deleteAllMessage:
      'All of your devices, checkup calendars, maintenance, and service records will be permanently deleted. This cannot be undone. Do you want to continue?',
    deleteAllConfirm: 'Yes, delete everything',
    dataDeleted: 'All of your data has been deleted.',
    sampleLoaded: 'Sample data loaded.',
  },
  legal: {
    privacy: {
      title: 'Privacy Policy',
      banner: 'In this version, your data is stored only on your own device.',
      storageHeading: 'Where is your data stored?',
      storageBody:
        'All information you enter in FixHear (devices, checkups, maintenance, and service records) is stored only in the local database on your phone. In this version, no data is sent to the internet or kept on any server.',
      accountHeading: 'Accounts and membership',
      accountBody: 'The app does not require a membership or sign-in. It does not collect personal identity information.',
      controlHeading: 'You control your data',
      controlBody:
        'You can export your data as a JSON file at any time from More > Backup, or permanently delete it with “Delete all data”. Uninstalling the app from your phone also deletes all data.',
      notificationsHeading: 'Notifications',
      notificationsBody:
        'Notifications are scheduled entirely on the device. Notification contents are not sent anywhere.',
      adsHeading: 'Ads',
      adsBody:
        'The app may show a bottom banner and a one-time interstitial ad at launch through Google AdMob. For ad delivery, Google may process some technical data such as device identifiers under its own privacy policy; FixHear does not collect this data. Ads are requested in non-personalized mode.',
      otherLegalHeading: 'Other legal texts',
      otherLegalBody:
        'You can open the Terms of Use and the Medical Disclaimer / Legal Notice from the More menu. Data deletion is done with “Delete all data” on the More page.',
    },
    terms: {
      title: 'Terms of Use',
      banner:
        'This page is a summary placeholder. Final terms of use require legal review.',
      usageHeading: 'Using the app',
      usageBody:
        'FixHear is a free app for tracking and reminding hearing-aid care. This page is not a binding contract.',
      notMedicalHeading: 'Not a medical device',
      notMedicalBody:
        'The app does not diagnose, does not recommend treatment, and is not a certified medical device. Consult your hearing specialist for device settings and health decisions.',
      dataHeading: 'Data and responsibility',
      dataBody:
        'In this version, records you enter are stored only on your device. Where you keep a backup file is up to you. You are responsible for decisions made based on records in the app.',
      adsHeading: 'Ads',
      adsBody:
        'The app may show ads. Technical data processed by the ad provider is summarized on the Privacy Policy page.',
    },
    disclaimer: {
      title: 'Medical disclaimer',
      banner: 'This app does not diagnose and does not replace your hearing specialist.',
      purposeHeading: 'Purpose of the app',
      purposeBody:
        'FixHear is a reminder and logging tool that helps you track checkup and maintenance dates for your hearing aid. The information it provides is general only.',
      notAdviceHeading: 'Not medical advice',
      notAdviceBody:
        'The checkup calendar, care suggestions, and troubleshooting steps in the app are not medical advice. This checkup schedule is only a sample reminder calendar, not medical advice. Decide checkup frequency together with your hearing specialist.',
      problemHeading: 'If there is a problem',
      problemBody:
        'If you cannot solve a problem with your device, contact your hearing specialist or authorized service without opening or trying to repair the device. If you notice any change in your hearing, consult a healthcare provider without delay.',
      liabilityHeading: 'Responsibility',
      liabilityBody:
        'You are responsible for decisions made based on information in the app. In an emergency, seek medical care immediately.',
    },
    about: {
      title: 'About the app',
      appName: 'FixHear',
      version: 'Version {version}',
      paragraph1:
        'FixHear is a free app that helps people who use hearing aids track their devices, periodic checkups, maintenance, and common issues.',
      paragraph2:
        'The app does not require an internet connection; all of your data is stored only on your device.',
      paragraph3:
        'This app is not a medical tool or a certified medical device. Always consult your hearing specialist about checkup frequency and device settings.',
      paragraph4:
        'You can find the Privacy Policy, Terms of Use, and Medical Disclaimer / Legal Notice in the More menu.',
    },
  },
  deviceForm: {
    titleNew: 'New device',
    titleEdit: 'Edit device',
    submitNew: 'Save device',
    submitEdit: 'Save changes',
    photoAdd: 'Add photo',
    photoAddA11y: 'Add a device photo',
    photoChangeA11y: 'Change the device photo',
    photoRemove: 'Remove photo',
    name: 'Device name',
    nameRequired: 'Device name is required.',
    namePlaceholder: 'e.g. My right-ear device',
    brand: 'Brand',
    brandRequired: 'Choose a brand from the list.',
    brandPlaceholder: 'Select a brand',
    brandHelper: 'If it is not in the list, choose Other.',
    ear: 'Ear',
    left: 'Left',
    right: 'Right',
    both: 'Both ears',
    startDate: 'Date you started using it',
    startInvalid: 'Choose a valid start date.',
    startFuture: 'The start date cannot be in the future.',
    startHelper: 'The checkup calendar is created from this date.',
    serial: 'Serial number',
    serialPlaceholder: 'e.g. PH-2025-004512',
    warranty: 'Warranty end date',
    dateInvalid: 'Choose a valid date.',
    powerType: 'Power type',
    powerBattery: 'Battery',
    powerRechargeable: 'Rechargeable',
    clinic: 'Doctor or clinic name',
    clinicPlaceholder: 'e.g. Dr. Jane Smith',
    phone: 'Phone number',
    phonePlaceholder: 'e.g. +1 202 555 0123',
    phoneInvalid: 'Enter a valid phone number.',
    notes: 'Notes',
    notesPlaceholder: 'Your notes about the device',
    reminders: 'Reminders',
    remindersHelp: 'Send notifications for checkup and maintenance dates',
    saveError: 'There was a problem saving the device. Please try again.',
    scheduleBanner:
      'When you add a device, a sample checkup calendar is created for month 1, month 3, month 6, year 1, 1.5 years, year 2, and every 6 months after that. This checkup schedule is only a sample reminder calendar, not medical advice. Decide checkup frequency together with your hearing specialist.',
  },
  deviceDetail: {
    screenTitle: 'Device details',
    notFound: 'Device not found.',
    complete: 'Complete',
    addCheckup: 'Add checkup',
    edit: 'Edit',
    delete: 'Delete',
    pdf: 'PDF report',
    pdfError: 'There was a problem creating the PDF report.',
    switchError: 'There was a problem updating the reminder. Please try again.',
    upcoming: 'Upcoming tasks',
    upcomingEmpty: 'No upcoming tasks.',
    completedSection: 'Completed tasks',
    completedEmpty: 'No completed tasks yet.',
    checkups: 'Checkup calendar',
    noPlannedCheckup: 'No planned checkup.',
    maintenance: 'Maintenance reminders',
    maintenanceHistory: 'Maintenance history',
    maintenanceHistoryEmpty: 'Completed maintenance tasks appear here.',
    service: 'Service records',
    serviceEmpty: 'No service records yet.',
    addService: 'Add record',
    reopen: 'Reopen',
    checkupDisclaimer:
      'This checkup schedule is only a sample reminder calendar, not medical advice. Decide checkup frequency together with your hearing specialist.',
    ear: 'Ear',
    startDate: 'Started using',
    powerType: 'Power type',
    serial: 'Serial number',
    warranty: 'Warranty ends',
    clinic: 'Doctor / clinic',
    phone: 'Phone',
    notes: 'Notes',
    reminders: 'Reminders',
    remindersOn: 'On',
    remindersOff: 'Off',
    intervalDays: 'Every {count} days',
    nextAt: 'Next: {date}',
    lastDone: 'Last done: {date}',
    warrantyEnd: 'Warranty ends: {date}',
    warrantyMissing: 'No warranty date entered',
    planned: 'Planned: {date}',
    completedAt: 'Completed: {date}',
    note: 'Note: {note}',
    deleteDeviceTitle: 'Delete device',
    deleteDeviceMessage:
      '"{name}" and all of its checkup, maintenance, and service records will be permanently deleted. This cannot be undone.',
    deleteCheckupTitle: 'Delete checkup',
    deleteServiceTitle: 'Delete service record',
    deleteLogTitle: 'Delete maintenance record',
    deleteRecordMessage: 'The "{title}" record will be deleted. This cannot be undone.',
    checkupEditA11y: 'Edit checkup {title}',
    checkupDeleteA11y: 'Delete checkup {title}',
    reminderA11y: '{label} reminder',
    reminderEditA11y: 'Edit {label} reminder',
    logDeleteA11y: 'Delete maintenance record',
    serviceDeleteA11y: 'Delete service record {title}',
  },
  modals: {
    completeCheckupTitle: 'Complete checkup',
    completeCheckupTitleNamed: '"{title}" — Complete checkup',
    completeCheckupDate: 'Actual completion date',
    completeCheckupNotePlaceholder: 'Your note about the checkup (optional)',
    markCompleted: 'Mark as completed',
    reminderDoneTitle: 'Complete maintenance',
    reminderDoneTitleNamed: '{label} — Complete',
    reminderDoneDate: 'Date done',
    optionalNotePlaceholder: 'Optional note',
    checkupFormNew: 'New checkup',
    checkupFormEdit: 'Edit checkup',
    checkupName: 'Checkup name',
    checkupNameRequired: 'Checkup name is required.',
    checkupNamePlaceholder: 'e.g. 6-month checkup',
    plannedDate: 'Planned date',
    reminderTitle: 'Reminder',
    reminderEnabled: 'Reminder on',
    reminderEnabledHelp: 'A notification is sent when it is due',
    intervalDays: 'Repeat interval (days)',
    intervalInvalid: 'Enter a number of days between 1 and 365.',
    warrantyHelp:
      'The warranty reminder is sent based on the device’s warranty end date. You can edit the date in the device details.',
    serviceFormTitle: 'New service record',
    date: 'Date',
    note: 'Note',
    title: 'Title',
    save: 'Save',
    cancel: 'Cancel',
    serviceAction: 'Procedure',
    serviceActionRequired: 'Procedure name is required.',
    serviceActionPlaceholder: 'e.g. Receiver replacement',
    serviceDescription: 'Description',
    serviceDescriptionPlaceholder: 'Optional description',
  },
  fields: {
    selectPlaceholder: 'Select',
    datePlaceholder: 'Choose a date',
    dateNotSelected: 'not selected',
    clear: 'Clear',
    clearFieldA11y: 'Clear {label}',
  },
  calendar: {
    title: 'Calendar',
    emptyTitle: 'No planned tasks',
    emptyDescription: 'When you add a device, checkup and maintenance dates appear here.',
  },
  stats: {
    totalDevices: 'Total devices',
    completedCheckups: 'Completed checkups',
    pendingCheckups: 'Pending checkups',
    overdueCheckups: 'Overdue checkups',
    rates: 'Rates',
    completionRate: 'Overall completion rate',
    onTimeRate: 'On-time rate',
    averageDelay: 'Average delay',
    averageDelayDays: '{count} days',
    nearestCheckup: 'Nearest checkup',
    monthlyCompleted: 'Monthly completed tasks',
    noData: 'Not enough data yet',
    chartHint: 'The chart will appear here as you complete checkups and maintenance.',
    chartA11yPrefix: 'Monthly chart',
  },
  pdf: {
    reportTitle: '{name} — Device summary report',
    createdAt: 'Created: {date} · {app} app',
    deviceInfo: 'Device information',
    deviceName: 'Device name',
    brand: 'Brand',
    ear: 'Ear',
    start: 'Started using',
    serial: 'Serial number',
    warranty: 'Warranty ends',
    power: 'Power type',
    clinic: 'Doctor / clinic',
    phone: 'Phone',
    notes: 'Notes',
    checkupHistory: 'Checkup history',
    checkup: 'Checkup',
    planned: 'Planned',
    status: 'Status',
    completedAt: 'Completed',
    note: 'Note',
    noCheckups: 'No checkup records.',
    maintenanceHistory: 'Maintenance history',
    action: 'Task',
    date: 'Date',
    noMaintenance: 'No maintenance records.',
    serviceRecords: 'Service records',
    description: 'Description',
    noService: 'No service records.',
    disclaimer:
      'This report was created by the FixHear app from data entered by the user. It is not medical advice and does not replace an evaluation by your hearing specialist.',
    shareTitle: '{name} report',
    appName: 'FixHear',
    reportsTitle: 'PDF reports',
    reportsHelp:
      'The report includes device information, checkup history, maintenance history, and service records.',
    preparing: 'Preparing report…',
    generateError: 'There was a problem creating the report.',
    emptyTitle: 'No devices',
    emptyDescription: 'Add a device first to create a report.',
  },
  backup: {
    title: 'Backup',
    exportSection: 'Backup',
    exportHelp:
      'All of your devices, checkup calendars, maintenance, and service records are exported as a single JSON file. You can keep the file in a safe place.',
    exportButton: 'Export data as JSON',
    exportOk: 'Your backup file was created.',
    exportFail: 'There was a problem creating the backup.',
    restoreSection: 'Restore',
    restoreHelp:
      'You can restore your data by choosing a backup file you created earlier. Restore overwrites all current data.',
    restoreButton: 'Restore from backup',
    restoreConfirmTitle: 'Restore from backup',
    restoreConfirmMessage:
      'Restore will delete all of your current data and replace it with the data in the backup file. Do you want to continue?',
    invalidJson: 'The file is not valid JSON.',
    invalidBackup: 'The file is not a valid FixHear backup.',
    restoreCount: 'Restore complete: {count} devices loaded.',
    restoreFail: 'There was a problem during restore.',
    shareDialog: 'Share backup',
  },
  troubleshooting: {
    searchPlaceholder: 'Search for a problem…',
    searchA11y: 'Problem search field',
    clearSearch: 'Clear search',
    banner:
      'Steps include only safe checks you can do at home. Never take the device apart or try to repair it.',
    stepsCount: '{count}-step solution flow',
    empty: 'No results found',
    emptyDescription: 'Try a different search term.',
    categoryMissing: 'Problem category not found.',
    step: 'Step {current} / {total}',
    question: 'Did this step fix the problem?',
    resolved: 'It is fixed',
    stillGoing: 'Still happening',
    expertWarning:
      'You may not need to stop using the device, but contact your hearing specialist or authorized service without opening the device or trying to repair it.',
    restart: 'Start over',
    back: 'Back to problem list',
    safetyBanner: 'Do not take the device apart, open electronic parts, or attempt unsafe repairs.',
    resolvedTitle: 'Great, the problem is solved!',
    resolvedBody:
      'If the problem comes back, you can try the same steps again or consult your hearing specialist.',
    expertTitle: 'Specialist support is recommended',
    expertBody:
      'You can find your device details and clinic phone number on the device page in the Devices tab.',
    openFlowA11y: 'Open the {title} troubleshooting flow',
    categories: {
      'no-sound': {
        title: 'No sound at all',
        keywords: ['silent', 'not working', 'cannot hear', 'no sound'],
        steps: [
          {
            instruction: 'Check that the device is on',
            detail:
              'Make sure the on/off switch or battery door is fully closed. Some devices turn off when the battery door is slightly open.',
          },
          {
            instruction: 'Check the battery or charge level',
            detail:
              'On battery-powered devices, replace the battery with a new one. On rechargeable devices, place the device in the charger and confirm that the charging indicator is on.',
          },
          {
            instruction: 'Check whether the filter, tube, or eartip is blocked',
            detail:
              'Earwax can block the filter, tube, or eartip. If dirt is visible, clean it gently with the manufacturer’s recommended tool or replace the filter.',
          },
          {
            instruction: 'Check the volume',
            detail:
              'If the device has a volume control or companion app, make sure the volume is not turned all the way down.',
          },
          {
            instruction: 'Restart the device',
            detail:
              'Turn the device off, wait 10 seconds, and turn it on again. On battery-powered devices you can remove the battery and put it back in.',
          },
        ],
      },
      'low-sound': {
        title: 'Sound is too quiet',
        keywords: ['quiet', 'weak', 'hard to hear', 'low volume'],
        steps: [
          {
            instruction: 'Check the volume',
            detail: 'Raise the volume one step using the volume control or the device app.',
          },
          {
            instruction: 'Check whether the filter, tube, or eartip is blocked',
            detail:
              'Earwax can block the filter, tube, or eartip. If dirt is visible, clean it gently with the manufacturer’s recommended tool or replace the filter.',
          },
          {
            instruction: 'Check the battery or charge level',
            detail:
              'On battery-powered devices, replace the battery with a new one. On rechargeable devices, place the device in the charger and confirm that the charging indicator is on.',
          },
          {
            instruction: 'Check how the earmold sits',
            detail:
              'Make sure the earmold or eartip sits fully in your ear. Poor placement can reduce sound.',
          },
          {
            instruction: 'Restart the device',
            detail:
              'Turn the device off, wait 10 seconds, and turn it on again. On battery-powered devices you can remove the battery and put it back in.',
          },
        ],
      },
      'intermittent-sound': {
        title: 'Sound cuts in and out',
        keywords: ['cutting out', 'comes and goes', 'uneven', 'dropout'],
        steps: [
          {
            instruction: 'Check the battery or charge level',
            detail:
              'On battery-powered devices, replace the battery with a new one. On rechargeable devices, place the device in the charger and confirm that the charging indicator is on.',
          },
          {
            instruction: 'Check whether the filter, tube, or eartip is blocked',
            detail:
              'Earwax can block the filter, tube, or eartip. If dirt is visible, clean it gently with the manufacturer’s recommended tool or replace the filter.',
          },
          {
            instruction: 'Check for moisture',
            detail:
              'Leave the device overnight in a drying box or with a drying capsule. Moisture can cause sound dropouts.',
          },
          {
            instruction: 'Restart the device',
            detail:
              'Turn the device off, wait 10 seconds, and turn it on again. On battery-powered devices you can remove the battery and put it back in.',
          },
          {
            instruction: 'Turn the phone connection off and on again',
            detail:
              'Turn Bluetooth off on your phone, wait a few seconds, and turn it on again. If needed, remove the device from the Bluetooth list and pair it again.',
          },
        ],
      },
      echo: {
        title: 'My own voice sounds echoey',
        keywords: ['echo', 'hollow', 'strange sound', 'muffled'],
        steps: [
          {
            instruction: 'Check how the earmold sits',
            detail:
              'Remove the mold and put it back in. A mold that does not sit fully can cause an echo sensation.',
          },
          {
            instruction: 'Check whether the filter, tube, or eartip is blocked',
            detail:
              'Earwax can block the filter, tube, or eartip. If dirt is visible, clean it gently with the manufacturer’s recommended tool or replace the filter.',
          },
          {
            instruction: 'Review the sound settings',
            detail:
              'If the device app has a different listening program, you can try it. If the echo continues, the setting should be made by your specialist.',
          },
          {
            instruction: 'Restart the device',
            detail:
              'Turn the device off, wait 10 seconds, and turn it on again. On battery-powered devices you can remove the battery and put it back in.',
          },
        ],
      },
      'too-loud-ambient': {
        title: 'Surrounding sounds are too loud',
        keywords: ['noise', 'uncomfortable', 'loud', 'too much sound'],
        steps: [
          {
            instruction: 'Lower the volume one step',
            detail: 'Reduce the volume gradually using the volume control or the app.',
          },
          {
            instruction: 'Check the listening program',
            detail:
              'If your device has a noisy-environment program, select it. Your specialist can tell you which program that is.',
          },
          {
            instruction: 'Restart the device',
            detail:
              'Turn the device off, wait 10 seconds, and turn it on again. On battery-powered devices you can remove the battery and put it back in.',
          },
        ],
      },
      whistling: {
        title: 'The device is whistling',
        keywords: ['whistle', 'feedback', 'siren', 'high-pitched sound'],
        steps: [
          {
            instruction: 'Check that the device sits fully in your ear',
            detail:
              'Remove the mold or eartip and put it back in. Loose placement is the most common cause of whistling.',
          },
          {
            instruction: 'Check whether the filter, tube, or eartip is blocked',
            detail:
              'Earwax can block the filter, tube, or eartip. If dirt is visible, clean it gently with the manufacturer’s recommended tool or replace the filter.',
          },
          {
            instruction: 'Check the volume',
            detail: 'If the volume is too high, lower it one step; high volume can trigger whistling.',
          },
          {
            instruction: 'Check contact with a hat, scarf, or phone',
            detail:
              'Objects close to the device can cause whistling. Move the object away and try again.',
          },
        ],
      },
      'not-charging': {
        title: 'The device is not charging',
        keywords: ['charge', 'battery', 'not filling', 'charger'],
        steps: [
          {
            instruction: 'Check the charger’s power connection',
            detail:
              'Make sure the charging cable is fully seated in the outlet and the unit. If possible, try a different outlet.',
          },
          {
            instruction: 'Check that the device sits fully in the charging slot',
            detail:
              'Remove the device from the slot and put it back in. Confirm that the charging indicator is on.',
          },
          {
            instruction: 'Wipe the charging contacts with a dry cloth',
            detail:
              'If there is dirt or moisture on the contacts of the device and the slot, clean them gently with a dry, soft cloth.',
          },
          {
            instruction: 'Restart the device',
            detail:
              'Turn the device off, wait 10 seconds, and turn it on again. On battery-powered devices you can remove the battery and put it back in.',
          },
        ],
      },
      bluetooth: {
        title: 'Bluetooth will not connect',
        keywords: ['phone', 'pairing', 'not connecting', 'music', 'call'],
        steps: [
          {
            instruction: 'Check that Bluetooth is on on the phone',
            detail: 'Make sure Bluetooth is turned on in the phone settings.',
          },
          {
            instruction: 'Turn the phone connection off and on again',
            detail:
              'Turn Bluetooth off on your phone, wait a few seconds, and turn it on again. If needed, remove the device from the Bluetooth list and pair it again.',
          },
          {
            instruction: 'Restart the device',
            detail:
              'Turn the device off, wait 10 seconds, and turn it on again. On battery-powered devices you can remove the battery and put it back in.',
          },
          {
            instruction: 'Pair the device again',
            detail:
              'Remove (forget) the device from the phone’s Bluetooth list and follow the pairing steps in the manufacturer’s app again.',
          },
          {
            instruction: 'Restart the phone',
            detail: 'Turning the phone off and on can resolve connection problems.',
          },
        ],
      },
    },
  },
  maintenance: {
    battery: 'Battery change',
    charge: 'Charge check',
    filter: 'Filter change',
    tube: 'Tube check',
    dome: 'Eartip check',
    cleaning: 'Device cleaning',
    clinic: 'Clinic checkup',
    warranty: 'Warranty end',
  },
  checkupStatus: {
    pending: 'Pending',
    completed: 'Completed',
    overdue: 'Overdue',
  },
  schedule: {
    monthCheckup: 'Month {count} checkup',
    yearCheckup: 'Year {count} checkup',
    yearHalfCheckup: '{years}.5-year checkup',
    disclaimer:
      'This checkup schedule is only a sample reminder calendar, not medical advice. Decide checkup frequency together with your hearing specialist.',
  },
  months: {
    full: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
  brand: {
    otherBrand: 'Other',
  },
  errors: {
    photoUnreadable: 'The selected photo could not be read.',
    photoPersistFailed: 'The photo could not be saved permanently.',
  },
} satisfies UiMessages;
