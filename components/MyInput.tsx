import React, { useState } from "react";
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  useColorScheme,
} from "react-native";
import MyText from "./MyText";
import Colors from "../constants/Colors";

interface MyInputProps extends TextInputProps {
  label?: string;
}

export default function MyInput(props: MyInputProps) {
  const theme = useColorScheme();
  const [focus, setFocus] = useState(false);

  const styles = StyleSheet.create({
    container: {
      paddingVertical: 5,
    },
    input: {
      borderWidth: 2,
      height: 50,
      borderRadius: 5,
      padding: 10,
      // paddingVertical: 5,
    },
    inputFocus: {
      borderWidth: 2,
      height: 50,
      borderRadius: 5,
      padding: 10,
      backgroundColor: Colors.light.primary + "10",
      // paddingVertical: 5,
    },
    label: {
      fontWeight: "bold",
      paddingBottom: 5,
    },
  });

  const customStyle = focus ? styles.inputFocus : styles.input;

  return (
    <View style={styles.container}>
      <MyText type="caption" style={styles.label}>
        {props.label}
      </MyText>
      <TextInput
        {...props}
        style={[customStyle, props.style]}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </View>
  );
}
