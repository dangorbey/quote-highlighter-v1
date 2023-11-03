import React, { useRef, useState } from "react";
import { StyleSheet, View, PanResponder } from "react-native";
import QuoteText from "./themed/QuoteText";

interface WordState {
  word: string;
  highlighted: boolean;
}

interface HighlighterProps {
  quote: string;
}

const Highlighter: React.FC<HighlighterProps> = ({ quote }) => {
  const [words, setWords] = useState<WordState[]>(
    quote.split(" ").map((word) => ({ word, highlighted: false }))
  );

  const wordRefs = useRef<(View | null)[]>([]);
  const highlightedIndexes = useRef<Set<number>>(new Set());

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        processTouch(evt.nativeEvent.pageX, evt.nativeEvent.pageY);
      },
      onPanResponderMove: (evt) => {
        processTouch(evt.nativeEvent.pageX, evt.nativeEvent.pageY);
      },
      onPanResponderRelease: () => {
        // Once the user lifts their finger, apply the highlighted words to the state.
        setWords((currentWords) =>
          currentWords.map((word, index) => {
            if (highlightedIndexes.current.has(index)) {
              return { ...word, highlighted: !word.highlighted };
            }
            return word;
          })
        );
        highlightedIndexes.current.clear();
      },
    })
  ).current;

  const processTouch = (x: number, y: number) => {
    wordRefs.current.forEach((ref, index) => {
      ref?.measure((fx, fy, width, height, px, py) => {
        if (
          x >= px &&
          x <= px + width &&
          y >= py &&
          y <= py + height &&
          !highlightedIndexes.current.has(index)
        ) {
          highlightedIndexes.current.add(index);
          toggleHighlight(index);
        }
      });
    });
  };

  const toggleHighlight = (index: number) => {
    setWords((currentWords) =>
      currentWords.map((word, i) =>
        i === index ? { ...word, highlighted: !word.highlighted } : word
      )
    );
  };

  const renderWord = (wordState: WordState, index: number) => {
    return (
      <View
        key={`word-${index}`}
        ref={(ref) => (wordRefs.current[index] = ref)}
        collapsable={false}
      >
        <QuoteText type={wordState.highlighted ? "highlight" : "quote"}>
          {wordState.word + " "}
        </QuoteText>
      </View>
    );
  };

  return (
    <View {...panResponder.panHandlers} style={styles.container}>
      <View style={styles.quoteBox}>{words.map(renderWord)}</View>
    </View>
  );
};

export default Highlighter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  quoteBox: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
