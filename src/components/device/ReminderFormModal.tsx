import { useEffect, useState } from 'react';

import { AppModal } from '@/components/ui/AppModal';
import { Button } from '@/components/ui/Button';
import { InfoBanner } from '@/components/ui/InfoBanner';
import { SwitchRow } from '@/components/ui/SwitchRow';
import { TextField } from '@/components/ui/TextField';
import type { MaintenanceReminder } from '@/types/models';
import { MAINTENANCE_TYPE_LABELS } from '@/types/models';

interface Props {
  visible: boolean;
  reminder: MaintenanceReminder | null;
  onSave: (fields: { enabled: boolean; intervalDays: number }) => Promise<void>;
  onClose: () => void;
}

export function ReminderFormModal({ visible, reminder, onSave, onClose }: Props) {
  const [enabled, setEnabled] = useState(false);
  const [intervalText, setIntervalText] = useState('30');
  const [intervalError, setIntervalError] = useState<string | undefined>();
  const [saving, setSaving] = useState(false);

  const isWarranty = reminder?.type === 'warranty';

  useEffect(() => {
    if (visible && reminder) {
      setEnabled(reminder.enabled);
      setIntervalText(String(reminder.intervalDays));
      setIntervalError(undefined);
      setSaving(false);
    }
  }, [visible, reminder]);

  const handleSave = async () => {
    let intervalDays = reminder?.intervalDays ?? 0;
    if (!isWarranty) {
      const parsed = Number(intervalText);
      if (!Number.isInteger(parsed) || parsed < 1 || parsed > 365) {
        setIntervalError('1 ile 365 arasında bir gün sayısı girin.');
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
    <AppModal
      visible={visible}
      title={reminder ? MAINTENANCE_TYPE_LABELS[reminder.type] : 'Hatırlatıcı'}
      onClose={onClose}
    >
      <SwitchRow
        label="Hatırlatıcı açık"
        description="Zamanı geldiğinde bildirim gönderilir"
        value={enabled}
        onValueChange={setEnabled}
      />
      {isWarranty ? (
        <InfoBanner text="Garanti hatırlatması, cihazın garanti bitiş tarihine göre gönderilir. Tarihi cihaz bilgilerinden düzenleyebilirsiniz." />
      ) : (
        <TextField
          label="Tekrar aralığı (gün)"
          value={intervalText}
          onChangeText={setIntervalText}
          keyboardType="number-pad"
          required
          error={intervalError}
        />
      )}
      <Button label="Kaydet" onPress={handleSave} loading={saving} />
    </AppModal>
  );
}
