import { Pressable, Image, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useTheme } from "../contexts/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

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
    <View>
      {isCompactList ? null : <View style={{ height: 10 }} />}

      <Pressable
        onPress={onPress}
        style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
        hitSlop={8}
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
