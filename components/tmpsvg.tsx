import React, { useState, useEffect } from "react";
import { View, Dimensions } from "react-native";
import Svg, {
  G,
  Image,
  Rect,
  Line,
  Text,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

const CreateSVGCanvas = () => {
  const fontSize = 18;
  // Replace '../assets/fonts/Fanwood.otf' and '../assets/images/paper-bg-01.jpg' with the actual paths to your assets.
  const paperBg = require("../assets/images/paper-bg-01.jpg");

  // Calculate canvas dimensions
  const [dimensions, setDimensions] = useState({
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  });

  const lorem = `...`; // Your long Lorem Ipsum text

  // This useEffect is only necessary if you need to recalculate dimensions on resize
  useEffect(() => {
    // Listen for changes in dimension and update state accordingly
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setDimensions({ width: window.width, height: window.height });
    });
    return () => subscription?.remove();
  }, []);

  const charactersPerLine = Math.floor(dimensions.width / (fontSize * 0.6)); // Adjust as needed for your font
  const lines = lorem.match(new RegExp(`.{1,${charactersPerLine}}`, "g")) || [];

  return (
    <View style={{ flex: 1 }}>
      <Svg
        height="100%"
        width="100%"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      >
        <Defs>
          <LinearGradient id="grad1" x1="0%" y1="0%" x2="33%" y2="0%">
            <Stop offset="0%" stopColor="#3f38291f" />
            <Stop offset="100%" stopColor="#00000001" />
          </LinearGradient>
        </Defs>
        <Image
          href={paperBg}
          x="0"
          y="0"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
        />
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad1)" />
        <G>
          <Line
            x1="25"
            y1="30"
            x2={dimensions.width - 25}
            y2="30"
            stroke="#757575"
            strokeWidth="0.5"
          />
          <Line
            x1="25"
            y1={dimensions.height - 30}
            x2={dimensions.width - 25}
            y2={dimensions.height - 30}
            stroke="#757575"
            strokeWidth="0.5"
          />
          {lines.map((line, index) => (
            <Text
              key={index}
              x="0"
              y={4 + index * (fontSize + 5)}
              fontSize={fontSize}
              fillOpacity="0.05"
              fontFamily="Fanwood" // Make sure to link your custom fonts as per react-native-svg documentation
            >
              {line}
            </Text>
          ))}
        </G>
      </Svg>
    </View>
  );
};

export default CreateSVGCanvas;
