import React, { useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import {
  View,
  StyleSheet,
  Text,
  Switch,
  ScrollView,
  Alert,
  Pressable,
} from "react-native";
import Title from "../components/ui/Title";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from "@expo/vector-icons/Feather";

const ACCENT = "#e1a17b";

export default function Settings() {
  const theme = useTheme();
  const [biometric, setBiometric] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [showPasswords, setShowPasswords] = useState<boolean>(false);
  const [compactList, setCompactList] = useState<boolean>(false);

  useEffect(() => {
    const load = async () => {
      try {
        const b = await AsyncStorage.getItem("settings_biometric");
        const d = await AsyncStorage.getItem("settings_darkMode");
        const s = await AsyncStorage.getItem("settings_showPasswords");
        const c = await AsyncStorage.getItem("settings_compactList");
        if (b !== null) setBiometric(b === "1");
        if (d !== null) setDarkMode(d === "1");
        if (s !== null) setShowPasswords(s === "1");
        if (c !== null) setCompactList(c === "1");
      } catch (e) {
        console.warn("Failed to load settings", e);
      }
    };
    load();
  }, []);

  const persist = async (key: string, value: boolean) => {
    try {
      await AsyncStorage.setItem(key, value ? "1" : "0");
    } catch (e) {
      console.warn("Failed to save setting", key, e);
    }
  };

  const onToggle =
    (key: string, setter: (v: boolean) => void) => async (val: boolean) => {
      setter(val);
      await persist(key, val);
    };

  const onClearData = () => {
    Alert.alert(
      "Clear all data",
      "This will remove all stored vault entries and settings. This action cannot be undone. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              Alert.alert("Done", "All app data cleared.");
            } catch (e) {
              Alert.alert("Error", "Could not clear data");
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      <View style={styles.header}>
        <Title title="Settings" />
        <Text style={[styles.subtitle, { color: theme.text }]}>
          Manage your app preferences and data
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.primary }]}>
          Seguridad
        </Text>
        <View style={[styles.row, { backgroundColor: theme.card }]}>
          <View style={styles.rowLeft}>
            <Feather name="unlock" size={20} color={ACCENT} />
            <Text style={[styles.label, { color: theme.text }]}>
              Biometric unlock
            </Text>
          </View>
          <Switch
            value={biometric}
            onValueChange={onToggle("settings_biometric", setBiometric)}
            thumbColor={biometric ? ACCENT : undefined}
          />
        </View>

        <View style={[styles.row, { backgroundColor: theme.card }]}>
          <View style={styles.rowLeft}>
            <Feather name="lock" size={20} color={ACCENT} />
            <Text style={[styles.label, { color: theme.text }]}>
              Show passwords
            </Text>
          </View>
          <Switch
            value={showPasswords}
            onValueChange={onToggle("settings_showPasswords", setShowPasswords)}
            thumbColor={showPasswords ? ACCENT : undefined}
          />
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.primary }]}>
          Apariencia
        </Text>
        <View style={[styles.row, { backgroundColor: theme.card }]}>
          <View style={styles.rowLeft}>
            <Feather name="moon" size={20} color={theme.primary} />
            <Text style={[styles.label, { color: theme.text }]}>Dark mode</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={onToggle("settings_darkMode", setDarkMode)}
            thumbColor={darkMode ? ACCENT : undefined}
          />
        </View>

        <View style={[styles.row, { backgroundColor: theme.card }]}>
          <View style={styles.rowLeft}>
            <Feather name="layout" size={20} color={ACCENT} />
            <Text style={[styles.label, { color: theme.text }]}>
              Compact list
            </Text>
          </View>
          <Switch
            value={compactList}
            onValueChange={onToggle("settings_compactList", setCompactList)}
            thumbColor={compactList ? ACCENT : undefined}
          />
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.primary }]}>
          Acciones
        </Text>

        <Pressable
          style={[styles.actionButton, { backgroundColor: theme.primary }]}
          onPress={onClearData}
        >
          <Text style={[styles.actionText, { color: theme.card }]}>
            Clear all data
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.actionButton,
            {
              backgroundColor: theme.card,
              borderWidth: 1,
              borderColor: theme.primary,
            },
          ]}
          onPress={() => Alert.alert("Export", "Export feature coming soon")}
        >
          <Text style={[styles.actionText, { color: theme.primary }]}>
            Export data
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 8,
    alignItems: "center",
  },
  subtitle: { marginTop: 6 },
  section: { marginTop: 20, paddingHorizontal: 16 },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  rowLeft: { flexDirection: "row", alignItems: "center" },
  label: { marginLeft: 12, fontSize: 16 },
  actionButton: {
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  actionText: { fontWeight: "700" },
});
