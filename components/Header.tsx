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

export function Header({
  setAddModalVisible,
  setRemoveCheckboxVisible,
  setEditItemVisible,
  editItemVisible,
  // search
  searchQuery,
  setSearchQuery,
  searchResults,
  onItemPress,
  reload,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    setResults(searchResults);
  }, [searchResults]);

  return (
    <View style={[styles.headerContainer]}>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {editItemVisible ? (
        <EditButtonDone setEditItemVisible={setEditItemVisible} />
      ) : (
        <MenuButton setModalVisible={setModalVisible} />
      )}

      <SideMenu
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setAddModalVisible={setAddModalVisible}
        setRemoveCheckboxVisible={setRemoveCheckboxVisible}
        setEditItemVisible={setEditItemVisible}
        reload={reload}
      />

      {searchQuery != "" && (
        <View style={styles.dropdown}>
          <FlatList
            data={results} // Use the state that updates dynamically
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => onItemPress(item)}
              >
                <Text style={styles.dropdownText}>{item.title}</Text>
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
    left: 10,
    right: 10,
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
  },

  dropdownText: {
    color: "#ffd",
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
