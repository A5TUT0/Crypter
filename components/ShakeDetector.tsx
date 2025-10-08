import React, { useEffect, useState } from "react";
import { Accelerometer } from "expo-sensors";
import { View, Text } from "react-native";

export default function ShakeDetector() {
  const [data, setData] = useState({});
  const [shakeDetected, setShakeDetected] = useState(false);

  useEffect(() => {
    const subscription = Accelerometer.addListener((accelerometerData) => {
      setData(accelerometerData);
      detectShake(accelerometerData);
    });

    Accelerometer.setUpdateInterval(100);

    return () => subscription && subscription.remove();
  }, []);

  const detectShake = ({ x, y, z }: { x: any; y: any; z: any }) => {
    const totalForce = Math.sqrt(x * x + y * y + z * z);

    if (totalForce > 1.78) {
      setShakeDetected(true);
      setTimeout(() => setShakeDetected(false), 1000);
    }
  };

  return shakeDetected;
}
