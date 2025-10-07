import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import Title from "../components/ui/Title";
import { VaultCard } from "../components/VaultCard";
import CreateVaultCardButton from "../components/CreateVaultCardButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Vault(props: any) {
  const { navigation } = props;
  const [entries, setEntries] = useState<string[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const raw = await AsyncStorage.getItem("vault_entries");
        if (raw) {
          const parsed = JSON.parse(raw) as string[];
          setEntries(parsed);
        } else {
          setEntries([]);
        }
      } catch (e) {
        console.error("Failed to load vault entries", e);
        setEntries([]);
      }
    };
    load();
  }, []);

  for (let i = 0; i < entries.length; i++) {
    const element = entries[i];
    console.log(element);
  }
  return (
    <View>
      <View
        style={{
          marginTop: 50,
          marginBottom: 20,
          justifyContent: "flex-start",
        }}
      >
        <Title title="Vault"></Title>
      </View>
      <ScrollView style={{ height: "80%" }}>
        {entries.map((entry: any) => (
          <VaultCard
            key={entry.id}
            title={entry.name}
            user={entry.username}
            logo={require("../assets/icon.png")}
          />
        ))}
      </ScrollView>
      <CreateVaultCardButton
        onPress={() => navigation.navigate("CreateVault")}
      ></CreateVaultCardButton>
    </View>
  );
}
