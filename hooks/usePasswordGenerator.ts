import { useEffect } from 'react';
import ShakeDetector from '../components/ShakeDetector';
import { fetchRandomPassword } from '../utils/vaultUtils';

/**
 * Custom hook for password generation with shake detection
 * Automatically generates a new password when the device is shaken
 *
 * @param setPassword - State setter function to update the password value
 * @returns Object containing generatePassword function for manual generation
 */
export const usePasswordGenerator = (setPassword: (password: string) => void) => {
  /**
   * Generates a random password by calling the password API
   * Updates the password state if successful
   */
  const generatePassword = async () => {
    const pwd = await fetchRandomPassword();
    if (pwd) {
      setPassword(pwd); // Update password state with the generated password
    }
  };

  // Detect if device is being shaken
  const isShaking = ShakeDetector();

  // Effect: Generate new password automatically when shake is detected
  useEffect(() => {
    if (isShaking) {
      generatePassword();
    }
  }, [isShaking]); // Run when shake state changes

  return { generatePassword };
};
