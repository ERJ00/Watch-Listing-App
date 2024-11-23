import React from "react";
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

//@ts-ignore
export function CustomAlert({ visible, onClose, message }) {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#000",
    borderRadius: 10,
    alignItems: "center",
    borderColor: "#ff0000",
    borderWidth: 1,
  },
  message: {
    fontSize: 18,
    color: "#ffd",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4A0503",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderColor: "#ff0000",
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    color: "#ffd",
  },
});
