import { SignupScreen } from "@/components/SignupScreen";
import { SafeAreaView, StyleSheet } from "react-native";

export default function Signup() {
  return (
    <SafeAreaView style={styles.container}>
      <SignupScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
