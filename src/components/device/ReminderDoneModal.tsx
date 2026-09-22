import { useState } from 'react';

import { AppModal } from '@/components/ui/AppModal';
import { Button } from '@/components/ui/Button';
import { DateField } from '@/components/ui/DateField';
import { TextField } from '@/components/ui/TextField';
import { useI18n } from '@/i18n';
import { isValidISODate, todayISO } from '@/services/date';
import type { MaintenanceReminder } from '@/types/models';

interface Props {
  visible: boolean;
  reminder: MaintenanceReminder | null;
  onSave: (fields: { doneAt: string; note: string | null }) => Promise<void>;
  onClose: () => void;
}

export function ReminderDoneModal({ visible, reminder, onSave, onClose }: Props) {
  const { messages, tx } = useI18n();
  const label = reminder ? messages.maintenance[reminder.type] : messages.modals.reminderDoneTitle;
  return (
    <AppModal
      visible={visible}
      title={
        reminder ? tx(messages.modals.reminderDoneTitleNamed, { label }) : messages.modals.reminderDoneTitle
      }
      onClose={onClose}
    >
      {visible && reminder ? <DoneForm key={reminder.id} onSave={onSave} /> : null}
    </AppModal>
  );
}

function DoneForm({ onSave }: { onSave: Props['onSave'] }) {
  const { messages } = useI18n();
  const [doneAt, setDoneAt] = useState(todayISO());
  const [note, setNote] = useState('');
  const [dateError, setDateError] = useState<string | undefined>();
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!isValidISODate(doneAt)) {
      setDateError(messages.deviceForm.dateInvalid);
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
    <>
      <DateField
        label={messages.modals.reminderDoneDate}
        value={doneAt}
        onChange={setDoneAt}
        required
        error={dateError}
      />
      <TextField
        label={messages.modals.note}
        value={note}
        onChangeText={setNote}
        placeholder={messages.modals.optionalNotePlaceholder}
        multiline
      />
      <Button label={messages.modals.save} onPress={handleSave} loading={saving} />
    </>
  );
}
