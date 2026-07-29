import { useEffect, useState } from 'react';

import { AppModal } from '@/components/ui/AppModal';
import { Button } from '@/components/ui/Button';
import { DateField } from '@/components/ui/DateField';
import { TextField } from '@/components/ui/TextField';
import { isValidISODate, todayISO } from '@/services/date';
import type { MaintenanceReminder } from '@/types/models';
import { MAINTENANCE_TYPE_LABELS } from '@/types/models';

interface Props {
  visible: boolean;
  reminder: MaintenanceReminder | null;
  onSave: (fields: { doneAt: string; note: string | null }) => Promise<void>;
  onClose: () => void;
}

export function ReminderDoneModal({ visible, reminder, onSave, onClose }: Props) {
  const [doneAt, setDoneAt] = useState(todayISO());
  const [note, setNote] = useState('');
  const [dateError, setDateError] = useState<string | undefined>();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (visible) {
      setDoneAt(todayISO());
      setNote('');
      setDateError(undefined);
      setSaving(false);
    }
  }, [visible]);

  const handleSave = async () => {
    if (!isValidISODate(doneAt)) {
      setDateError('Geçerli bir tarih seçin.');
      return;
    }
    setDateError(undefined);
    setSaving(true);
    try {
      await onSave({ doneAt, note: note.trim() || null });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppModal
      visible={visible}
      title={reminder ? `${MAINTENANCE_TYPE_LABELS[reminder.type]} yapıldı` : 'Bakım yapıldı'}
      onClose={onClose}
    >
      <DateField label="Yapılma tarihi" value={doneAt} onChange={setDoneAt} required error={dateError} />
      <TextField
        label="Not"
        value={note}
        onChangeText={setNote}
        placeholder="İsteğe bağlı not"
        multiline
      />
      <Button label="Kaydet" onPress={handleSave} loading={saving} />
    </AppModal>
  );
}
