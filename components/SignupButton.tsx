import { useRouter } from "expo-router";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

export function SignupBTN() {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.replace("./signup")}
      style={styles.btn}
    >
      <Text style={styles.text}>Sign up</Text>
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
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },

  text: {
    color: "#ffd",
    fontSize: 24,
  },
});
