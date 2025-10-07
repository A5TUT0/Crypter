import { Pressable, Image, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export function VaultCard({
  key,
  title,
  user,
  logo,
}: {
  key: any;
  title: string;
  user: string;
  logo: any;
}) {
  return (
    <View id={key}>
      <Pressable
        onPressIn={() => {}}
        style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 20,
            margin: 10,
            borderRadius: 10,
            backgroundColor: "#fcfcfcff",
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 15,
              overflow: "hidden",
              backgroundColor: "#ffffffff",
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
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#666",
              }}
            >
              {user}
            </Text>
          </View>
          <FontAwesome name="chevron-right" size={14} color="black" />
        </View>
      </Pressable>
    </View>
  );
}
