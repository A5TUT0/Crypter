import { GestureResponderEvent, Pressable, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useTheme } from "../contexts/ThemeContext";

export default function CreateVaultCardButton({
  onPress,
}: {
  onPress?: (event: GestureResponderEvent) => void;
}) {
  const theme = useTheme();
  return (
    <View style={{ marginBottom: 10 }}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? theme.primary : theme.primary,
            borderRadius: 50,
            padding: 15,
            position: "absolute",
            bottom: 80,
            right: 20,
            shadowColor: theme.text,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
            elevation: 5,
          },
        ]}
        testID="create-vault-fab-button"
        accessibilityLabel="Create new vault entry"
        accessibilityRole="button"
        accessibilityHint="Opens form to create a new vault entry"
      >
        <AntDesign name="plus" size={24} color={theme.card} />
      </Pressable>
    </View>
  );
}
