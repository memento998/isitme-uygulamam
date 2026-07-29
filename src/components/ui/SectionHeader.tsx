import { StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, spacing } from '@/constants/theme';

interface Props {
  title: string;
  right?: React.ReactNode;
}

export function SectionHeader({ title, right }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  title: { fontSize: fontSize.lg, fontWeight: '700', color: colors.text, flex: 1 },
});
