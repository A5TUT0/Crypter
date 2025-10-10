/**
 * Theme Configuration
 * Defines color schemes and styling constants for light and dark modes
 */

// Light theme configuration
export const lightTheme = {
  background: '#FFFFFF', // Main background color
  text: '#222222', // Primary text color
  card: '#F3F3F3', // Card/container background
  primary: '#e2a480', // Primary accent color (warm peach)
  border: '#ffffffff', // Border color
  secondary: '#6b7280', // Secondary text/elements
  muted: '#9ca3af', // Muted/disabled elements
  success: '#22c55e', // Success state color (green)
  error: '#ef4444', // Error state color (red)
  radius: 12, // Default border radius
  spacing: 12, // Default spacing unit
  shadow: { offsetY: 4, opacity: 0.06, radius: 6 }, // Shadow configuration
};

// Dark theme configuration
export const darkTheme = {
  background: '#131313ff', // Main background color (very dark)
  text: '#F3F3F3', // Primary text color (light)
  card: '#2e2929ff', // Card/container background (dark gray)
  primary: '#a3775eff', // Primary accent color (muted brown)
  border: '#000000ff', // Border color (black)
  secondary: '#9ca3af', // Secondary text/elements
  muted: '#6b7280', // Muted/disabled elements
  success: '#22c55e', // Success state color (green)
  error: '#ef4444', // Error state color (red)
  radius: 12, // Default border radius
  spacing: 12, // Default spacing unit
  shadow: { offsetY: 4, opacity: 0.18, radius: 8 }, // Shadow configuration (more prominent in dark mode)
};
