import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { useAppContext } from "@/utils/AppContext";

const SORT_OPTIONS = [
  { label: "Alphabetical", value: "alphabetical" },
  { label: "Last Modified", value: "lastModified" },
];

interface FloatingSortSelectorProps {
  onSortChange: (sortValue: string) => void;
}

const FloatingSortSelector = ({ onSortChange }: FloatingSortSelectorProps) => {
  const [selected, setSelected] = useState(SORT_OPTIONS[0]);
  const [modalVisible, setModalVisible] = useState(false);

  // Context data
  const { sortMode, setSortMode } = useAppContext();

  // Sync selected with sortMode from context
  useEffect(() => {
    const found = SORT_OPTIONS.find((opt) => opt.value === sortMode);
    if (found) setSelected(found);
  }, [sortMode]);

  const handleSelect = (option: any) => {
    setSortMode(option.value);
    setSelected(option);
    onSortChange(option.value);
    setModalVisible(false);
  };

  return (
    <>
      {/* Floating Button */}
      <View style={styles.fabContainer}>
        <TouchableOpacity
          style={styles.fab}
          onPress={() => setModalVisible(true)}
        >
          <Image
            source={require("@/assets/icons/sort.png")}
            style={styles.fabIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Dropdown Modal */}
      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.dropdown}>
              <Text
                style={{
                  width: "80%",
                  color: "#ffd",
                  fontSize: 20,
                  borderBottomWidth: 1,
                  borderColor: "#ffd",
                  textAlign: "center",
                  alignSelf: "center",
                  paddingBottom: 15,
                  paddingTop: 10,
                  marginBottom: 5,
                }}
              >
                Sort by:
              </Text>
              {SORT_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={styles.option}
                  onPress={() => handleSelect(option)}
                >
                  <Text style={styles.optionText}>{option.label}</Text>
                  <Text style={styles.optionText}>
                    {selected.value === option.value ? " ✓" : ""}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  fabContainer: {
    position: "absolute",
    bottom: 30,
    right: 30,
    zIndex: 999,
  },
  fab: {
    backgroundColor: "#ff0000",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 56,
    elevation: 5,
  },
  fabIcon: {
    width: 24,
    height: 24,
    tintColor: "#000",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: " rgba(0, 0, 0, 0.5)",
  },
  dropdown: {
    width: 200,
    backgroundColor: "#000",
    borderRadius: 6,
    elevation: 6,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ff0000",
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  optionText: {
    fontSize: 16,
    color: "#ffd",
  },
});

export default FloatingSortSelector;
