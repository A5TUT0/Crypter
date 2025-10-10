import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import Ionicons from '@expo/vector-icons/Ionicons';

// Props interface for the FaviconImage component
interface FaviconImageProps {
  domain?: string; // The website domain to fetch favicon for
  size?: number; // Size of the favicon in pixels
  borderRadius?: number; // Border radius for rounded corners
}

/**
 * FaviconImage Component
 * Displays a website's favicon with intelligent fallback system
 * Tries multiple favicon URLs until one loads successfully
 * Shows a default globe icon if all attempts fail
 */
export default function FaviconImage({ domain, size = 50, borderRadius = 15 }: FaviconImageProps) {
  const theme = useTheme();
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0); // Track which URL we're trying
  const [hasError, setHasError] = useState(false); // Track if all URLs failed

  /**
   * Generates an array of potential favicon URLs to try
   * Uses multiple CDNs and common favicon locations as fallbacks
   * @param websiteDomain - The domain to generate URLs for
   * @returns Array of favicon URLs to try in order
   */
  const getFaviconUrls = (websiteDomain: string) => {
    // Clean the domain: remove protocol, trailing slash, and any path
    const cleanDomain = websiteDomain
      .replace(/^https?:\/\//, '') // Remove http:// or https://
      .replace(/\/$/, '') // Remove trailing slash
      .split('/')[0]; // Get just the domain part

    console.log('FaviconImage - cleanDomain:', cleanDomain);

    // Return array of URLs to try, in order of preference
    return [
      `https://logo.clearbit.com/${cleanDomain}`, // Clearbit logo API (high quality)
      `https://icons.duckduckgo.com/ip3/${cleanDomain}.ico`, // DuckDuckGo favicon service
      `https://www.google.com/s2/favicons?domain=${cleanDomain}&sz=128`, // Google favicon service
      `https://${cleanDomain}/favicon.ico`, // Standard favicon location
      `https://${cleanDomain}/icon.png`, // Alternative icon location
      `https://${cleanDomain}/logo.png`, // Logo as fallback
      `https://${cleanDomain}/favicon.png`, // PNG favicon
      `https://${cleanDomain}/icon.ico`, // Alternative ICO location
      `https://${cleanDomain}/apple-touch-icon.png`, // Apple touch icon
      `https://${cleanDomain}/apple-touch-icon-precomposed.png`, // Apple touch icon (older format)
    ];
  };

  const faviconUrls = domain ? getFaviconUrls(domain) : [];

  // Reset to first URL when domain changes
  useEffect(() => {
    setCurrentUrlIndex(0);
    setHasError(false);
  }, [domain]);

  // Show default icon if no domain, all URLs failed, or no URLs to try
  if (!domain || hasError || currentUrlIndex >= faviconUrls.length) {
    return (
      <View
        style={[
          styles.defaultIconContainer,
          {
            width: size,
            height: size,
            borderRadius,
            backgroundColor: theme.primary + '20', // Theme color with 20% opacity
          },
        ]}
      >
        <Ionicons name="globe-outline" size={size * 0.6} color={theme.primary} />
      </View>
    );
  }

  /**
   * Handle image load error by trying the next URL in the list
   * If all URLs have been tried, show the default icon
   */
  const handleError = () => {
    if (currentUrlIndex < faviconUrls.length - 1) {
      setCurrentUrlIndex(currentUrlIndex + 1); // Try next URL
    } else {
      setHasError(true); // All URLs failed, show default
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
        onError={handleError} // Try next URL if this one fails
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultIconContainer: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
