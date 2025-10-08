import { View, Text } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

export default function Title({ title }: { title: string }) {
  const theme = useTheme();
  return (
    <View>
      <Text
        style={{
          fontSize: 34,
          fontWeight: "bold",
          textAlign: "center",
          margin: 10,
          color: theme.text,
        }}
      >
        {title}
      </Text>
    </View>
  );
}
