import {
  View,
  Text,
  StyleSheet,
  Button,
  Pressable,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import React, { useState } from "react";
import { useSignIn } from "@clerk/clerk-expo";
import Spinner from "react-native-loading-spinner-overlay";
import { TextInput } from "react-native-gesture-handler";
import { Link, router } from "expo-router";
import { OAuthButtons } from "../../components/OAuth";
import { MyButton } from "../../components/myButton";

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
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/quotes-icon-text.png")}
          style={{ width: 250, height: 200 }}
          resizeMode="contain"
        />
      </View>
      <Text
        style={{
          textAlign: "center",
          marginVertical: 10,
          fontWeight: "bold",
          fontSize: 18,
        }}
      >
        Sign in to save your designs.
      </Text>
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
      <MyButton
        label={"Login"}
        styleType="yellow"
        onPress={() => router.push("/email")}
      />
      <Text style={{ textAlign: "center", marginVertical: 10 }}>
        --- OR ---
      </Text>
      <MyButton
        label={"Create an Account"}
        styleType="yellowOutline"
        onPress={() => router.push("/register")}
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
    backgroundColor: "#F7F5EE",
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
  imageContainer: {
    // flex: 1,
    // height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    // backgroundColor: "#fff",
  },
  btn: {
    backgroundColor: "#FFDD00",
    width: "100%",
    height: 50,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FFDD00",
  },
});
