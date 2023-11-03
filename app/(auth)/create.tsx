import { Text, ImageBackground, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { CreateCanvas } from "../../components/CreateCanvas";
import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import { TextEditor } from "../../components/TextEditor";
import { View } from "../../components/themed/Themed";
import MyButton from "../../components/themed/MyButton";
import MyText from "../../components/themed/MyText";
import Highlighter from "../../components/Highlighter";
import QuoteText from "../../components/themed/QuoteText";

const CreatePage = () => {
  const { user } = useUser();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [clearHighlights, setClearHighlights] = useState(false);

  function handleModalOpen() {
    setIsModalVisible(true); // Just closing the modal without saving
  }
  function handleModalClose() {
    setIsModalVisible(false); // Just closing the modal without saving
  }

  function handleSave(newQuote: string) {
    setQuote(newQuote); // Updating the quote

    setIsModalVisible(false); // Closing the modal after saving
  }

  const onClearHighlightsDone = () => {
    setClearHighlights(false);
  };

  const [quote, setQuote] = useState(
    `There is an entry in Baudelaire' Journal Intime that is fearful in the precision of its cynicism: "One must work, if not from taste then at least from despair. For, to reduce everything to a single truth: work is less boring than pleasure.`
  );
  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis sem orci. Donec eu sem sapien. Fusce iaculis ipsum sed ipsum suscipit, vel venenatis neque bibendum. Vestibulum eget cursus nisi, vel feugiat tortor. Morbi imperdiet malesuada tincidunt. Duis sed ante pretium, dapibus ligula vitae, malesuada justo. Nulla hendrerit, diam ac ornare convallis, tellus orci semper nisl, in vulputate erat nisi placerat enim. Proin non ultrices eros, ac mattis lorem. Proin pharetra sem nec velit pellentesque lacinia. Suspendisse vitae consectetur enim, eu malesuada sem. Maecenas sit amet facilisis nulla. Donec eget augue a lacus porta fermentum. Maecenas efficitur tortor id lacus auctor, vel efficitur erat porttitor. Proin nec ante vitae mi consectetur lacinia. Etiam pellentesque volutpat nunc vitae congue.";

  const viewRef = useRef<ImageBackground>(null);

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
    <View style={styles.container}>
      <MyText type="title">Style Your Quote</MyText>
      <MyText type="quote">
        Tap on words to <QuoteText type="highlight">highlight</QuoteText> them!
      </MyText>
      <View style={{ height: 10 }} />
      <View style={{ borderColor: "#fff", borderWidth: 4, borderRadius: 5 }}>
        <ImageBackground
          source={require("../../assets/images/paper-bg-01.jpg")}
          resizeMode="cover"
          ref={viewRef}
          style={styles.captureView}
        >
          <>
            <View style={styles.overlayTextContainer}>
              {quote && (
                <Highlighter
                  key={quote}
                  quote={quote}
                  clearHighlights={clearHighlights}
                  onClearHighlightsDone={onClearHighlightsDone}
                />
              )}
            </View>

            <CreateCanvas />
          </>
        </ImageBackground>
      </View>
      <View style={styles.buttonRow}>
        <MyButton
          label="Edit"
          type="primary"
          iconName="pencil"
          onPress={handleModalOpen}
          style={{ flex: 1 }}
        />
        <MyButton
          label="Share"
          type="primary"
          iconName="share"
          onPress={shareDummyImage}
          style={{ flex: 1 }}
        />
        <MyButton
          label="Clear"
          type="secondary"
          iconName="close-circle-outline"
          onPress={handleClearHighlights}
          style={{ flex: 1 }}
        />
      </View>
      <TextEditor
        quote={quote}
        isVisible={isModalVisible}
        onClose={handleModalClose}
        onSave={handleSave}
      />
    </View>
  );
};

export default CreatePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  captureView: {
    aspectRatio: 1 / 1,
    width: 300,
    height: 300,
    justifyContent: "center",
    alignContent: "center",
    overflow: "hidden",
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
  buttonRow: {
    width: 300,
    flexDirection: "row",
    gap: 10,
  },
});
