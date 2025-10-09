import { Pressable, TextInput, View, StyleSheet, Text } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";

export function Input({
  placeHolderText,
  value,
  onChangeText,
  testID,
}: {
  placeHolderText: string;
  value?: string;
  onChangeText?: (text: string) => void;
  testID?: string;
}) {
  const [focused, setFocused] = useState(false);
  const theme = useTheme();
  return (
    <View style={styles.rowWrapper} testID={testID}>
      <Text style={[styles.label, { color: theme.primary }]}>
        {placeHolderText}
      </Text>
      <View
        style={[
          styles.underlineWrapper,
          { borderBottomColor: focused ? theme.primary : theme.border },
        ]}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={[styles.textInputInline, { color: theme.text }]}
          placeholder={value ? undefined : ""}
          placeholderTextColor={theme.text + "99"}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          testID={testID ? `${testID}-input` : undefined}
          accessibilityLabel={placeHolderText}
          accessibilityHint={`Enter ${placeHolderText.toLowerCase()}`}
        />
      </View>
    </View>
  );
}
export function InputPassword({
  value,
  onChangeText,
  placeHolderText,
  testID,
}: {
  value?: string;
  onChangeText?: (text: string) => void;
  placeHolderText: string;
  testID?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [focused, setFocused] = useState(false);
  const theme = useTheme();
  function toggleVisibility() {
    setIsVisible((v) => !v);
  }
  return (
    <View style={styles.rowWrapper} testID={testID}>
      <Text style={[styles.label, { color: theme.primary }]}>
        {placeHolderText}
      </Text>
      <View
        style={[
          styles.underlineWrapper,
          { borderBottomColor: focused ? theme.primary : theme.border },
        ]}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={[
            styles.textInputInline,
            { paddingRight: 48, color: theme.text },
          ]}
          placeholder={value ? undefined : ""}
          placeholderTextColor={theme.text + "99"}
          secureTextEntry={!isVisible}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          testID={testID ? `${testID}-input` : undefined}
          accessibilityLabel={placeHolderText}
          accessibilityHint="Enter password"
        />
        <Pressable
          onPress={toggleVisibility}
          style={styles.eyeButton}
          hitSlop={8}
          testID={testID ? `${testID}-toggle-visibility` : undefined}
          accessibilityLabel={isVisible ? "Hide password" : "Show password"}
          accessibilityRole="button"
        >
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
    fontWeight: "600",
  },
  underlineWrapper: {
    borderBottomWidth: 1,
    paddingBottom: 10,
    position: "relative",
  },
  textInputInline: {
    height: 56,
    paddingHorizontal: 2,
    fontSize: 16,
  },
  eyeButton: {
    position: "absolute",
    right: 0,
    top: "50%",
    transform: [{ translateY: -9 }],
    padding: 6,
  },
});
