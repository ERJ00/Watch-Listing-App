// @ts-nocheck
import { StyleSheet } from "react-native";
import Login from "./(forms)/login";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import storageUtils from "@/utils/storageUtils";
import Home from "./(tabs)/home";

export default function Index() {
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const session = await storageUtils.getUserSession();
      if (session) {
        setHasSession(true);
      }
      else{
        setHasSession(false);
      }
    };
    checkSession();
  }, []);

  return (
    <SafeAreaProvider style={styles.container}>
      {hasSession ? <Login /> : <Home />}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
