import React, { useState } from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import Title from "../components/ui/Title";
import { useVaultEntries, Entry } from "../hooks/AsyncStorage";
import { VaultCard } from "../components/VaultCard";
import { useTheme } from "../contexts/ThemeContext";
import SearchBar from "../components/SearchBar";

export function Favorites(props: any) {
  const entries = useVaultEntries();
  const { navigation } = props;
  const theme = useTheme();

  const [searchQuery, setSearchQuery] = useState("");

  const favorites = entries.filter(
    (e: Entry) =>
      e.favorite && e.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.titleWrap}>
        <Title title="Favorites" />
      </View>
      <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
        <SearchBar onChangeText={setSearchQuery} value={searchQuery} />
      </View>
      <ScrollView>
        {favorites.length === 0 ? (
          <View style={styles.empty}>
            <Text style={[styles.emptyText, { color: theme.text }]}>
              No favorites yet
            </Text>
          </View>
        ) : (
          favorites.map((entry: Entry) => (
            <View key={entry.id}>
              <VaultCard
                title={entry.name}
                user={entry.username}
                website={entry.website}
                onPress={() =>
                  navigation.navigate("VaultCardDetails", { entryId: entry.id })
                }
              />
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40 },
  titleWrap: { alignItems: "center", marginBottom: 8 },
  empty: { marginTop: 40, alignItems: "center" },
  emptyText: { fontSize: 16 },
});
