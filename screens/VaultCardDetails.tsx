import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Alert, Pressable } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { useTheme } from '../contexts/ThemeContext';
import { useToast } from '../contexts/ToastContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

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
  const { showToast } = useToast();

  useEffect(() => {
    const load = async () => {
      try {
        const raw = await AsyncStorage.getItem('vault_entries');
        if (raw) {
          const parsed = JSON.parse(raw) as Entry[];
          setEntries(parsed);
        } else {
          setEntries([]);
        }
      } catch (e) {
        console.error('Failed to load vault entries', e);
        setEntries([]);
      }
    };
    load();
  }, []);
  const entry = entries.find((e) => e.id === route.params.entryId);
  // Defensive: if entry not found, show fallback values
  const name = entry ? entry.name : 'N/A';
  const username = entry ? entry.username : 'N/A';
  const password = entry ? entry.password : '';
  const website = entry ? entry.website : '';

  function openWebsite(url?: string) {
    if (!url) return;
    const link = url.startsWith('http') ? url : `https://${url}`;
    Linking.canOpenURL(link)
      .then((supported) => {
        if (supported) Linking.openURL(link);
        else showToast('Cannot open URL', 'error');
      })
      .catch(() => showToast('Cannot open URL', 'error'));
  }

  async function copyToClipboard(text: string) {
    try {
      await Clipboard.setStringAsync(text);
      showToast('Password copied to clipboard', 'success');
    } catch (e: any) {
      showToast(e?.message ?? 'Cannot access clipboard', 'error');
    }
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme.background }]}
      testID="vault-details-container"
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation?.goBack()}
          style={[styles.backButton, { backgroundColor: theme.card }]}
          testID="vault-details-back-button"
          accessibilityLabel="Go back"
          accessibilityRole="button"
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
        testID="vault-details-card"
      >
        <Text style={[styles.label, { color: theme.primary }]}>Title</Text>
        <Text style={[styles.value, { color: theme.text }]} testID="vault-details-title-text">
          {name}
        </Text>
        <Text style={[styles.label, { color: theme.primary }]}>Username / Email</Text>
        <Text style={[styles.value, { color: theme.text }]} testID="vault-details-username-text">
          {username}
        </Text>
        <Text style={[styles.label, { color: theme.primary }]}>Password</Text>
        <View style={styles.row}>
          <Text
            style={[styles.value, { flex: 1, color: theme.text }]}
            testID="vault-details-password-text"
          >
            {showPassword ? password : '\u2022'.repeat(Math.max(8, password.length))}
          </Text>
          <Pressable
            onPress={() => setShowPassword((s) => !s)}
            style={[styles.iconButton, { backgroundColor: theme.card }]}
            testID="vault-details-toggle-password-button"
            accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
            accessibilityRole="button"
          >
            <Feather name={showPassword ? 'eye' : 'eye-off'} size={20} color={theme.primary} />
          </Pressable>
          <Pressable
            onPress={() => copyToClipboard(password)}
            style={[styles.iconButton, { marginLeft: 8, backgroundColor: theme.card }]}
            testID="vault-details-copy-password-button"
            accessibilityLabel="Copy password to clipboard"
            accessibilityRole="button"
          >
            <Feather name="copy" size={24} color={theme.primary} />
          </Pressable>
        </View>
        <Text style={[styles.label, { color: theme.primary }]}>Website</Text>
        <Pressable
          onPress={() => openWebsite(website)}
          testID="vault-details-website-link"
          accessibilityLabel={`Open website ${website || 'N/A'}`}
          accessibilityRole="link"
        >
          <Text style={[styles.value, styles.link, { color: theme.primary }]}>
            {website || 'N/A'}
          </Text>
        </Pressable>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginBottom: 5,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation?.navigate('EditVaultCard', { entryId: entry?.id })}
            style={[styles.editButton, { backgroundColor: theme.primary }]}
            testID="vault-details-edit-button"
            accessibilityLabel="Edit entry"
            accessibilityRole="button"
          >
            <MaterialIcons name="edit" size={20} color={theme.background} />
            <Text
              style={{
                color: theme.background,
                fontWeight: '600',
                marginLeft: 6,
              }}
            >
              Edit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                'Delete Entry',
                'Are you sure you want to delete this entry? This action cannot be undone.',
                [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                      if (!entry) return;
                      const filtered = entries.filter((e) => e.id !== entry.id);
                      try {
                        await AsyncStorage.setItem('vault_entries', JSON.stringify(filtered));
                        setEntries(filtered);
                        navigation?.navigate('Vault');
                        showToast('Entry deleted successfully', 'success');
                      } catch {
                        showToast('Could not delete entry', 'error');
                      }
                    },
                  },
                ],
              )
            }
            style={[styles.editButton, { backgroundColor: theme.error, marginLeft: 10 }]}
            testID="vault-details-delete-button"
            accessibilityLabel="Delete entry"
            accessibilityRole="button"
          >
            <MaterialIcons name="delete" size={20} color={theme.background} />
            <Text
              style={{
                color: theme.background,
                fontWeight: '600',
                marginLeft: 6,
              }}
            >
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    marginTop: 40,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
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
  label: { fontSize: 14, fontWeight: '700', marginTop: 12 },
  value: { fontSize: 16, marginTop: 6 },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  iconButton: { padding: 6, borderRadius: 6 },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  link: { textDecorationLine: 'underline' },
});
