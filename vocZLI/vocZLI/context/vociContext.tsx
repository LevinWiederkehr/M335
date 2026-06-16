import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Voci from '../models/voci';
import * as FileSystem from "expo-file-system/legacy"

interface VociContextType {
  vociList: Voci[];
  isLoading: boolean;
  addVoci: (voci: Voci) => void;
  updateVoci: (term: string, updatedVoci: Voci) => void;
  removeVoci: (term: string) => void;
}

const deleteImageFile = async (uri?: string) => {
  if (!uri || !uri.startsWith(FileSystem.documentDirectory!)) {
    return;
  }
  try {
    await FileSystem.deleteAsync(uri, { idempotent: true });
  } catch (error) {
    console.error("Fehler beim löschen des Bildes:", error);
  }
}

const VociContext = createContext<VociContextType | undefined>(undefined);

export function VociProvider({ children }: { children: ReactNode }) {
  const [vociList, setVociList] = useState<Voci[]>([
    {term: "Haus", translation: "house", imageUri: ""},
    {term: "Baum", translation: "tree", imageUri: ""},
    {term: "Auto", translation: "car", imageUri: ""},
    {term: "Katze", translation: "cat", imageUri: ""},
    {term: "Hund", translation: "dog", imageUri: ""},
    {term: "Vogel", translation: "bird", imageUri: ""},
    {term: "Flasche", translation: "bottle", imageUri: ""},
    {term: "Buch", translation: "book", imageUri: ""},
  ]);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const loadVoci = async () => {
      try {
        const json = await AsyncStorage.getItem('vocis');
        if (json!== null) {
          setVociList(JSON.parse(json));
          console.log("Vocis geladen:");
        }
      } catch (error) {
        console.error("Fehler beim Laden der Vocis:", error);
      } finally {
        setLoading(false);
      }
    };
    loadVoci();
  }, []);

  useEffect(() => {
    const saveVoci = async () => {
      try {
        const json = JSON.stringify(vociList);
        await AsyncStorage.setItem('vocis', json);
        console.log("Vocis gespeichert:", json);
      } catch (error) {
        console.error("Fehler beim Speichern der Vocis:", error);
      } finally {
        setLoading(false);
      }
    };
    saveVoci();
  }, [vociList]);

  function addVoci(voci: Voci) {
    setVociList((prevList) => [...prevList, voci]);
  }

  function updateVoci(term: string, updatedVoci: Voci) {
    setVociList((prevList) => {
      const old = prevList.find(v => v.term === term);
      if (old?.imageUri !== updatedVoci.imageUri) {
        deleteImageFile(old?.imageUri);
      }
      return prevList.map((v) => (v.term === term ? updatedVoci : v));
    });
  }

  function removeVoci(term: string) {
    setVociList((prevList) => {
      const old = prevList.find(v => v.term === term);
      deleteImageFile(old?.imageUri);
      return prevList.filter((v) => v.term !== term);
    })
  }

  return (
    <VociContext.Provider value={{ vociList, isLoading, addVoci, updateVoci, removeVoci }}>
      {children}
    </VociContext.Provider>
  );
}

export function useVoci() {
  const context = useContext(VociContext);
  if (!context) {
    throw new Error('useVoci muss innerhalb von VociProvider verwendet werden');
  }
  return context;
}