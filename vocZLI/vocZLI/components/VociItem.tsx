import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Voci from "../models/voci";
import { useRouter } from "expo-router";

type Props = {
  voci: Voci;
};

export default function VociItem({ voci }: Props) {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.push(`/editVoci?term=${encodeURIComponent(voci.term)}`)}>
      <View style={styles.VociItem}>
        <Text style={styles.VociItemText}>Begriff: {voci.term}</Text>
        <Text style={styles.VociItemText}>Übersetzung: {voci.translation}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  VociItem: {
    backgroundColor: "#722F37",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    width: "90%",
    shadowColor: "#fff",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  VociItemText: {
    fontSize: 16,
    color: "#fff",
  },
});