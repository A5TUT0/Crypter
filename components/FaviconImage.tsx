import React, { useState, useEffect } from "react";
import { Image, View, StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";

interface FaviconImageProps {
  domain?: string;
  size?: number;
  borderRadius?: number;
}

export default function FaviconImage({
  domain,
  size = 50,
  borderRadius = 15,
}: FaviconImageProps) {
  const theme = useTheme();
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  const getFaviconUrls = (websiteDomain: string) => {
    const cleanDomain = websiteDomain
      .replace(/^https?:\/\//, "")
      .replace(/\/$/, "")
      .split("/")[0];
    console.log("FaviconImage - cleanDomain:", cleanDomain);
    return [
      `https://logo.clearbit.com/${cleanDomain}`,
      `https://icons.duckduckgo.com/ip3/${cleanDomain}.ico`,
      `https://www.google.com/s2/favicons?domain=${cleanDomain}&sz=128`,
      `https://${cleanDomain}/favicon.ico`,
      `https://${cleanDomain}/icon.png`,
      `https://${cleanDomain}/logo.png`,
      `https://${cleanDomain}/favicon.png`,
      `https://${cleanDomain}/icon.ico`,
      `https://${cleanDomain}/apple-touch-icon.png`,
      `https://${cleanDomain}/apple-touch-icon-precomposed.png`,
    ];
  };

  const faviconUrls = domain ? getFaviconUrls(domain) : [];

  useEffect(() => {
    setCurrentUrlIndex(0);
    setHasError(false);
  }, [domain]);

  if (!domain || hasError || currentUrlIndex >= faviconUrls.length) {
    return (
      <View
        style={[
          styles.defaultIconContainer,
          {
            width: size,
            height: size,
            borderRadius,
            backgroundColor: theme.primary + "20",
          },
        ]}
      >
        <Ionicons
          name="globe-outline"
          size={size * 0.6}
          color={theme.primary}
        />
      </View>
    );
  }

  const handleError = () => {
    if (currentUrlIndex < faviconUrls.length - 1) {
      setCurrentUrlIndex(currentUrlIndex + 1);
    } else {
      setHasError(true);
    }
  };

  return (
    <View
      style={[
        styles.imageContainer,
        {
          width: size,
          height: size,
          borderRadius,
          backgroundColor: theme.background,
        },
      ]}
    >
      <Image
        source={{ uri: faviconUrls[currentUrlIndex] }}
        style={{ width: size, height: size }}
        onError={handleError}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  defaultIconContainer: {
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
});
