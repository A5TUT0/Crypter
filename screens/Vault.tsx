import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import Title from '../components/ui/Title';
import { VaultCard } from '../components/VaultCard';
import CreateVaultCardButton from '../components/CreateVaultCardButton';
import { useVaultEntries, Entry } from '../hooks/AsyncStorage';
import SearchBar from '../components/SearchBar';
export default function Vault(props: any) {
  const { navigation } = props;
  const entries = useVaultEntries();
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }} testID="vault-screen">
      <View
        style={{
          marginTop: 50,
          marginBottom: 20,
          justifyContent: 'flex-start',
        }}
      >
        <Title title="Vault"></Title>
        <SearchBar onChangeText={setSearchQuery} value={searchQuery} />
      </View>
      <ScrollView style={{ height: '80%', marginBottom: 100 }} testID="vault-scroll-view">
        {entries.filter((entry: Entry) =>
          entry.name.toLowerCase().includes(searchQuery.toLowerCase()),
        ).length === 0 ? (
          <View style={{ alignItems: 'center', marginTop: 20 }} testID="vault-empty-state">
            <Text style={{ color: theme.text, fontSize: 16 }}>No vaults found</Text>
          </View>
        ) : (
          entries
            .filter((entry: Entry) => entry.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((entry: Entry) => (
              <VaultCard
                key={entry.id}
                id={entry.id}
                title={entry.name}
                user={entry.username}
                website={entry.website}
                onPress={() => navigation.navigate('VaultCardDetails', { entryId: entry.id })}
              />
            ))
        )}
      </ScrollView>
      <CreateVaultCardButton
        onPress={() => navigation.navigate('CreateVault')}
      ></CreateVaultCardButton>
    </View>
  );
}
