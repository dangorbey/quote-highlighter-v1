import { useFonts } from "expo-font";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Fanwood: require("../assets/fonts/Fanwood.otf"),
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
