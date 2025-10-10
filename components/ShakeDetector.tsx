import React, { useEffect, useState } from 'react';
import { Accelerometer } from 'expo-sensors';
import { View, Text } from 'react-native';

/**
 * ShakeDetector Component
 * Detects when the device is shaken using the accelerometer
 * Returns true when a shake is detected, false otherwise
 *
 * @returns boolean indicating if device is currently being shaken
 */
export default function ShakeDetector() {
  const [data, setData] = useState({}); // Store accelerometer data
  const [shakeDetected, setShakeDetected] = useState(false); // Track shake state

  useEffect(() => {
    // Subscribe to accelerometer updates
    const subscription = Accelerometer.addListener((accelerometerData) => {
      setData(accelerometerData);
      detectShake(accelerometerData); // Check if current motion is a shake
    });

    // Set update interval to 100ms for responsive detection
    Accelerometer.setUpdateInterval(100);

    // Cleanup: remove listener when component unmounts
    return () => subscription && subscription.remove();
  }, []);

  /**
   * Analyzes accelerometer data to detect shake gesture
   * Calculates total force from x, y, z axes
   * @param x - X-axis acceleration
   * @param y - Y-axis acceleration
   * @param z - Z-axis acceleration
   */
  const detectShake = ({ x, y, z }: { x: any; y: any; z: any }) => {
    // Calculate magnitude of acceleration vector (total force)
    const totalForce = Math.sqrt(x * x + y * y + z * z);

    // If force exceeds threshold (1.78), consider it a shake
    if (totalForce > 1.78) {
      setShakeDetected(true);

      // Reset shake state after 1 second to allow for new detections
      setTimeout(() => setShakeDetected(false), 1000);
    }
  };

  // Return the shake detection state
  return shakeDetected;
}
