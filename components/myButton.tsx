import { transform } from "@babel/core";
import {
  useColorScheme,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import Colors from "../constants/Colors";
import { ReactNode, cloneElement } from "react";
import { Ionicons } from "@expo/vector-icons";

export type MyButtonProps = {
  label: string;
  type: "primary" | "primaryStroke" | "secondary" | "secondaryStroke";
  onPress?: () => void;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
};

export default function MyButton({
  label,
  type = "primary",
  onPress,
  iconName,
  iconColor,
}: MyButtonProps) {
  const theme = useColorScheme();

  let buttonStyle = styles.primary;
  let textStyle = styles.textDark;
  let fontSize = 16;

  if (theme === "light") {
    switch (type) {
      case "primary":
        buttonStyle = styles.primary;
        textStyle = styles.textLight;
        break;
      case "primaryStroke":
        buttonStyle = styles.primaryStrokeLight;
        textStyle = styles.textLight;
        break;
      case "secondary":
        buttonStyle = styles.secondaryLight;
        textStyle = styles.textDark;
        break;
      case "secondaryStroke":
        buttonStyle = styles.secondaryStrokeLight;
        textStyle = styles.textLight;
        break;
    }
  } else {
    // theme is 'dark'
    switch (type) {
      case "primary":
        buttonStyle = styles.primary;
        textStyle = styles.textLight;
        break;
      case "primaryStroke":
        buttonStyle = styles.primaryStrokeDark;
        textStyle = styles.textDark;
        break;
      case "secondary":
        buttonStyle = styles.secondaryDark;
        textStyle = styles.textLight;
        break;
      case "secondaryStroke":
        buttonStyle = styles.secondaryStrokeDark;
        textStyle = styles.textDark;
        break;
    }
  }

  iconColor =
    iconColor ??
    (textStyle === styles.textLight ? Colors.light.text : Colors.dark.text);

  const renderIcon = () => {
    if (!iconName) return null;
    const calculatedIconSize = fontSize - 2;

    return (
      <Ionicons name={iconName} size={calculatedIconSize} color={iconColor} />
    );
  };

  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      {iconName && <View>{renderIcon()}</View>}
      <Text style={[styles.buttonText, textStyle, { fontSize }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 50,
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  primary: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  primaryStrokeLight: {
    backgroundColor: "transparent",
    borderColor: Colors.light.primary,
  },
  primaryStrokeDark: {
    backgroundColor: "transparent",
    borderColor: Colors.light.primary,
  },
  secondaryLight: {
    backgroundColor: Colors.light.secondary,
    borderWidth: 2,
    borderColor: Colors.light.secondary,
  },
  secondaryDark: {
    backgroundColor: Colors.dark.secondary,
    borderWidth: 2,
    borderColor: Colors.dark.secondary,
  },
  secondaryStrokeLight: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: Colors.light.secondary,
  },
  secondaryStrokeDark: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: Colors.dark.secondary,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  textLight: {
    color: Colors.light.text,
  },
  textDark: {
    color: Colors.dark.text,
  },
});
