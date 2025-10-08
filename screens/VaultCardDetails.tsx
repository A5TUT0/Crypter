import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
  Pressable,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Entry = {
  id: string;
  name: string;
  username: string;
  password: string;
  website?: string;
};

export default function Details({ route, navigation }: any) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const load = async () => {
      try {
        const raw = await AsyncStorage.getItem("vault_entries");
        if (raw) {
          const parsed = JSON.parse(raw) as Entry[];
          setEntries(parsed);
        } else {
          setEntries([]);
        }
      } catch (e) {
        console.error("Failed to load vault entries", e);
        setEntries([]);
      }
    };
    load();
  }, []);
  const entry = entries.find((e) => e.id === route.params.entryId);
  // Defensive: if entry not found, show fallback values
  const name = entry ? entry.name : "N/A";
  const username = entry ? entry.username : "N/A";
  const password = entry ? entry.password : "";
  const website = entry ? entry.website : "";

  function openWebsite(url?: string) {
    if (!url) return;
    const link = url.startsWith("http") ? url : `https://${url}`;
    Linking.canOpenURL(link)
      .then((supported) => {
        if (supported) Linking.openURL(link);
        else Alert.alert("Cannot open URL", link);
      })
      .catch(() => Alert.alert("Cannot open URL", link));
  }

  async function copyToClipboard(text: string) {
    try {
      // dynamically require clipboard package if available
      const Clipboard = require("@react-native-clipboard/clipboard");
      if (Clipboard && Clipboard.setString) {
        Clipboard.setString(text);
        Alert.alert("Copied", "Password copied to clipboard");
        return;
      }
    } catch (_) {
      // fallback
    }
    // fallback: show the password in an alert for manual copy
    Alert.alert("Copy", "Cannot access clipboard. Password: " + text);
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation?.goBack()}
          style={[styles.backButton, { backgroundColor: theme.card }]}
        >
          <Feather name="arrow-left" size={22} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Details</Text>
      </View>

      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
            shadowColor: theme.text,
          },
        ]}
      >
        <Text style={[styles.label, { color: theme.primary }]}>Title</Text>
        <Text style={[styles.value, { color: theme.text }]}>{name}</Text>

        <Text style={[styles.label, { color: theme.primary }]}>
          Username / Email
        </Text>
        <Text style={[styles.value, { color: theme.text }]}>{username}</Text>

        <Text style={[styles.label, { color: theme.primary }]}>Password</Text>
        <View style={styles.row}>
          <Text style={[styles.value, { flex: 1, color: theme.text }]}>
            {showPassword
              ? password
              : "\u2022".repeat(Math.max(8, password.length))}
          </Text>
          <Pressable
            onPress={() => setShowPassword((s) => !s)}
            style={[styles.iconButton, { backgroundColor: theme.card }]}
          >
            <Feather
              name={showPassword ? "eye" : "eye-off"}
              size={20}
              color={theme.primary}
            />
          </Pressable>
          <Pressable
            onPress={() => copyToClipboard(password)}
            style={[
              styles.iconButton,
              { marginLeft: 8, backgroundColor: theme.card },
            ]}
          >
            <MaterialIcons
              name="file-download"
              size={20}
              color={theme.primary}
            />
          </Pressable>
        </View>

        <Text style={[styles.label, { color: theme.primary }]}>Website</Text>
        <Pressable onPress={() => openWebsite(website)}>
          <Text style={[styles.value, styles.link, { color: theme.primary }]}>
            {website || "N/A"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    marginTop: 40,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    marginRight: 40,
  },
  card: {
    margin: 16,
    padding: 18,
    borderRadius: 12,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  label: { fontSize: 14, fontWeight: "700", marginTop: 12 },
  value: { fontSize: 16, marginTop: 6 },
  row: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  iconButton: { padding: 6, borderRadius: 6 },
  link: { textDecorationLine: "underline" },
});
