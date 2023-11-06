import {
  Text,
  StyleSheet,
  SafeAreaView,
  LayoutChangeEvent,
  ImageBackground,
  Platform,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import MyText from "../../components/themed/MyText";
import QuoteText from "../../components/themed/QuoteText";
import MyButton from "../../components/themed/MyButton";
import { QuoteBG } from "../../components/QuoteBG";
import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import { TextEditor } from "../../components/TextEditor";
import Highlighter from "../../components/Highlighter";
import { View } from "../../components/themed/Themed";
import Quotes from "../../constants/Quotes";

const CreatePage = () => {
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * Quotes.length);
    return Quotes[randomIndex].text;
  };

  const [canvasWidth, setCanvasWidth] = useState<number>(300);
  const [canvasHeight, setCanvasHeight] = useState<number>(300);
  const viewRef = useRef<ImageBackground>(null);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setCanvasWidth(width);
    setCanvasHeight(height);
  }, []);

  useEffect(() => {
    console.log("Height: " + canvasHeight, "Width: " + canvasWidth);
  }, [canvasHeight, canvasWidth]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [clearHighlights, setClearHighlights] = useState(false);
  const [myAspectRatio, setmyAspectRatio] = useState({ aspectRatio: "1 / 1" });

  function handleModalOpen() {
    setIsModalVisible(true);
  }
  function handleModalClose() {
    setIsModalVisible(false);
  }

  function handleSave(newQuote: string) {
    setCreateQuote(newQuote); // Updating the quote

    setIsModalVisible(false); // Closing the modal after saving
  }

  const onClearHighlightsDone = () => {
    setClearHighlights(false);
  };

  const [createQuote, setCreateQuote] = useState(getRandomQuote());

  const shareDummyImage = async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: "jpg",
        quality: 0.9,
      });

      // Check if sharing is available
      const isSharingAvailable = await Sharing.isAvailableAsync();
      if (!isSharingAvailable) {
        alert("Sharing is not available on this device.");
        return;
      }

      // Share the image
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error(error);
      alert("An error occurred while capturing or sharing the image.");
    }
  };

  function handleClearHighlights() {
    setClearHighlights(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <MyText type="title">Style Your Quote</MyText>
        <MyText type="quote">
          Tap on words to <QuoteText type="highlight">highlight</QuoteText>{" "}
          them!
        </MyText>
      </View>
      <View style={styles.edit}>
        <View style={styles.padding}>
          <View
            style={[styles.frame, myAspectRatio]}
            onLayout={onLayout}
            ref={viewRef}
          >
            <ImageBackground
              source={require("../../assets/images/paper-bg-01.jpg")}
              resizeMode="cover"
              style={styles.captureView}
            >
              <View style={styles.overlayTextContainer}>
                {createQuote && (
                  <Highlighter
                    key={createQuote}
                    quote={createQuote}
                    clearHighlights={clearHighlights}
                    onClearHighlightsDone={onClearHighlightsDone}
                  />
                )}
              </View>
              <QuoteBG width={canvasWidth} height={canvasHeight} />
            </ImageBackground>
          </View>
        </View>
      </View>
      <View style={styles.buttons}>
        <MyButton
          label="Edit"
          type="primary"
          iconName="pencil"
          onPress={handleModalOpen}
          style={{ paddingHorizontal: 10, width: "30%" }}
        />
        <MyButton
          label="Share"
          type="primary"
          iconName="share"
          onPress={shareDummyImage}
          style={{ paddingHorizontal: 10, width: "30%" }}
        />
        <MyButton
          label="Clear"
          type="secondaryStroke"
          iconName="close-circle-outline"
          onPress={handleClearHighlights}
          style={{ paddingHorizontal: 10, width: "30%" }}
        />
        <MyButton
          label="1 / 1"
          type="secondary"
          iconName="expand-outline"
          onPress={() => setmyAspectRatio({ aspectRatio: "1 / 1" })}
          style={{ paddingHorizontal: 10, width: "30%" }}
        />
        <MyButton
          label="4 / 5"
          type="secondary"
          iconName="expand-outline"
          onPress={() => setmyAspectRatio({ aspectRatio: "4 / 5" })}
          style={{ paddingHorizontal: 10, width: "30%" }}
        />
        <MyButton
          label="9 / 16"
          type="secondary"
          iconName="expand-outline"
          onPress={() => setmyAspectRatio({ aspectRatio: "9 / 16" })}
          style={{ paddingHorizontal: 10, width: "30%" }}
        />
      </View>
      <TextEditor
        quote={createQuote}
        isVisible={isModalVisible}
        onClose={handleModalClose}
        onSave={handleSave}
      />
    </SafeAreaView>
  );
};

export default CreatePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 0 : 40,
  },
  header: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#fff",
    padding: 10,
    gap: 10,
    borderBottomColor: "#bbbbbb",
    borderBottomWidth: 0.5,
  },
  edit: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "tomato",
    padding: 10,
  },
  padding: {
    padding: 4,
    backgroundColor: "#fff",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  frame: {
    width: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
    height: "auto",

    backgroundColor: "#dcdbda",
    alignItems: "center",
    justifyContent: "center",

    aspectRatio: 1 / 1,
    // aspectRatio: 4 / 5,
    // aspectRatio: 9 / 16,
  },
  captureView: {
    flex: 1,
  },
  overlayTextContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    backgroundColor: "transparent",
    padding: 25,
  },
  buttons: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    justifyContent: "space-around",
    borderTopColor: "#bbbbbb",
    borderTopWidth: 0.5,
    // backgroundColor: "orange",
  },
});
