import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BANNER_RESERVE_HEIGHT } from '@/constants/layout';
import { colors } from '@/constants/theme';

/**
 * Alt menünün yerini almayan, sistem gezinme çubuğunun üstünde duran
 * sabit rezerv alanı. Gerçek reklam buraya daha sonra yerleştirilecek.
 */
export function BannerReserve() {
  const insets = useSafeAreaInsets();
  return (
    <View
      accessibilityRole="none"
      accessibilityLabel="Reklam alanı"
      style={[
        styles.reserve,
        {
          height: BANNER_RESERVE_HEIGHT + insets.bottom,
          paddingBottom: insets.bottom,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  reserve: {
    backgroundColor: colors.card,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
});
