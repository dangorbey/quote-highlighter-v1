import React from "react";
import { Text, TextStyle, useColorScheme, TextProps } from "react-native";
import Colors from "../../constants/Colors";

// Define the props that MyText will accept
interface MyTextProps extends TextProps {
  children: React.ReactNode;
  type?: keyof typeof styles; // if styles is an object with keys that correspond to type
  style?: TextStyle;
}

// Make sure to define or import your styles object
const styles = {
  quote: {
    fontFamily: "Fanwood",
    fontSize: 18,
    color: "#000",
  },
  highlight: {
    fontFamily: "Fanwood",
    fontSize: 18,
    color: "#000",
    backgroundColor: "yellow",
    borderRadius: 2,
  },
};

export default function MyText({
  children,
  type = "quote",
  style,
}: MyTextProps) {
  // Ensure that the theme and type are available in the Colors and styles objects
  // const textStyle = theme && Colors[theme] ? Colors[theme].text : "black"; // fallback to 'black' if not found

  // You should return combining your style with the predefined styles
  return (
    <Text style={[styles[type], { color: "#000" }, style]}>{children}</Text>
  );
}
