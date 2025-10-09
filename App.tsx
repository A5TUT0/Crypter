import { View } from "react-native";
import { ThemeProvider } from "./contexts/ThemeContext";
import Vault from "./screens/Vault";
import CreateVaultCard from "./screens/CreateVaultCard";
import NavBar from "./components/NavBar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Details from "./screens/VaultCardDetails";
import { Favorites } from "./screens/Favorites";
import Settings from "./screens/Settings";
import { EditVaultCard } from "./screens/EditVaultCard";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <SafeAreaView style={{ flex: 1 }}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Favorites" component={Favorites} />
              <Stack.Screen name="Vault" component={Vault} />
              <Stack.Screen name="CreateVault" component={CreateVaultCard} />
              <Stack.Screen name="VaultCardDetails" component={Details} />
              <Stack.Screen name="Settings" component={Settings} />
              <Stack.Screen name="EditVaultCard" component={EditVaultCard} />
            </Stack.Navigator>

            <NavBar />
          </SafeAreaView>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
