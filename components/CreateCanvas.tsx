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
} from "@shopify/react-native-skia";
import { LayoutChangeEvent } from "react-native";

export const CreateCanvas = () => {
  const fontSize = 18;
  const font = useFont(require("../assets/fonts/Fanwood.otf"), fontSize);
  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis sem orci. Donec eu sem sapien. Fusce iaculis ipsum sed ipsum suscipit, vel venenatis neque bibendum. Vestibulum eget cursus nisi, vel feugiat tortor. Morbi imperdiet malesuada tincidunt. Duis sed ante pretium, dapibus ligula vitae, malesuada justo. Nulla hendrerit, diam ac ornare convallis, tellus orci semper nisl, in vulputate erat nisi placerat enim. Proin non ultrices eros, ac mattis lorem. Proin pharetra sem nec velit pellentesque lacinia. Suspendisse vitae consectetur enim, eu malesuada sem. Maecenas sit amet facilisis nulla. Donec eget augue a lacus porta fermentum. Maecenas efficitur tortor id lacus auctor, vel efficitur erat porttitor. Proin nec ante vitae mi consectetur lacinia. Etiam pellentesque volutpat nunc vitae congue. Duis sed ante pretium, dapibus ligula vitae, malesuada justo. Nulla hendrerit, diam ac ornare convallis, tellus orci semper nisl, in vulputate erat nisi placerat enim.";

  const image = useImage(require("../assets/images/paper-bg-01.jpg"));

  const [canvasWidth, setCanvasWidth] = useState<number | null>(null);
  const [canvasHeight, setCanvasHeight] = useState<number | null>(null);

  const renderTextLines = () => {
    let yPosition = 4;

    const charactersPerLine = Math.floor(canvasWidth! / (fontSize * 0.3)); // Estimate
    const regex = new RegExp(`.{1,${charactersPerLine}}`, "g");
    const lines = lorem.match(regex) || [];

    return lines.map((line, index) => (
      <Text
        opacity={0.05}
        key={index}
        x={-canvasWidth!}
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

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setCanvasWidth(width);
    setCanvasHeight(height);
  }, []);

  return (
    <Canvas style={{ flex: 1 }} onLayout={onLayout}>
      {canvasWidth && canvasHeight && (
        <>
          {/* <Image
            image={image}
            fit="contain"
            x={0}
            y={0}
            width={canvasWidth * 5}
            height={canvasHeight * 5}
          /> */}
          {/* <Rect
            x={0}
            y={0}
            width={canvasWidth}
            height={canvasHeight}
            color="#dcdbda"
            blendMode="overlay"
          /> */}
          <Rect
            x={0}
            y={0}
            width={canvasWidth}
            height={canvasHeight}
            blendMode="multiply"
          >
            <LinearGradient
              start={vec(0, 0)}
              end={vec(canvasWidth / 4, -4)}
              colors={["#3f38291f", "#00000001"]}
            />
          </Rect>
          <Line
            p1={vec(25, 30)}
            p2={vec(canvasWidth - 25, 30)}
            color="#757575"
            style="stroke"
            strokeWidth={0.5}
          />
          <Line
            p1={vec(25, canvasHeight - 30)}
            p2={vec(canvasWidth - 25, canvasHeight - 30)}
            color="#757575"
            style="stroke"
            strokeWidth={0.5}
          />
        </>
      )}
      {canvasWidth && renderTextLines()}
    </Canvas>
  );
};
