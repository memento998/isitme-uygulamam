import { Modal, StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, radius, spacing } from '@/constants/theme';
import { Button } from './Button';

interface Props {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/** Web dahil tüm platformlarda çalışan onay penceresi. */
export function ConfirmDialog({
  visible,
  title,
  message,
  confirmLabel = 'Onayla',
  cancelLabel = 'Vazgeç',
  destructive = false,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.dialog} accessibilityViewIsModal>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttons}>
            <Button label={cancelLabel} variant="secondary" onPress={onCancel} style={styles.button} />
            <Button
              label={confirmLabel}
              variant={destructive ? 'danger' : 'primary'}
              onPress={onConfirm}
              style={styles.button}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  dialog: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.xl,
    width: '100%',
    maxWidth: 420,
    gap: spacing.md,
  },
  title: { fontSize: fontSize.lg, fontWeight: '700', color: colors.text },
  message: { fontSize: fontSize.md, color: colors.textMuted, lineHeight: 22 },
  buttons: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.sm },
  button: { flex: 1 },
});
