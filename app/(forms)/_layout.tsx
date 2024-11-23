import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { View } from "react-native";
import { useCustomTheme } from "@/hooks/useCustomTheme";

export default function RootLayout() {
  const theme = useCustomTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ThemeProvider value={theme}>
        <Stack
          screenOptions={{
            animation: "fade",
            animationTypeForReplace: "pop",
            contentStyle: { backgroundColor: "#000" },
          }}
        >
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </View>
  );
}
