import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AdBanner } from '@/components/AdBanner';
import { BANNER_RESERVE_HEIGHT } from '@/constants/layout';
import { colors } from '@/constants/theme';

/**
 * Tüm ekranların altında, sistem gezinme çubuğunun üstünde duran sabit
 * reklam alanı. Ekran içeriği bu alanın üstünde kalır; kayıt düğmesi
 * reklamın altına binmez.
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
    >
      <AdBanner />
    </View>
  );
}

const styles = StyleSheet.create({
  reserve: {
    backgroundColor: colors.card,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
