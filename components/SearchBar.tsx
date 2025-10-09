import { TextInput, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

export default function SearchBar({
  onChangeText,
  value,
}: {
  onChangeText: (text: string) => void;
  value: string;
}) {
  const theme = useTheme();
  return (
    <View
      style={{
        padding: 10,
        backgroundColor: theme.card,
        borderRadius: 8,
        margin: 10,
      }}
      testID="search-bar-container"
    >
      <TextInput
        placeholder="Search vaults..."
        placeholderTextColor={theme.text + "99"}
        style={{ color: theme.text, fontSize: 16 }}
        onChangeText={onChangeText}
        value={value}
        autoCorrect={false}
        autoCapitalize="none"
        testID="search-bar-input"
        accessibilityLabel="Search vaults"
        accessibilityHint="Enter text to search for vault entries"
      />
    </View>
  );
}
