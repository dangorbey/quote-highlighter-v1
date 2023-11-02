import { Stack } from "expo-router";

const PublicLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen
        name="register"
        options={{ headerTitle: "Create an Account", headerShown: false }}
      />
      <Stack.Screen name="reset" options={{ headerTitle: "Reset Password" }} />
      <Stack.Screen
        name="email"
        options={{ headerTitle: "Login with Email", headerShown: false }}
      />
    </Stack>
  );
};

export default PublicLayout;
