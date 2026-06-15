import React, { useState } from "react";
import Voci from "../models/voci";
import { View, Text, TextInput, StyleSheet, Alert, Pressable } from "react-native";

interface VociDetailsProps {
  onSave: (voci: Voci) => void;
};

export default function VociDetail({ onSave }: VociDetailsProps) {
  const [term, setTerm] = useState("");
  const [translation, setTranslation] = useState("");

  const handleSave = () => {
    if (term.trim() === '' || translation.trim() === '') {
      Alert.alert('Fehler', 'Begriff und Übersetzung dürfen nicht leer sein.');
    return;
    } else {
      const newVoci: Voci = { term, translation };
      onSave(newVoci);
      setTerm("");
      setTranslation("");
    }
  };  
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <TextInput
      style = {styles.input}
      placeholder="Begriff"
      placeholderTextColor="#888"
      value={term}
      onChangeText={setTerm}
    />
    <TextInput
      style = {styles.input}
      placeholder="Übersetzung"
      placeholderTextColor="#888"
      value={translation}
      onChangeText={setTranslation}
    />
    <Pressable onPress={handleSave} style={ ({ pressed }) => [styles.fab, { opacity: pressed ? 0.7 : 1, transform: [{ scale: pressed ? 0.93 : 1 }] }] }>
      <Text style={styles.fabText}>Speichern</Text>
    </Pressable>
   </View>
  );
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 8,
        width: "90%",
        marginBottom: 16,
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
    fabText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    }
});