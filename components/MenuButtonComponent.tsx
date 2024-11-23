import { Image, StyleSheet, TouchableOpacity } from "react-native";

//@ts-ignore
export function MenuButton({ setModalVisible }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        setModalVisible(true);
      }}
    >
      <Image
        source={require("../assets/icons/bars-solid.png")}
        style={styles.image}
      />
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

  image: {
    width: 30,
    height: 30,
    tintColor: "#ff0000",
  },
});
