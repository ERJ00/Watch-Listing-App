import { LoginScreen } from "@/components/LoginScreen";
import { SafeAreaView, StyleSheet } from "react-native";

export default function Login() {
  return (
    <SafeAreaView style={styles.container}>
      <LoginScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
