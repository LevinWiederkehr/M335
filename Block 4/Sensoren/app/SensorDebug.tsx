import { Text, View, StyleSheet, Pressable } from "react-native";
import { Accelerometer } from "expo-sensors";
import { useState, useEffect, useRef } from "react";

type SensorData = { x: number, y: number, z: number };

export default function SensorDebugScreen() {
  const [ data, setData ] = useState<SensorData>({ x: 0, y: 0, z: 0 });
  const [ isActive, setActive ] = useState(true);
  const subscribtionRef = useRef<ReturnType<typeof Accelerometer.addListener> | null>(null);
  
  const subscribe = () => {
    Accelerometer.setUpdateInterval(100);
    subscribtionRef.current = Accelerometer.addListener(setData);
  };

  const unsubscribe = () => {
    subscribtionRef.current?.remove();
    subscribtionRef.current = null;
  };

  useEffect(() => {
    subscribe();
    return () => unsubscribe();
  }, [])

  const togglePause = () => {
    if (isActive) {
      unsubscribe();
    } else {
      subscribe();
    }
    setActive((prev) => !prev);
  };

  const Bar = ({ value }: { value: number }) => {
    const clamped = Math.max(-1, Math.min(1, value));
    const isPositive = clamped >= 0;
    const widthPercent = Math.abs(clamped) * 50;
    return (
      <View style={styles.barTrack}>
        <View style={styles.barCenter} />
          <View
            style={[
              styles.barFill,
              {
                width: `${widthPercent}%`,
                left: isPositive ? "50%" : undefined,
                right: isPositive ? undefined : "50%",
                backgroundColor: isPositive ? "#4CAF50" : "#f44336",
            },
          ]}
        />  
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accelerometer</Text>
      {(["x", "y", "z"] as const).map((axis) => (
        <View key={axis} style={styles.row}>
          <Text style={styles.label}>{axis.toUpperCase()}</Text>
          <Text style={styles.value}>{data[axis].toFixed(3)}</Text>
          <Bar value={data[axis]} />
        </View>
      ))}
      <Pressable
        onPress={togglePause}
        style={({ pressed }) => [
          styles.button,
          { opacity: pressed ? 0.7 : 1, backgroundColor: isActive ? "#f44336" : "#4CAF50" },
        ]}
      >
        <Text style={styles.buttonText}>{isActive ? "Pause" : "Resume"}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#25292e",
        padding: 24,
        justifyContent: "center",
        gap: 20,
    },
    title: {
        color: "#fff",
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 8,
    },
    row: {
        gap: 8,
    },
    label: {
        color: "#aaa",
        fontSize: 13,
        fontWeight: "bold",
    },
    value: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
        fontVariant: ["tabular-nums"],
    },
    barTrack: {
        height: 12,
        backgroundColor: "#444",
        borderRadius: 6,
        overflow: "hidden",
        position: "relative",
    },
    barCenter: {
        position: "absolute",
        left: "50%",
        top: 0,
        bottom: 0,
        width: 2,
        backgroundColor: "#666",
    },
    barFill: {
        position: "absolute",
        top: 0,
        bottom: 0,
        borderRadius: 6,
    },
    button: {
        marginTop: 16,
        height: 56,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});