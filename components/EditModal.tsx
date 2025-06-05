//@ts-nocheck
import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from "react-native";
import storageUtils from "@/utils/storageUtils";
import { CustomAlert } from "./CustomAlert";

import { useAppContext } from "@/utils/AppContext";

export function EditModal({ visible, item, onClose }) {
  const [itemTitle, setItemTitle] = useState("");
  const [itemSeason, setItemSeason] = useState("");
  const [itemEpisode, setItemEpisode] = useState("");
  const [itemStatus, setItemStatus] = useState(false);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const { setReloadData } = useAppContext();

  useEffect(() => {
    if (visible && item) {
      setItemStatus(item.status);
    }
  }, [visible]);

  const handleClose = () => {
    resetInputs();
    onClose();
  };

  const resetInputs = () => {
    setItemTitle("");
    setItemSeason("");
    setItemEpisode("");
    setItemStatus(false);
    setAlertVisible(false);
  };

  const handleSave = async () => {
    if (isNaN(itemSeason) || isNaN(itemEpisode)) {
      setAlertMessage("The season and episode must be a number.");
      setAlertVisible(true);
      return;
    }

    const isDuplicate = await storageUtils.isTitleDuplicate(itemTitle);
    if (isDuplicate) {
      setAlertMessage("The title already exists.");
      setAlertVisible(true);
      return;
    }

    if (item) {
      const date = new Date();
      // Get time in Manila by adjusting offset (UTC+8)
      const manilaOffset = 8 * 60; // 8 hours in minutes
      const localOffset = date.getTimezoneOffset(); // in minutes

      const totalOffset = (manilaOffset + localOffset) * 60 * 1000; // ms

      const manilaDate = new Date(date.getTime() + totalOffset);
      const currentDateTime = manilaDate.toISOString(); // ✅ reliable

      const updatedItem = {
        ...item,
        title: itemTitle || item.title,
        season: itemSeason || item.season,
        episode: itemEpisode || item.episode,
        status: itemStatus ?? item.status,
        dateModified: currentDateTime,
      };

      await storageUtils.updateItem(updatedItem);
      // setAlertMessage("Data updated successfully.");
      // setAlertVisible(true);
    }
    setReloadData(true);
    handleClose();
  };

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        {item && (
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>EDIT ITEM</Text>

            <Text style={styles.label}>
              CURRENT TITLE: <Text style={{ color: "#ffD" }}>{item.title}</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={itemTitle}
              onChangeText={setItemTitle}
              placeholderTextColor={"#ff0000"}
              cursorColor={"#ff0000"}
              selectionColor={"#ff0000"}
              selectionHandleColor={"#ff0000"}
            />

            <Text style={styles.label}>
              CURRENT SEASON:{" "}
              <Text style={{ color: "#ffD" }}>{item.season}</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Season"
              value={itemSeason}
              onChangeText={setItemSeason}
              placeholderTextColor={"#ff0000"}
              cursorColor={"#ff0000"}
              selectionColor={"#ff0000"}
              selectionHandleColor={"#ff0000"}
              keyboardType="numeric"
            />

            <Text style={styles.label}>
              CURRENT EPISODE:{" "}
              <Text style={{ color: "#ffD" }}>{item.episode}</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Episode"
              value={itemEpisode}
              onChangeText={setItemEpisode}
              placeholderTextColor={"#ff0000"}
              cursorColor={"#ff0000"}
              selectionColor={"#ff0000"}
              selectionHandleColor={"#ff0000"}
              keyboardType="numeric"
            />

            <Text style={styles.label}>
              CURRENT STATUS:{" "}
              <Text style={{ color: "#ffD" }}>
                {item.status ? "Finished" : "Unfinished"}
              </Text>
            </Text>
            <View style={styles.statusContainer}>
              <Text style={styles.label}>
                Set Status to {itemStatus ? "Finished" : "Unfinished"}
              </Text>
              <Switch
                value={itemStatus}
                onValueChange={setItemStatus}
                thumbColor={"#ff0000"}
                trackColor={{ true: "#ff0000", false: "#e0baba" }}
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleClose} style={styles.cancelBtn}>
                <Text style={styles.textBtn}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
                <Text style={styles.textBtn}>SAVE</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      <CustomAlert
        visible={alertVisible}
        onClose={() => {
          setAlertVisible(false);
        }}
        message={alertMessage}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    width: "80%",
    backgroundColor: "#000",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    borderColor: "#ff0000",
    borderWidth: 1,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#e0baba",
  },

  label: {
    color: "#e0baba",
    fontSize: 14,
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: 10,
  },

  input: {
    borderColor: "#ff0000",
    borderWidth: 1,
    borderRadius: 80,
    height: 38,
    width: 261,
    color: "#ffD",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#000",
    fontSize: 16,
  },

  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  cancelBtn: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 20,
    width: 100,
    borderWidth: 1,
    borderColor: "#ff0000",
  },

  saveBtn: {
    backgroundColor: "#4A0503",
    padding: 10,
    borderRadius: 20,
    width: 100,
    borderWidth: 1,
    borderColor: "#ff0000",
  },

  textBtn: {
    color: "#e0baba",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});
