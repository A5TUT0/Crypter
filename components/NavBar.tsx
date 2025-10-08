import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import Fontisto from "@expo/vector-icons/Fontisto";
export default function NavBar() {
  const navigation: any = useNavigation();
  const [selected, setSelected] = useState<string>("Vault");
  const theme = useTheme();
  const activeColor = theme.primary;
  const inactiveColor = theme.text;

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: theme.border,
        backgroundColor: theme.card,
        position: "absolute",
        bottom: 0,
        width: "100%",
      }}
    >
      <Pressable
        onPress={() => {
          setSelected("Vault");
          navigation.navigate("Vault");
        }}
      >
        <Entypo
          name="lock"
          size={34}
          color={selected === "Vault" ? activeColor : inactiveColor}
        />
        <Text
          style={{
            fontSize: 10,
            textAlign: "center",
            color: selected === "Vault" ? activeColor : inactiveColor,
          }}
        >
          Vaults
        </Text>
      </Pressable>

      <Pressable
        onPress={() => {
          setSelected("Favorites");
          navigation.navigate("Favorites");
        }}
      >
        <MaterialIcons
          name="stars"
          size={34}
          color={selected === "Favorites" ? activeColor : inactiveColor}
        />
        <Text
          style={{
            fontSize: 10,
            textAlign: "center",
            color: selected === "Favorites" ? activeColor : inactiveColor,
          }}
        >
          Favorites
        </Text>
      </Pressable>

      <Pressable
        onPress={() => {
          setSelected("Settings");
          navigation.navigate("Settings");
        }}
      >
        <Fontisto
          name="player-settings"
          size={34}
          color={selected === "Settings" ? activeColor : inactiveColor}
        />
        <Text
          style={{
            fontSize: 10,
            textAlign: "center",
            color: selected === "Settings" ? activeColor : inactiveColor,
          }}
        >
          Settings
        </Text>
      </Pressable>
    </View>
  );
}
