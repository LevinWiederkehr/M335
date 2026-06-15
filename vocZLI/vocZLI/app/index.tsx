import { FlatList, Text, View, StyleSheet } from "react-native";
import Voci from "../models/voci";
import VociItem from "../components/VociItem";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>VocZLI</Text>
      <Text style={styles.subtitle}>Meine Vokabel-Lern-App</Text>
      <FlatList
        data={vociList}
        keyExtractor={(item) => item.term}
        renderItem={({ item }) => <VociItem voci={item} />}
        ListEmptyComponent={() => (
          <View style={ styles.container }>
            <Text style={styles.text}>Keine Vokabeln vorhanden</Text>
            <Ionicons name="sad-outline" size={32} color="#fff"/>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    paddingTop: 60,
    alignItems: "center",
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
  }
});

const vociList: Voci[] = [
  {
    term: "Haus",
    translation: "house",
    imageUri: "https://example.com/house.png",
  },
  {
    term: "Baum",
    translation: "tree",
    imageUri: "https://example.com/tree.png",
  },
  {
    term: "Auto",
    translation: "car",
    imageUri: "https://example.com/car.png",
  },
  {
    term: "Katze",
    translation: "cat",
    imageUri: "https://example.com/cat.png",
  },
  {
    term: "Hund",
    translation: "dog",
    imageUri: "https://example.com/dog.png",
  },
  {
    term: "Vogel",
    translation: "bird",
    imageUri: "https://example.com/bird.png",
  },
  {
    term: "Flasche",
    translation: "bottle",
    imageUri: "https://example.com/bottle.png",
  },
  {
    term: "Buch",
    translation: "book",
    imageUri: "https://example.com/book.png",
  }
];