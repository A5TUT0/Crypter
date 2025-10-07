import { View } from "react-native";
import Vault from "./screens/Vault";
import CreateVaultCard from "./screens/CreateVaultCard";
import NavBar from "./components/NavBar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import Details from "./screens/VaultCardDetails";
import { Favorites } from "./screens/Favorites";
import Settings from "./screens/Settings";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Vault" component={Vault} />
          <Stack.Screen name="CreateVault" component={CreateVaultCard} />
          <Stack.Screen name="VaultCardDetails" component={Details} />
          <Stack.Screen name="Favorites" component={Favorites} />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 15,
            justifyContent: "flex-end",
          }}
        >
          <NavBar />
        </View>
      </SafeAreaView>
    </NavigationContainer>
  );
}
