import React, { useCallback, useState } from "react";
import {
  Blur,
  Canvas,
  Fill,
  Text,
  useFont,
  useImage,
  Image,
  LinearGradient,
  vec,
  Rect,
  Line,
  BlendMode,
} from "@shopify/react-native-skia";

type QuoteBGProps = {
  width: number;
  height: number;
};

export const QuoteBG = ({ width, height }: QuoteBGProps) => {
  // const image = useImage(require("../assets/images/paper-bg-01.jpg"));

  const fontSize = 20;
  const font = useFont(require("../assets/fonts/Fanwood.otf"), fontSize);
  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis sem orci. Donec eu sem sapien. Fusce iaculis ipsum sed ipsum suscipit, vel venenatis neque bibendum. Vestibulum eget cursus nisi, vel feugiat tortor. Morbi imperdiet malesuada tincidunt. Duis sed ante pretium, dapibus ligula vitae, malesuada justo. Nulla hendrerit, diam ac ornare convallis, tellus orci semper nisl, in vulputate erat nisi placerat enim. Proin non ultrices eros, ac mattis lorem. Proin pharetra sem nec velit pellentesque lacinia. Suspendisse vitae consectetur enim, eu malesuada sem. Maecenas sit amet facilisis nulla. Donec eget augue a lacus porta fermentum. Maecenas efficitur tortor id lacus auctor, vel efficitur erat porttitor. Proin nec ante vitae mi consectetur lacinia. Etiam pellentesque volutpat nunc vitae congue. Duis sed ante pretium, dapibus ligula vitae, malesuada justo. Nulla hendrerit, diam ac ornare convallis, tellus orci semper nisl, in vulputate erat nisi placerat enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis sem orci. Donec eu sem sapien. Fusce iaculis ipsum sed ipsum suscipit, vel venenatis neque bibendum. Vestibulum eget cursus nisi, vel feugiat tortor. Morbi imperdiet malesuada tincidunt. Duis sed ante pretium, dapibus ligula vitae, malesuada justo. Nulla hendrerit, diam ac ornare convallis, tellus orci semper nisl, in vulputate erat nisi placerat enim. Proin non ultrices eros, ac mattis lorem. Proin pharetra sem nec velit pellentesque lacinia. Suspendisse vitae consectetur enim, eu malesuada sem. Maecenas sit amet facilisis nulla. Donec eget augue a lacus porta fermentum. Maecenas efficitur tortor id lacus auctor, vel efficitur erat porttitor. Proin nec ante vitae mi consectetur lacinia. Etiam pellentesque volutpat nunc vitae congue. Duis sed ante pretium, dapibus ligula vitae, malesuada justo. Nulla hendrerit, diam ac ornare convallis, tellus orci semper nisl, in vulputate erat nisi placerat enim.";

  const renderTextLines = () => {
    let yPosition = 4;

    if (width <= 0 || fontSize <= 0) {
      console.error('Invalid "width" or "fontSize" values:', width, fontSize);
      return null; // Or handle the error as appropriate for your application
    }

    const charactersPerLine = Math.floor(width / (fontSize * 0.3)); // Estimate
    if (charactersPerLine <= 0) {
      console.error(
        'Computed "charactersPerLine" is invalid:',
        charactersPerLine
      );
      return null; // Or handle the error as appropriate for your application
    }

    const regex = new RegExp(`.{1,${charactersPerLine}}`, "g");
    const lines = lorem.match(regex) || [];

    return lines.map((line, index) => (
      <Text
        opacity={0.05}
        key={index}
        x={-width}
        y={yPosition + index * (fontSize + 4)} // Increment y position for each line
        text={line}
        font={font}
        transform={[{ scaleX: -1 }]}
        blendMode={"multiply"}
      >
        <Blur blur={1} />
      </Text>
    ));
  };

  // const renderTextLines = () => {
  //   return (
  //     <Text
  //       x={0}
  //       y={fontSize}
  //       text={lorem}
  //       // Font is optional
  //       font={font}
  //     />
  //   );
  // };

  return (
    <Canvas style={{ flex: 1, width: width, height: height, zIndex: 1 }}>
      <Rect x={0} y={0} width={width} height={height} blendMode="multiply">
        <LinearGradient
          start={vec(0, 0)}
          end={vec(width / 3, -4)}
          colors={["#3f38291f", "#00000001"]}
        />
      </Rect>

      <Line
        p1={vec(25, 30)}
        p2={vec(width - 25, 30)}
        color="#757575"
        style="stroke"
        strokeWidth={0.5}
      />
      <Line
        p1={vec(25, height - 30)}
        p2={vec(width - 25, height - 30)}
        color="#757575"
        style="stroke"
        strokeWidth={0.5}
      />
      {renderTextLines()}
    </Canvas>
  );
};
