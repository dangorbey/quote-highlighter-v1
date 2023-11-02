import { useSignIn } from "@clerk/clerk-expo";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  Image,
  Pressable,
} from "react-native";
import { View } from "../../components/themed/Themed";
import MyButton from "../../components/MyButton";
import { router } from "expo-router";
import MyText from "../../components/MyText";
import { ScrollView } from "react-native-gesture-handler";
import MyInput from "../../components/MyInput";

const EmailPage = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        // keyboardVerticalOffset={60}
        style={styles.avoidingView}
      >
        <Image
          source={require("../../assets/images/quotes-icon.png")}
          style={{ width: "50%", maxHeight: 100, alignSelf: "center" }}
          resizeMode="contain"
        />
        <View style={{ paddingVertical: 20 }}>
          <MyText
            style={{
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Login with your email and password
          </MyText>
        </View>

        <MyInput
          autoCapitalize="none"
          label="Email"
          placeholder="yourname@email.com"
          value={emailAddress}
          onChangeText={setEmailAddress}
        ></MyInput>
        <MyInput
          label="Password"
          placeholder="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable onPress={() => router.replace("/reset")}>
          <MyText
            type="caption"
            style={{
              alignSelf: "flex-end",
              color: "#0070F3",
              // fontWeight: "bold",
            }}
          >
            Forgot Password?
          </MyText>
        </Pressable>

        <View style={{ height: 20 }}></View>
        <MyButton label="Login" type="primary" onPress={onSignInPress} />
        <MyButton label="Go Back" type="secondary" onPress={router.back} />
      </KeyboardAvoidingView>
    </View>
  );
};

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
  input: {
    borderWidth: 1,
    height: 40,
  },
});

export default EmailPage;
