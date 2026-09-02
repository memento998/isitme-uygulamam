import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AdBanner } from '@/components/AdBanner';
import { BANNER_RESERVE_HEIGHT } from '@/constants/layout';
import { colors } from '@/constants/theme';

/**
 * Ana ekranların altında, sistem gezinme çubuğunun üstünde duran sabit
 * reklam alanı. Native derlemede test/gerçek banner buraya yerleşir;
 * web ve Expo Go'da yer boş kalır.
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
