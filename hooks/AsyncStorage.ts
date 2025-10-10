import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

/**
 * Type definition for a vault entry
 * Represents a single password/credential stored in the vault
 */
export type Entry = {
  id: string; // Unique identifier
  name: string; // Entry title/name
  username: string; // Username or email
  password: string; // The password
  website?: string; // Associated website URL (optional)
  favorite?: boolean; // Is this entry marked as favorite? (optional)
};

/**
 * Custom hook to load and manage vault entries from AsyncStorage
 * Automatically loads entries on mount and provides them as state
 * Handles loading errors gracefully
 *
 * @returns Array of vault entries from storage
 */
export function useVaultEntries() {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    let mounted = true; // Track if component is still mounted to prevent state updates after unmount

    /**
     * Asynchronously loads vault entries from AsyncStorage
     */
    const load = async () => {
      try {
        const raw = await AsyncStorage.getItem('vault_entries');
        if (!mounted) return; // Don't update state if component unmounted

        if (raw) {
          const parsed = JSON.parse(raw) as Entry[];
          setEntries(parsed);
        } else {
          setEntries([]); // No entries stored yet
        }
      } catch (e) {
        console.error('Failed to load vault entries', e);
        if (mounted) setEntries([]); // Set empty array on error
      }
    };

    load();

    // Cleanup: mark component as unmounted
    return () => {
      mounted = false;
    };
  }, []);

  return entries;
}
