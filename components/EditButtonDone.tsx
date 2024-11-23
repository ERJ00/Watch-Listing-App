import { Text, StyleSheet, TouchableOpacity } from "react-native";

//@ts-ignore
export function EditButtonDone({ setEditItemVisible }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        setEditItemVisible(false);
      }}
    >
      <Text style={styles.text}>✔</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    width: 43,
    height: 43,
    borderColor: "#ff0000",
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    width: 30,
    height: 30,
    color: "#ffd",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
});
