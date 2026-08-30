import { useCallback, useEffect, useState } from 'react';
import { BackHandler, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { usePathname, useRouter, type Href } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, fontSize, MIN_TOUCH_SIZE, radius, shadow, spacing } from '@/constants/theme';

type IconKind = 'devices' | 'troubleshooting' | 'stats' | 'more';

interface MenuItem {
  key: IconKind;
  label: string;
  href: Href;
  match: (pathname: string) => boolean;
}

function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1);
  return pathname;
}

function isDevicesPath(pathname: string): boolean {
  const path = normalizePath(pathname);
  return path === '' || path === '/' || path === '/(tabs)' || path.endsWith('/(tabs)/index');
}

const ITEMS: MenuItem[] = [
  {
    key: 'devices',
    label: 'Cihazlar',
    href: '/',
    match: isDevicesPath,
  },
  {
    key: 'troubleshooting',
    label: 'Sorun Giderme',
    href: '/troubleshooting',
    match: (pathname) => normalizePath(pathname).includes('/troubleshooting'),
  },
  {
    key: 'stats',
    label: 'İstatistik',
    href: '/stats',
    match: (pathname) => normalizePath(pathname).includes('/stats'),
  },
  {
    key: 'more',
    label: 'Daha Fazla',
    href: '/more',
    match: (pathname) => {
      const path = normalizePath(pathname);
      return path === '/more' || path.endsWith('/(tabs)/more');
    },
  },
];

function MenuIcon({ kind, color }: { kind: IconKind; color: string }) {
  if (kind === 'devices') return <MaterialCommunityIcons name="ear-hearing" size={20} color={color} />;
  if (kind === 'troubleshooting') return <Ionicons name="construct-outline" size={20} color={color} />;
  if (kind === 'stats') return <Ionicons name="stats-chart-outline" size={20} color={color} />;
  return <Ionicons name="ellipsis-horizontal-circle-outline" size={20} color={color} />;
}

/** Ana ekran başlıklarında kullanılan dikey üç nokta açılır menü. */
export function HeaderOverflowMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      close();
      return true;
    });
    return () => sub.remove();
  }, [open, close]);

  const handleSelect = (href: Href) => {
    close();
    router.replace(href);
  };

  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Menüyü aç"
        accessibilityHint="Cihazlar, sorun giderme, istatistik ve daha fazla bölümlerine gider"
        accessibilityState={{ expanded: open }}
        onPress={() => setOpen(true)}
        style={styles.trigger}
        hitSlop={8}
      >
        <Ionicons name="ellipsis-vertical" size={22} color={colors.text} />
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={close}>
        <View style={styles.overlay} pointerEvents="box-none">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Menüyü kapat"
            onPress={close}
            style={StyleSheet.absoluteFill}
          />
          <View style={[styles.menu, { top: insets.top + 8 }]} accessibilityRole="menu">
            {ITEMS.map((item) => {
              const active = item.match(pathname);
              const color = active ? colors.primary : colors.text;
              return (
                <Pressable
                  key={item.key}
                  accessibilityRole="menuitem"
                  accessibilityState={{ selected: active }}
                  accessibilityLabel={item.label}
                  onPress={() => handleSelect(item.href)}
                  style={({ pressed }) => [
                    styles.item,
                    active && styles.itemActive,
                    pressed && styles.itemPressed,
                  ]}
                >
                  <View style={styles.itemIcon}>
                    <MenuIcon kind={item.key} color={color} />
                  </View>
                  <Text style={[styles.itemLabel, active && styles.itemLabelActive]}>{item.label}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    minWidth: MIN_TOUCH_SIZE,
    minHeight: MIN_TOUCH_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.xs,
  },
  overlay: {
    flex: 1,
  },
  menu: {
    position: 'absolute',
    right: spacing.md,
    minWidth: 220,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.xs,
    ...shadow.card,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: MIN_TOUCH_SIZE,
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  itemActive: {
    backgroundColor: colors.primarySoft,
  },
  itemPressed: {
    backgroundColor: colors.primarySoft,
  },
  itemIcon: {
    width: 24,
    alignItems: 'center',
  },
  itemLabel: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.text,
    fontWeight: '500',
  },
  itemLabelActive: {
    color: colors.primary,
    fontWeight: '700',
  },
});
