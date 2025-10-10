import { useEffect } from 'react';
import ShakeDetector from '../components/ShakeDetector';
import { fetchRandomPassword } from '../utils/vaultUtils';

export const usePasswordGenerator = (setPassword: (password: string) => void) => {
  const generatePassword = async () => {
    const pwd = await fetchRandomPassword();
    if (pwd) {
      setPassword(pwd);
    }
  };

  const isShaking = ShakeDetector();

  useEffect(() => {
    if (isShaking) {
      generatePassword();
    }
  }, [isShaking]);

  return { generatePassword };
};
