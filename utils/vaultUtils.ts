import { Alert } from "react-native";

export const fetchRandomPassword = async (): Promise<string | undefined> => {
  try {
    const response = await fetch("https://passwordwolf.com/api/?repeat=1");
    const json = await response.json();
    return json[0].password;
  } catch (error) {
    console.error("Error fetching password:", error);
    return undefined;
  }
};

export const checkEmailBreach = (email: string): void => {
  if (!email || !email.includes("@")) {
    Alert.alert("Invalid email", "Please enter a valid email address");
    return;
  }

  fetch(`https://api.xposedornot.com/v1/check-email/${email}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      if (json.breaches && json.breaches.length > 0) {
        const breaches = json.breaches.map((b: any) => b).join(",  ");
        Alert.alert(
          "Warning",
          `This email has been found in data breaches:\n${breaches}\nConsider changing it.`
        );
      } else if (json.breaches && json.breaches.length === 0) {
        Alert.alert("Good news", "This email has not been found in breaches.");
      } else if (json.Error) {
        Alert.alert(
          "Error",
          "Could not check the email. Please try again later."
        );
      }
    })
    .catch((error) => {
      console.error("Error checking email breach:", error);
      Alert.alert("Error", "Could not check the email. Please try again.");
    });
};

export const validateRequiredFields = (
  name: string,
  username: string,
  password: string
): boolean => {
  if (name.trim() === "" || password.trim() === "" || username.trim() === "") {
    Alert.alert("Error", "Please fill in all required fields");
    return false;
  }
  return true;
};
