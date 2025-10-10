import React, { useState } from 'react';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useToast } from '../contexts/ToastContext';
import Title from '../components/ui/Title';
import { Input, InputPassword } from '../components/ui/Input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { checkEmailBreach, validateRequiredFields } from '../utils/vaultUtils';
import { usePasswordGenerator } from '../hooks/usePasswordGenerator';

/**
 * CreateVaultCard Screen
 * Allows users to create a new password vault entry
 * Features:
 * - Form validation for required fields
 * - Random password generation (manual or shake to generate)
 * - Email breach checking
 * - Favorite marking
 * - Keyboard handling to prevent content obscuring
 */
export default function CreateVaultCard(props: any) {
  const { navigation } = props;
  const theme = useTheme();
  const { showToast } = useToast();

  // Form state for all input fields
  const [name, setName] = useState(''); // Entry title/name
  const [username, setUsername] = useState(''); // Username or email
  const [password, setPassword] = useState(''); // Password
  const [website, setWebsite] = useState(''); // Website URL (optional)
  const [favorite, setFavorite] = useState(false); // Is this a favorite entry?

  // Hook for password generation (supports shake to generate)
  const { generatePassword } = usePasswordGenerator(setPassword);

  /**
   * Saves the vault entry to AsyncStorage
   * Validates required fields before saving
   * Shows success/error toast based on result
   */
  async function saveEntry() {
    // Validate that required fields are filled
    if (!validateRequiredFields(name, username, password)) {
      return;
    }

    try {
      // Load existing entries from storage
      const existing = await AsyncStorage.getItem('vault_entries');
      const arr = existing ? JSON.parse(existing) : [];

      // Create new entry object with unique ID
      const newEntry = {
        id: Date.now().toString(), // Use timestamp as unique ID
        name,
        username,
        password,
        website,
        favorite,
      };

      // Add new entry to array and save
      arr.push(newEntry);
      await AsyncStorage.setItem('vault_entries', JSON.stringify(arr));

      // Show success message and reset form
      showToast('Vault entry saved successfully', 'success');
      setName('');
      setUsername('');
      setPassword('');
      setWebsite('');

      // Navigate back to vault screen
      navigation.navigate('Vault');
    } catch (e) {
      console.error('Error saving entry', e);
      showToast('Could not save entry', 'error');
    }
  }

  return (
    // KeyboardAvoidingView prevents keyboard from covering inputs
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Different behavior per platform
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 80}
    >
      {/* TouchableWithoutFeedback allows tapping outside inputs to dismiss keyboard */}
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: 50,
            paddingBottom: 100,
            backgroundColor: theme.background,
          }}
          keyboardShouldPersistTaps="handled" // Allow tapping buttons while keyboard is open
          testID="create-vault-scroll"
        >
          <View style={{ flex: 1 }}>
            {/* Header with back button and title */}
            <View style={{ position: 'relative', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ position: 'absolute', left: 10, top: 0, zIndex: 10 }}
                testID="create-vault-back-button"
                accessibilityLabel="Go back"
                accessibilityRole="button"
              >
                <Ionicons name="arrow-back" size={34} color={theme.text} />
              </TouchableOpacity>
              <Title title="Create Login" />
            </View>

            {/* Form inputs */}
            <View>
              <Input
                placeHolderText="Title*"
                value={name}
                onChangeText={setName}
                testID="create-vault-name-input"
              />
              <Input
                placeHolderText="Username or Email*"
                value={username}
                onChangeText={setUsername}
                testID="create-vault-username-input"
              />
              <Pressable
                onPress={() => checkEmailBreach(username)}
                style={{
                  alignItems: 'flex-end',
                  paddingRight: 20,
                  marginBottom: 10,
                }}
                testID="create-vault-check-breach-button"
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
                testID="create-vault-password-input"
              />
              <Pressable
                onPress={generatePassword}
                style={{
                  alignItems: 'flex-end',
                  paddingRight: 20,
                  marginBottom: 10,
                }}
                testID="create-vault-generate-password-button"
                accessibilityLabel="Generate random password"
                accessibilityRole="button"
              >
                <Text style={{ color: theme.primary, fontWeight: '600' }}>Generate Password</Text>
              </Pressable>
              <Input
                placeHolderText="Website"
                value={website}
                onChangeText={setWebsite}
                testID="create-vault-website-input"
              />
              <Text
                style={{
                  marginLeft: 20,
                  marginTop: 10,
                  color: theme.text,
                  opacity: 0.7,
                }}
              >
                With out http:// or https://
              </Text>
              <Pressable
                onPress={() => setFavorite(!favorite)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 20,
                }}
                testID="create-vault-favorite-toggle"
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
                  { ...styles.createButton, backgroundColor: theme.primary },
                  pressed && styles.createButtonPressed,
                ]}
                testID="create-vault-save-button"
                accessibilityLabel="Create vault entry"
                accessibilityRole="button"
              >
                <Text style={{ ...styles.createButtonText, color: theme.card }}>Create</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  createButton: {
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
  createButtonPressed: {
    transform: [{ scale: 0.995 }],
  },
  createButtonText: {
    fontWeight: '700',
    fontSize: 16,
  },
});
