import {
  Text,
  StyleSheet,
  TextInput,
  Button,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  useColorScheme,
} from "react-native";
import React, { useRef, useState } from "react";
import { useSignUp } from "@clerk/clerk-expo";
import { Stack, router } from "expo-router";
import Spinner from "react-native-loading-spinner-overlay";
import { View } from "../../components/themed/Themed";
import MyInput from "../../components/themed/MyInput";
import MyButton from "../../components/themed/MyButton";
import MyText from "../../components/themed/MyText";

const RegisterPage = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pendingVerifaication, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const fullNameRef = useRef<TextInput>(null);
  const emailAddressRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const getPasswordInputStyle = () => {
    if (confirmPassword.length > 0 && password !== confirmPassword) {
      return styles.inputMismatch;
    } else {
      return styles.inputField;
    }
  };

  const nameParser = (name: string) => {
    const names = name.split(" ");
    const firstName = names[0];
    const lastName = names.slice(1).join(" ");
    return { firstName, lastName };
  };

  const onSignupPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const { firstName, lastName } = nameParser(fullName);
      // Create a new user on Clerk

      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      // Send a verification email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change UI to verify email
      setPendingVerification(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  const onCancelVerificationPress = () => {
    setPendingVerification(false);
    setCode("");
  };
  const theme = useColorScheme();
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerBackVisible: !pendingVerifaication }} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={60}
        style={styles.avoidingView}
      >
        <Image
          source={
            theme === "dark"
              ? require("../../assets/images/quotes-icon-dark.png")
              : require("../../assets/images/quotes-icon.png")
          }
          style={{ width: "50%", maxHeight: 100, alignSelf: "center" }}
          resizeMode="contain"
        />
        <View style={{ paddingBottom: 20 }}>
          <MyText
            type="title"
            style={{
              textAlign: "center",
            }}
          >
            Create an account
          </MyText>
        </View>
        <Spinner visible={loading} />

        {!pendingVerifaication && (
          <>
            <MyInput
              autoCapitalize="words"
              label="Full Name"
              placeholder="John Doe"
              value={fullName}
              onChangeText={setFullName}
              ref={fullNameRef}
              returnKeyType="next"
              onSubmitEditing={() => emailAddressRef.current?.focus()}
            />
            <MyInput
              autoCapitalize="none"
              label="Email"
              placeholder="yourname@email.com"
              value={emailAddress}
              onChangeText={setEmailAddress}
              ref={emailAddressRef}
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
            />
            <MyInput
              secureTextEntry
              label="Password"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              style={getPasswordInputStyle()}
              ref={passwordRef}
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordRef.current?.focus()}
            />
            <MyInput
              secureTextEntry
              label="Confirm Password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={getPasswordInputStyle()}
              ref={confirmPasswordRef}
              returnKeyType="done"
              onSubmitEditing={onSignupPress}
            />

            <View style={{ height: 20 }}></View>
            <MyButton type="primary" onPress={onSignupPress} label="Sign up" />
            <MyButton type="secondary" label="Cancel" onPress={router.back} />
          </>
        )}

        {pendingVerifaication && (
          <>
            <View>
              <MyInput
                value={code}
                placeholder="Code..."
                style={styles.inputField}
                onChangeText={setCode}
                keyboardType="number-pad"
              />
            </View>
            <MyButton
              onPress={onPressVerify}
              label="Verify Email"
              type="primary"
            />
            <MyButton
              onPress={onCancelVerificationPress}
              label="Cancel"
              type="secondary"
            />
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  avoidingView: {
    flex: 1,
    justifyContent: "center",
  },
  inputField: {},
  inputMismatch: { borderColor: "red" },
  button: {},
});
