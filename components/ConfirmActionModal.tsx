//@ts-nocheck
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

export function ConfirmActionModal({
  visible,
  onConfirm,
  onCancel,
  message,
  confimationTitle,
}) {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <Pressable style={styles.overlay} onPress={onCancel}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{confimationTitle}</Text>
          <Text style={styles.modalMessage}>{message}</Text>

          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button, { backgroundColor: "#4A0503" }]}
              onPress={onConfirm}
            >
              <Text style={styles.buttonText}>YES</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={onCancel}>
              <Text style={styles.buttonText}>CANCEL</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    width: "80%",
    backgroundColor: "#000",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ff0000",
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ffd",
  },

  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#ffd",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },

  btnContainer: {
    width: "100%",
    alignContent: "center",
    justifyContent: "space-evenly",
  },

  button: {
    width: 110,
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ff0000",
  },

  buttonText: {
    color: "#ffd",
    fontSize: 16,
    textAlign: "center",
  },
});
