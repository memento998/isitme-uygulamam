import { useEffect, useState } from 'react';

import { AppModal } from '@/components/ui/AppModal';
import { Button } from '@/components/ui/Button';
import { DateField } from '@/components/ui/DateField';
import { TextField } from '@/components/ui/TextField';
import { isValidISODate, todayISO } from '@/services/date';
import type { Checkup } from '@/types/models';

interface Props {
  visible: boolean;
  checkup: Checkup | null;
  onSave: (fields: { completedAt: string; note: string | null }) => Promise<void>;
  onClose: () => void;
}

export function CompleteCheckupModal({ visible, checkup, onSave, onClose }: Props) {
  const [completedAt, setCompletedAt] = useState(todayISO());
  const [note, setNote] = useState('');
  const [dateError, setDateError] = useState<string | undefined>();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (visible) {
      setCompletedAt(todayISO());
      setNote(checkup?.note ?? '');
      setDateError(undefined);
      setSaving(false);
    }
  }, [visible, checkup]);

  const handleSave = async () => {
    if (!isValidISODate(completedAt)) {
      setDateError('Geçerli bir tarih seçin.');
      return;
    }
    setDateError(undefined);
    setSaving(true);
    try {
      await onSave({ completedAt, note: note.trim() || null });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppModal
      visible={visible}
      title={checkup ? `"${checkup.title}" tamamlandı` : 'Kontrolü Tamamla'}
      onClose={onClose}
    >
      <DateField
        label="Gerçek tamamlanma tarihi"
        value={completedAt}
        onChange={setCompletedAt}
        required
        error={dateError}
      />
      <TextField
        label="Not"
        value={note}
        onChangeText={setNote}
        placeholder="Kontrolle ilgili notunuz (isteğe bağlı)"
        multiline
      />
      <Button label="Tamamlandı Olarak İşaretle" onPress={handleSave} loading={saving} />
    </AppModal>
  );
}
