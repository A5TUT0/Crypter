import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../themes';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create a context to provide theme data throughout the app
const ThemeContext = createContext(lightTheme);

/**
 * ThemeProvider Component
 * Manages the app's theme (light/dark mode)
 * Supports system preference, user override, and persistence
 */
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Get the device's system color scheme preference
  const colorScheme = useColorScheme();

  // State to track if user has manually set dark mode
  // null = use system preference, true = force dark, false = force light
  const [forcedDark, setForcedDark] = useState<null | boolean>(null);

  // Effect to load theme preference from storage and monitor changes
  useEffect(() => {
    // Load saved theme preference on mount
    (async () => {
      const d = await AsyncStorage.getItem('settings_darkMode');
      if (d === '1')
        setForcedDark(true); // User wants dark mode
      else if (d === '0')
        setForcedDark(false); // User wants light mode
      else setForcedDark(null); // User wants to follow system
    })();

    // Poll for changes in theme settings every second
    // This allows theme to update when changed in Settings screen
    const interval = setInterval(async () => {
      const d = await AsyncStorage.getItem('settings_darkMode');
      if (d === '1') setForcedDark(true);
      else if (d === '0') setForcedDark(false);
      else setForcedDark(null);
    }, 1000);

    // Cleanup: stop polling when component unmounts
    return () => clearInterval(interval);
  }, []);

  // Determine which theme to use based on forcedDark setting
  let theme;
  if (forcedDark === true)
    theme = darkTheme; // User forced dark mode
  else if (forcedDark === false)
    theme = lightTheme; // User forced light mode
  else theme = colorScheme === 'dark' ? darkTheme : lightTheme; // Follow system preference

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

/**
 * Custom hook to access the current theme
 * @returns The current theme object with colors
 */
export const useTheme = () => useContext(ThemeContext);
