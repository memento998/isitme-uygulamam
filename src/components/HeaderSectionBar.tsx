import { Pressable, StyleSheet, Text, View } from 'react-native';
import { usePathname, useRouter, type Href } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, fontSize, MIN_TOUCH_SIZE, spacing } from '@/constants/theme';

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

/** Ana bölümler: başlık yerinde soldan sağa ikon + isim; tıklanınca o sayfa açılır. */
export function HeaderSectionBar() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const title = titleForPath(pathname);

  return (
    <View style={[styles.safe, { paddingTop: insets.top }]}>
      <Text style={styles.pageTitle} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.tabs} accessibilityRole="tablist">
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
                styles.tab,
                active && styles.tabActive,
                pressed && styles.tabPressed,
              ]}
            >
              <SectionIcon kind={item.key} color={color} />
              <Text
                style={[styles.tabLabel, active && styles.tabLabelActive]}
                numberOfLines={2}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}
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
  pageTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.text,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
  },
  tabs: {
    flexDirection: 'row',
    alignItems: 'stretch',
    minHeight: MIN_TOUCH_SIZE + 20,
    paddingHorizontal: spacing.xs,
    paddingBottom: spacing.sm,
  },
  tab: {
    flex: 1,
    minWidth: 0,
    minHeight: MIN_TOUCH_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
    paddingVertical: spacing.xs,
    gap: 2,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    backgroundColor: colors.primarySoft,
    borderBottomColor: colors.primary,
  },
  tabPressed: {
    backgroundColor: colors.primarySoft,
  },
  tabLabel: {
    width: '100%',
    fontSize: 11,
    lineHeight: 14,
    color: colors.textMuted,
    fontWeight: '500',
    textAlign: 'center',
  },
  tabLabelActive: {
    color: colors.primary,
    fontWeight: '700',
  },
});
