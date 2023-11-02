import React, { useState } from "react";
import { View, TextInput, TextInputProps, StyleSheet } from "react-native";
import MyText from "./MyText";
import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
  },
  input: {
    borderWidth: 2,
    height: 50,
    borderRadius: 5,
    padding: 10,
  },
  inputFocus: {
    backgroundColor: Colors.light.primary + "10",
  },
  label: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
});

interface MyInputProps extends TextInputProps {
  label?: string;
}

export default function MyInput({ label, style, ...props }: MyInputProps) {
  const [focus, setFocus] = useState(false);

  const combinedStyles = [
    styles.input,
    focus && styles.inputFocus,
    style, // apply last to allow override of predefined styles
  ];

  return (
    <View style={styles.container}>
      {label && (
        <MyText type="caption" style={styles.label}>
          {label}
        </MyText>
      )}
      <TextInput
        {...props}
        style={combinedStyles}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </View>
  );
}
