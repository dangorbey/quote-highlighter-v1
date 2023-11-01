import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TextInput } from "react-native-gesture-handler";
import { useEffect, useState } from "react";

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
            <Text style={styles.cancel}>Cancel</Text>
          </Pressable>
          <Pressable onPress={() => onSave(localQuote)}>
            <Text style={styles.save}>Save</Text>
          </Pressable>
        </View>
        <View style={styles.textBox}>
          <TextInput
            style={styles.input}
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
    backgroundColor: "#fff",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  save: {
    color: "#6c47ff",
    fontWeight: "bold",
    fontSize: 16,
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    height: "100%",
  },
});
