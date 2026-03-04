import React, { useRef, useEffect, useState } from "react";
import { View, Text, Pressable, Animated, LayoutChangeEvent } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../theme/colors";
import { styles } from "../theme/styles/EventSourceSelector.styles";

interface Props {
  value: "enquiry" | "booking";
  onSelect: (value: "enquiry" | "booking") => void;
}

export default function EventSourceSelector({ value, onSelect }: Props) {
  const translateX = useRef(new Animated.Value(0)).current;
  const [toggleWidth, setToggleWidth] = useState(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setToggleWidth(width);
  };

  useEffect(() => {
    const targetValue = value === "enquiry" ? 0 : Math.max(toggleWidth / 2 - 8, 100);
    Animated.timing(translateX, {
      toValue: targetValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [value, toggleWidth]);

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>Event Source *</Text>
        <Text style={styles.valueLabel}>
          {value === "enquiry" ? "📞 Enquiry" : "✅ Confirmed Booking"}
        </Text>
      </View>
      <Pressable
        style={styles.toggleSwitch}
        onPress={() => onSelect(value === "enquiry" ? "booking" : "enquiry")}
        onLayout={handleLayout}
      >
        <Animated.View
          style={[
            styles.toggleThumb,
            {
              transform: [{ translateX }],
            },
          ]}
        >
          <View
            style={[
              styles.thumbIcon,
              { backgroundColor: value === "enquiry" ? "#FF6B9D" : "#4CAF50" },
            ]}
          >
            <Ionicons
              name={
                value === "enquiry" ? "help-circle" : "checkmark-done-circle"
              }
              size={18}
              color="white"
            />
          </View>
        </Animated.View>
        <View style={styles.toggleLabel}>
          <Text
            style={[
              styles.toggleText,
              value === "enquiry" && styles.toggleTextActive,
            ]}
          >
            Enquiry
          </Text>
        </View>
        <View style={styles.toggleLabel}>
          <Text
            style={[
              styles.toggleText,
              value === "booking" && styles.toggleTextActive,
            ]}
          >
            Booking
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
