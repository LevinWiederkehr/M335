import { FlatList, Text, View, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import Voci from "../models/voci";
import VociItem from "../components/VociItem";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useVoci } from "../context/vociContext";

export default function Index() {
  const router = useRouter();
  const { vociList, isLoading } = useVoci();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>VocZLI</Text>
      <Text style={styles.subtitle}>Meine Vokabel-Lern-App</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
      ) : (
        <>
          <FlatList
            data={vociList}
            keyExtractor={(item) => item.term}
            renderItem={({ item }) => <VociItem voci={item} />}
            ListEmptyComponent={() => (
              <View style={styles.empty}>
                <Text style={styles.emptyText}>Keine Vokabeln vorhanden</Text>
                <Ionicons name="sad-outline" size={32} color="#fff" />
              </View>
            )} 
          />
          <Pressable onPress={() => router.push("/learn")} style={({ pressed }) => [styles.fab, { opacity: pressed ? 0.7 : 1, transform: [{ scale: pressed ? 0.93 : 1 }] }]}>
            <Ionicons name="play-outline" size={24} color="#fff" />
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    paddingTop: 60,
    // alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#fff",
    fontSize: 16,
    marginTop: 8,
  },
  fab: {
    backgroundColor: "#722F37",
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#fff",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  empty: {
    marginTop: 32,
    alignItems: "center",
    gap: 12,
  },
  emptyText: {
    color: "#888",
    fontSize: 16,
  },
});