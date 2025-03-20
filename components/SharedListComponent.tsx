//@ts-nocheck
import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  FlatList,
} from "react-native";
import { useFocusEffect } from "expo-router";

import { Background } from "@/components/Background";
import { Header } from "@/components/Header";
import { ItemList } from "@/components/itemList";
import { AddNewModal } from "@/components/AddNewModal";
import { RemoverStatus } from "@/components/RemoverStatus";
import { EditModal } from "@/components/EditModal";
import { CustomAlert } from "@/components/CustomAlert";
import { ItemInfoModal } from "@/components/ItemInfoModal";
import { LoadingModal } from "@/components/LoadingScreen";
import Toast from "react-native-toast-message";
import { toastConfig } from "../hooks/toastConfig";

import storageUtils from "@/utils/storageUtils";

import { useAppContext } from "@/utils/AppContext";

export const SharedListComponent = ({ filterFn }) => {
  const [data, setData] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteAction, setDeleteAction] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [totalItemsDeleted, setTotalItemsDeleted] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Context data
  const {
    reloadData,
    setReloadData,
    removeCheckboxVisible,
    setRemoveCheckboxVisible,
    setEditMode,
    infoModalVisible,
    setInfoModalVisible,
    selectedItem,
  } = useAppContext();

  // Load data from local storage
  const loadData = useCallback(async () => {
    const storedData = await storageUtils.getAllItems();
    if (storedData) {
      const filteredData = filterFn ? storedData.filter(filterFn) : storedData;
      const sortedData = filteredData.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      setData(sortedData);
      setReloadData(false);
    }
  }, [filterFn]);

  // Reload data when necessary
  useEffect(() => {
    if (reloadData) loadData();
  }, [reloadData, loadData]);

  // Reload data when screen gains focus
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadData();
      setEditMode(false);
      setRemoveCheckboxVisible(false);
      setSearchQuery("");
      setLoading(false);
    }, [loadData])
  );

  // Handle delete action
  useEffect(() => {
    const deleteItems = async () => {
      if (deleteAction) {
        if (checkedItems.length === 0) {
          setAlertMessage("No items selected.");
          setAlertVisible(true);
          setDeleteAction(false);
          return;
        }

        storageUtils.deleteItems(checkedItems);
        setReloadData(true);
        setAlertMessage(`${checkedItems.length} item(s) deleted!`);
        setAlertVisible(true);
        setCheckedItems([]);
        setDeleteAction(false);
      }
    };
    deleteItems();
    setTotalItemsDeleted(checkedItems.length);
  }, [deleteAction, checkedItems]);

  // Clear checked items when remove checkbox visibility changes
  useEffect(() => {
    if (!removeCheckboxVisible) setCheckedItems([]);
  }, [removeCheckboxVisible]);

  // Handle checkbox selection
  const handleCheckboxPress = (id) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filter search results
  useEffect(() => {
    if (searchQuery) {
      const results = data.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, data]);

  return (
    <SafeAreaView style={styles.container}>
      <Background>
        {removeCheckboxVisible ? (
          <RemoverStatus
            setDeleteAction={setDeleteAction}
            totalItemsDeleted={totalItemsDeleted}
          />
        ) : (
          <Header
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchResults={searchResults}
          />
        )}
        <FlatList
          style={styles.listContainer}
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ItemList
              item={item}
              checked={checkedItems.includes(item.id)}
              handleCheckboxPress={() => handleCheckboxPress(item.id)}
              setEditItem={setEditItem}
              setEditModalVisible={setEditModalVisible}
            />
          )}
          initialNumToRender={10} // Render 10 items first
          windowSize={5} // Efficiently handle large lists
          ListEmptyComponent={
            <Text style={styles.noItemListed}>No items available</Text>
          }
        />
      </Background>
      <AddNewModal />
      <EditModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        item={editItem}
      />
      <CustomAlert
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
        message={alertMessage}
      />
      {infoModalVisible && (
        <ItemInfoModal
          visible={infoModalVisible}
          transparent
          animationType="slide"
          selectedItem={selectedItem}
          onRequestClose={() => setInfoModalVisible(false)}
          reload={() => setReloadData(true)}
        />
      )}
      <LoadingModal visible={loading} />
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 10,
  },
  noItemListed: {
    color: "#e0baba",
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    backgroundColor: "#000",
    borderWidth: 1,
    borderColor: "#ff0000",
    borderRadius: 20,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 20,
  },
});
