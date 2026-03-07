import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme/colors";
import { styles } from "../theme/styles/ListCard.styles";

type Props = {
  title: string;
  subtitle?: string;
  metaLeft?: string;
  metaLeftIcon?: string;
  metaRight?: string;
  metaRightIcon?: string;
  onPress?: () => void;
  actions?: { label: string; onPress: () => void }[];
  date?: string;
  mobile?: string;
  venue?: string;
  eventName?: string;
  rooms?: number | string;
  detailedFormat?: boolean;
};

export default function ListCard({
  title,
  subtitle,
  metaLeft,
  metaLeftIcon,
  metaRight,
  metaRightIcon,
  onPress,
  actions,
  date,
  mobile,
  venue,
  eventName,
  rooms,
  detailedFormat = false,
}: Props) {
  if (detailedFormat) {
    return (
      <View style={styles.cardContainer}>
        <LinearGradient
          colors={["rgba(255, 255, 255, 0.95)", "rgba(255, 255, 255, 0.85)"]}
          style={styles.gradient}
        >
          <Pressable onPress={onPress} style={styles.card}>
            <View style={styles.headerRow}>
              <Text style={styles.titleDetailed}>
                {title}
                {date && ` ${date}`}
              </Text>
            </View>
            <View style={styles.detailedFieldsContainer}>
              {mobile && (
                <View style={styles.detailedField}>
                  <Ionicons
                    name="call"
                    size={14}
                    color={colors.primary}
                    style={styles.fieldIcon}
                  />
                  <Text style={styles.detailedLabel}>Mobile: </Text>
                  <Text style={styles.detailedValue}>{mobile}</Text>
                </View>
              )}
              {venue && (
                <View style={styles.detailedField}>
                  <Ionicons
                    name="home"
                    size={14}
                    color={colors.primary}
                    style={styles.fieldIcon}
                  />
                  <Text style={styles.detailedLabel}>Venue: </Text>
                  <Text style={styles.detailedValue}>{venue}</Text>
                </View>
              )}
              {eventName && (
                <View style={styles.detailedField}>
                  <Ionicons
                    name="bookmark"
                    size={14}
                    color={colors.primary}
                    style={styles.fieldIcon}
                  />
                  <Text style={styles.detailedLabel}>Event Name: </Text>
                  <Text style={styles.detailedValue}>{eventName}</Text>
                </View>
              )}
              {rooms && (
                <View style={styles.detailedField}>
                  <Ionicons
                    name="layers"
                    size={14}
                    color={colors.primary}
                    style={styles.fieldIcon}
                  />
                  <Text style={styles.detailedLabel}>Rooms: </Text>
                  <Text style={styles.detailedValue}>{rooms}</Text>
                </View>
              )}
            </View>
            {!!actions?.length && (
              <View style={styles.actions}>
                {actions.map((a, idx) => (
                  <Pressable
                    key={a.label}
                    onPress={a.onPress}
                    style={styles.actionBtn}
                  >
                    <LinearGradient
                      colors={
                        (idx === 0
                          ? colors.gradients.primary
                          : colors.gradients.green) as any
                      }
                      style={styles.actionBtnGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                    >
                      <Text style={styles.actionText}>{a.label}</Text>
                    </LinearGradient>
                  </Pressable>
                ))}
              </View>
            )}
          </Pressable>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={styles.cardContainer}>
      <LinearGradient
        colors={["rgba(255, 255, 255, 0.95)", "rgba(255, 255, 255, 0.85)"]}
        style={styles.gradient}
      >
        <Pressable onPress={onPress} style={styles.card}>
          <View style={styles.headerRow}>
            <View style={styles.titleWrap}>
              <View style={styles.iconCircle}>
                <Ionicons name="sparkles" size={16} color="white" />
              </View>
              <Text style={styles.title}>{title}</Text>
            </View>
          </View>
          {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          <View style={styles.metaRow}>
            {!!metaLeft && (
              <View style={styles.metaWrap}>
                {metaLeftIcon && (
                  <Ionicons
                    name={metaLeftIcon as any}
                    size={14}
                    color={colors.primary}
                  />
                )}
                <Text style={styles.meta}>{metaLeft}</Text>
              </View>
            )}
            {!!metaRight && (
              <View style={styles.metaWrap}>
                {metaRightIcon && (
                  <Ionicons
                    name={metaRightIcon as any}
                    size={14}
                    color={colors.accent}
                  />
                )}
                <Text style={styles.meta}>{metaRight}</Text>
              </View>
            )}
          </View>
          {!!actions?.length && (
            <View style={styles.actions}>
              {actions.map((a, idx) => (
                <Pressable
                  key={a.label}
                  onPress={a.onPress}
                  style={styles.actionBtn}
                >
                  <LinearGradient
                    colors={
                      (idx === 0
                        ? colors.gradients.primary
                        : colors.gradients.green) as any
                    }
                    style={styles.actionBtnGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.actionText}>{a.label}</Text>
                  </LinearGradient>
                </Pressable>
              ))}
            </View>
          )}
        </Pressable>
      </LinearGradient>
    </View>
  );
}
