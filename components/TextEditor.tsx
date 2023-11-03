import {
  Modal,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { View } from "./themed/Themed";
import Colors from "../constants/Colors";
import MyText from "./themed/MyText";
import { HighlightCanvas } from "./HighlightCanvas";
import MyInput from "./themed/MyInput";
import ParagraphInput from "./ParagraphInput";

type TextEditorProps = {
  quote: string;
  isVisible: boolean;
  onClose: () => void;
  onSave: (newQuote: string) => void;
};

export function TextEditor({
  quote,
  isVisible,
  onClose,
  onSave,
}: TextEditorProps) {
  const [localQuote, setLocalQuote] = useState(quote);

  useEffect(() => {
    setLocalQuote(quote); // Reset local quote when the prop changes
  }, [quote]);

  return (
    <Modal
      animationType="slide"
      presentationStyle="overFullScreen"
      transparent={true}
      visible={isVisible}
    >
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Pressable onPress={onClose}>
            <MyText style={styles.cancel}>Cancel</MyText>
          </Pressable>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => onSave(localQuote)}
            style={styles.saveButtonContainer}
          >
            <View
              style={{ flex: 1, width: 100, backgroundColor: "transparent" }}
            >
              <HighlightCanvas />
            </View>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.textBox}>
          <ParagraphInput
            // style={styles.input}
            multiline
            onChangeText={setLocalQuote}
            value={localQuote}
            autoFocus={true}
            keyboardAppearance="default"
          />
          {/* {children} */}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: "93%",
    width: "100%",
    backgroundColor: "#fff",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    position: "absolute",
    bottom: 0,
  },
  titleContainer: {
    height: 60,
    // backgroundColor: Colors.dark.secondary,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },

  cancel: {
    fontWeight: "bold",
    fontSize: 16,
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
  textBox: {
    paddingHorizontal: 20,
  },
  input: {
    width: "100%",
    height: "100%",
  },
  saveButtonContainer: {
    width: 100,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  saveButtonText: {
    position: "absolute",
    fontWeight: "bold",
    fontSize: 16,
    // color: "#fff", // Assuming you want the text to be white to contrast with the HighlightCanvas
    textAlign: "center",
    backgroundColor: "transparent", // Ensure the background doesn't cover the canvas
    padding: 10,
    borderRadius: 20,
  },
});
