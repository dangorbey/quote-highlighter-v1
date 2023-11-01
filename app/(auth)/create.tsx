import {
  View,
  Text,
  Alert,
  Button,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { CreateCanvas } from "../../components/CreateCanvas";
import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import { TextEditor } from "../../components/TextEditor";

const CreatePage = () => {
  const { user } = useUser();

  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const NO_WIDTH_SPACE = "​"; // This is a special char you should copy and paste, not an empty string!

  interface TextProps {
    children: React.ReactNode;
  }

  const Example: React.FC = () => {
    const highlight = (string: string) =>
      string.split(" ").map((word, i) => (
        <Text key={i}>
          <Text style={styles.highlight}>{word} </Text>
          {NO_WIDTH_SPACE}
        </Text>
      ));

    return (
      <Text style={styles.text}>
        Thus in love the free-lovers say: 'Let us have the splendor of offering
        ourselves without the peril of committing ourselves; let us see whether{" "}
        {highlight("one cannot commit suicide an unlimited number of times.")}
      </Text>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 10 }}>
        Create a Quote
      </Text>
      {/* {quote && <Text>{quote}</Text>} */}

      {/* <CreateCanvas myQuote={quote} /> */}

      <View ref={viewRef} style={styles.captureView}>
        <View style={styles.contentView}>
          <CreateCanvas />
          <View style={styles.overlayTextContainer}>
            <Text style={styles.text}>{quote}</Text>
          </View>
        </View>
      </View>

      <View style={{ flexDirection: "row", gap: 20 }}>
        <TouchableOpacity style={styles.shareButton} onPress={handleModalOpen}>
          <Text style={styles.shareButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton} onPress={shareDummyImage}>
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
        {/* <Button onPress={getUserInput} title="Edit Quote" /> */}
        {/* <Button onPress={shareDummyImage} title="Save Quote" /> */}
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  captureView: {
    aspectRatio: 1 / 1,
    width: 300,
    height: 300,
    justifyContent: "center",
    alignContent: "center",
    // alignItems: "center",
    overflow: "hidden", // Ensure no content overflows
  },

  contentView: {
    flex: 1,
    justifyContent: "center",
    position: "relative",
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
  },

  text: {
    fontFamily: "Fanwood",
    fontSize: 18,
    color: "#000",
    padding: 25,
  },
  highlight: {
    flex: 0,
    backgroundColor: "yellow",
  },
  shareButton: {
    backgroundColor: "#6c47ff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  shareButtonText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});
