// @ts-nocheck
import {
  SafeAreaView,
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TextInput,
} from "react-native";
import loginBG from "../assets/images/signup-form-background.png";
import { GotoLoginScreenBTN } from "./GotoLoginScreenButton";
import { CreateBTN } from "./CreateButton";
import { Background } from "./Background";
import { useRouter } from "expo-router";

import { FIREBASEAUTH, FIRESTORE } from "../FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getDoc,
  setDoc,
  doc,
  serverTimestamp,
  collection,
  addDoc,
} from "firebase/firestore";
import { useState } from "react";
import { CustomAlert } from "./CustomAlert";
import { LoadingModal } from "./LoadingScreen";
import uuid from "react-native-uuid";
import NetInfo from "@react-native-community/netinfo";
import storageUtils from "@/utils/storageUtils";

export function SignupScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const checkSession = async () => {
    const checkSession = await storageUtils.getUserSession();

    if (checkSession) {
      return;
    }
  };
  checkSession();

  const handleSignup = async () => {
    setLoading(true);

    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      setLoading(false);
      setAlertMessage(
        "No internet connection. Please check your internet connection."
      );
      setAlertVisible(true);
      return;
    }

    if (!email || !password || !username) {
      setLoading(false);
      setAlertMessage("Please fill all fields before Creating Account.");
      setAlertVisible(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLoading(false);
      setAlertMessage("Please enter a valid email address!");
      setAlertVisible(true);
      return;
    }

    if (password !== confirmPassword) {
      setLoading(false);
      setAlertMessage("Passwords do not match!");
      setAlertVisible(true);
      return;
    }

    if (password.length < 6 || confirmPassword.length < 6) {
      setLoading(false);
      setAlertMessage("Password should be at least 6 characters.");
      setAlertVisible(true);
      return;
    }

    try {
      // check username if already present
      const usernameDocRef = doc(FIRESTORE, "users", username);
      const usernameDoc = await getDoc(usernameDocRef);

      if (usernameDoc.exists()) {
        setLoading(false);
        setAlertMessage(
          "This username is already taken. Please choose another."
        );
        setAlertVisible(true);
        return;
      }

      //create a new account
      const userCredential = await createUserWithEmailAndPassword(
        FIREBASEAUTH,
        email,
        password
      );

      await signInWithEmailAndPassword(FIREBASEAUTH, email, password);
      const user = userCredential.user;

      await setDoc(usernameDocRef, {
        uid: user.uid,
        email: user.email,
        createdAt: serverTimestamp(),
      });

      const itemListsCollectionRef = collection(
        FIRESTORE,
        "users",
        username,
        "itemLists"
      );

      const newItem = {
        id: uuid.v4(),
        title: "My Favorite Show",
        season: 1,
        episode: 1,
        status: false,
      };

      await addDoc(itemListsCollectionRef, newItem);

      await storageUtils.resetData();
      await storageUtils.saveUserSession({
        username: { username },
        email: { email },
        password: { password },
      });
      await storageUtils.addItem(newItem);

      const message = `Welcome, ${username}! Your account has been created.`;
      setAlertMessage(message);
      setAlertVisible(true);

      setLoading(false);
      router.replace("/(tabs)/home");
    } catch (error) {
      const errorMessage = `Something went wrong! ${error.message}`;
      setAlertMessage(errorMessage);
      setAlertVisible(true);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Background>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ImageBackground
            source={loginBG}
            style={styles.formImage}
            imageStyle={{ resizeMode: "stretch" }}
          >
            <View style={styles.inputContainer}>
              <Text style={styles.label}>USERNAME:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your Username"
                placeholderTextColor={"#ff0000"}
                cursorColor={"#ff0000"}
                selectionColor={"#ff0000"}
                selectionHandleColor={"#ff0000"}
                onChangeText={(text) => setUsername(text)}
                value={username}
              />
              <Text style={styles.label}>EMAIL:</Text>
              <TextInput
                style={styles.input}
                placeholder="yourname@example.com"
                placeholderTextColor={"#ff0000"}
                cursorColor={"#ff0000"}
                selectionColor={"#ff0000"}
                selectionHandleColor={"#ff0000"}
                onChangeText={(text) => setEmail(text)}
                value={email}
                keyboardType="email-address"
              />
              <Text style={styles.label}>PASSWORD:</Text>
              <TextInput
                style={styles.input}
                placeholder="Password (at least 6 characters)"
                placeholderTextColor={"#ff0000"}
                cursorColor={"#ff0000"}
                selectionColor={"#ff0000"}
                selectionHandleColor={"#ff0000"}
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                value={password}
              />
              <Text style={styles.label}>RE-TYPE PASSWORD:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your Password again..."
                placeholderTextColor={"#ff0000"}
                cursorColor={"#ff0000"}
                selectionColor={"#ff0000"}
                selectionHandleColor={"#ff0000"}
                secureTextEntry
                onChangeText={(text) => setConfirmPassword(text)}
                value={confirmPassword}
              />
            </View>
          </ImageBackground>
          <View style={styles.btnContainer}>
            <GotoLoginScreenBTN />
            <CreateBTN onAction={handleSignup} />
          </View>
        </View>
        <CustomAlert
          visible={alertVisible}
          onClose={() => setAlertVisible(false)}
          message={alertMessage}
        />
        <LoadingModal visible={loading} message="Creating your account..." />
      </Background>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    width: "100%",
  },

  formImage: {
    height: 432,
    width: 298,
    alignItems: "center",
    justifyContent: "center",
  },

  label: {
    width: "100%",
    color: "#e0baba",
    fontSize: 15,
    marginBottom: 10,
    textAlign: "left",
    marginLeft: 60,
  },

  input: {
    borderColor: "#ff0000",
    borderWidth: 1,
    borderRadius: 80,
    height: 38,
    width: 261,
    color: "#ffd",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#000",
  },

  btnContainer: {
    width: 260,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 20,
  },
});
