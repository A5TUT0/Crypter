import {
  View,
  Alert,
  Pressable,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
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
  const [favorite, setFavorite] = useState(false);
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
        favorite,
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
  const fetchPassword = () => {
    return fetch("https://passwordwolf.com/api/?repeat=1")
      .then((response) => response.json())
      .then((json) => {
        return json[0].password;
      })
      .catch((error) => {
        console.error(error);
      });
  };
  function createRandomPassword() {
    fetchPassword().then((pwd) => {
      setPassword(pwd);
    });
  }
  function emailIsPawned(email: string) {
    if (!email || !email.includes("@")) {
      Alert.alert("Invalid email", "Please enter a valid email address");
      return;
    }
    fetch("https://api.xposedornot.com/v1/check-email/" + email)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.breaches && json.breaches.length > 0) {
          const breaches = json.breaches.map((b: any) => b).join(",  ");
          Alert.alert(
            "Warning",
            `This email has been found in data breaches:\n${breaches}\nConsider changing it.`
          );
        } else if (json.breaches && json.breaches.length === 0) {
          Alert.alert(
            "Good news",
            "This email has not been found in breaches."
          );
        } else if (json.Error) {
          Alert.alert(
            "Error",
            "Could not check the email. Please try again later."
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <ScrollView>
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
          <Pressable
            onPress={() => emailIsPawned(username)}
            style={{
              alignItems: "flex-end",
              paddingRight: 20,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "#e1a17b", fontWeight: "600" }}>
              Check if email is pwned
            </Text>
          </Pressable>
          <InputPassword value={password} onChangeText={setPassword} />
          <Pressable
            onPress={createRandomPassword}
            style={{
              alignItems: "flex-end",
              paddingRight: 20,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "#e1a17b", fontWeight: "600" }}>
              Generate Password
            </Text>
          </Pressable>
          <Input
            placeHolderText="Website"
            value={website}
            onChangeText={setWebsite}
          />
          <Text style={{ marginLeft: 20, marginTop: 10, color: "#666" }}>
            With out http:// or https://
          </Text>
          <Pressable
            onPress={() => setFavorite(!favorite)}
            style={{ flexDirection: "row", alignItems: "center", padding: 20 }}
          >
            <Ionicons
              name={favorite ? "star" : "star-outline"}
              size={24}
              color={favorite ? "#e1a17b" : "#666"}
            />
            <Text style={{ marginLeft: 10, fontSize: 16, color: "#333" }}>
              {favorite ? "Unmark Favorite" : "Mark as Favorite"}
            </Text>
          </Pressable>
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
    </ScrollView>
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
