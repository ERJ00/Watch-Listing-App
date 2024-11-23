//@ts-nocheck
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
} from "react-native";

export function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        placeholderTextColor={"#ff0000"}
        cursorColor={"#ff0000"}
        selectionColor={"#ff0000"}
        value={searchQuery} // Bind value to searchQuery
        onChangeText={setSearchQuery} // Update search query on text input
      />
      {searchQuery.length > 0 && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => setSearchQuery("")} // Clear the search query
        >
          <Text style={styles.clearButtonText}>X</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "85%",
  },

  input: {
    backgroundColor: "#000",
    width: "100%",
    borderColor: "#ff0000",
    borderWidth: 1,
    borderRadius: 14,
    height: 43,
    padding: 10,
    paddingRight: 40,
    fontSize: 16,
    color: "#ffd",
  },

  clearButton: {
    position: "absolute",
    right: 5, // Positioning inside the input field
    top: "30%",
    transform: [{ translateY: -6 }], // Center vertically
    // backgroundColor: "#4A0503",
    // borderRadius: 10,
    paddingLeft: 5,
    paddingRight: 10,
    borderLeftWidth: 1,
    borderColor: "#ff0000",
  },

  clearButtonText: {
    color: "#ffd",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
