import { View, StyleSheet } from "react-native";
import VociDetail from "../components/VociDetail";
import { useVoci } from "../context/vociContext";
import { useRouter, useLocalSearchParams } from "expo-router";
import Voci from "../models/voci";

export default function EditVociScreen() {
  const router = useRouter();
  const { term } = useLocalSearchParams<{ term: string }>();
  const { vociList, updateVoci, removeVoci } = useVoci();
  const vociToEdit = vociList.find(v => v.term === term);

  const handleSave = (updatedVoci: Voci) => {
    updateVoci(term, updatedVoci);
    router.back();
  };
  const handleDelete = (term: string) => {
    removeVoci(term);
    router.back();
  };
  const handleCancel = () => {
    router.back();
  };
  return (
    <View style={styles.container}>
      <VociDetail onSave={handleSave} onDelete={handleDelete} onCancel={handleCancel} initialVoci={vociToEdit} />
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