import { Pressable, StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "../../components/themed/Themed";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Link, router, useRouter } from "expo-router";
import MyButton from "../../components/themed/MyButton";
import MyText from "../../components/themed/MyText";
import quotes from "../../constants/Quotes";
import { FlatList } from "react-native-gesture-handler";

const names = ["Alice", "Bob", "Charlie"];

const LibraryPage = () => {
  const { user } = useUser();
  const router = useRouter();

  const getName = () => {
    if (user?.firstName) {
      return user?.firstName;
    }
    return user?.emailAddresses[0].emailAddress;
  };

  return (
    <View style={styles.container}>
      {/* <MyText type="title">Hi {getName()}!</MyText> */}
      <MyButton
        label="Create a quote"
        type="primary"
        iconName="add-circle"
        // onPress={() => router.push("/create")}
      />
      <FlatList
        data={quotes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.quoteContainer}
            onPress={() => {
              const quotePath = item.text;
              router.push(`/create/${quotePath}`);
            }}
          >
            <Text>{item.text}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  quoteContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 5,
  },
});

export default LibraryPage;
