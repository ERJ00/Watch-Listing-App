//@ts-nocheck
import { StyleSheet, Text, View } from "react-native";
import { RemoveBtnAccept } from "./RemoveBtnAccept";
import { RemoveBtnCancel } from "./RemoveBtnCancel";
import { ConfirmActionModal } from "./ConfirmActionModal";
import { useState } from "react";

import { useAppContext } from "@/utils/AppContext";

export function RemoverStatus({ setDeleteAction, totalItemsDeleted }) {
  // context
  const { setRemoveCheckboxVisible } = useAppContext();

  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const confirmationModalMessage =
    "Are you sure you want to delete those items?";
  const confimationTitle = "DELETE ITEMS";

  const handleConfirmAction = () => {
    setConfirmationModalVisible(false);
    setRemoveCheckboxVisible(false);
    setDeleteAction(true);
  };

  const handleCancelAction = () => {
    setConfirmationModalVisible(false);
  };

  const handleAcceptDelete = () => {
    setConfirmationModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        SELECTED: <Text style={{ color: "#ffd" }}>{totalItemsDeleted}</Text>
      </Text>
      <View style={styles.btnContainer}>
        <RemoveBtnAccept onConfirmationAction={handleAcceptDelete} />
        <RemoveBtnCancel />
      </View>
      <ConfirmActionModal
        visible={confirmationModalVisible}
        message={confirmationModalMessage}
        onConfirm={handleConfirmAction}
        onCancel={handleCancelAction}
        confimationTitle={confimationTitle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    backgroundColor: "#000",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ff0000",
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  label: {
    color: "#e0baba",
    fontSize: 16,
    fontWeight: "bold",
    width: "60%",
    height: "auto",
    verticalAlign: "middle",
  },

  btnContainer: {
    flexDirection: "row",
    width: "40%",
    justifyContent: "space-evenly",
  },
});
