import React from "react";
import { Text, StyleSheet, Pressable, ViewStyle } from "react-native";

type MyButtonProps = {
  label: string;
  styleType:
    | "yellow"
    | "yellowOutline"
    | "yellowOutlineDark"
    | "white"
    | "whiteOutline"
    | "black"
    | "blackOutline";
  onPress: () => void; // adding onPress prop
};

export const MyButton = ({ label, styleType, onPress }: MyButtonProps) => {
  const getButtonStyles = (pressed: boolean): ViewStyle => {
    let styles: ViewStyle = {
      borderWidth: 2,
      width: "90%",
      alignSelf: "center",
      borderRadius: 10,
      paddingVertical: 15,
      paddingHorizontal: 20,
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 5,
    };

    switch (styleType) {
      case "yellow":
        styles.backgroundColor = "#FFDD00";
        styles.borderColor = "#FFDD00";
        break;
      case "yellowOutline":
      case "yellowOutlineDark":
        styles.backgroundColor = "transparent";
        styles.borderColor = "#FFDD00";
        break;
      case "white":
      case "whiteOutline":
        styles.backgroundColor =
          styleType === "white" ? "#FFFFFF" : "transparent";
        styles.borderColor = "#FFFFFF";
        break;
      case "black":
      case "blackOutline":
        styles.backgroundColor =
          styleType === "black" ? "black" : "transparent";
        styles.borderColor = "black";
        break;
    }

    if (pressed) {
      styles.opacity = 0.7;
      styles.transform = [{ scale: 0.95 }];
    }

    return styles;
  };

  const getTextColor = () => {
    if (
      ["yellow", "white", "yellowOutline", "blackOutline"].includes(styleType)
    ) {
      return "black";
    }
    return "white";
  };

  return (
    <Pressable
      style={({ pressed }) => [getButtonStyles(pressed)]}
      onPress={onPress}
    >
      <Text style={{ color: getTextColor(), fontWeight: "bold", fontSize: 16 }}>
        {label}
      </Text>
    </Pressable>
  );
};
