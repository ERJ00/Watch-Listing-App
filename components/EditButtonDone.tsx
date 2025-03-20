import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { useAppContext } from "@/utils/AppContext";

//@ts-ignore
export function EditButtonDone() {
  const { setEditMode } = useAppContext();
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.BbuttonContainer}
        onPress={() => {
          setEditMode(false);
        }}
      >
        <Text style={styles.text}>✔</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  BbuttonContainer: {
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
