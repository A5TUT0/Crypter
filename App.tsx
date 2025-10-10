import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
import Vault from './screens/Vault';
import CreateVaultCard from './screens/CreateVaultCard';
import NavBar from './components/NavBar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Details from './screens/VaultCardDetails';
import { Favorites } from './screens/Favorites';
import Settings from './screens/Settings';
import { EditVaultCard } from './screens/EditVaultCard';

// Create the stack navigator for screen navigation
const Stack = createNativeStackNavigator();

/**
 * Main App Component
 * Sets up the app structure with providers and navigation
 *
 * Provider hierarchy:
 * 1. ThemeProvider - Manages light/dark theme
 * 2. ToastProvider - Provides global toast notifications
 * 3. SafeAreaProvider - Handles safe areas (notches, status bars)
 * 4. NavigationContainer - Enables React Navigation
 */
export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <SafeAreaView style={{ flex: 1 }}>
              {/* Stack Navigator for screen transitions */}
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                {/* Define all app screens */}
                <Stack.Screen name="Favorites" component={Favorites} />
                <Stack.Screen name="Vault" component={Vault} />
                <Stack.Screen name="CreateVault" component={CreateVaultCard} />
                <Stack.Screen name="VaultCardDetails" component={Details} />
                <Stack.Screen name="Settings" component={Settings} />
                <Stack.Screen name="EditVaultCard" component={EditVaultCard} />
              </Stack.Navigator>

              {/* Bottom navigation bar - always visible */}
              <NavBar />
            </SafeAreaView>
          </NavigationContainer>
        </SafeAreaProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
