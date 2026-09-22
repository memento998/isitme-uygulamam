import type { UiMessages } from './types';

export const es = {
  common: {
    cancel: 'Cancelar',
    save: 'Guardar',
    delete: 'Eliminar',
    retry: 'Reintentar',
    loading: 'Cargando…',
    errorGeneric: 'Se ha producido un error.',
    loadError: 'Hubo un problema al cargar los datos. Inténtelo de nuevo.',
    back: 'Atrás',
    today: 'Hoy',
    tomorrow: 'Mañana',
    daysLater: 'dentro de {count} días',
    daysLateOne: '1 día de retraso',
    daysLateMany: '{count} días de retraso',
    required: 'Obligatorio',
    done: 'Listo',
    continue: 'Continuar',
    enable: 'Activar',
    notNow: 'Ahora no',
    seeAll: 'Ver todo',
    search: 'Buscar',
    clearSearch: 'Borrar búsqueda',
    noResults: 'No se han encontrado resultados',
    close: 'Cerrar',
    systemLanguage: 'Idioma del sistema',
    language: 'Idioma',
    settings: 'Ajustes',
    confirm: 'Confirmar',
    destructive: 'Eliminar',
  },
  nav: {
    devices: 'Dispositivos',
    myDevices: 'Mis dispositivos',
    troubleshooting: 'Solución de problemas',
    stats: 'Estadísticas',
    more: 'Más',
  },
  home: {
    emptyTitle: 'Aún no ha añadido un dispositivo',
    emptyDescription: 'Añada su audífono para empezar el seguimiento de revisiones y mantenimiento.',
    addDevice: 'Añadir dispositivo',
    addDeviceA11y: 'Añadir un dispositivo nuevo',
    sampleDataDev: 'Cargar datos de ejemplo (desarrollo)',
    deleteDeviceTitle: 'Eliminar dispositivo',
    deleteDeviceMessage:
      '«{name}» y todos sus registros de revisión, mantenimiento y servicio se eliminarán de forma permanente. Esta acción no se puede deshacer.',
    fabA11y: 'Añadir un dispositivo nuevo',
    openDeviceA11y: 'Abrir detalles de {name}',
    editDeviceA11y: 'Editar {name}',
    deleteDeviceA11y: 'Eliminar {name}',
    usageStart: 'Inicio de uso: {date}',
    completed: 'Completadas',
    pending: 'Pendientes',
    overdue: 'Atrasadas',
    nextCheckup: 'Próxima revisión: {date} ({when})',
    noPlannedCheckup: 'No hay revisión planificada',
    earLeft: 'Oído izquierdo',
    earRight: 'Oído derecho',
    earBoth: 'Ambos oídos',
    powerBattery: 'Pila',
    powerRechargeable: 'Recargable',
  },
  knowledge: {
    dailyTip: 'Consejo del día',
    seeAllTips: 'Ver todos los consejos',
    openedNotification: 'Información de la notificación · {date}',
    openInCurrentLanguage: 'Abrir en el idioma actual',
    tipRetired: 'Este consejo ya no se publica',
    tipRetiredBody:
      'Este consejo diario se actualizó o se retiró. Puede consultar el contenido actual en el banco de conocimientos.',
    knowledgeBank: 'Banco de conocimientos',
    knowledgeBankSubtitle:
      'Notas breves y fiables sobre el uso diario, el cuidado y el almacenamiento del audífono',
    searchTipsPlaceholder: 'Buscar consejos…',
    categoryAll: 'Todos',
    todayBadge: 'Hoy',
    audienceLabel: 'Público',
    sources: 'Fuentes',
    generalInfo: 'Información general',
    generalInfoBody:
      'Esta sección es para el uso diario, el cuidado externo y el almacenamiento del dispositivo. Para procedimientos específicos de su dispositivo, siga el manual del fabricante y el servicio autorizado.',
    forWhom: 'Para quién',
    jurisdictionTR:
      'Este contenido refleja el uso general en Turquía; las normas y los servicios de su país pueden diferir.',
    sourceLanguageNote: 'Las páginas de origen pueden estar en inglés.',
    enableDailyPromptTitle: 'Notificaciones del consejo diario',
    enableDailyPromptBody:
      '¿Quiere un breve consejo de cuidado o uso cada día? Las notificaciones se programan solo en su dispositivo.',
    enableDailyNotifications: 'Activar consejos diarios',
    dailyNotifications: 'Consejos diarios',
    dailyNotificationTime: 'Hora del consejo diario',
    dailyNotificationHelp:
      'A la hora que elija se envía un breve consejo de cuidado o uso. No es consejo médico.',
    permissionDeniedOpenSettings:
      'Se denegó el permiso de notificaciones. Puede activarlo en los ajustes del teléfono.',
    knowledgeChannelName: 'Consejos diarios',
    knowledgeChannelDescription: 'Consejos de cuidado y uso diario del audífono',
    planningHorizonNote:
      'Las notificaciones del consejo diario se programan con unos días de antelación y se actualizan al abrir la aplicación.',
    filterByCategory: 'Filtrar por categoría',
    keywords: 'Palabras clave',
    categories: {
      deviceIntro: 'Conocer el dispositivo',
      cleaning: 'Limpieza',
      filtersAndParts: 'Filtros y piezas',
      batteryAndSafety: 'Pila y seguridad',
      charging: 'Carga',
      moistureAndStorage: 'Humedad y almacenamiento',
      troubleshooting: 'Solución de problemas',
      dailyLife: 'Vida diaria',
      usageAndCheck: 'Uso y control',
    },
    audience: {
      ALL: 'Todas las personas',
      BTE_TUBE: 'BTE con tubo',
      RIC_RITE: 'RIC / RITE',
      ITE: 'ITE (intraauricular)',
      REPLACEABLE_BATTERY: 'Pila reemplazable',
      RECHARGEABLE: 'Recargable',
      WAX_FILTER: 'Filtro de cerumen',
      DOME: 'Oliva / cúpula de silicona',
      BLUETOOTH: 'Bluetooth',
    },
  },
  language: {
    title: 'Idioma',
    subtitle:
      'Elija el idioma de los textos de la aplicación. El idioma del sistema usa el primero compatible de las preferencias del teléfono.',
    systemOption: 'Idioma del sistema',
    restartNeededTitle: 'Reinicie la aplicación',
    restartNeededBody:
      'Cierre y vuelva a abrir la aplicación para que el cambio de idioma se aplique en todas las pantallas.',
    saved: 'Idioma guardado.',
  },
  notifications: {
    permission: 'Permiso de notificaciones',
    permissionGranted: 'Permiso concedido',
    permissionDenied: 'Permiso denegado',
    permissionUndetermined: 'Aún no se ha solicitado el permiso',
    permissionUnsupported: 'No compatible en esta plataforma',
    permissionExplanation:
      'Se necesita permiso de notificaciones para los recordatorios de revisión y mantenimiento y para los consejos diarios que decida activar. Puede activar o desactivar las notificaciones de consejos diarios por separado.',
    requestPermission: 'Permitir notificaciones',
    permissionStatus: 'Estado: {state}',
    maintenanceTime: 'Hora de notificación',
    maintenanceTimeHelp:
      'Los recordatorios de revisión y mantenimiento se envían el día previsto a la hora que elija abajo.',
    timeSaved: 'Hora de notificación guardada y recordatorios actualizados.',
    webUnsupported:
      'Las notificaciones no son compatibles en la vista previa web. Puede usarlas en un dispositivo Android.',
    dailyKnowledgeSection: 'Consejo diario',
    dailyKnowledgeOffHelp: 'Los consejos diarios están desactivados. Puede activarlos abajo.',
    openSystemSettings: 'Abrir ajustes del sistema',
    remindersChannelName: 'Recordatorios',
    remindersChannelDescription: 'Recordatorios de revisión y mantenimiento',
    checkupReminderTitle: 'Recordatorio de revisión',
    checkupReminderBody: '{device}: {title} — {date}',
    maintenanceReminderTitle: 'Recordatorio de mantenimiento',
    maintenanceReminderBody: '{device}: {label} — {date}',
  },
  more: {
    calendar: 'Calendario',
    calendarSubtitle: 'Revisiones y mantenimiento próximos',
    notificationSettings: 'Ajustes de notificaciones',
    notificationSubtitle: 'Permiso y hora de notificación',
    pdfReports: 'Informes PDF',
    pdfSubtitle: 'Crear y compartir un informe resumido del dispositivo',
    backup: 'Copia de seguridad y restauración',
    backupSubtitle: 'Exportar o restaurar datos como JSON',
    privacy: 'Política de privacidad',
    privacySubtitle: 'Sus datos se guardan solo en su dispositivo',
    terms: 'Condiciones de uso',
    termsSubtitle: 'Resumen sobre el uso de la aplicación',
    disclaimer: 'Aviso médico',
    disclaimerSubtitle: 'Información legal: la aplicación no diagnostica',
    about: 'Acerca de la aplicación',
    sampleData: 'Cargar datos de ejemplo (desarrollo)',
    sampleDataSubtitle: 'Visible solo en modo de desarrollo',
    deleteAll: 'Eliminar todos los datos',
    deleteAllSubtitle: 'Todos los dispositivos y registros se eliminan de forma permanente',
    deleteAllTitle: 'Eliminar todos los datos',
    deleteAllMessage:
      'Todos sus dispositivos, calendarios de revisión, registros de mantenimiento y de servicio se eliminarán de forma permanente. Esta acción no se puede deshacer. ¿Desea continuar?',
    deleteAllConfirm: 'Sí, eliminar todo',
    dataDeleted: 'Se han eliminado todos sus datos.',
    sampleLoaded: 'Datos de ejemplo cargados.',
  },
  legal: {
    privacy: {
      title: 'Política de privacidad',
      banner: 'En esta versión, los registros que introduce se guardan en su propio dispositivo.',
      storageHeading: '¿Dónde se guardan sus datos?',
      storageBody:
        'Los registros de dispositivos, revisiones, mantenimiento y servicio que introduce en FixHear se guardan solo en la base de datos local de su teléfono. FixHear no envía esos registros a un servidor propio. La copia de seguridad se hace solo cuando usted inicia un envío. Los datos técnicos que el proveedor de anuncios puede tratar se describen por separado en la sección de anuncios más abajo.',
      accountHeading: 'Cuenta y afiliación',
      accountBody:
        'La aplicación no requiere cuenta ni inicio de sesión. No recopila datos de identidad personal.',
      controlHeading: 'Usted controla sus datos',
      controlBody:
        'Puede exportar sus datos como archivo JSON en cualquier momento desde Más > Copia de seguridad, o eliminarlos de forma permanente con «Eliminar todos los datos». Al desinstalar la aplicación del teléfono también se eliminan todos los datos.',
      notificationsHeading: 'Notificaciones',
      notificationsBody:
        'Las notificaciones se programan por completo en el dispositivo. El contenido de las notificaciones no se envía a ningún sitio.',
      adsHeading: 'Anuncios',
      adsBody:
        'La aplicación puede mostrar un anuncio de banner inferior y un anuncio intersticial una vez al iniciar mediante Google AdMob. Para servir anuncios, Google puede tratar algunos datos técnicos, como identificadores del dispositivo, según su propia política de privacidad; FixHear no recopila esos datos. Los anuncios se solicitan en modo no personalizado.',
      otherLegalHeading: 'Otros textos legales',
      otherLegalBody:
        'Puede abrir las Condiciones de uso y el Aviso médico / información legal desde el menú Más. La eliminación de datos se hace con «Eliminar todos los datos» en la página Más.',
    },
    terms: {
      title: 'Condiciones de uso',
      banner:
        'Esta página es un resumen provisional. Las condiciones de uso definitivas requieren revisión jurídica.',
      usageHeading: 'Uso de la aplicación',
      usageBody:
        'FixHear es una aplicación gratuita para el seguimiento y los recordatorios del cuidado del audífono. Esta página no es un contrato vinculante.',
      notMedicalHeading: 'No es un producto sanitario',
      notMedicalBody:
        'La aplicación no diagnostica, no recomienda tratamiento y no es un producto sanitario certificado. Consulte a su especialista en audición para los ajustes del dispositivo y las decisiones de salud.',
      dataHeading: 'Datos y responsabilidad',
      dataBody:
        'En esta versión, los registros que introduce se guardan solo en su dispositivo. Dónde guarda un archivo de copia de seguridad es decisión suya. La persona usuaria es responsable de las decisiones basadas en los registros de la aplicación.',
      adsHeading: 'Anuncios',
      adsBody:
        'La aplicación puede mostrar anuncios. Los datos técnicos que trata el proveedor de anuncios se resumen en la página de Política de privacidad.',
    },
    disclaimer: {
      title: 'Aviso médico',
      banner: 'Esta aplicación no diagnostica y no sustituye a su especialista en audición.',
      purposeHeading: 'Finalidad de la aplicación',
      purposeBody:
        'FixHear es una herramienta de recordatorio y registro que le ayuda a seguir las fechas de revisión y mantenimiento de su audífono. La información que ofrece es solo de carácter general.',
      notAdviceHeading: 'No es consejo médico',
      notAdviceBody:
        'El calendario de revisiones, las sugerencias de cuidado y los pasos de solución de problemas no son consejo médico. Este programa de revisiones es solo un calendario de recordatorio de ejemplo, no consejo médico. Acuerde la frecuencia de revisión con su especialista en audición.',
      problemHeading: 'Si hay un problema',
      problemBody:
        'Si no puede resolver un problema con el dispositivo, acuda a su especialista o al servicio autorizado sin abrir ni intentar reparar el dispositivo. Si nota cualquier cambio en su audición, consulte a un centro sanitario sin demora.',
      liabilityHeading: 'Responsabilidad',
      liabilityBody:
        'La persona usuaria es responsable de las decisiones tomadas a partir de la información de la aplicación. En una urgencia, acuda de inmediato a un centro sanitario.',
    },
    about: {
      title: 'Acerca de la aplicación',
      appName: 'FixHear',
      version: 'Versión {version}',
      paragraph1:
        'FixHear es una aplicación gratuita que ayuda a las personas que usan audífono a seguir sus dispositivos, revisiones periódicas, mantenimiento y problemas habituales.',
      paragraph2:
        'Los registros que introduce se guardan en su teléfono en esta versión. Mostrar anuncios puede requerir conexión a internet; los datos técnicos del proveedor de anuncios se resumen en la Política de privacidad.',
      paragraph3:
        'Esta aplicación no es una herramienta médica ni un producto sanitario certificado. Consulte siempre a su especialista en audición sobre la frecuencia de revisión y los ajustes del dispositivo.',
      paragraph4:
        'La Política de privacidad, las Condiciones de uso y el Aviso médico / información legal están en el menú Más.',
    },
  },
  deviceForm: {
    titleNew: 'Dispositivo nuevo',
    titleEdit: 'Editar dispositivo',
    submitNew: 'Guardar dispositivo',
    submitEdit: 'Guardar cambios',
    photoAdd: 'Añadir foto',
    photoAddA11y: 'Añadir foto del dispositivo',
    photoChangeA11y: 'Cambiar la foto del dispositivo',
    photoRemove: 'Quitar foto',
    name: 'Nombre del dispositivo',
    nameRequired: 'El nombre del dispositivo es obligatorio.',
    namePlaceholder: 'p. ej. Mi audífono derecho',
    brand: 'Marca',
    brandRequired: 'Elija una marca de la lista.',
    brandPlaceholder: 'Seleccione una marca',
    brandHelper: 'Si no está en la lista, elija Otra.',
    ear: 'Oído',
    left: 'Izquierdo',
    right: 'Derecho',
    both: 'Ambos oídos',
    startDate: 'Fecha de inicio de uso',
    startInvalid: 'Elija una fecha de inicio válida.',
    startFuture: 'La fecha de inicio no puede ser futura.',
    startHelper: 'El calendario de revisiones se crea a partir de esta fecha.',
    serial: 'Número de serie',
    serialPlaceholder: 'p. ej. PH-2025-004512',
    warranty: 'Fin de la garantía',
    dateInvalid: 'Elija una fecha válida.',
    powerType: 'Tipo de alimentación',
    powerBattery: 'Pila',
    powerRechargeable: 'Recargable',
    clinic: 'Nombre del médico o clínica',
    clinicPlaceholder: 'p. ej. Dra. Ana López',
    phone: 'Número de teléfono',
    phonePlaceholder: 'p. ej. 91 555 12 34',
    phoneInvalid: 'Introduzca un número de teléfono válido.',
    notes: 'Notas',
    notesPlaceholder: 'Sus notas sobre el dispositivo',
    reminders: 'Recordatorios',
    remindersHelp: 'Enviar notificaciones de fechas de revisión y mantenimiento',
    saveError: 'Hubo un problema al guardar el dispositivo. Inténtelo de nuevo.',
    scheduleBanner:
      'Al añadir un dispositivo se crea un calendario de revisiones de ejemplo para el 1.er mes, 3.er mes, 6.º mes, 1.er año, 1,5 años, 2.º año y cada 6 meses después. Este programa de revisiones es solo un calendario de recordatorio de ejemplo, no consejo médico. Acuerde la frecuencia de revisión con su especialista en audición.',
  },
  deviceDetail: {
    screenTitle: 'Detalle del dispositivo',
    notFound: 'Dispositivo no encontrado.',
    complete: 'Completar',
    addCheckup: 'Añadir revisión',
    edit: 'Editar',
    delete: 'Eliminar',
    pdf: 'Informe PDF',
    pdfError: 'Hubo un problema al crear el informe PDF.',
    switchError: 'Hubo un problema al actualizar el recordatorio. Inténtelo de nuevo.',
    upcoming: 'Tareas próximas',
    upcomingEmpty: 'No hay tareas próximas.',
    completedSection: 'Tareas completadas',
    completedEmpty: 'Aún no hay tareas completadas.',
    checkups: 'Calendario de revisiones',
    noPlannedCheckup: 'No hay revisión planificada.',
    maintenance: 'Recordatorios de mantenimiento',
    maintenanceHistory: 'Historial de mantenimiento',
    maintenanceHistoryEmpty: 'Las tareas de mantenimiento completadas aparecen aquí.',
    service: 'Registros de servicio',
    serviceEmpty: 'Aún no hay registros de servicio.',
    addService: 'Añadir registro',
    reopen: 'Reabrir',
    checkupDisclaimer:
      'Este programa de revisiones es solo un calendario de recordatorio de ejemplo, no consejo médico. Acuerde la frecuencia de revisión con su especialista en audición.',
    ear: 'Oído',
    startDate: 'Inicio de uso',
    powerType: 'Tipo de alimentación',
    serial: 'Número de serie',
    warranty: 'Fin de la garantía',
    clinic: 'Médico / clínica',
    phone: 'Teléfono',
    notes: 'Notas',
    reminders: 'Recordatorios',
    remindersOn: 'Activados',
    remindersOff: 'Desactivados',
    intervalDays: 'Cada {count} días',
    nextAt: 'Siguiente: {date}',
    lastDone: 'Última vez: {date}',
    warrantyEnd: 'Fin de la garantía: {date}',
    warrantyMissing: 'No se ha introducido la fecha de garantía',
    planned: 'Planificada: {date}',
    completedAt: 'Completada: {date}',
    note: 'Nota: {note}',
    deleteDeviceTitle: 'Eliminar dispositivo',
    deleteDeviceMessage:
      '«{name}» y todos sus registros de revisión, mantenimiento y servicio se eliminarán de forma permanente. Esta acción no se puede deshacer.',
    deleteCheckupTitle: 'Eliminar revisión',
    deleteServiceTitle: 'Eliminar registro de servicio',
    deleteLogTitle: 'Eliminar registro de mantenimiento',
    deleteRecordMessage: 'Se eliminará el registro «{title}». Esta acción no se puede deshacer.',
    checkupEditA11y: 'Editar la revisión {title}',
    checkupDeleteA11y: 'Eliminar la revisión {title}',
    reminderA11y: 'Recordatorio {label}',
    reminderEditA11y: 'Editar el recordatorio {label}',
    logDeleteA11y: 'Eliminar registro de mantenimiento',
    serviceDeleteA11y: 'Eliminar el registro de servicio {title}',
  },
  modals: {
    completeCheckupTitle: 'Completar revisión',
    completeCheckupTitleNamed: '«{title}» — Completar revisión',
    completeCheckupDate: 'Fecha real de finalización',
    completeCheckupNotePlaceholder: 'Su nota sobre la revisión (opcional)',
    markCompleted: 'Marcar como completada',
    reminderDoneTitle: 'Completar mantenimiento',
    reminderDoneTitleNamed: '{label} — Completar',
    reminderDoneDate: 'Fecha de realización',
    optionalNotePlaceholder: 'Nota opcional',
    checkupFormNew: 'Nueva revisión',
    checkupFormEdit: 'Editar revisión',
    checkupName: 'Nombre de la revisión',
    checkupNameRequired: 'El nombre de la revisión es obligatorio.',
    checkupNamePlaceholder: 'p. ej. Revisión de 6 meses',
    plannedDate: 'Fecha prevista',
    reminderTitle: 'Recordatorio',
    reminderEnabled: 'Recordatorio activado',
    reminderEnabledHelp: 'Se envía una notificación cuando llega la fecha',
    intervalDays: 'Intervalo de repetición (días)',
    intervalInvalid: 'Introduzca un número de días entre 1 y 365.',
    warrantyHelp:
      'El recordatorio de garantía se envía según la fecha de fin de garantía del dispositivo. Puede editar la fecha en los datos del dispositivo.',
    serviceFormTitle: 'Nuevo registro de servicio',
    date: 'Fecha',
    note: 'Nota',
    title: 'Título',
    save: 'Guardar',
    cancel: 'Cancelar',
    serviceAction: 'Procedimiento',
    serviceActionRequired: 'El nombre del procedimiento es obligatorio.',
    serviceActionPlaceholder: 'p. ej. Sustitución del auricular',
    serviceDescription: 'Descripción',
    serviceDescriptionPlaceholder: 'Descripción opcional',
  },
  fields: {
    selectPlaceholder: 'Seleccionar',
    datePlaceholder: 'Elija una fecha',
    dateNotSelected: 'no seleccionada',
    clear: 'Borrar',
    clearFieldA11y: 'Borrar {label}',
  },
  calendar: {
    title: 'Calendario',
    emptyTitle: 'No hay tareas planificadas',
    emptyDescription: 'Al añadir un dispositivo, las fechas de revisión y mantenimiento aparecen aquí.',
  },
  stats: {
    totalDevices: 'Dispositivos totales',
    completedCheckups: 'Revisiones completadas',
    pendingCheckups: 'Revisiones pendientes',
    overdueCheckups: 'Revisiones atrasadas',
    rates: 'Porcentajes',
    completionRate: 'Tasa general de finalización',
    onTimeRate: 'Tasa de puntualidad',
    averageDelay: 'Retraso medio',
    averageDelayDays: '{count} días',
    nearestCheckup: 'Revisión más próxima',
    monthlyCompleted: 'Tareas completadas por mes',
    noData: 'Aún no hay datos suficientes',
    chartHint: 'El gráfico aparecerá aquí a medida que complete revisiones y mantenimiento.',
    chartA11yPrefix: 'Gráfico mensual',
  },
  pdf: {
    reportTitle: '{name} — Informe resumido del dispositivo',
    createdAt: 'Fecha de creación: {date} · aplicación {app}',
    deviceInfo: 'Información del dispositivo',
    deviceName: 'Nombre del dispositivo',
    brand: 'Marca',
    ear: 'Oído',
    start: 'Inicio de uso',
    serial: 'Número de serie',
    warranty: 'Fin de la garantía',
    power: 'Tipo de alimentación',
    clinic: 'Médico / clínica',
    phone: 'Teléfono',
    notes: 'Notas',
    checkupHistory: 'Historial de revisiones',
    checkup: 'Revisión',
    planned: 'Planificada',
    status: 'Estado',
    completedAt: 'Completada',
    note: 'Nota',
    noCheckups: 'No hay revisiones registradas.',
    maintenanceHistory: 'Historial de mantenimiento',
    action: 'Tarea',
    date: 'Fecha',
    noMaintenance: 'No hay mantenimiento registrado.',
    serviceRecords: 'Registros de servicio',
    description: 'Descripción',
    noService: 'No hay registros de servicio.',
    disclaimer:
      'Este informe lo ha creado la aplicación FixHear con los datos introducidos por la persona usuaria. No constituye consejo médico ni sustituye la valoración de su especialista en audición.',
    shareTitle: 'Informe de {name}',
    appName: 'FixHear',
    reportsTitle: 'Informes PDF',
    reportsHelp:
      'El informe incluye información del dispositivo, historial de revisiones, historial de mantenimiento y registros de servicio.',
    preparing: 'Preparando el informe…',
    generateError: 'Hubo un problema al crear el informe.',
    emptyTitle: 'No hay dispositivos',
    emptyDescription: 'Añada primero un dispositivo para crear un informe.',
  },
  backup: {
    title: 'Copia de seguridad',
    exportSection: 'Copia de seguridad',
    exportHelp:
      'Todos sus dispositivos, calendarios de revisión, registros de mantenimiento y de servicio se exportan en un único archivo JSON. Guarde el archivo en un lugar seguro.',
    exportButton: 'Exportar datos como JSON',
    exportOk: 'Se ha creado su archivo de copia de seguridad.',
    exportFail: 'Hubo un problema al crear la copia de seguridad.',
    restoreSection: 'Restauración',
    restoreHelp:
      'Puede restaurar sus datos eligiendo un archivo de copia de seguridad creado antes. La restauración sobrescribe todos los datos actuales.',
    restoreButton: 'Restaurar desde copia de seguridad',
    restoreConfirmTitle: 'Restaurar desde copia de seguridad',
    restoreConfirmMessage:
      'La restauración eliminará todos sus datos actuales y los sustituirá por los del archivo de copia de seguridad. ¿Desea continuar?',
    invalidJson: 'El archivo no es un JSON válido.',
    invalidBackup: 'El archivo no es una copia de seguridad válida de FixHear.',
    restoreCount: 'Restauración completada: se han cargado {count} dispositivos.',
    restoreFail: 'Hubo un problema durante la restauración.',
    shareDialog: 'Compartir copia de seguridad',
  },
  troubleshooting: {
    searchPlaceholder: 'Busque un problema…',
    searchA11y: 'Campo de búsqueda de problemas',
    clearSearch: 'Borrar búsqueda',
    banner:
      'Los pasos incluyen solo comprobaciones seguras que puede hacer en casa. Nunca desmonte el dispositivo ni intente repararlo.',
    stepsCount: 'Flujo de {count} pasos',
    empty: 'No se han encontrado resultados',
    emptyDescription: 'Pruebe con otro término de búsqueda.',
    categoryMissing: 'No se ha encontrado la categoría del problema.',
    step: 'Paso {current} / {total}',
    question: '¿Este paso ha resuelto el problema?',
    resolved: 'Se ha resuelto',
    stillGoing: 'Sigue ocurriendo',
    expertWarning:
      'Puede que no necesite dejar de usar el dispositivo, pero acuda a su especialista o al servicio autorizado sin abrir el dispositivo ni intentar repararlo.',
    restart: 'Empezar de nuevo',
    back: 'Volver a la lista de problemas',
    safetyBanner:
      'No desmonte el dispositivo, no abra piezas electrónicas ni realice intervenciones peligrosas.',
    resolvedTitle: 'Muy bien, el problema está resuelto.',
    resolvedBody:
      'Si el problema vuelve, puede repetir los mismos pasos o consultar a su especialista en audición.',
    expertTitle: 'Se recomienda apoyo especializado',
    expertBody:
      'Los datos del dispositivo y el teléfono de la clínica están en la ficha del dispositivo, en la pestaña Dispositivos.',
    openFlowA11y: 'Abrir el flujo de solución de {title}',
    categories: {
      'no-sound': {
        title: 'No hay sonido en absoluto',
        keywords: ['silencio', 'no funciona', 'no oigo', 'sin sonido'],
        steps: [
          {
            instruction: 'Compruebe que el dispositivo está encendido',
            detail:
              'Asegúrese de que el interruptor o la tapa de la pila está completamente cerrado. Algunos dispositivos se apagan si la tapa de la pila queda entreabierta.',
          },
          {
            instruction: 'Compruebe la pila o el nivel de carga',
            detail:
              'Compruebe el estado de la pila o de la carga que muestra el dispositivo según el manual de uso. Si el problema continúa, pida ayuda en el centro donde adquirió el dispositivo.',
          },
          {
            instruction: 'Compruebe si el filtro, el tubo o la oliva están obstruidos',
            detail:
              'Sin separar el dispositivo ni sus piezas, compruebe si hay suciedad o daños visibles desde fuera. No introduzca una herramienta de limpieza en las aberturas. Si hay un problema, pida ayuda en el centro donde adquirió el dispositivo.',
          },
          {
            instruction: 'Compruebe el volumen',
            detail:
              'Si el dispositivo tiene control de volumen o una aplicación, asegúrese de que el volumen no está al mínimo.',
          },
          {
            instruction: 'Reinicie el dispositivo',
            detail:
              'El método de reinicio depende del modelo. Si hay un método que se pueda aplicar sin quitar piezas, siga el manual del fabricante; si no está seguro, pida ayuda en el centro donde adquirió el dispositivo.',
          },
        ],
      },
      'low-sound': {
        title: 'El sonido es demasiado bajo',
        keywords: ['bajo', 'débil', 'cuesta oír', 'poco volumen'],
        steps: [
          {
            instruction: 'Compruebe el volumen',
            detail: 'Suba el volumen un paso con el control o con la aplicación del dispositivo.',
          },
          {
            instruction: 'Compruebe si el filtro, el tubo o la oliva están obstruidos',
            detail:
              'Sin separar el dispositivo ni sus piezas, compruebe si hay suciedad o daños visibles desde fuera. No introduzca una herramienta de limpieza en las aberturas. Si hay un problema, pida ayuda en el centro donde adquirió el dispositivo.',
          },
          {
            instruction: 'Compruebe la pila o el nivel de carga',
            detail:
              'Compruebe el estado de la pila o de la carga que muestra el dispositivo según el manual de uso. Si el problema continúa, pida ayuda en el centro donde adquirió el dispositivo.',
          },
          {
            instruction: 'Compruebe el ajuste del molde',
            detail:
              'Compruebe la colocación del dispositivo en el oído según la forma de uso que le mostraron. No separe las piezas ni fuerce el dispositivo al colocarlo. Si el problema continúa, pida ayuda en el centro donde adquirió el dispositivo.',
          },
          {
            instruction: 'Reinicie el dispositivo',
            detail:
              'El método de reinicio depende del modelo. Si hay un método que se pueda aplicar sin quitar piezas, siga el manual del fabricante; si no está seguro, pida ayuda en el centro donde adquirió el dispositivo.',
          },
        ],
      },
      'intermittent-sound': {
        title: 'El sonido se corta',
        keywords: ['se corta', 'va y viene', 'irregular', 'interrupción'],
        steps: [
          {
            instruction: 'Compruebe la pila o el nivel de carga',
            detail:
              'Compruebe el estado de la pila o de la carga que muestra el dispositivo según el manual de uso. Si el problema continúa, pida ayuda en el centro donde adquirió el dispositivo.',
          },
          {
            instruction: 'Compruebe si el filtro, el tubo o la oliva están obstruidos',
            detail:
              'Sin separar el dispositivo ni sus piezas, compruebe si hay suciedad o daños visibles desde fuera. No introduzca una herramienta de limpieza en las aberturas. Si hay un problema, pida ayuda en el centro donde adquirió el dispositivo.',
          },
          {
            instruction: 'Compruebe la humedad',
            detail:
              'Si nota humedad, siga el método de secado adecuado del manual de su dispositivo. Si no está seguro de que el accesorio de secado sea compatible, consulte al centro donde adquirió el dispositivo.',
          },
          {
            instruction: 'Reinicie el dispositivo',
            detail:
              'El método de reinicio depende del modelo. Si hay un método que se pueda aplicar sin quitar piezas, siga el manual del fabricante; si no está seguro, pida ayuda en el centro donde adquirió el dispositivo.',
          },
          {
            instruction: 'Apague y vuelva a encender la conexión del teléfono',
            detail:
              'Apague el Bluetooth del teléfono, espere unos segundos y vuelva a encenderlo. Siga las instrucciones de emparejamiento del teléfono y del dispositivo.',
          },
        ],
      },
      echo: {
        title: 'Mi propia voz suena con eco',
        keywords: ['eco', 'hueco', 'sonido raro', 'apagado'],
        steps: [
          {
            instruction: 'Compruebe el ajuste del molde',
            detail:
              'Compruebe la colocación del dispositivo en el oído según la forma de uso que le mostraron. No separe las piezas ni fuerce el dispositivo al colocarlo. Si el problema continúa, pida ayuda en el centro donde adquirió el dispositivo.',
          },
          {
            instruction: 'Compruebe si el filtro, el tubo o la oliva están obstruidos',
            detail:
              'Sin separar el dispositivo ni sus piezas, compruebe si hay suciedad o daños visibles desde fuera. No introduzca una herramienta de limpieza en las aberturas. Si hay un problema, pida ayuda en el centro donde adquirió el dispositivo.',
          },
          {
            instruction: 'Revise los ajustes de sonido',
            detail:
              'Si la aplicación del dispositivo tiene otro programa de escucha, puede probarlo. Si el eco continúa, el ajuste debe hacerlo su especialista.',
          },
          {
            instruction: 'Reinicie el dispositivo',
            detail:
              'El método de reinicio depende del modelo. Si hay un método que se pueda aplicar sin quitar piezas, siga el manual del fabricante; si no está seguro, pida ayuda en el centro donde adquirió el dispositivo.',
          },
        ],
      },
      'too-loud-ambient': {
        title: 'Los sonidos del entorno son demasiado fuertes',
        keywords: ['ruido', 'molesto', 'alto', 'demasiado sonido'],
        steps: [
          {
            instruction: 'Baje el volumen un paso',
            detail: 'Reduzca el volumen de forma gradual con el control o la aplicación.',
          },
          {
            instruction: 'Compruebe el programa de escucha',
            detail:
              'Si su dispositivo tiene un programa para ambientes ruidosos, selecciónelo. Su especialista puede indicarle cuál es.',
          },
          {
            instruction: 'Reinicie el dispositivo',
            detail:
              'El método de reinicio depende del modelo. Si hay un método que se pueda aplicar sin quitar piezas, siga el manual del fabricante; si no está seguro, pida ayuda en el centro donde adquirió el dispositivo.',
          },
        ],
      },
      whistling: {
        title: 'El dispositivo silba',
        keywords: ['silbido', 'feedback', 'sirena', 'agudo'],
        steps: [
          {
            instruction: 'Compruebe que el dispositivo encaja por completo en el oído',
            detail:
              'Compruebe la colocación del dispositivo en el oído según la forma de uso que le mostraron. No separe las piezas ni fuerce el dispositivo al colocarlo. Si el problema continúa, pida ayuda en el centro donde adquirió el dispositivo.',
          },
          {
            instruction: 'Compruebe si el filtro, el tubo o la oliva están obstruidos',
            detail:
              'Sin separar el dispositivo ni sus piezas, compruebe si hay suciedad o daños visibles desde fuera. No introduzca una herramienta de limpieza en las aberturas. Si hay un problema, pida ayuda en el centro donde adquirió el dispositivo.',
          },
          {
            instruction: 'Compruebe el volumen',
            detail: 'Si el volumen es demasiado alto, bájelo un paso; el volumen alto puede provocar silbido.',
          },
          {
            instruction: 'Compruebe el contacto con gorro, bufanda o teléfono',
            detail:
              'Los objetos cercanos al dispositivo pueden provocar silbido. Aléjelos e inténtelo de nuevo.',
          },
        ],
      },
      'not-charging': {
        title: 'El dispositivo no carga',
        keywords: ['carga', 'batería', 'no carga', 'cargador'],
        steps: [
          {
            instruction: 'Compruebe la conexión eléctrica del cargador',
            detail:
              'Asegúrese de que el cable de carga encaja bien en el enchufe y en la unidad. Si puede, pruebe otro enchufe.',
          },
          {
            instruction: 'Compruebe que el dispositivo encaja por completo en la ranura de carga',
            detail:
              'Saque el dispositivo de la ranura y vuelva a colocarlo. Compruebe que el indicador de carga está encendido.',
          },
          {
            instruction: 'Limpie los contactos de carga con un paño seco',
            detail:
              'Desconecte el cargador de la corriente. Limpie con suavidad los contactos exteriores del dispositivo y de la ranura con un paño seco y suave, según las instrucciones del fabricante. No los lave ni separe las piezas.',
          },
          {
            instruction: 'Reinicie el dispositivo',
            detail:
              'El método de reinicio depende del modelo. Si hay un método que se pueda aplicar sin quitar piezas, siga el manual del fabricante; si no está seguro, pida ayuda en el centro donde adquirió el dispositivo.',
          },
        ],
      },
      bluetooth: {
        title: 'Bluetooth no se conecta',
        keywords: ['teléfono', 'emparejamiento', 'no conecta', 'música', 'llamada'],
        steps: [
          {
            instruction: 'Compruebe que el Bluetooth del teléfono está activado',
            detail: 'Asegúrese en los ajustes del teléfono de que Bluetooth está activado.',
          },
          {
            instruction: 'Apague y vuelva a encender la conexión del teléfono',
            detail:
              'Apague el Bluetooth del teléfono, espere unos segundos y vuelva a encenderlo. Siga las instrucciones de emparejamiento del teléfono y del dispositivo.',
          },
          {
            instruction: 'Reinicie el dispositivo',
            detail:
              'El método de reinicio depende del modelo. Si hay un método que se pueda aplicar sin quitar piezas, siga el manual del fabricante; si no está seguro, pida ayuda en el centro donde adquirió el dispositivo.',
          },
          {
            instruction: 'Vuelva a emparejar el dispositivo',
            detail:
              'Vuelva a conectar el dispositivo y el teléfono según las instrucciones de emparejamiento del fabricante o del teléfono. No en todos los modelos hace falta eliminarlo de la lista.',
          },
          {
            instruction: 'Reinicie el teléfono',
            detail: 'Apagar y encender el teléfono puede resolver problemas de conexión.',
          },
        ],
      },
    },
  },
  maintenance: {
    battery: 'Cambio de pila',
    charge: 'Comprobación de carga',
    filter: 'Cambio de filtro',
    tube: 'Comprobación del tubo',
    dome: 'Comprobación de la oliva',
    cleaning: 'Limpieza del dispositivo',
    clinic: 'Revisión en clínica',
    warranty: 'Fin de la garantía',
  },
  checkupStatus: {
    pending: 'Pendiente',
    completed: 'Completada',
    overdue: 'Atrasada',
  },
  schedule: {
    monthCheckup: 'Revisión del mes {count}',
    yearCheckup: 'Revisión del año {count}',
    yearHalfCheckup: 'Revisión a los {years},5 años',
    disclaimer:
      'Este programa de revisiones es solo un calendario de recordatorio de ejemplo, no consejo médico. Acuerde la frecuencia de revisión con su especialista en audición.',
  },
  months: {
    full: [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre',
    ],
    short: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
  },
  brand: {
    otherBrand: 'Otra',
  },
  errors: {
    photoUnreadable: 'No se ha podido leer la foto seleccionada.',
    photoPersistFailed: 'No se ha podido guardar la foto de forma permanente.',
  },
} satisfies UiMessages;
