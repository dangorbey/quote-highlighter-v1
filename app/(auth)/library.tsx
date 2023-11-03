import { StyleSheet } from "react-native";
import { View } from "../../components/themed/Themed";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import MyButton from "../../components/themed/MyButton";
import MyText from "../../components/themed/MyText";
import { HighlightCanvas } from "../../components/HighlightCanvas";

const LibraryPage = () => {
  const { user } = useUser();

  const getName = () => {
    if (user?.firstName) {
      return user?.firstName;
    } else {
      return user?.emailAddresses[0].emailAddress;
    }
  };

  return (
    <View style={styles.container}>
      <MyText type="title">Hi {getName()}!</MyText>
      <MyButton
        label="Create a quote"
        type="primary"
        iconName="add-circle"
        onPress={() => router.push("/create")}
      />
    </View>
  );
};

export default LibraryPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
});
