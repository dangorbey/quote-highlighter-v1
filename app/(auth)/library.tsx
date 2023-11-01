import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TextEditor } from "../../components/TextEditor";

const LibraryPage = () => {
  const { user } = useUser();

  const getName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user?.firstName} ${user?.lastName}`;
    } else if (user?.firstName) {
      return user?.firstName;
    } else if (user?.lastName) {
      return user?.lastName;
    } else {
      return user?.emailAddresses[0].emailAddress;
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showAppOptions, setShowAppOptions] = useState(false);

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>
        Welcome, {getName()}
      </Text>
      <Link href="/create" asChild>
        <TouchableHighlight style={styles.button}>
          <View style={styles.buttonLayout}>
            <Ionicons name="add-circle" color={"#fff"} size={20} />
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Create a Quote
            </Text>
          </View>
        </TouchableHighlight>
      </Link>
    </View>
  );
};

export default LibraryPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginVertical: 20,
    borderRadius: 4,
    padding: 15,
    backgroundColor: "#6c47ff",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonLayout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
