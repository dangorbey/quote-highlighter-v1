import {
  Text,
  StyleSheet,
  Button,
  Pressable,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
  useColorScheme,
} from "react-native";
import { View } from "../../components/themed/Themed";
import React, { useState } from "react";
import { useSignIn } from "@clerk/clerk-expo";
import Spinner from "react-native-loading-spinner-overlay";
import { TextInput } from "react-native-gesture-handler";
import { Link, router } from "expo-router";
import { OAuthButtons } from "../../components/OAuth";
import MyButton from "../../components/themed/MyButton";
import MyText from "../../components/themed/MyText";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const theme = useColorScheme();

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />
      <View style={styles.imageContainer}>
        <Image
          source={
            theme === "dark"
              ? require("../../assets/images/quotes-icon-text-dark.png")
              : require("../../assets/images/quotes-icon-text.png")
          }
          style={{ width: 250, height: 200 }}
          resizeMode="contain"
        />
      </View>
      <MyText
        style={{
          textAlign: "center",
          marginVertical: 10,
          fontWeight: "bold",
          fontSize: 18,
        }}
      >
        Sign in to save your designs.
      </MyText>
      <OAuthButtons
        authStrat="oauth_google"
        iconName="logo-google"
        label="Sign in with Google"
        type="secondaryStroke"
      />
      {Platform.OS === "ios" && (
        <OAuthButtons
          authStrat="oauth_apple"
          iconName="logo-apple"
          label="Sign in with Apple"
          type="secondaryStroke"
        />
      )}

      <MyButton
        label={"Sign in with Email"}
        type="primary"
        onPress={() => router.push("/email")}
        iconName="mail"
      />
      <MyText style={{ textAlign: "center", marginVertical: 10 }}>
        --- or ---
      </MyText>
      <MyButton
        label={"Create an Account"}
        type="secondary"
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
    paddingHorizontal: 40,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
