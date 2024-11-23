//@ts-nocheck
import { Modal, View, Text, ActivityIndicator, StyleSheet } from "react-native";

export function LoadingModal({ visible, message = "Please wait..." }) {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={() => {}}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <ActivityIndicator size="large" color="#ff0000" />
          <Text style={styles.text}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0,0.6)",
  },
  modalContent: {
    width: 200,
    padding: 20,
    backgroundColor: "#000",
    borderRadius: 10,
    alignItems: "center",
    borderColor: "#ff0000",
    borderWidth: 1,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: "#ffd",
    textAlign: "center",
    width: "100%",
  },
});
