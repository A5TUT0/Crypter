import {
  View,
  Alert,
  Pressable,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Title from "../components/ui/Title";
import { Input, InputPassword } from "../components/ui/Input";
import { useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function CreateVaultCard(props: any) {
  const { navigation } = props;

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [website, setWebsite] = useState("");

  async function saveEntry() {
    try {
      const existing = await AsyncStorage.getItem("vault_entries");
      const arr = existing ? JSON.parse(existing) : [];
      const newEntry = {
        id: Date.now().toString(),
        name,
        username,
        password,
        website,
      };
      arr.push(newEntry);
      await AsyncStorage.setItem("vault_entries", JSON.stringify(arr));
      Alert.alert("Saved", "Vault entry saved successfully");
      setName("");
      setUsername("");
      setPassword("");
      setWebsite("");
      navigation.navigate("Vault");
    } catch (e) {
      console.error("Error saving entry", e);
      Alert.alert("Error", "Could not save entry");
    }
  }

  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ position: "absolute", top: 10, left: 10, zIndex: 10 }}
      >
        <Ionicons name="arrow-back" size={34} color="black" />
      </TouchableOpacity>
      <Title title="Create Login" />
      <View>
        <Input placeHolderText="Title" value={name} onChangeText={setName} />
        <Input
          placeHolderText="Username or Email"
          value={username}
          onChangeText={setUsername}
        />
        <InputPassword value={password} onChangeText={setPassword} />
        <Input
          placeHolderText="Website"
          value={website}
          onChangeText={setWebsite}
        />
      </View>
      <View style={{ padding: 20 }}>
        <Pressable
          onPress={saveEntry}
          style={({ pressed }) => [
            styles.createButton,
            pressed && styles.createButtonPressed,
          ]}
        >
          <Text style={styles.createButtonText}>Create</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  createButton: {
    backgroundColor: "#e1a17b",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  createButtonPressed: {
    backgroundColor: "#a1745a",
    transform: [{ scale: 0.995 }],
  },
  createButtonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
  },
});
