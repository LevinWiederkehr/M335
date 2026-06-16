import { View, StyleSheet } from "react-native";
import VociDetail from "../components/VociDetail";
import { useVoci } from "../context/vociContext";
import { useRouter } from "expo-router";
import Voci from "../models/voci";

export default function AddVociScreen() {
  const router = useRouter();
  const { addVoci } = useVoci();
  const handleAdd = (newVoci: Voci) => {
      addVoci(newVoci);
      router.back();
  }
  return (
      <View style={styles.container}>
          <VociDetail onSave={handleAdd} />
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#25292e",
        paddingTop: 60,
        alignItems: "center",
    },
});