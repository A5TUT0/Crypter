import { Pressable, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useTheme } from "../contexts/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import FaviconImage from "./FaviconImage";

export function VaultCard({
  id,
  title,
  user,
  website,
  onPress,
}: {
  id?: string;
  title: string;
  user: string;
  website?: string;
  onPress?: () => void;
}) {
  const [isCompactList, setIsCompactList] = useState(false);

  useEffect(() => {
    const fetchCompactListSetting = async () => {
      try {
        const compact = await AsyncStorage.getItem("settings_compactList");
        setIsCompactList(compact === "1");
      } catch {}
    };
    fetchCompactListSetting();
  }, []);

  const theme = useTheme();

  return (
    <View testID={`vault-card-${id || title}`}>
      {isCompactList ? null : <View style={{ height: 10 }} />}

      <Pressable
        onPress={onPress}
        style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
        hitSlop={8}
        testID={`vault-card-pressable-${id || title}`}
        accessibilityLabel={`${title}, ${user}`}
        accessibilityRole="button"
        accessibilityHint="Tap to view vault entry details"
      >
        {isCompactList ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 10,
              paddingHorizontal: 14,
              marginHorizontal: 10,
              marginVertical: 4,
              borderRadius: 8,
              backgroundColor: theme.card,
            }}
          >
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: theme.text,
                }}
              >
                {title}
              </Text>
              {!!user && (
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 13,
                    color: theme.text,
                    opacity: 0.7,
                    marginTop: 2,
                  }}
                >
                  {user}
                </Text>
              )}
            </View>

            <FontAwesome name="chevron-right" size={14} color={theme.text} />
          </View>
        ) : (
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
            <FaviconImage domain={website} size={50} borderRadius={15} />

            <View style={{ flex: 1, marginLeft: 20 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: theme.text,
                }}
                numberOfLines={1}
              >
                {title}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: theme.text,
                  opacity: 0.7,
                }}
                numberOfLines={1}
              >
                {user}
              </Text>
            </View>

            <FontAwesome name="chevron-right" size={14} color={theme.text} />
          </View>
        )}
      </Pressable>
    </View>
  );
}
