import { useState } from 'react';

import { AppModal } from '@/components/ui/AppModal';
import { Button } from '@/components/ui/Button';
import { DateField } from '@/components/ui/DateField';
import { TextField } from '@/components/ui/TextField';
import { useI18n } from '@/i18n';
import { isValidISODate, todayISO } from '@/services/date';

interface Props {
  visible: boolean;
  onSave: (fields: { date: string; title: string; description: string | null }) => Promise<void>;
  onClose: () => void;
}

export function ServiceRecordModal({ visible, onSave, onClose }: Props) {
  const { messages } = useI18n();
  return (
    <AppModal visible={visible} title={messages.modals.serviceFormTitle} onClose={onClose}>
      {visible ? <ServiceForm onSave={onSave} /> : null}
    </AppModal>
  );
}

function ServiceForm({ onSave }: { onSave: Props['onSave'] }) {
  const { messages } = useI18n();
  const [date, setDate] = useState(todayISO());
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState<string | undefined>();
  const [dateError, setDateError] = useState<string | undefined>();
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    let valid = true;
    if (!title.trim()) {
      setTitleError(messages.modals.serviceActionRequired);
      valid = false;
    } else {
      setTitleError(undefined);
    }
    if (!isValidISODate(date)) {
      setDateError(messages.deviceForm.dateInvalid);
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
      <DateField label={messages.modals.date} value={date} onChange={setDate} required error={dateError} />
      <TextField
        label={messages.modals.serviceAction}
        value={title}
        onChangeText={setTitle}
        placeholder={messages.modals.serviceActionPlaceholder}
        required
        error={titleError}
      />
      <TextField
        label={messages.modals.serviceDescription}
        value={description}
        onChangeText={setDescription}
        placeholder={messages.modals.serviceDescriptionPlaceholder}
        multiline
      />
      <Button label={messages.modals.save} onPress={handleSave} loading={saving} />
    </>
  );
}
