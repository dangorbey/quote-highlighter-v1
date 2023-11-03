import { StyleSheet } from "react-native";
import { View } from "../../components/themed/Themed";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import MyButton from "../../components/themed/MyButton";
import MyText from "../../components/themed/MyText";

export const ProfilePage = () => {
  const { signOut } = useAuth();

  const doLogout = () => {
    signOut();
  };

  return (
    <View style={styles.container}>
      <MyText type="title">Profile Page</MyText>

      <MyButton
        onPress={doLogout}
        label="Logout"
        type="primary"
        iconName="log-out"
      />
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
});
