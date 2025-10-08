import React from "react";
import { ScrollView, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import Title from "../components/ui/Title";
import { VaultCard } from "../components/VaultCard";
import CreateVaultCardButton from "../components/CreateVaultCardButton";
import { useVaultEntries, Entry } from "../hooks/AsyncStorage";

export default function Vault(props: any) {
  const { navigation } = props;
  const entries = useVaultEntries();
  const theme = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
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
        {entries.map((entry: Entry) => (
          <VaultCard
            key={entry.id}
            title={entry.name}
            user={entry.username}
            logo={require("../assets/icon.png")}
            onPress={() =>
              navigation.navigate("VaultCardDetails", { entryId: entry.id })
            }
          />
        ))}
      </ScrollView>
      <CreateVaultCardButton
        onPress={() => navigation.navigate("CreateVault")}
      ></CreateVaultCardButton>
    </View>
  );
}
