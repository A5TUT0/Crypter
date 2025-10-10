import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export type Entry = {
  id: string;
  name: string;
  username: string;
  password: string;
  website?: string;
};

// Custom hook to load vault entries. Hooks must be called from React components or other hooks.
export function useVaultEntries() {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const raw = await AsyncStorage.getItem('vault_entries');
        if (!mounted) return;
        if (raw) {
          const parsed = JSON.parse(raw) as Entry[];
          setEntries(parsed);
        } else {
          setEntries([]);
        }
      } catch (e) {
        console.error('Failed to load vault entries', e);
        if (mounted) setEntries([]);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  return entries;
}
