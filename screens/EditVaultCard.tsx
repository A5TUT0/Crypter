import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import Title from '../components/ui/Title';
import { Input, InputPassword } from '../components/ui/Input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useVaultEntries, Entry } from '../hooks/AsyncStorage';
import FaviconImage from '../components/FaviconImage';
import { checkEmailBreach, validateRequiredFields } from '../utils/vaultUtils';
import { usePasswordGenerator } from '../hooks/usePasswordGenerator';

export function EditVaultCard(props: any) {
  const { entryId } = props.route.params;
  const { navigation } = props;
  const entries = useVaultEntries();
  const entry = entries.find((e: Entry) => e.id === entryId);
  const theme = useTheme();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [website, setWebsite] = useState('');
  const [favorite, setFavorite] = useState(false);

  const { generatePassword } = usePasswordGenerator(setPassword);

  useEffect(() => {
    if (entry) {
      setName(entry.name || '');
      setUsername(entry.username || '');
      setPassword(entry.password || '');
      setWebsite(entry.website || '');
      setFavorite(entry.favorite || false);
    }
  }, [entry]);

  async function saveEntry() {
    if (!validateRequiredFields(name, username, password)) {
      return;
    }
    try {
      const existing = await AsyncStorage.getItem('vault_entries');
      const arr = existing ? JSON.parse(existing) : [];
      const updatedEntry = {
        id: entryId,
        name,
        username,
        password,
        website,
        favorite,
      };
      const index = arr.findIndex((e: Entry) => e.id === entryId);
      if (index !== -1) {
        arr[index] = updatedEntry;
        await AsyncStorage.setItem('vault_entries', JSON.stringify(arr));
        Alert.alert('Saved', 'Vault entry updated successfully');
        navigation.navigate('Vault');
      } else {
        Alert.alert('Error', 'Entry not found');
      }
    } catch (e) {
      console.error('Error saving entry', e);
      Alert.alert('Error', 'Could not save entry');
    }
  }

  if (!entry) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.background,
        }}
      >
        <Text style={{ color: theme.text, fontSize: 16 }}>Entry not found</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 80}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: 50,
            paddingBottom: 100,
            backgroundColor: theme.background,
          }}
          keyboardShouldPersistTaps="handled"
          testID="edit-vault-scroll"
        >
          <View style={{ flex: 1 }}>
            <View style={{ position: 'relative', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ position: 'absolute', left: 10, top: 0, zIndex: 10 }}
                testID="edit-vault-back-button"
                accessibilityLabel="Go back"
                accessibilityRole="button"
              >
                <Ionicons name="arrow-back" size={34} color={theme.text} />
              </TouchableOpacity>
              <Title title="Edit Login" />
            </View>

            {/* Preview del favicon actual */}
            {website && (
              <View
                style={{ alignItems: 'center', marginVertical: 20 }}
                testID="edit-vault-favicon-preview"
              >
                <FaviconImage domain={website} size={80} borderRadius={20} />
                <Text
                  style={{
                    color: theme.text,
                    opacity: 0.6,
                    marginTop: 8,
                    fontSize: 12,
                  }}
                >
                  Current favicon
                </Text>
              </View>
            )}

            <View>
              <Input
                placeHolderText="Title*"
                value={name}
                onChangeText={setName}
                testID="edit-vault-name-input"
              />
              <Input
                placeHolderText="Username or Email*"
                value={username}
                onChangeText={setUsername}
                testID="edit-vault-username-input"
              />
              <Pressable
                onPress={() => checkEmailBreach(username)}
                style={{
                  alignItems: 'flex-end',
                  paddingRight: 20,
                  marginBottom: 10,
                }}
                testID="edit-vault-check-breach-button"
                accessibilityLabel="Check if email is pwned"
                accessibilityRole="button"
              >
                <Text style={{ color: theme.primary, fontWeight: '600' }}>
                  Check if email is pwned
                </Text>
              </Pressable>
              <InputPassword
                value={password}
                onChangeText={setPassword}
                placeHolderText="Password*"
                testID="edit-vault-password-input"
              />
              <Pressable
                onPress={generatePassword}
                style={{
                  alignItems: 'flex-end',
                  paddingRight: 20,
                  marginBottom: 10,
                }}
                testID="edit-vault-generate-password-button"
                accessibilityLabel="Generate random password"
                accessibilityRole="button"
              >
                <Text style={{ color: theme.primary, fontWeight: '600' }}>Generate Password</Text>
              </Pressable>
              <Input
                placeHolderText="Website"
                value={website}
                onChangeText={setWebsite}
                testID="edit-vault-website-input"
              />
              <Text
                style={{
                  marginLeft: 20,
                  marginTop: 10,
                  color: theme.text,
                  opacity: 0.7,
                }}
              >
                Without http:// or https://
              </Text>
              <Pressable
                onPress={() => setFavorite(!favorite)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 20,
                }}
                testID="edit-vault-favorite-toggle"
                accessibilityLabel={favorite ? 'Unmark as favorite' : 'Mark as favorite'}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: favorite }}
              >
                <Ionicons
                  name={favorite ? 'star' : 'star-outline'}
                  size={24}
                  color={favorite ? theme.primary : theme.text}
                />
                <Text style={{ marginLeft: 10, fontSize: 16, color: theme.text }}>
                  {favorite ? 'Unmark Favorite' : 'Mark as Favorite'}
                </Text>
              </Pressable>
            </View>
            <View style={{ padding: 20 }}>
              <Pressable
                onPress={saveEntry}
                style={({ pressed }) => [
                  { ...styles.saveButton, backgroundColor: theme.primary },
                  pressed && styles.saveButtonPressed,
                ]}
                testID="edit-vault-save-button"
                accessibilityLabel="Save changes"
                accessibilityRole="button"
              >
                <Text style={{ ...styles.saveButtonText, color: theme.card }}>Save Changes</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  saveButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  saveButtonPressed: {
    transform: [{ scale: 0.995 }],
  },
  saveButtonText: {
    fontWeight: '700',
    fontSize: 16,
  },
});
