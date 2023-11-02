import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Slot, Stack, useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";

const CLERK_PUBLIC_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    console.log("isSignedIn", isSignedIn);
    // console.log("isLoaded", isLoaded);

    if (!isLoaded) return;

    const inTabsGroup = segments[0] === "(auth)";

    if (isSignedIn && !inTabsGroup) {
      console.log("signed in, not in tabs group");
      router.replace("/library");
    } else if (!isSignedIn) {
      console.log("signed out");
      router.replace("/login");
    }
  }, [isSignedIn]);

  // router.replace("/login");
  return (
    // <Stack />
    <Slot />
  );
};

const Rootlayout = () => {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLIC_KEY!} tokenCache={tokenCache}>
      <InitialLayout />
      {/* <Slot /> */}
    </ClerkProvider>
  );
};

export default Rootlayout;
