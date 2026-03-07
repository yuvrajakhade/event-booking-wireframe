import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { styles } from "../theme/styles/ListCard.styles";

const actionIconByLabel: Record<string, keyof typeof Ionicons.glyphMap> = {
  View: "eye-outline",
  Book: "add-outline",
  Edit: "create-outline",
  "Check-In": "log-in-outline",
  "Check-Out": "log-out-outline",
};

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
      <View style={[styles.cardContainer, { backgroundColor: colors.bgLight }]}>
        <Pressable onPress={onPress} style={styles.card}>
          <View style={styles.headerRow}>
            <View
              style={[styles.eventBadge, { backgroundColor: colors.primaryBg }]}
            >
              <Ionicons name="calendar" size={16} color={colors.primary} />
            </View>
            <View style={styles.titleContainer}>
              <Text style={[styles.titleDetailed, { color: colors.title }]}>
                {title}
              </Text>
              {date && (
                <View
                  style={[
                    styles.dateBadge,
                    { backgroundColor: colors.accentBg },
                  ]}
                >
                  <Ionicons name="time" size={12} color={colors.accent} />
                  <Text style={[styles.dateText, { color: colors.accent }]}>
                    {date}
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View style={styles.detailedFieldsContainer}>
            {mobile && (
              <View style={styles.detailedField}>
                <Ionicons
                  name="call"
                  size={16}
                  color={colors.primary}
                  style={styles.fieldIcon}
                />
                <Text style={[styles.detailedValue, { color: colors.text }]}>
                  {mobile}
                </Text>
              </View>
            )}
            {venue && (
              <View style={styles.detailedField}>
                <Ionicons
                  name="location"
                  size={16}
                  color={colors.accent}
                  style={styles.fieldIcon}
                />
                <Text style={[styles.detailedValue, { color: colors.text }]}>
                  {venue}
                </Text>
              </View>
            )}
            {eventName && (
              <View style={styles.detailedField}>
                <Ionicons
                  name="bookmark"
                  size={16}
                  color={colors.secondary}
                  style={styles.fieldIcon}
                />
                <Text style={[styles.detailedValue, { color: colors.text }]}>
                  {eventName}
                </Text>
              </View>
            )}
            {rooms && (
              <View style={styles.detailedField}>
                <Ionicons
                  name="bed"
                  size={16}
                  color={colors.info}
                  style={styles.fieldIcon}
                />
                <Text style={[styles.detailedValue, { color: colors.text }]}>
                  {rooms} rooms
                </Text>
              </View>
            )}
          </View>
          {!!actions?.length && (
            <View style={styles.actions}>
              {actions.map((a) => {
                const iconName = actionIconByLabel[a.label];
                const buttonColor =
                  a.label === "Edit"
                    ? colors.primary
                    : a.label === "Check-In"
                      ? colors.success
                      : a.label === "Check-Out"
                        ? colors.warning
                        : colors.accent;

                return (
                  <Pressable
                    key={a.label}
                    onPress={a.onPress}
                    style={({ pressed }) => [
                      styles.actionBtn,
                      pressed && styles.actionBtnPressed,
                    ]}
                    accessibilityLabel={a.label}
                  >
                    <View
                      style={[
                        styles.actionBtnGradient,
                        { backgroundColor: buttonColor },
                      ]}
                    >
                      <Ionicons
                        name={iconName ?? "ellipse-outline"}
                        size={18}
                        color="white"
                      />
                    </View>
                  </Pressable>
                );
              })}
            </View>
          )}
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.cardContainer, { backgroundColor: colors.bgLight }]}>
      <Pressable onPress={onPress} style={styles.card}>
        <View style={styles.headerRow}>
          <View style={styles.titleWrap}>
            <View
              style={[styles.iconCircle, { backgroundColor: colors.primary }]}
            >
              <Ionicons name="sparkles" size={16} color="white" />
            </View>
            <Text style={[styles.title, { color: colors.title }]}>{title}</Text>
          </View>
        </View>
        {!!subtitle && (
          <Text style={[styles.subtitle, { color: colors.textLight }]}>
            {subtitle}
          </Text>
        )}
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
              <Text style={[styles.meta, { color: colors.text }]}>
                {metaLeft}
              </Text>
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
              <Text style={[styles.meta, { color: colors.text }]}>
                {metaRight}
              </Text>
            </View>
          )}
        </View>
        {!!actions?.length && (
          <View style={styles.actions}>
            {actions.map((a) => {
              const iconName = actionIconByLabel[a.label];

              return (
                <Pressable
                  key={a.label}
                  onPress={a.onPress}
                  style={({ pressed }) => [
                    styles.actionBtn,
                    pressed && styles.actionBtnPressed,
                  ]}
                  accessibilityLabel={a.label}
                >
                  <View
                    style={[
                      styles.actionBtnGradient,
                      { backgroundColor: colors.primary },
                    ]}
                  >
                    <Ionicons
                      name={iconName ?? "ellipse-outline"}
                      size={18}
                      color="white"
                    />
                  </View>
                </Pressable>
              );
            })}
          </View>
        )}
      </Pressable>
    </View>
  );
}
