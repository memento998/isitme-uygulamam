import { useState } from 'react';

import { AppModal } from '@/components/ui/AppModal';
import { Button } from '@/components/ui/Button';
import { InfoBanner } from '@/components/ui/InfoBanner';
import { SwitchRow } from '@/components/ui/SwitchRow';
import { TextField } from '@/components/ui/TextField';
import { useI18n } from '@/i18n';
import type { MaintenanceReminder } from '@/types/models';

interface Props {
  visible: boolean;
  reminder: MaintenanceReminder | null;
  onSave: (fields: { enabled: boolean; intervalDays: number }) => Promise<void>;
  onClose: () => void;
}

export function ReminderFormModal({ visible, reminder, onSave, onClose }: Props) {
  const { messages } = useI18n();
  return (
    <AppModal
      visible={visible}
      title={reminder ? messages.maintenance[reminder.type] : messages.modals.reminderTitle}
      onClose={onClose}
    >
      {visible && reminder ? (
        <ReminderForm key={reminder.id} reminder={reminder} onSave={onSave} />
      ) : null}
    </AppModal>
  );
}

function ReminderForm({
  reminder,
  onSave,
}: {
  reminder: MaintenanceReminder;
  onSave: Props['onSave'];
}) {
  const { messages } = useI18n();
  const [enabled, setEnabled] = useState(reminder.enabled);
  const [intervalText, setIntervalText] = useState(String(reminder.intervalDays));
  const [intervalError, setIntervalError] = useState<string | undefined>();
  const [saving, setSaving] = useState(false);

  const isWarranty = reminder.type === 'warranty';

  const handleSave = async () => {
    let intervalDays = reminder.intervalDays;
    if (!isWarranty) {
      const parsed = Number(intervalText);
      if (!Number.isInteger(parsed) || parsed < 1 || parsed > 365) {
        setIntervalError(messages.modals.intervalInvalid);
        return;
      }
      intervalDays = parsed;
    }
    setIntervalError(undefined);
    setSaving(true);
    try {
      await onSave({ enabled, intervalDays });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <SwitchRow
        label={messages.modals.reminderEnabled}
        description={messages.modals.reminderEnabledHelp}
        value={enabled}
        onValueChange={setEnabled}
      />
      {isWarranty ? (
        <InfoBanner text={messages.modals.warrantyHelp} />
      ) : (
        <TextField
          label={messages.modals.intervalDays}
          value={intervalText}
          onChangeText={setIntervalText}
          keyboardType="number-pad"
          required
          error={intervalError}
        />
      )}
      <Button label={messages.modals.save} onPress={handleSave} loading={saving} />
    </>
  );
}
