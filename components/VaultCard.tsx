import { Pressable, Image, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useTheme } from "../contexts/ThemeContext";

export function VaultCard({
  id,
  title,
  user,
  logo,
  onPress,
}: {
  id?: string;
  title: string;
  user: string;
  logo: any;
  onPress?: () => void;
}) {
  const theme = useTheme();
  return (
    <View>
      <Pressable
        onPressIn={() => {
          onPress && onPress();
        }}
        style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 20,
            margin: 10,
            borderRadius: 10,
            backgroundColor: theme.card,
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 15,
              overflow: "hidden",
              backgroundColor: theme.background,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image source={logo} style={{ width: 50, height: 50 }} />
          </View>
          <View style={{ flex: 1, marginLeft: 20 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: theme.text,
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: theme.text,
                opacity: 0.7,
              }}
            >
              {user}
            </Text>
          </View>
          <FontAwesome name="chevron-right" size={14} color={theme.text} />
        </View>
      </Pressable>
    </View>
  );
}
