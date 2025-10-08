import React, { useEffect, useState } from "react";
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
import { useTheme } from "../contexts/ThemeContext";

const ACCENT = "#e1a17b";

export default function Settings() {
  const [biometric, setBiometric] = useState<boolean>(false);
  const { theme, setDarkMode } = useTheme();
  const [showPasswords, setShowPasswords] = useState<boolean>(false);
  const [compactList, setCompactList] = useState<boolean>(false);

  useEffect(() => {
    const load = async () => {
      try {
        const b = await AsyncStorage.getItem("settings_biometric");
        const s = await AsyncStorage.getItem("settings_showPasswords");
        const c = await AsyncStorage.getItem("settings_compactList");
        if (b !== null) setBiometric(b === "1");
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
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      <View style={styles.header}>
        <Title title="Settings" />
        <Text style={styles.subtitle}>
          Manage your app preferences and data
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Seguridad</Text>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Feather name="unlock" size={20} color={ACCENT} />
            <Text style={styles.label}>Biometric unlock</Text>
          </View>
          <Switch
            value={biometric}
            onValueChange={onToggle("settings_biometric", setBiometric)}
            thumbColor={biometric ? ACCENT : undefined}
          />
        </View>

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Feather name="lock" size={20} color={ACCENT} />
            <Text style={styles.label}>Show passwords</Text>
          </View>
          <Switch
            value={showPasswords}
            onValueChange={onToggle("settings_showPasswords", setShowPasswords)}
            thumbColor={showPasswords ? ACCENT : undefined}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Apariencia</Text>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Feather name="moon" size={20} color={ACCENT} />
            <Text style={styles.label}>Dark mode</Text>
          </View>
          <Switch
            value={theme.dark}
            onValueChange={async (val: boolean) => {
              await setDarkMode(val);
            }}
            thumbColor={theme.dark ? ACCENT : undefined}
          />
        </View>

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Feather name="layout" size={20} color={ACCENT} />
            <Text style={styles.label}>Compact list</Text>
          </View>
          <Switch
            value={compactList}
            onValueChange={onToggle("settings_compactList", setCompactList)}
            thumbColor={compactList ? ACCENT : undefined}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Acciones</Text>

        <Pressable style={styles.actionButton} onPress={onClearData}>
          <Text style={styles.actionText}>Clear all data</Text>
        </Pressable>

        <Pressable
          style={[
            styles.actionButton,
            { backgroundColor: "#fff", borderWidth: 1, borderColor: ACCENT },
          ]}
          onPress={() => Alert.alert("Export", "Export feature coming soon")}
        >
          <Text style={[styles.actionText, { color: ACCENT }]}>
            Export data
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 8,
    alignItems: "center",
  },
  subtitle: { color: "#666", marginTop: 6 },
  section: { marginTop: 20, paddingHorizontal: 16 },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: ACCENT,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  rowLeft: { flexDirection: "row", alignItems: "center" },
  label: { marginLeft: 12, fontSize: 16 },
  actionButton: {
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: ACCENT,
    borderRadius: 8,
    alignItems: "center",
  },
  actionText: { color: "#fff", fontWeight: "700" },
});
