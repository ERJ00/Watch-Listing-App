// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Animated,
  Easing,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { DataStatistic } from "./DataStatistic";
import storageUtils from "@/utils/storageUtils";
import { useRouter } from "expo-router";
import { CustomAlert } from "./CustomAlert";
import { LoadingModal } from "./LoadingScreen";
import NetInfo from "@react-native-community/netinfo";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import { FIRESTORE, FIREBASEAUTH } from "@/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ConfirmActionModal } from "./ConfirmActionModal";

import { useAppContext } from "@/utils/AppContext";

export function SideMenu({ modalVisible, setModalVisible }) {
  // Context data
  const {
    setReloadData,
    setRemoveCheckboxVisible,
    setAddModalVisible,
    setEditMode,
  } = useAppContext();

  const slideAnim = useRef(new Animated.Value(300)).current;
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const currentYear = new Date().getFullYear();
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [confirmationModalMessage, setConfirmationModalMessage] = useState("");
  const [confimationTitle, setConfimationTitle] = useState("");
  const [saveNow, setSaveNow] = useState(false);
  const [LogoutNow, setLogoutNow] = useState(false);
  const [loadDataNow, setLoadDataNow] = useState(false);
  const { width, height } = Dimensions.get("screen");

  const validateSession = async () => {
    const userSession = await storageUtils.getUserSession();
    if (userSession) {
      const { username } = userSession?.username;
      const { email } = userSession?.email;
      const { password } = userSession?.password;

      setUsername(username);
      setEmail(email);
      setPassword(password);
    } else {
      setUsername("Guest User");
      setEmail("email@example.com");
      setPassword("password");
    }
  };
  validateSession();

  useEffect(() => {
    if (modalVisible) {
      // Slide in from the right
      Animated.timing(slideAnim, {
        toValue: 0, // Move to original position
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    } else {
      // Slide out to the right
      Animated.timing(slideAnim, {
        toValue: 300, // Move off-screen to the right
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible]);

  const saveDataToFirestore = async () => {
    setLoadingMessage("Saving data...");
    setLoading(true);

    try {
      // 1. Check Internet Connection
      const netInfo = await NetInfo.fetch();
      if (!netInfo.isConnected) {
        setLoading(false);
        setAlertMessage(
          "No internet connection. Please check your connection."
        );
        setAlertVisible(true);
        return;
      }

      // 2. Get Data to Save
      const itemList = await storageUtils.getAllItems();
      if (!itemList || itemList.length === 0) {
        setLoading(false);
        setAlertMessage("No items will be saved.");
        setAlertVisible(true);
        return;
      }

      // 3. Ensure User is Authenticated
      if (!FIREBASEAUTH.currentUser) {
        await signInWithEmailAndPassword(FIREBASEAUTH, email, password);
      }

      // 4. Get References
      const usernameDocRef = doc(FIRESTORE, "users", username);
      const itemListRef = collection(usernameDocRef, "itemLists");

      // 5. Delete Existing Documents Using Batch Writes
      const batch = writeBatch(FIRESTORE);
      const itemListSnapshot = await getDocs(itemListRef);
      itemListSnapshot.docs.forEach((doc) => batch.delete(doc.ref));

      // 6. Add New Items Using Batch Writes
      itemList.forEach((item) => {
        const newDocRef = doc(itemListRef); // Creates a new document with a unique ID
        batch.set(newDocRef, {
          id: item.id,
          title: item.title,
          status: item.status,
          episode: item.episode,
          season: item.season,
        });
      });

      // 7. Commit Batch Operation (All Deletes + Writes in One Go)
      await batch.commit();

      setLoading(false);
      setAlertMessage("Successfully Saved All Data.");
      setAlertVisible(true);
    } catch (error) {
      setLoading(false);
      setAlertMessage(`Something went wrong! ${error.message}`);
      setAlertVisible(true);
    }
  };

  const handleSaveData = () => {
    setConfirmationModalMessage("Are you sure you want to save the data?");
    setConfimationTitle("SAVE DATA");
    setConfirmationModalVisible(true);
    setSaveNow(true);
  };

  const handleLogout = () => {
    setConfirmationModalMessage(
      "Are you sure you want to log out? Please save your data first to avoid losing any unsaved changes."
    );
    setConfimationTitle("LOGOUT");
    setConfirmationModalVisible(true);
    setLogoutNow(true);
  };

  const handleLoadData = () => {
    setConfirmationModalMessage(
      "Are you sure you want to load data? This action will overwrite your current list. Please ensure you've saved your data first."
    );
    setConfimationTitle("LOAD DATA");
    setConfirmationModalVisible(true);
    setLoadDataNow(true);
  };

  const handleConfirmAction = async () => {
    setConfirmationModalVisible(false);
    if (saveNow) {
      saveDataToFirestore();
    } else if (LogoutNow) {
      await storageUtils.resetData();
      await storageUtils.clearUserSession();
      router.replace("/(forms)/login");
    } else if (loadDataNow) {
      loadDataFromFirebase();
    }
    setLogoutNow(false);
    setSaveNow(false);
    setLoadDataNow(false);
  };

  const handleCancelAction = () => {
    setLogoutNow(false);
    setSaveNow(false);
    setLoadDataNow(false);
    setConfirmationModalVisible(false);
  };

  const loadDataFromFirebase = async () => {
    setLoadingMessage("Retrieving data...");
    setLoading(true);

    try {
      // 1. Check Internet Connection
      const netInfo = await NetInfo.fetch();
      if (!netInfo.isConnected) {
        setLoading(false);
        setAlertMessage("No internet connection. Please check your internet.");
        setAlertVisible(true);
        return;
      }

      // 2. Authenticate First (Avoid Unnecessary Calls)
      if (!FIREBASEAUTH.currentUser) {
        await signInWithEmailAndPassword(FIREBASEAUTH, email, password);
      }

      // 3. Firestore References
      const usernameDocRef = doc(FIRESTORE, "users", username);
      const itemListRef = collection(usernameDocRef, "itemLists");

      // 4. Fetch All Data in Parallel
      const [itemListSnapshot] = await Promise.all([getDocs(itemListRef)]);

      // 5. Process Retrieved Data
      const itemListData = itemListSnapshot.docs.map((doc) => doc.data());

      if (itemListData.length > 0) {
        await storageUtils.resetData(); // Reset only if new data exists
        await storageUtils.saveData(itemListData);
      }

      // 6. Update UI
      setLoading(false);
      setReloadData(true);
      setAlertMessage("Reload Data Successfully.");
      setAlertVisible(true);
    } catch (error) {
      setAlertMessage(`Something went wrong! ${error.message}`);
      setAlertVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      animationType="none"
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableOpacity
        onPress={() => setModalVisible(false)}
        style={styles.overlay}
      >
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ translateX: slideAnim }] },
          ]}
        >
          <TouchableOpacity
            onPress={(e) => e.stopPropagation()}
            style={styles.modalContent}
          >
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              minimumFontScale={0.8}
              style={[styles.username, { width: width / 2 - 20 }]}
            >
              {username || "Guest UserName"}
            </Text>
            <DataStatistic />
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                setAddModalVisible(true);
              }}
            >
              <Text style={styles.text}>Add New</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                setEditMode(true);
              }}
            >
              <Text style={styles.text}>Edit Item</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                setRemoveCheckboxVisible(true);
              }}
            >
              <Text style={styles.text}>Remove</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLoadData}>
              <Text style={[styles.text, { color: "#FFA500" }]}>Load Data</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSaveData}>
              <Text style={[styles.text, { color: "#32CD32" }]}>Save Data</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={[styles.text, { color: "#FF0000" }]}>Logout</Text>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 12,
                color: "#888",
                textAlign: "center",
                marginTop: 10,
                fontStyle: "italic",
              }}
            >
              All Rights Reserved © {currentYear} ERJ00
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
      <CustomAlert
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
        message={alertMessage}
      />
      <LoadingModal visible={loading} message={loadingMessage} />
      <ConfirmActionModal
        visible={confirmationModalVisible}
        message={confirmationModalMessage}
        onConfirm={handleConfirmAction}
        onCancel={handleCancelAction}
        confimationTitle={confimationTitle}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
  },

  modalContainer: {
    width: "50%",
    backgroundColor: "#000",
    height: "100%",
    position: "absolute",
    top: 0,
    right: 0,
  },

  modalContent: {
    flex: 1,
    padding: 10,
    overflow: "scroll",
  },

  text: {
    color: "#FF4500",
    marginBottom: 10,
    fontSize: 20,
    borderBottomWidth: 1,
    borderColor: "#e0baba",
    textAlign: "center",
    paddingBottom: 15,
  },

  username: {
    color: "#ff0000",
    marginBottom: 20,
    fontSize: 30,
    textAlign: "center",
    borderBottomWidth: 1,
    borderColor: "#e0baba",
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 20,
  },
});
