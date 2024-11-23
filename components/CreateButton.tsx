//@ts-nocheck
import { useRouter } from "expo-router";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

export function CreateBTN({ onAction }) {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={onAction} style={styles.btn}>
      <Text style={styles.text}>Create</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: 80,
    borderWidth: 1,
    borderColor: "#ff0000",
    height: 45,
    width: 113,
    backgroundColor: "#4A0503",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },

  text: {
    color: "#ffd",
    fontSize: 24,
  },
});
