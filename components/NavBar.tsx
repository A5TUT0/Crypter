import React, { useMemo, useState } from "react";
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const useSizes = () => {
  const { width } = Dimensions.get("window");
  const icon = Math.min(Math.max(Math.round(width * 0.08), 24), 34);
  return { icon, font: 11 };
};

export default function NavBar() {
  const navigation: any = useNavigation();
  const [selected, setSelected] = useState<string>("Favorites");
  const theme = useTheme();
  const { bottom } = useSafeAreaInsets();
  const { icon, font } = useSizes();

  const activeColor = theme.primary;
  const inactiveColor = theme.text;

  const tabs = useMemo(
    () => [
      { key: "Vault", label: "Vaults", Icon: Entypo, iconName: "lock" },
      {
        key: "Favorites",
        label: "Favorites",
        Icon: MaterialIcons,
        iconName: "stars",
      },
      {
        key: "Settings",
        label: "Settings",
        Icon: Fontisto,
        iconName: "player-settings",
      },
    ],
    []
  );

  return (
    <View
      style={[
        styles.navbar,
        {
          borderTopColor: theme.border,
          backgroundColor: theme.card,
          paddingBottom: Math.max(bottom, 8),
        },
      ]}
    >
      {tabs.map(({ key, label, Icon, iconName }) => {
        const isActive = selected === key;
        const tint = isActive ? activeColor : inactiveColor;
        return (
          <Pressable
            key={key}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            onPress={() => {
              setSelected(key);
              navigation.navigate(key);
            }}
            hitSlop={8}
            style={styles.tabButton}
          >
            <Icon
              name={iconName as any}
              size={icon}
              color={tint}
              style={styles.icon}
            />
            <Text style={[styles.label, { color: tint, fontSize: font }]}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 6,
    paddingHorizontal: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    // Stick to bottom while avoiding layout jumps on different devices
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  tabButton: {
    flex: 1, // cada tab ocupa el mismo ancho
    alignItems: "center", // centra icono + texto horizontalmente
    justifyContent: "center",
    paddingVertical: Platform.select({ ios: 8, android: 10, default: 8 }),
    minHeight: 56, // area táctil cómoda
  },
  icon: {
    marginBottom: 2, // separa icono del texto sin desalinear
  },
  label: {
    textAlign: "center",
    includeFontPadding: false,
  },
});
