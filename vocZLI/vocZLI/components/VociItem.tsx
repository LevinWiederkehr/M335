import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
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
        {voci.imageUri ? (
          <Image source={{ uri: voci.imageUri }} style={styles.thumbnail} />
        ) : (
          <View style={styles.placeHolder} />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.VociItemText}>Begriff: {voci.term}</Text>
          <Text style={styles.VociItemText}>Übersetzung: {voci.translation}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  VociItem: {
    backgroundColor: "#722F37",
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    marginHorizontal: 16,
    shadowColor: "#fff",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  VociItemText: {
    fontSize: 16,
    color: "#fff",
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  placeHolder: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#888"
  },
  textContainer: {
    flex: 1,
  }
});