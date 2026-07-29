import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { DateField } from '@/components/ui/DateField';
import { InfoBanner } from '@/components/ui/InfoBanner';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { SwitchRow } from '@/components/ui/SwitchRow';
import { TextField } from '@/components/ui/TextField';
import { colors, fontSize, radius, spacing } from '@/constants/theme';
import type { DeviceInput } from '@/repositories/devices';
import { SCHEDULE_DISCLAIMER } from '@/services/checkupSchedule';
import { compareISO, isValidISODate, todayISO } from '@/services/date';
import type { Device, EarSide, PowerType } from '@/types/models';

interface Props {
  initial?: Device;
  submitLabel: string;
  /** Yeni cihazda kontrol takvimi bilgisi gösterilir. */
  showScheduleInfo?: boolean;
  onSubmit: (input: DeviceInput) => Promise<void>;
}

interface FormErrors {
  name?: string;
  brand?: string;
  model?: string;
  startDate?: string;
  warrantyEndDate?: string;
  clinicPhone?: string;
}

export function DeviceForm({ initial, submitLabel, showScheduleInfo = false, onSubmit }: Props) {
  const [name, setName] = useState(initial?.name ?? '');
  const [brand, setBrand] = useState(initial?.brand ?? '');
  const [model, setModel] = useState(initial?.model ?? '');
  const [earSide, setEarSide] = useState<EarSide>(initial?.earSide ?? 'both');
  const [startDate, setStartDate] = useState(initial?.startDate ?? todayISO());
  const [serialNumber, setSerialNumber] = useState(initial?.serialNumber ?? '');
  const [warrantyEndDate, setWarrantyEndDate] = useState(initial?.warrantyEndDate ?? '');
  const [powerType, setPowerType] = useState<PowerType>(initial?.powerType ?? 'battery');
  const [clinicName, setClinicName] = useState(initial?.clinicName ?? '');
  const [clinicPhone, setClinicPhone] = useState(initial?.clinicPhone ?? '');
  const [notes, setNotes] = useState(initial?.notes ?? '');
  const [photoUri, setPhotoUri] = useState(initial?.photoUri ?? '');
  const [remindersEnabled, setRemindersEnabled] = useState(initial?.remindersEnabled ?? true);
  const [errors, setErrors] = useState<FormErrors>({});
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const pickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.7,
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (!result.canceled && result.assets[0]) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!name.trim()) next.name = 'Cihaz adı zorunludur.';
    if (!brand.trim()) next.brand = 'Marka zorunludur.';
    if (!model.trim()) next.model = 'Model zorunludur.';
    if (!isValidISODate(startDate)) {
      next.startDate = 'Geçerli bir başlangıç tarihi seçin.';
    } else if (compareISO(startDate, todayISO()) > 0) {
      next.startDate = 'Başlangıç tarihi gelecekte olamaz.';
    }
    if (warrantyEndDate && !isValidISODate(warrantyEndDate)) {
      next.warrantyEndDate = 'Geçerli bir tarih seçin.';
    }
    if (clinicPhone.trim() && !/^[0-9+()\-\s]{7,20}$/.test(clinicPhone.trim())) {
      next.clinicPhone = 'Geçerli bir telefon numarası girin.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSaving(true);
    setSubmitError(null);
    try {
      await onSubmit({
        name: name.trim(),
        brand: brand.trim(),
        model: model.trim(),
        earSide,
        startDate,
        serialNumber: serialNumber.trim() || null,
        warrantyEndDate: warrantyEndDate || null,
        powerType,
        clinicName: clinicName.trim() || null,
        clinicPhone: clinicPhone.trim() || null,
        notes: notes.trim() || null,
        photoUri: photoUri || null,
        remindersEnabled,
      });
    } catch (err) {
      console.warn('Cihaz kaydedilemedi:', err);
      setSubmitError('Cihaz kaydedilirken bir sorun oluştu. Lütfen tekrar deneyin.');
      setSaving(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Card>
        <View style={styles.photoRow}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={photoUri ? 'Cihaz fotoğrafını değiştir' : 'Cihaz fotoğrafı ekle'}
            onPress={pickPhoto}
            style={styles.photoButton}
          >
            {photoUri ? (
              <Image source={{ uri: photoUri }} style={styles.photo} contentFit="cover" />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Ionicons name="camera-outline" size={28} color={colors.primary} />
                <Text style={styles.photoText}>Fotoğraf ekle</Text>
              </View>
            )}
          </Pressable>
          {photoUri ? (
            <Button label="Fotoğrafı kaldır" variant="ghost" onPress={() => setPhotoUri('')} />
          ) : null}
        </View>

        <TextField
          label="Cihaz adı"
          value={name}
          onChangeText={setName}
          placeholder="Örn. Sağ kulak cihazım"
          required
          error={errors.name}
        />
        <TextField
          label="Marka"
          value={brand}
          onChangeText={setBrand}
          placeholder="Örn. Phonak"
          required
          error={errors.brand}
        />
        <TextField
          label="Model"
          value={model}
          onChangeText={setModel}
          placeholder="Örn. Audeo P90"
          required
          error={errors.model}
        />
        <SegmentedControl
          label="Kulak"
          options={[
            { value: 'left', label: 'Sol' },
            { value: 'right', label: 'Sağ' },
            { value: 'both', label: 'İki kulak' },
          ]}
          value={earSide}
          onChange={setEarSide}
        />
        <DateField
          label="Kullanım başlangıç tarihi"
          value={startDate}
          onChange={setStartDate}
          required
          error={errors.startDate}
          helperText={showScheduleInfo ? 'Kontrol takvimi bu tarihe göre oluşturulur.' : undefined}
        />
        <TextField
          label="Seri numarası"
          value={serialNumber}
          onChangeText={setSerialNumber}
          placeholder="Örn. PH-2025-004512"
        />
        <DateField
          label="Garanti bitiş tarihi"
          value={warrantyEndDate}
          onChange={setWarrantyEndDate}
          clearable
          error={errors.warrantyEndDate}
        />
        <SegmentedControl
          label="Güç tipi"
          options={[
            { value: 'battery', label: 'Pilli' },
            { value: 'rechargeable', label: 'Şarjlı' },
          ]}
          value={powerType}
          onChange={setPowerType}
        />
        <TextField
          label="Doktor veya klinik adı"
          value={clinicName}
          onChangeText={setClinicName}
          placeholder="Örn. Dr. Ayşe Yılmaz"
        />
        <TextField
          label="Telefon numarası"
          value={clinicPhone}
          onChangeText={setClinicPhone}
          placeholder="Örn. 0212 555 12 34"
          keyboardType="phone-pad"
          error={errors.clinicPhone}
        />
        <TextField
          label="Notlar"
          value={notes}
          onChangeText={setNotes}
          placeholder="Cihazla ilgili notlarınız"
          multiline
        />
        <SwitchRow
          label="Hatırlatıcılar"
          description="Kontrol ve bakım tarihleri için bildirim gönderilsin"
          value={remindersEnabled}
          onValueChange={setRemindersEnabled}
        />
      </Card>

      {showScheduleInfo ? (
        <View style={styles.banner}>
          <InfoBanner
            text={`Cihaz eklendiğinde 1. ay, 3. ay, 6. ay, 1. yıl, 1,5 yıl, 2. yıl ve sonrasında 6 ayda bir olacak şekilde örnek bir kontrol takvimi oluşturulur. ${SCHEDULE_DISCLAIMER}`}
          />
        </View>
      ) : null}

      {submitError ? (
        <View style={styles.banner}>
          <InfoBanner kind="warning" text={submitError} />
        </View>
      ) : null}

      <Button label={submitLabel} onPress={handleSubmit} loading={saving} style={styles.submit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl * 2 },
  photoRow: { alignItems: 'center', marginBottom: spacing.lg, gap: spacing.sm },
  photoButton: { borderRadius: radius.lg },
  photo: { width: 96, height: 96, borderRadius: radius.lg },
  photoPlaceholder: {
    width: 96,
    height: 96,
    borderRadius: radius.lg,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
    borderStyle: 'dashed',
  },
  photoText: { fontSize: fontSize.xs, color: colors.primary, fontWeight: '600' },
  banner: { marginTop: spacing.lg },
  submit: { marginTop: spacing.xl },
});
