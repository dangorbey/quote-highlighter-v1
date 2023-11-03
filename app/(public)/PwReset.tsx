import { Image, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState } from "react";
import { Stack, router } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";
import { View } from "../../components/themed/Themed";
import MyInput from "../../components/MyInput";
import MyButton from "../../components/MyButton";
import MyText from "../../components/MyText";
import { styles } from "./reset";

export const PwReset = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const { signIn, setActive } = useSignIn();

  const theme = useColorScheme();
  //
  // Request a passowrd reset code by email
  const onRequestReset = async () => {
    try {
      if (signIn) {
        await signIn.create({
          strategy: "reset_password_email_code",
          identifier: emailAddress,
        });
        setSuccessfulCreation(true);
      }
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  // Reset the password with the code and the new password
  const onReset = async () => {
    try {
      if (signIn) {
        const result = await signIn.attemptFirstFactor({
          strategy: "reset_password_email_code",
          code,
          password,
        });
        console.log(result);
        alert("Password reset successfully");

        // Set the user session active, which will log in the user automatically
        await setActive({ session: result.createdSessionId });
      }
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  const onCancelVerificationPress = () => {
    setSuccessfulCreation(false);
    setCode("");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerBackVisible: !successfulCreation }} />
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
        {!successfulCreation && (
          <>
            <View style={{ paddingBottom: 20 }}>
              <MyText
                type="title"
                style={{
                  textAlign: "center",
                }}
              >
                Forgot your password?
              </MyText>
            </View>
            <MyInput
              label="Email Address"
              autoCapitalize="none"
              placeholder="simon@galaxies.dev"
              value={emailAddress}
              onChangeText={setEmailAddress}
            />

            <MyButton
              onPress={onRequestReset}
              label="Send Reset Email"
              type="primary"
            />
            <MyButton onPress={router.back} label="Cancel" type="secondary" />
          </>
        )}

        {successfulCreation && (
          <>
            <View style={{ paddingBottom: 20 }}>
              <MyText
                type="title"
                style={{
                  textAlign: "center",
                }}
              >
                Check your email!
              </MyText>
            </View>
            <MyInput
              label="Code"
              value={code}
              placeholder="Code..."
              onChangeText={setCode}
              keyboardType="number-pad"
            />
            <MyInput
              label="New Password"
              placeholder="New password"
              value={password}
              onChangeText={setPassword}
              keyboardType="default"
              secureTextEntry
            />
            <View style={{ height: 20 }}></View>
            <MyButton
              onPress={onReset}
              label="Set New Password"
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
