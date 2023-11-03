import React, { forwardRef, ReactNode } from "react";
import {
  useColorScheme,
  View as DefaultView,
  ViewProps as DefaultViewProps,
} from "react-native";
import Colors from "../../constants/Colors";

// Define the extended props including children
interface ViewProps extends DefaultViewProps {
  children?: ReactNode;
  // Any additional props go here
}

export const View = forwardRef<DefaultView, ViewProps>(
  ({ style, ...otherProps }, ref) => {
    const theme = useColorScheme();
    const backgroundColor = theme ? Colors[theme]?.background : undefined;

    // Style array to combine custom styles with the backgroundColor
    const combinedStyles = [style];
    if (backgroundColor) {
      combinedStyles.unshift({ backgroundColor });
    }

    return <DefaultView style={combinedStyles} ref={ref} {...otherProps} />;
  }
);
