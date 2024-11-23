// @ts-nocheck
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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

  return (
    <View
      style={[
        styles.itemContainer,
        { backgroundColor: checked ? "#870505" : "#000" },
      ]}
    >
      <Text style={styles.label}>
        TITLE: <Text style={styles.text}>{title}</Text>
      </Text>
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
});
