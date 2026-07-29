import { useEffect, useState } from 'react';

import { AppModal } from '@/components/ui/AppModal';
import { Button } from '@/components/ui/Button';
import { DateField } from '@/components/ui/DateField';
import { TextField } from '@/components/ui/TextField';
import { isValidISODate, todayISO } from '@/services/date';
import type { Checkup } from '@/types/models';

interface Props {
  visible: boolean;
  /** Düzenlenecek kontrol; yeni kayıt için null. */
  checkup: Checkup | null;
  onSave: (fields: { title: string; dueDate: string }) => Promise<void>;
  onClose: () => void;
}

export function CheckupFormModal({ visible, checkup, onSave, onClose }: Props) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState(todayISO());
  const [titleError, setTitleError] = useState<string | undefined>();
  const [dateError, setDateError] = useState<string | undefined>();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (visible) {
      setTitle(checkup?.title ?? '');
      setDueDate(checkup?.dueDate ?? todayISO());
      setTitleError(undefined);
      setDateError(undefined);
      setSaving(false);
    }
  }, [visible, checkup]);

  const handleSave = async () => {
    let valid = true;
    if (!title.trim()) {
      setTitleError('Kontrol adı zorunludur.');
      valid = false;
    } else {
      setTitleError(undefined);
    }
    if (!isValidISODate(dueDate)) {
      setDateError('Geçerli bir tarih seçin.');
      valid = false;
    } else {
      setDateError(undefined);
    }
    if (!valid) return;
    setSaving(true);
    try {
      await onSave({ title: title.trim(), dueDate });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppModal
      visible={visible}
      title={checkup ? 'Kontrolü Düzenle' : 'Yeni Kontrol'}
      onClose={onClose}
    >
      <TextField
        label="Kontrol adı"
        value={title}
        onChangeText={setTitle}
        placeholder="Örn. 6. ay kontrolü"
        required
        error={titleError}
      />
      <DateField
        label="Planlanan tarih"
        value={dueDate}
        onChange={setDueDate}
        required
        error={dateError}
      />
      <Button label="Kaydet" onPress={handleSave} loading={saving} />
    </AppModal>
  );
}
