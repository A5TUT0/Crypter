import { Alert } from 'react-native';

/**
 * Fetches a random secure password from an external API
 * @returns A promise that resolves to a random password string, or undefined if failed
 */
export const fetchRandomPassword = async (): Promise<string | undefined> => {
  try {
    const response = await fetch('https://passwordwolf.com/api/?repeat=1');
    const json = await response.json();
    return json[0].password; // Extract the password from the API response
  } catch (error) {
    console.error('Error fetching password:', error);
    return undefined;
  }
};

/**
 * Checks if an email address has been involved in any known data breaches
 * Uses the XposedOrNot API to query breach databases
 * @param email - The email address to check
 */
export const checkEmailBreach = (email: string): void => {
  // Validate email format before making API call
  if (!email || !email.includes('@')) {
    Alert.alert('Invalid email', 'Please enter a valid email address');
    return;
  }

  // Query the breach database API
  fetch(`https://api.xposedornot.com/v1/check-email/${email}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);

      // Check if email was found in any breaches
      if (json.breaches && json.breaches.length > 0) {
        // Format the list of breaches for display
        const breaches = json.breaches.map((b: any) => b).join(',  ');
        Alert.alert(
          'Warning',
          `This email has been found in data breaches:\n${breaches}\nConsider changing it.`,
        );
      } else if (json.breaches && json.breaches.length === 0) {
        // Email is safe - no breaches found
        Alert.alert('Good news', 'This email has not been found in breaches.');
      } else if (json.Error) {
        // API returned an error
        Alert.alert('Error', 'Could not check the email. Please try again later.');
      }
    })
    .catch((error) => {
      // Network or other error occurred
      console.error('Error checking email breach:', error);
      Alert.alert('Error', 'Could not check the email. Please try again.');
    });
};

/**
 * Validates that all required fields are filled in
 * @param name - The entry name/title
 * @param username - The username or email
 * @param password - The password
 * @returns true if all fields are valid, false otherwise
 */
export const validateRequiredFields = (
  name: string,
  username: string,
  password: string,
): boolean => {
  // Check if any required field is empty (after trimming whitespace)
  if (name.trim() === '' || password.trim() === '' || username.trim() === '') {
    Alert.alert('Error', 'Please fill in all required fields');
    return false;
  }
  return true;
};
