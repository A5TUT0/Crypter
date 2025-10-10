import React, { useEffect } from 'react';
import { Text, StyleSheet, Animated, Pressable } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import Ionicons from '@expo/vector-icons/Ionicons';

// Define the types of toast notifications available
export type ToastType = 'success' | 'error' | 'info' | 'warning';

// Props interface for the Toast component
interface ToastProps {
  visible: boolean; // Controls whether the toast is shown or hidden
  message: string; // The text message to display
  type?: ToastType; // Type of toast (determines color and icon)
  duration?: number; // How long to show the toast in milliseconds
  onHide: () => void; // Callback function when toast is hidden
}

/**
 * Toast Component
 * Displays animated notification messages at the top of the screen
 * Automatically hides after a specified duration
 */
export default function Toast({
  visible,
  message,
  type = 'success',
  duration = 3000,
  onHide,
}: ToastProps) {
  const theme = useTheme();

  // Animated values for smooth slide-in/slide-out animation
  const translateY = React.useRef(new Animated.Value(-100)).current; // Start position (off-screen)
  const opacity = React.useRef(new Animated.Value(0)).current; // Start fully transparent

  // Effect hook to handle showing and auto-hiding the toast
  useEffect(() => {
    if (visible) {
      // Animate toast sliding down from top and fading in
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0, // Final position (visible on screen)
          duration: 300, // Animation duration in milliseconds
          useNativeDriver: true, // Use native driver for better performance
        }),
        Animated.timing(opacity, {
          toValue: 1, // Fully opaque
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Set timer to automatically hide toast after specified duration
      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      // Cleanup: clear timer when component unmounts or dependencies change
      return () => clearTimeout(timer);
    }
  }, [visible, duration]);

  /**
   * Function to hide the toast with animation
   * Slides up and fades out before calling onHide callback
   */
  const hideToast = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100, // Move back off-screen
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0, // Fade out completely
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide(); // Call the onHide callback when animation completes
    });
  };

  // Don't render anything if toast is not visible
  if (!visible) {
    return null;
  }

  /**
   * Get the background color based on toast type
   * @returns Hex color string for the toast background
   */
  const getToastColor = () => {
    switch (type) {
      case 'success':
        return '#4CAF50'; // Green for success
      case 'error':
        return '#F44336'; // Red for errors
      case 'warning':
        return '#FF9800'; // Orange for warnings
      case 'info':
        return theme.primary; // Use theme color for info
      default:
        return theme.primary;
    }
  };

  /**
   * Get the appropriate icon name based on toast type
   * @returns Ionicons icon name
   */
  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'checkmark-circle';
      case 'error':
        return 'close-circle';
      case 'warning':
        return 'warning';
      case 'info':
        return 'information-circle';
      default:
        return 'information-circle';
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          opacity,
          backgroundColor: getToastColor(),
        },
      ]}
    >
      <Pressable
        onPress={hideToast}
        style={styles.content}
        testID="toast-container"
        accessibilityLabel={`${type} notification: ${message}`}
        accessibilityRole="alert"
      >
        <Ionicons name={getIcon()} size={24} color="#FFFFFF" />
        <Text style={styles.message} numberOfLines={2}>
          {message}
        </Text>
        <Pressable
          onPress={hideToast}
          hitSlop={8}
          testID="toast-close-button"
          accessibilityLabel="Close notification"
        >
          <Ionicons name="close" size={20} color="#FFFFFF" />
        </Pressable>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 10,
    right: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 9999,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  message: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});
