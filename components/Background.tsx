import { ImageBackground, StyleSheet } from "react-native";
import BGimage from "../assets/images/background.png";

// @ts-ignore
export function Background({ children }) {
  return (
    <ImageBackground source={BGimage} style={styles.image}>
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});
