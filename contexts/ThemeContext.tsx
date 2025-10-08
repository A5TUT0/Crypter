import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import { lightTheme, darkTheme } from "../themes";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ThemeContext = createContext(lightTheme);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const colorScheme = useColorScheme();
  const [forcedDark, setForcedDark] = useState<null | boolean>(null);

  useEffect(() => {
    (async () => {
      const d = await AsyncStorage.getItem("settings_darkMode");
      if (d === "1") setForcedDark(true);
      else if (d === "0") setForcedDark(false);
      else setForcedDark(null);
    })();
    // Listen for changes in settings_darkMode
    const interval = setInterval(async () => {
      const d = await AsyncStorage.getItem("settings_darkMode");
      if (d === "1") setForcedDark(true);
      else if (d === "0") setForcedDark(false);
      else setForcedDark(null);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  let theme;
  if (forcedDark === true) theme = darkTheme;
  else if (forcedDark === false) theme = lightTheme;
  else theme = colorScheme === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
