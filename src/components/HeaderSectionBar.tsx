import { Pressable, StyleSheet, Text, View } from 'react-native';
import { usePathname, useRouter, type Href } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, fontSize, MIN_TOUCH_SIZE, radius, spacing } from '@/constants/theme';

export type HeaderSectionKey = 'devices' | 'troubleshooting' | 'stats' | 'more';

interface MenuItem {
  key: HeaderSectionKey;
  label: string;
  title: string;
  href: Href;
  match: (pathname: string) => boolean;
}

export function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1);
  return pathname;
}

export function isDevicesPath(pathname: string): boolean {
  const path = normalizePath(pathname);
  return path === '' || path === '/' || path === '/(tabs)' || path.endsWith('/(tabs)/index');
}

export const HEADER_SECTIONS: MenuItem[] = [
  {
    key: 'devices',
    label: 'Cihazlar',
    title: 'Cihazlarım',
    href: '/',
    match: isDevicesPath,
  },
  {
    key: 'troubleshooting',
    label: 'Sorun Giderme',
    title: 'Sorun Giderme',
    href: '/troubleshooting',
    match: (pathname) => normalizePath(pathname).includes('/troubleshooting'),
  },
  {
    key: 'stats',
    label: 'İstatistik',
    title: 'İstatistik',
    href: '/stats',
    match: (pathname) => normalizePath(pathname).includes('/stats'),
  },
  {
    key: 'more',
    label: 'Daha Fazla',
    title: 'Daha Fazla',
    href: '/more',
    match: (pathname) => {
      const path = normalizePath(pathname);
      return path === '/more' || path.endsWith('/(tabs)/more');
    },
  },
];

export function titleForPath(pathname: string): string {
  return HEADER_SECTIONS.find((item) => item.match(pathname))?.title ?? 'Cihazlarım';
}

export function isHeaderSectionActive(pathname: string, key: HeaderSectionKey): boolean {
  return HEADER_SECTIONS.find((item) => item.key === key)?.match(pathname) ?? false;
}

export function hrefForSection(key: HeaderSectionKey): Href {
  const item = HEADER_SECTIONS.find((section) => section.key === key);
  if (!item) throw new Error(`Unknown header section: ${key}`);
  return item.href;
}

function SectionIcon({ kind, color }: { kind: HeaderSectionKey; color: string }) {
  if (kind === 'devices') return <MaterialCommunityIcons name="ear-hearing" size={22} color={color} />;
  if (kind === 'troubleshooting') return <Ionicons name="construct-outline" size={22} color={color} />;
  if (kind === 'stats') return <Ionicons name="stats-chart-outline" size={22} color={color} />;
  return <Ionicons name="menu-outline" size={24} color={color} />;
}

/** Ana bölümler: sayfa başlığı solda, bölüm ikonları sağda tek sırada. */
export function HeaderSectionBar() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const title = titleForPath(pathname);

  return (
    <View style={[styles.safe, { paddingTop: insets.top }]}>
      <View style={styles.bar}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.icons} accessibilityRole="tablist">
          {HEADER_SECTIONS.map((item) => {
            const active = item.match(pathname);
            const color = active ? colors.primary : colors.textMuted;
            return (
              <Pressable
                key={item.key}
                accessibilityRole="tab"
                accessibilityState={{ selected: active }}
                accessibilityLabel={item.label}
                onPress={() => {
                  if (!active) router.replace(item.href);
                }}
                style={({ pressed }) => [
                  styles.iconBtn,
                  active && styles.iconBtnActive,
                  pressed && styles.iconBtnPressed,
                ]}
              >
                <SectionIcon kind={item.key} color={color} />
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  bar: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: spacing.lg,
    paddingRight: spacing.sm,
    gap: spacing.sm,
  },
  title: {
    flex: 1,
    minWidth: 0,
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.text,
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    minWidth: MIN_TOUCH_SIZE,
    minHeight: MIN_TOUCH_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
  },
  iconBtnActive: {
    backgroundColor: colors.primarySoft,
  },
  iconBtnPressed: {
    backgroundColor: colors.primarySoft,
  },
});
