import { Tabs } from "expo-router";
import { Image, StyleSheet } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveBackgroundColor: "#4A0503",
        tabBarActiveTintColor: "#e0baba",
        tabBarInactiveTintColor: "#ff0000",
        tabBarStyle: { backgroundColor: "#000000" },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: 400,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../../assets/icons/torii-gate-solid.png")}
              style={[styles.icons, { tintColor: color }]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="unfinished"
        options={{
          tabBarLabel: "Unfinished",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../../assets/icons/gopuram-solid.png")}
              style={[styles.icons, { tintColor: color }]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="finished"
        options={{
          tabBarLabel: "Finished",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../../assets/icons/skull-crossbones-solid.png")}
              style={[styles.icons, { tintColor: color }]}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  icons: {
    height: 25,
    width: 25,
    tintColor: "#ff0000",
  },
});
