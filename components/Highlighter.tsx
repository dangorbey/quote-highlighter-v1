import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
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

  const toggleHighlight = (index: number) => {
    setWords(
      words.map((wordState, i) => {
        if (i === index) {
          return { ...wordState, highlighted: !wordState.highlighted };
        }
        return wordState;
      })
    );
  };

  const renderWord = (wordState: WordState, index: number) => {
    return (
      <TouchableOpacity
        key={`word-${index}`}
        onPress={() => toggleHighlight(index)}
      >
        <QuoteText type={wordState.highlighted ? "highlight" : "quote"}>
          {wordState.word + " "}
        </QuoteText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.quoteBox}>{words.map(renderWord)}</View>
    </View>
  );
};

export default Highlighter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // paddingHorizontal: 40,
  },
  quoteBox: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
