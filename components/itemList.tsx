// @ts-nocheck
import {
  Alert,
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";

export function ItemList({
  item,
  itemIndex,
  checked,
  removeCheckboxVisible,
  handleCheckboxPress,
  editItemVisible,
  setEditItem,
  setEditModalVisible,
}) {
  const { title, episode, season, status } = item;

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(title);
    Toast.show({
      type: "success",
      text1: "Title Copied!",
      text2: `Title: ${title}`,
    });
  };

  return (
    <View
      style={[
        styles.itemContainer,
        { backgroundColor: checked ? "#870505" : "#000" },
      ]}
    >
      <View style={{ width: "100%", flexDirection: "row" }}>
        <View style={{ width: "93%" }}>
          <Text style={styles.label}>
            TITLE: <Text style={styles.text}>{title}</Text>
          </Text>
        </View>

        <TouchableOpacity style={styles.copyBTN} onPress={copyToClipboard}>
          <Image
            style={styles.copyBTNImage}
            source={require("../assets/icons/copy.png")}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-evenly",
          marginTop: 5,
          marginBottom: 5,
        }}
      >
        <Text style={styles.label}>
          SEASON: <Text style={styles.text}>{season}</Text>
        </Text>
        <Text style={styles.label}>
          EPISODE: <Text style={styles.text}>{episode}</Text>
        </Text>
        {!removeCheckboxVisible && !editItemVisible && (
          <View
            style={[
              styles.statusIndicator,
              { backgroundColor: status ? "#32CD32" : "#ff0000" },
            ]}
          ></View>
        )}
        {removeCheckboxVisible && (
          <Pressable
            role="checkbox"
            style={[styles.checkboxBase, checked && styles.checkboxChecked]}
            onPress={() => handleCheckboxPress(itemIndex)}
          >
            {checked && <Text style={{ color: "#fff" }}>✔</Text>}
          </Pressable>
        )}
        {editItemVisible && (
          <TouchableOpacity
            onPress={() => {
              setEditItem(item);
              setEditModalVisible(true);
            }}
            style={styles.editBtn}
          >
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.label}>
        STATUS:{" "}
        <Text style={styles.text}>{status ? "Finished" : "Unfinished"}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    width: "100%",
    height: "auto",
    padding: 10,
    borderColor: "#ff0000",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
  },

  label: {
    color: "#e0baba",
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "italic",
  },

  text: {
    color: "#ffd",
    fontSize: 14,
    alignSelf: "center",
  },

  checkboxBase: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#ff0000",
    backgroundColor: "transparent",
  },

  checkboxChecked: {
    backgroundColor: "#000",
  },

  editBtn: {
    width: 50,
    padding: 5,
    borderWidth: 1,
    borderColor: "#ff0000",
    borderRadius: 10,
    backgroundColor: "#4A0503",
  },

  editText: {
    color: "#e0baba",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  statusIndicator: {
    width: 10,
    height: 10,
    backgroundColor: "#fff",
    borderRadius: "100%",
    alignSelf: "center",
  },

  copyBTN: {
    width: "5%",
    alignItems: "center",
    justifyContent: "center",
  },

  copyBTNImage: {
    width: 24,
    height: 24,
    flex: 1,
    resizeMode: "contain",
    tintColor: "#ffd",
  },
});
