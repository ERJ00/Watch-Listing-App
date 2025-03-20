//@ts-nocheck

import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SearchBar } from "./SearchBarComponent";
import { MenuButton } from "./MenuButtonComponent";
import { SideMenu } from "./SideMenu";
import { useEffect, useState } from "react";
import { EditButtonDone } from "./EditButtonDone";
import { useAppContext } from "@/utils/AppContext";

export function Header({
  // search
  searchQuery,
  setSearchQuery,
  searchResults,
  // onItemPress,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [results, setResults] = useState([]);
  const { editMode, setSelectedItem, setInfoModalVisible } = useAppContext();

  useEffect(() => {
    setResults(searchResults);
  }, [searchResults]);

  return (
    <View style={[styles.headerContainer]}>
      {!editMode && (
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      )}
      {editMode ? (
        <EditButtonDone />
      ) : (
        <MenuButton setModalVisible={setModalVisible} />
      )}

      <SideMenu modalVisible={modalVisible} setModalVisible={setModalVisible} />

      {searchQuery != "" && (
        <View style={styles.dropdown}>
          <FlatList
            data={results} // Use the state that updates dynamically
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                  setSelectedItem(item);
                  setInfoModalVisible(true);
                }}
              >
                <Text style={styles.dropdownText}>{item.title}</Text>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Text style={styles.dropdownSubText}>
                    Season: {item.season}
                  </Text>
                  <Text style={styles.dropdownSubText}>
                    Episode: {item.episode}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No results found</Text>
              </View>
            }
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },

  dropdown: {
    position: "absolute",
    top: 60, // Adjust to match the position of your search bar
    left: 9,
    right: 9,
    backgroundColor: "#000",
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "#ffd",
    maxHeight: 350,
    zIndex: 1000,
  },

  dropdownItem: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: "#ffd",
    width: "100%",
  },

  dropdownText: {
    color: "#ffd",
    width: "100%",
  },

  dropdownSubText: {
    color: "#8a8a78",
    fontSize: 13,
  },

  emptyContainer: {
    padding: 10,
    alignItems: "center",
    zIndex: 1000,
  },

  emptyText: {
    color: "#ffd",
    fontSize: 16,
    textAlign: "center",
  },
});
