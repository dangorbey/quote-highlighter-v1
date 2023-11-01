import { Stack } from "expo-router";

const PublicLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerTitle: "Clerk Auth" }} />
      <Stack.Screen
        name="register"
        options={{ headerTitle: "Create an Account" }}
      />
      <Stack.Screen name="reset" options={{ headerTitle: "Reset Password" }} />
    </Stack>
  );
};

export default PublicLayout;
