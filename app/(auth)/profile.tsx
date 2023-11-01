import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";

export const LogoutButton = () => {
  const { signOut } = useAuth();

  const doLogout = () => {
    signOut();
  };

  return (
    <Pressable onPress={doLogout} style={styles.button}>
      <View style={styles.buttonLayout}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
          Logout
        </Text>
      </View>
    </Pressable>
  );
};

const ProfilePage = () => {
  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>Profile Page</Text>
      <LogoutButton />
    </View>
  );
};

export default ProfilePage;

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
});
