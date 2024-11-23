//@ts-nocheck
import { ThemeProvider } from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";
import { useCustomTheme } from "@/hooks/useCustomTheme";
import { useEffect, useState } from "react";
import storageUtils from "@/utils/storageUtils";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  const theme = useCustomTheme();
  const router = useRouter();

  const [isSessionChecked, setIsSessionChecked] = useState(false);
  const [isSessionValid, setIsSessionValid] = useState(false);

  useEffect(() => {
    const validateSession = async () => {
      try {
        const userSession = await storageUtils.getUserSession();
        if (userSession) {
          setIsSessionValid(true);
        } else {
          setIsSessionValid(false);
        }
      } finally {
        setIsSessionChecked(true); // Mark session check as complete
      }
    };

    validateSession();
  }, []);

  useEffect(() => {
    if (isSessionChecked) {
      router.replace(isSessionValid ? "/(tabs)/home" : "/(forms)/login");
    }
  }, [isSessionChecked, isSessionValid, router]);

  if (!isSessionChecked) {
    // Show loading screen while checking session
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000",
        }}
      >
        <ActivityIndicator size="large" color={"#ff0000"} />
        <Text
          style={{
            marginTop: 10,
            color: "#e0baba",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <StatusBar
        backgroundColor="#000"
        barStyle="light-content"
        translucent={false}
      />
      <ThemeProvider value={theme}>
        <Stack>
          <Stack.Screen name="(forms)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </View>
  );
}
