import { StyleSheet, View } from 'react-native';
import { usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AdBanner } from '@/components/AdBanner';
import { BANNER_RESERVE_HEIGHT, isMainTabPath } from '@/constants/layout';
import { colors } from '@/constants/theme';

/**
 * Ana ekranların altında, sistem gezinme çubuğunun üstünde duran sabit
 * reklam alanı. Cihaz formu gibi alt sayfalarda kapanır; böylece kayıt
 * düğmesi reklamın altında kalmaz.
 */
export function BannerReserve() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();

  if (!isMainTabPath(pathname)) return null;

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
