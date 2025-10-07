import { Pressable, TextInput, View, StyleSheet, Text } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";

export function Input({
  placeHolderText,
  value,
  onChangeText,
}: {
  placeHolderText: string;
  value?: string;
  onChangeText?: (text: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={styles.rowWrapper}>
      <Text style={styles.label}>{placeHolderText}</Text>
      <View
        style={[styles.underlineWrapper, focused && styles.underlineFocused]}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={styles.textInputInline}
          placeholder={value ? undefined : ""}
          placeholderTextColor="#9b9b9b"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </View>
    </View>
  );
}
export function InputPassword({
  value,
  onChangeText,
}: {
  value?: string;
  onChangeText?: (text: string) => void;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [focused, setFocused] = useState(false);
  function toggleVisibility() {
    setIsVisible((v) => !v);
  }
  return (
    <View style={styles.rowWrapper}>
      <Text style={styles.label}>Password</Text>
      <View
        style={[styles.underlineWrapper, focused && styles.underlineFocused]}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={[styles.textInputInline, { paddingRight: 48 }]}
          placeholder={value ? undefined : ""}
          placeholderTextColor="#9b9b9b"
          secureTextEntry={!isVisible}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <Pressable
          onPress={toggleVisibility}
          style={styles.eyeButton}
          hitSlop={8}
        >
          {isVisible ? (
            <AntDesign name="eye" size={18} color="#a1745a" />
          ) : (
            <AntDesign name="eye-invisible" size={18} color="#666" />
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
    color: "#e1a17b",
    fontSize: 13,
    marginBottom: 6,
    marginLeft: 4,
    fontWeight: "600",
  },
  underlineWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "#ececec",
    paddingBottom: 10,
    position: "relative",
  },
  underlineFocused: {
    borderBottomColor: "#e1a17b",
  },
  textInputInline: {
    height: 56,
    paddingHorizontal: 2,
    fontSize: 16,
    color: "#111",
  },
  eyeButton: {
    position: "absolute",
    right: 0,
    top: "50%",
    transform: [{ translateY: -9 }],
    padding: 6,
  },
});
