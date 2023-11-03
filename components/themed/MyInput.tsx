import React, { useState, forwardRef } from "react";
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  useColorScheme,
} from "react-native";
import MyText from "./MyText";
import Colors from "../../constants/Colors";

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
  inputLight: {
    borderColor: Colors.light.secondary,
    color: Colors.light.secondary,
  },
  inputDark: {
    borderColor: Colors.dark.secondary,
    color: Colors.dark.secondary,
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

// The second parameter in forwardRef is the ref. We define it here as React.Ref<TextInput>.
const MyInput = forwardRef<TextInput, MyInputProps>(
  ({ label, style, onSubmitEditing, returnKeyType, ...props }, ref) => {
    const [isFocused, setFocus] = useState(false);
    const theme = useColorScheme();

    const inputStyle = theme === "dark" ? styles.inputDark : styles.inputLight;

    const combinedStyles = [
      styles.input,
      inputStyle,
      isFocused && styles.inputFocus,
      style,
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
          ref={ref}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
        />
      </View>
    );
  }
);

export default MyInput;
