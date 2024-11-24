//@ts-nocheck
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";
import { useFocusEffect } from "expo-router";

import { Background } from "@/components/Background";
import { Header } from "@/components/Header";
import { ItemList } from "@/components/itemList";
import { AddNewModal } from "@/components/AddNewModal";
import { RemoverStatus } from "@/components/RemoverStatus";
import { EditModal } from "@/components/EditModal";
import { CustomAlert } from "@/components/CustomAlert";
import { ItemInfoModal } from "@/components/ItemInfoModal";

import storageUtils from "@/utils/storageUtils";

import { LoadingModal } from "@/components/LoadingScreen";

export default function Finished() {
  const [data, setData] = useState([]);
  const [reloadData, setReloadData] = useState(false);
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [editItemVisible, setEditItemVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [removeCheckboxVisible, setRemoveCheckboxVisible] = useState(false);
  const [deleteAction, setDeleteAction] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [totalItemsDeleted, setTotalItemsDeleted] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load data from local storage
  const loadData = useCallback(async () => {
    const storedData = await storageUtils.getAllItems();
    if (storedData) {
      const filteredData = storedData.filter((item) => item.status === true);
      const sortedData = filteredData.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      setData(sortedData);
      setReloadData(false);
    }
  }, []);

  // Reload data when necessary
  useEffect(() => {
    if (reloadData) loadData();
  }, [reloadData, loadData]);

  // Reload data when screen gains focus
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadData();
      setEditItemVisible(false);
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

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setInfoModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Background>
        {removeCheckboxVisible ? (
          <RemoverStatus
            setRemoveCheckboxVisible={setRemoveCheckboxVisible}
            setDeleteAction={setDeleteAction}
            totalItemsDeleted={totalItemsDeleted}
          />
        ) : (
          <Header
            setAddModalVisible={setAddModalVisible}
            setRemoveCheckboxVisible={setRemoveCheckboxVisible}
            setEditItemVisible={setEditItemVisible}
            editItemVisible={editItemVisible}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchResults={searchResults}
            onItemPress={handleItemPress}
            reload={setReloadData}
          />
        )}
        <ScrollView style={styles.listContainer}>
          {data.length > 0 ? (
            data.map((item) => (
              <ItemList
                key={item.id}
                item={item}
                checked={checkedItems.includes(item.id)}
                removeCheckboxVisible={removeCheckboxVisible}
                handleCheckboxPress={() => handleCheckboxPress(item.id)}
                editItemVisible={editItemVisible}
                setEditItem={setEditItem}
                setEditModalVisible={setEditModalVisible}
              />
            ))
          ) : (
            <Text style={styles.noItemListed}>No items available</Text>
          )}
        </ScrollView>
      </Background>
      <AddNewModal
        visible={isAddModalVisible}
        onClose={() => {
          setAddModalVisible(false);
          setReloadData(true);
        }}
      />
      <EditModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        item={editItem}
        reload={() => setReloadData(true)}
      />
      <CustomAlert
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
        message={alertMessage}
      />
      <ItemInfoModal
        visible={infoModalVisible}
        transparent
        animationType="slide"
        selectedItem={selectedItem}
        onRequestClose={() => setInfoModalVisible(false)}
        reload={() => setReloadData(true)}
      />
      <LoadingModal visible={loading} />
    </SafeAreaView>
  );
}

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
