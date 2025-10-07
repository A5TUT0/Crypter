import { ScrollView, View } from "react-native";
import Title from "../components/ui/Title";
import { VaultCard } from "../components/VaultCard";

export default function Vault() {
    return (
        <View>
            <View style={{
                marginTop: 50,
                marginBottom: 20,
                justifyContent: 'flex-start'
            }}>
                <Title title="Vault"></Title>
            </View>
            <ScrollView style={{ height: '80%' }}>
                <VaultCard title="GitHub" user="test@test.com" logo={require('../assets/github.webp')}></VaultCard>
                <VaultCard title="Instagram" user="123@test.com" logo={require('../assets/github.webp')}></VaultCard>
                <VaultCard title="IDK" user="asd@test.com" logo={require('../assets/github.webp')}></VaultCard>
                <VaultCard title="Spotify" user="123123asd@test.com" logo={require('../assets/github.webp')}></VaultCard>
                <VaultCard title="Spotify" user="123123asd@test.com" logo={require('../assets/github.webp')}></VaultCard>
                <VaultCard title="Spotify" user="123123asd@test.com" logo={require('../assets/github.webp')}></VaultCard>
                <VaultCard title="Spotify" user="123123asd@test.com" logo={require('../assets/github.webp')}></VaultCard>
                <VaultCard title="Spotify" user="123123asd@test.com" logo={require('../assets/github.webp')}></VaultCard>
            </ScrollView>
        </View>
    )
}