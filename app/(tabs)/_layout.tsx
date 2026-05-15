import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import { appTheme } from "@/src/theme/app-theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: appTheme.colors.surface,
        },
        headerTitleStyle: {
          color: appTheme.colors.text,
          fontWeight: "700",
        },
        headerShadowVisible: false,
        tabBarActiveTintColor: appTheme.colors.primary,
        tabBarInactiveTintColor: appTheme.colors.textMuted,
        tabBarStyle: {
          backgroundColor: appTheme.colors.surface,
          borderTopColor: appTheme.colors.border,
          height: 66,
          paddingBottom: 8,
          paddingTop: 8,
        },
        sceneStyle: {
          backgroundColor: appTheme.colors.background,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, size }) => <Ionicons color={color} name="home-outline" size={size} />,
        }}
      />
      <Tabs.Screen
        name="scanner"
        options={{
          title: "Scanner",
          tabBarIcon: ({ color, size }) => <Ionicons color={color} name="scan-outline" size={size} />,
        }}
      />
      <Tabs.Screen
        name="collection"
        options={{
          title: "Collection",
          tabBarIcon: ({ color, size }) => <Ionicons color={color} name="albums-outline" size={size} />,
        }}
      />
      <Tabs.Screen
        name="decks"
        options={{
          title: "Decks",
          tabBarIcon: ({ color, size }) => <Ionicons color={color} name="layers-outline" size={size} />,
        }}
      />
      <Tabs.Screen
        name="assistant"
        options={{
          title: "AI",
          tabBarIcon: ({ color, size }) => <Ionicons color={color} name="sparkles-outline" size={size} />,
        }}
      />
    </Tabs>
  );
}
