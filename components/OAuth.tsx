import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";
import { ComponentProps, useCallback } from "react";
import { Text, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import type { OAuthStrategy } from "@clerk/types";
import { MyButton } from "./myButton";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

WebBrowser.maybeCompleteAuthSession();

interface OAuthProps {
  authStrat: OAuthStrategy;
  buttonName: string;
  buttonLogo: IoniconName;
}

export function OAuthButtons({
  authStrat,
  buttonName,
  buttonLogo,
}: OAuthProps) {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: authStrat });

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        if (setActive) {
          setActive({ session: createdSessionId });
        }
      } else {
        // not sure what this is for? it says to use for MFA?
      }
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  }, []);

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name={buttonLogo} size={14} />
      <Text style={styles.buttonText}>{buttonName}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: "#6c47ff",
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  button: {
    marginVertical: 5,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    // backgroundColor: "#6c47ff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    borderColor: "#000",
    borderWidth: 2,
    width: "90%",
    alignSelf: "center",
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});
