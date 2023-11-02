import React from "react";
import { Text, TextStyle, useColorScheme, TextProps } from "react-native";
import Colors from "../constants/Colors";

// Define the props that MyText will accept
interface MyTextProps extends TextProps {
  children: React.ReactNode;
  type?: keyof typeof styles; // if styles is an object with keys that correspond to type
  style?: TextStyle;
}

// Make sure to define or import your styles object
const styles = {
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  body: {
    fontSize: 16,
  },
  caption: {
    fontSize: 12,
  },
};

export default function MyText({
  children,
  type = "body",
  style,
}: MyTextProps) {
  const theme = useColorScheme();

  // Ensure that the theme and type are available in the Colors and styles objects
  const textStyle = theme && Colors[theme] ? Colors[theme].text : "black"; // fallback to 'black' if not found

  // You should return combining your style with the predefined styles
  return (
    <Text style={[styles[type], { color: textStyle }, style]}>{children}</Text>
  );
}
