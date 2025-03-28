//@ts-nocheck
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export function RemoveBtnAccept({ onConfirmationAction }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onConfirmationAction}>
      <Text style={styles.text}>✔</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    width: 50,
    padding: 5,
    alignContent: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ff0000",
    borderRadius: 10,
  },

  text: {
    color: "#ffd",
    textAlign: "center",
    fontSize: 20,
  },
});
