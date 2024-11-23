// @ts-nocheck
import {
  SafeAreaView,
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TextInput,
} from "react-native";
import loginBG from "../assets/images/login-form-background.png";
import { LoginBTN } from "./LoginButton";
import { SignupBTN } from "./SignupButton";
import { Background } from "./Background";
import { CustomAlert } from "./CustomAlert";
import { LoadingModal } from "./LoadingScreen";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc, collection, getDocs } from "firebase/firestore";
import { FIREBASEAUTH, FIRESTORE } from "../FirebaseConfig";
import NetInfo from "@react-native-community/netinfo";
import storageUtils from "@/utils/storageUtils";

export function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const checkSession = async () => {
    try {
      const checkSession = await storageUtils.getUserSession();
      if (checkSession) {
        return (
          <Text
            style={{
              color: "#ffd",
              fontSize: 20,
              alignSelf: "center",
              textAlign: "center",
            }}
          >
            Session active. Redirecting...
          </Text>
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    checkSession();
  }, [router]);

  const handleLogin = async () => {
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

    if (!username || !password) {
      setLoading(false);
      setAlertMessage("Please fill in all fields!");
      setAlertVisible(true);
      return;
    }

    try {
      // Check if the username exists in Firestore
      const usernameDocRef = doc(FIRESTORE, "users", username);
      const usernameDoc = await getDoc(usernameDocRef);

      if (!usernameDoc.exists()) {
        setLoading(false);
        setAlertMessage("Username does not exist.");
        setAlertVisible(true);
        return;
      }

      const { email } = usernameDoc.data();

      if (!email) {
        setLoading(false);
        setAlertMessage("No email associated with this username.");
        setAlertVisible(true);
        return;
      }

      await signInWithEmailAndPassword(FIREBASEAUTH, email, password);

      await storageUtils.resetData();

      const itemListRef = collection(usernameDocRef, "itemLists");
      const itemListSnapshot = await getDocs(itemListRef);
      const itemListData = itemListSnapshot.docs.map((doc) => doc.data());

      await storageUtils.saveData(itemListData);
      await storageUtils.saveUserSession({
        username: { username },
        email: { email },
        password: { password },
      });

      setLoading(false);
      router.replace("/(tabs)/home");
    } catch (error) {
      const errorMessage = `Something went wrong! ${error.message}`;
      setAlertMessage(errorMessage);
      setAlertVisible(true);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Background>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ImageBackground source={loginBG} style={styles.formImage}>
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
              <Text style={styles.label}>PASSWORD:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your Password"
                placeholderTextColor={"#ff0000"}
                cursorColor={"#ff0000"}
                selectionColor={"#ff0000"}
                selectionHandleColor={"#ff0000"}
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                value={password}
              />
            </View>
          </ImageBackground>
          <View style={styles.btnContainer}>
            <LoginBTN onAction={handleLogin} />
            <SignupBTN />
          </View>
        </View>
        <CustomAlert
          visible={alertVisible}
          onClose={() => setAlertVisible(false)}
          message={alertMessage}
        />
        <LoadingModal visible={loading} message="Logging you in..." />
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
    marginTop: 80,
  },

  formImage: {
    height: 259,
    width: 298,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "contain",
  },

  label: {
    color: "#ffd",
    fontSize: 15,
    marginBottom: 10,
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
