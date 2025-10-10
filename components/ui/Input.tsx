import React, { useState } from 'react';
import { Pressable, TextInput, View, StyleSheet, Text } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTheme } from '../../contexts/ThemeContext';

/**
 * Input Component
 * A styled text input field with label and underline animation
 * Used for standard text input fields throughout the app
 */
export function Input({
  placeHolderText,
  value,
  onChangeText,
  testID,
}: {
  placeHolderText: string; // Label text displayed above the input
  value?: string; // Current input value
  onChangeText?: (text: string) => void; // Callback when text changes
  testID?: string; // Test identifier for automated testing
}) {
  const [focused, setFocused] = useState(false); // Track if input is focused
  const theme = useTheme();

  return (
    <View style={styles.rowWrapper} testID={testID}>
      {/* Label text above input */}
      <Text style={[styles.label, { color: theme.primary }]}>{placeHolderText}</Text>

      {/* Input container with animated underline */}
      <View
        style={[
          styles.underlineWrapper,
          { borderBottomColor: focused ? theme.primary : theme.border }, // Change color when focused
        ]}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={[styles.textInputInline, { color: theme.text }]}
          placeholder={value ? undefined : ''} // Hide placeholder when value exists
          placeholderTextColor={theme.text + '99'} // Semi-transparent placeholder
          onFocus={() => setFocused(true)} // Set focused state
          onBlur={() => setFocused(false)} // Clear focused state
          testID={testID ? `${testID}-input` : undefined}
          accessibilityLabel={placeHolderText}
          accessibilityHint={`Enter ${placeHolderText.toLowerCase()}`}
        />
      </View>
    </View>
  );
}

/**
 * InputPassword Component
 * A password input field with show/hide toggle button
 * Masks password text by default, with option to reveal
 */
export function InputPassword({
  value,
  onChangeText,
  placeHolderText,
  testID,
}: {
  value?: string; // Current password value
  onChangeText?: (text: string) => void; // Callback when password changes
  placeHolderText: string; // Label text displayed above the input
  testID?: string; // Test identifier for automated testing
}) {
  const [isVisible, setIsVisible] = useState(false); // Track password visibility
  const [focused, setFocused] = useState(false); // Track if input is focused
  const theme = useTheme();

  /**
   * Toggle password visibility (show/hide)
   */
  function toggleVisibility() {
    setIsVisible((v) => !v);
  }

  return (
    <View style={styles.rowWrapper} testID={testID}>
      {/* Label text above input */}
      <Text style={[styles.label, { color: theme.primary }]}>{placeHolderText}</Text>

      {/* Input container with animated underline */}
      <View
        style={[
          styles.underlineWrapper,
          { borderBottomColor: focused ? theme.primary : theme.border }, // Change color when focused
        ]}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={[styles.textInputInline, { paddingRight: 48, color: theme.text }]} // Extra padding for eye icon
          placeholder={value ? undefined : ''} // Hide placeholder when value exists
          placeholderTextColor={theme.text + '99'} // Semi-transparent placeholder
          secureTextEntry={!isVisible} // Hide password if not visible
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          testID={testID ? `${testID}-input` : undefined}
          accessibilityLabel={placeHolderText}
          accessibilityHint="Enter password"
        />
        {/* Toggle button to show/hide password */}
        <Pressable
          onPress={toggleVisibility}
          style={styles.eyeButton}
          hitSlop={8}
          testID={testID ? `${testID}-toggle-visibility` : undefined}
          accessibilityLabel={isVisible ? 'Hide password' : 'Show password'}
          accessibilityRole="button"
        >
          {/* Eye icon changes based on visibility state */}
          {isVisible ? (
            <AntDesign name="eye" size={18} color={theme.primary} />
          ) : (
            <AntDesign name="eye-invisible" size={18} color={theme.text} />
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowWrapper: {
    marginHorizontal: 12,
    marginVertical: 8,
  },
  label: {
    fontSize: 13,
    marginBottom: 6,
    marginLeft: 4,
    fontWeight: '600',
  },
  underlineWrapper: {
    borderBottomWidth: 1,
    paddingBottom: 10,
    position: 'relative',
  },
  textInputInline: {
    height: 56,
    paddingHorizontal: 2,
    fontSize: 16,
  },
  eyeButton: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: [{ translateY: -9 }],
    padding: 6,
  },
});
