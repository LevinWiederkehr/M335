import { Text, Image, StyleSheet, TouchableOpacity, View, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system/legacy";
import * as ImageManipulator from "expo-image-manipulator";


interface ImagePickerButtonProps {
  imageUri?: string;           // Aktuelles Bild (optional)
  onImageSelected: (uri: string) => void;  // Callback wenn Bild gewählt
}

const CopyImageToAppDirectory = async (uri: string): Promise<string> => {
  const result = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 800 } }],
    { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
  );
  const fileName = `${Date.now()}.jpg`;
  const destination = `${FileSystem.documentDirectory}${fileName}`;
  await FileSystem.copyAsync({ from: result.uri, to: destination });
  return destination;
}

export default function ImagePickerButton({ imageUri, onImageSelected }: ImagePickerButtonProps) {
  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Fehler:", "Kamera-Zugriff benötigt!");
      return;
    } else {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      })
      if (!result.canceled) {
        const permanentUri = await CopyImageToAppDirectory(result.assets[0].uri);
        onImageSelected(permanentUri);
      };
    };
  };
  const openGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Fehler:", "Galerie-Zugriff benötigt!");
      return;
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      })
      if (!result.canceled) {
        const permanentUri = await CopyImageToAppDirectory(result.assets[0].uri);
        onImageSelected(permanentUri);
      };
    };
  };
  const handlePress = () => {
    Alert.alert("Bild auswählen", "", [
        { text: "Foto aufnehmen", onPress: openCamera },
        { text: "Aus Galerie wählen", onPress: openGallery },
        { text: "Abbrechen", style: "cancel" },
    ]);
  };
  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Bild{"\n"}hinzufügen</Text>
        </View>
      )}
    </TouchableOpacity>
);
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#444",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#666",
    borderStyle: "dashed",
  },
  placeholderText: {
    color: "#888",
    fontSize: 14,
    textAlign: "center",
  }
});