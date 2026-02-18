import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";

export default function Index() {
  const [name, setName] = useState("Nicole");
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.kicker}>✨ welcome ✨</Text>
      <Text style={styles.title}>Nicole’s First Expo App 🔥</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Your name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Type here…"
          style={styles.input}
          placeholderTextColor="#999"
        />

        <Text style={styles.message}>
          Hi, <Text style={styles.bold}>{name || "friend"}</Text> 💛
        </Text>

        <View style={styles.row}>
          <Pressable style={styles.button} onPress={() => setCount((c) => c + 1)}>
            <Text style={styles.buttonText}>Tap me</Text>
          </Pressable>

          <View style={styles.counterPill}>
            <Text style={styles.counterText}>{count}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.footer}>If this changes instantly, Fast Refresh works 🚀</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#FFF7FB",
  },
  kicker: {
    textTransform: "uppercase",
    letterSpacing: 2,
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 8,
    textAlign: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 18,
    textAlign: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 18,
    gap: 10,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  label: {
    fontSize: 13,
    opacity: 0.7,
  },
  input: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.10)",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  message: {
    fontSize: 16,
    marginTop: 4,
  },
  bold: {
    fontWeight: "800",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 8,
  },
  button: {
    flex: 1,
    backgroundColor: "#111",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  counterPill: {
    width: 56,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#FFE3F1",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
  },
  counterText: {
    fontSize: 18,
    fontWeight: "800",
  },
  footer: {
    marginTop: 14,
    fontSize: 12,
    opacity: 0.6,
    textAlign: "center",
  },
});
