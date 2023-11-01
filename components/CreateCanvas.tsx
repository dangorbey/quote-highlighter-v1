import React from "react";
import Svg, { Text } from "react-native-svg";

interface CreateCanvasProps {
  myQuote: string;
}

export const CreateCanvas = ({ myQuote }: CreateCanvasProps) => {
  const fontSize = 20;
  const canvasWidth = 300; // Adjust as necessary
  const canvasHeight = 300; // Adjust as necessary
  const words = myQuote.split(" ");
  let currentLine = "";
  let y = fontSize;
  const maxWidth = 200;
  const lines = [];

  words.forEach((word) => {
    const testLine = currentLine + word + " ";

    if (testLine.length > maxWidth && currentLine.length > 0) {
      lines.push(currentLine);
      currentLine = word + " ";
      y += fontSize;
    } else {
      currentLine += word + " ";
    }
  });

  // Don't forget the last line
  lines.push(currentLine);

  return (
    <Svg width={canvasWidth} height={canvasHeight}>
      {lines.map((line, index) => (
        <Text
          key={index}
          x={canvasWidth / 2}
          y={fontSize + fontSize * index}
          fontSize={fontSize}
          textAnchor="middle" // Centers the text horizontally
          // Optional: specify font family, weight, etc.
          fontFamily="Fanwood"
          fontWeight="bold"
        >
          {line}
        </Text>
      ))}
    </Svg>
  );
};
