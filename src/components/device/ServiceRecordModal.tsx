import { useState } from 'react';

import { AppModal } from '@/components/ui/AppModal';
import { Button } from '@/components/ui/Button';
import { DateField } from '@/components/ui/DateField';
import { TextField } from '@/components/ui/TextField';
import { isValidISODate, todayISO } from '@/services/date';

interface Props {
  visible: boolean;
  onSave: (fields: { date: string; title: string; description: string | null }) => Promise<void>;
  onClose: () => void;
}

export function ServiceRecordModal({ visible, onSave, onClose }: Props) {
  return (
    <AppModal visible={visible} title="Yeni Servis Kaydı" onClose={onClose}>
      {visible ? <ServiceForm onSave={onSave} /> : null}
    </AppModal>
  );
}

function ServiceForm({ onSave }: { onSave: Props['onSave'] }) {
  const [date, setDate] = useState(todayISO());
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState<string | undefined>();
  const [dateError, setDateError] = useState<string | undefined>();
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    let valid = true;
    if (!title.trim()) {
      setTitleError('İşlem adı zorunludur.');
      valid = false;
    } else {
      setTitleError(undefined);
    }
    if (!isValidISODate(date)) {
      setDateError('Geçerli bir tarih seçin.');
      valid = false;
    } else {
      setDateError(undefined);
    }
    if (!valid) return;
    setSaving(true);
    try {
      await onSave({ date, title: title.trim(), description: description.trim() || null });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <DateField label="Tarih" value={date} onChange={setDate} required error={dateError} />
      <TextField
        label="İşlem"
        value={title}
        onChangeText={setTitle}
        placeholder="Örn. Hoparlör değişimi"
        required
        error={titleError}
      />
      <TextField
        label="Açıklama"
        value={description}
        onChangeText={setDescription}
        placeholder="İsteğe bağlı açıklama"
        multiline
      />
      <Button label="Kaydet" onPress={handleSave} loading={saving} />
    </>
  );
}
