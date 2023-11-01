import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import React, { useState } from "react";
import { useSignIn } from "@clerk/clerk-expo";
import Spinner from "react-native-loading-spinner-overlay";
import { TextInput } from "react-native-gesture-handler";
import { Link } from "expo-router";
import { OAuthButtons } from "../../components/OAuth";

const LoginPage = () => {
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
      <Spinner visible={loading} />

      <Text
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 24,
          marginBottom: 10,
        }}
      >
        Quote Highlighter
      </Text>

      <Text>Email</Text>
      <TextInput
        autoCapitalize="none"
        placeholder="dan@email.com"
        value={emailAddress}
        onChangeText={setEmailAddress}
        style={styles.inputField}
      />
      <Text>Password</Text>
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.inputField}
      />

      <Button onPress={onSignInPress} title="Login" color={"#6c47ff"} />

      <Link href="/reset" asChild>
        <Pressable style={styles.button}>
          <Text>Forgot Password?</Text>
        </Pressable>
      </Link>
      <Link href="/register" asChild>
        <Pressable style={styles.button}>
          <Text>Create Account</Text>
        </Pressable>
      </Link>
      <OAuthButtons
        authStrat="oauth_google"
        buttonLogo="logo-google"
        buttonName="Sign in with Google"
      />
      <OAuthButtons
        authStrat="oauth_apple"
        buttonLogo="logo-apple"
        buttonName="Sign in with Apple"
      />
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderColor: "#6c47ff",
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  button: {
    margin: 8,
    alignItems: "center",
  },
});
