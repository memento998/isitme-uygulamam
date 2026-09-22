import { useState } from 'react';

import { AppModal } from '@/components/ui/AppModal';
import { Button } from '@/components/ui/Button';
import { DateField } from '@/components/ui/DateField';
import { TextField } from '@/components/ui/TextField';
import { useI18n } from '@/i18n';
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
  const { messages } = useI18n();
  return (
    <AppModal
      visible={visible}
      title={checkup ? messages.modals.checkupFormEdit : messages.modals.checkupFormNew}
      onClose={onClose}
    >
      {/* Form, her açılışta yeniden kurularak temiz durumla başlar. */}
      {visible ? <CheckupForm key={checkup?.id ?? 'new'} checkup={checkup} onSave={onSave} /> : null}
    </AppModal>
  );
}

function CheckupForm({
  checkup,
  onSave,
}: {
  checkup: Checkup | null;
  onSave: Props['onSave'];
}) {
  const { messages } = useI18n();
  const [title, setTitle] = useState(checkup?.title ?? '');
  const [dueDate, setDueDate] = useState(checkup?.dueDate ?? todayISO());
  const [titleError, setTitleError] = useState<string | undefined>();
  const [dateError, setDateError] = useState<string | undefined>();
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    let valid = true;
    if (!title.trim()) {
      setTitleError(messages.modals.checkupNameRequired);
      valid = false;
    } else {
      setTitleError(undefined);
    }
    if (!isValidISODate(dueDate)) {
      setDateError(messages.deviceForm.dateInvalid);
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
    <>
      <TextField
        label={messages.modals.checkupName}
        value={title}
        onChangeText={setTitle}
        placeholder={messages.modals.checkupNamePlaceholder}
        required
        error={titleError}
      />
      <DateField
        label={messages.modals.plannedDate}
        value={dueDate}
        onChange={setDueDate}
        required
        error={dateError}
      />
      <Button label={messages.modals.save} onPress={handleSave} loading={saving} />
    </>
  );
}
