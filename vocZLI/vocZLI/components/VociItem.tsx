import { Text, View, StyleSheet } from "react-native";
import Voci from "../models/voci";

type Props = {
  voci: Voci;
};

export default function VociItem({ voci }: Props) {
  return (
    <View style={styles.VociItem}>
      <Text style={styles.VociItemText}>Begriff: {voci.term}</Text>
      <Text style={styles.VociItemText}>Übersetzung: {voci.translation}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  VociItem: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    width: "90%",
    shadowColor: "#bf5151",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  VociItemText: {
    fontSize: 16,
    color: "#000",
  },
});