import { View, Text, StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";

export default function ModalScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Modal",
          presentation: "modal",
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Modal</Text>
        <Link href="/(tabs)" style={styles.link}>
          <Text style={styles.linkText}>← Dismiss</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 16,
  },
  link: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  linkText: {
    fontSize: 16,
    color: "#0a7ea4",
  },
});
