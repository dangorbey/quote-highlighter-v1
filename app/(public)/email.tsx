import { useSignIn } from "@clerk/clerk-expo";
import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
  Image,
} from "react-native";
import { MyButton } from "../../components/myButton";
import { ScrollView } from "react-native-gesture-handler";

const KeyboardAvoidingComponent = () => {
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
    <KeyboardAvoidingView
      keyboardVerticalOffset={50}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled
      style={styles.container}
    >
      <ScrollView style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <Image
              source={require("../../assets/images/quotes-icon.png")}
              style={{ width: 150, height: 200, alignSelf: "center" }}
              resizeMode="contain"
            />
            <Text
              style={{
                textAlign: "center",
                marginVertical: 10,
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              You're one step closer to creating amazing quotes!
            </Text>
            <Text style={styles.label}>Email</Text>
            <TextInput
              autoCapitalize="none"
              placeholder="dan@email.com"
              value={emailAddress}
              onChangeText={setEmailAddress}
              style={styles.inputField}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.inputField}
            />
            <MyButton
              label={"Login"}
              styleType="yellow"
              onPress={onSignInPress}
            />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderColor: "#FFDD00",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 20,
    borderWidth: 2,
  },
});

export default KeyboardAvoidingComponent;
