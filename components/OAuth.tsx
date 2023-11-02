import React, { useCallback } from "react";
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";
import type { OAuthStrategy } from "@clerk/types";

import MyButton, { MyButtonProps } from "./MyButton";

interface OAuthProps extends MyButtonProps {
  authStrat: OAuthStrategy;
}

export function OAuthButtons({ authStrat, ...myButtonProps }: OAuthProps) {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: authStrat });

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      // If there's a session created, use setActive if available
      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId });
      }
      // Include any additional logic for other cases such as MFA here...
    } catch (err: any) {
      // Handle any errors that occur during the OAuth flow
      alert(err.errors[0].message);
    }
  }, [startOAuthFlow]);

  return <MyButton {...myButtonProps} onPress={onPress} />;
}
