//@ts-nocheck
import { useState } from "react";
import { Modal, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { EditModal } from "./EditModal";

export function ItemInfoModal({
  visible,
  selectedItem,
  onRequestClose,
  reload,
}) {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const handleEditAction = () => {
    setEditModalVisible(true);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onRequestClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.label}>
            Title: <Text style={styles.text}>{selectedItem?.title}</Text>
          </Text>
          <Text style={styles.label}>
            Season: <Text style={styles.text}>{selectedItem?.season}</Text>
          </Text>
          <Text style={styles.label}>
            Episode: <Text style={styles.text}>{selectedItem?.episode}</Text>
          </Text>
          <Text style={styles.label}>
            Status:{" "}
            <Text style={styles.text}>
              {selectedItem?.status ? "finished" : "Unfinished"}
            </Text>
          </Text>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onRequestClose}
            >
              <Text style={styles.buttonText}>CLOSE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEditAction}
            >
              <Text style={styles.buttonText}>EDIT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <EditModal
        visible={editModalVisible}
        item={selectedItem}
        onClose={() => {
          setEditModalVisible(false);
          onRequestClose();
        }}
        reload={reload}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalContent: {
    backgroundColor: "#000",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ff0000",
  },

  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#e0baba",
  },

  text: {
    color: "#ffd",
  },

  btnContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },

  closeButton: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 20,
    width: 80,
    borderWidth: 1,
    borderColor: "#ff0000",
  },

  editButton: {
    backgroundColor: "#4A0503",
    padding: 10,
    borderRadius: 20,
    width: 80,
    borderWidth: 1,
    borderColor: "#ff0000",
  },

  buttonText: {
    color: "#ffD",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});