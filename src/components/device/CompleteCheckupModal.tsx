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
  checkup: Checkup | null;
  onSave: (fields: { completedAt: string; note: string | null }) => Promise<void>;
  onClose: () => void;
}

export function CompleteCheckupModal({ visible, checkup, onSave, onClose }: Props) {
  const { messages, tx } = useI18n();
  return (
    <AppModal
      visible={visible}
      title={
        checkup
          ? tx(messages.modals.completeCheckupTitleNamed, { title: checkup.title })
          : messages.modals.completeCheckupTitle
      }
      onClose={onClose}
    >
      {visible && checkup ? (
        <CompleteForm key={checkup.id} checkup={checkup} onSave={onSave} />
      ) : null}
    </AppModal>
  );
}

function CompleteForm({ checkup, onSave }: { checkup: Checkup; onSave: Props['onSave'] }) {
  const { messages } = useI18n();
  const [completedAt, setCompletedAt] = useState(todayISO());
  const [note, setNote] = useState(checkup.note ?? '');
  const [dateError, setDateError] = useState<string | undefined>();
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!isValidISODate(completedAt)) {
      setDateError(messages.deviceForm.dateInvalid);
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
    <>
      <DateField
        label={messages.modals.completeCheckupDate}
        value={completedAt}
        onChange={setCompletedAt}
        required
        error={dateError}
      />
      <TextField
        label={messages.modals.note}
        value={note}
        onChangeText={setNote}
        placeholder={messages.modals.completeCheckupNotePlaceholder}
        multiline
      />
      <Button label={messages.modals.markCompleted} onPress={handleSave} loading={saving} />
    </>
  );
}
