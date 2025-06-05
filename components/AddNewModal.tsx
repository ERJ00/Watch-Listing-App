//@ts-nocheck
import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { CustomAlert } from "./CustomAlert";
import storageUtils from "@/utils/storageUtils";

import { useAppContext } from "@/utils/AppContext";

export function AddNewModal() {
  const [title, setTitle] = useState("");
  const [season, setSeason] = useState("");
  const [episode, setEpisode] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isDoneSave, setIsDoneSave] = useState(false);

  const { setReloadData, isAddModalVisible, setAddModalVisible } =
    useAppContext();

  const closeModal = () => {
    clearInputs();
    setAddModalVisible(false);
  };

  const clearInputs = () => {
    setTitle("");
    setSeason("");
    setEpisode("");
    setIsDoneSave(false);
  };

  const handleAdd = async () => {
    const isDuplicate = await storageUtils.isTitleDuplicate(title);

    if (title === "" || season === "" || episode === "") {
      setAlertMessage("Please fill all fields before adding.");
      setAlertVisible(true);
      return;
    }

    if (isNaN(season) || isNaN(episode)) {
      setAlertMessage("The season and episode must be a number.");
      setAlertVisible(true);
      return;
    }

    if (isDuplicate) {
      const message = `The Title " ${title} " already exists in the list.`;
      setAlertMessage(message);
      setAlertVisible(true);
      return;
    }

    const date = new Date();
    // Get time in Manila by adjusting offset (UTC+8)
    const manilaOffset = 8 * 60; // 8 hours in minutes
    const localOffset = date.getTimezoneOffset(); // in minutes

    const totalOffset = (manilaOffset + localOffset) * 60 * 1000; // ms

    const manilaDate = new Date(date.getTime() + totalOffset);
    const currentDateTime = manilaDate.toISOString();

    const data = {
      title,
      season: parseInt(season),
      episode: parseInt(episode),
      status: false,
      dateModified: currentDateTime,
    };

    const message = `" ${title} " Successfully added.`;
    setAlertMessage(message);
    setAlertVisible(true);

    await storageUtils.addItem(data);

    setIsDoneSave(true);
    setReloadData(true);
  };

  return (
    <Modal visible={isAddModalVisible} transparent={true} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>ADD NEW ITEM</Text>
          <TextInput
            placeholder="Title"
            placeholderTextColor={"#ff0000"}
            cursorColor={"#ff0000"}
            selectionColor={"#ff0000"}
            selectionHandleColor={"#ff0000"}
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          <TextInput
            placeholder="Season"
            placeholderTextColor={"#ff0000"}
            cursorColor={"#ff0000"}
            selectionColor={"#ff0000"}
            selectionHandleColor={"#ff0000"}
            value={season}
            onChangeText={setSeason}
            style={styles.input}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Episode"
            placeholderTextColor={"#ff0000"}
            cursorColor={"#ff0000"}
            selectionColor={"#ff0000"}
            selectionHandleColor={"#ff0000"}
            value={episode}
            onChangeText={setEpisode}
            style={styles.input}
            keyboardType="numeric"
          />

          <View
            style={{
              width: "100%",
              justifyContent: "space-evenly",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                clearInputs();
                closeModal();
              }}
              style={styles.cancelBtn}
            >
              <Text style={styles.textBtn}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAdd} style={styles.addBtn}>
              <Text style={styles.textBtn}>ADD</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <CustomAlert
        visible={alertVisible}
        onClose={() => {
          setAlertVisible(false);
          if (isDoneSave) {
            closeModal();
          }
        }}
        message={alertMessage}
      />
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
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#000",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ff0000",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: "#e0baba",
    fontWeight: "bold",
  },

  input: {
    width: "100%",
    padding: 10,
    borderColor: "#ff0000",
    borderWidth: 1,
    marginBottom: 10,
    color: "#ffd",
  },

  addBtn: {
    backgroundColor: "#4A0503",
    height: 38,
    width: 100,
    borderRadius: 81,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ff0000",
  },

  cancelBtn: {
    backgroundColor: "#000",
    height: 38,
    width: 100,
    borderRadius: 81,
    alignItems: "center",
    justifyContent: "center",
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
