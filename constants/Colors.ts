export const Colors = {
  white: "#ffffff",
  black: "#000000",
  yellow: "#FFDD00",
  lightBG: "#F7F5EE",
  darkBG: "#1F1800",
};

const tintColorLight = "#2f95dc";
const tintColorDark = "##e7e7e7";

export default {
  light: {
    primary: "#FFDD00",
    secondary: "#0d0d0d",
    text: "#0d0d0d",
    background: "#F7F5EE",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
  },
  dark: {
    primary: "#FFDD00",
    secondary: "#f2f2f4",
    text: "#f2f2f4",
    background: "#1F1800",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
  },
};
