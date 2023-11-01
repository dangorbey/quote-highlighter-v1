import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Button, Pressable } from "react-native";
import { Slot, Stack, Tabs, router } from "expo-router";

export const LogoutButton = () => {
  const { signOut } = useAuth();

  const doLogout = () => {
    signOut();
  };

  return (
    <Pressable onPress={doLogout} style={{ marginRight: 10 }}>
      <Ionicons name="log-out-outline" size={24} color="#fff" />
    </Pressable>
  );
};

const TabsPage = () => {
  const { isSignedIn } = useAuth();
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "#6c47ff",
        },
        headerTintColor: "#fff",
      }}
    >
      <Tabs.Screen
        name="library"
        options={{
          headerTitle: "Library",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          tabBarLabel: "Library",
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="create"
        options={{
          headerTitle: "Create a Quote",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          ),
          // tabBarShowLabel: false,
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "My Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
          tabBarLabel: "My Profile",
          headerRight: () => <LogoutButton />,
        }}
        redirect={!isSignedIn}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            router.push("/profile"); // <-- Here you put the name where the chat component is declared
          },
        })}
      />
    </Tabs>
  );
};

export default TabsPage;
