import { createContext, useContext, useState, ReactNode } from 'react';
import Voci from '../models/voci';

interface VociContextType {
  vociList: Voci[];
  addVoci: (voci: Voci) => void;
  updateVoci: (term: string, updatedVoci: Voci) => void;
  removeVoci: (term: string) => void;
}

const VociContext = createContext<VociContextType | undefined>(undefined);

export function VociProvider({ children }: { children: ReactNode }) {
  const [vociList, setVociList] = useState<Voci[]>([
    {term: "Haus", translation: "house", imageUri: "https://example.com/house.png"},
    {term: "Baum", translation: "tree", imageUri: "https://example.com/tree.png"},
    {term: "Auto", translation: "car", imageUri: "https://example.com/car.png"},
    {term: "Katze", translation: "cat", imageUri: "https://example.com/cat.png"},
    {term: "Hund", translation: "dog", imageUri: "https://example.com/dog.png"},
    {term: "Vogel", translation: "bird", imageUri: "https://example.com/bird.png"},
    {term: "Flasche", translation: "bottle", imageUri: "https://example.com/bottle.png"},
    {term: "Buch", translation: "book", imageUri: "https://example.com/book.png"},
  ]);

  function addVoci(voci: Voci) {
    setVociList((prevList) => [...prevList, voci]);
  }

  function updateVoci(term: string, updatedVoci: Voci) {
    setVociList((prevList) => prevList.map((v) => (v.term === term ? updatedVoci : v)));
  }

  function removeVoci(term: string) {
    setVociList((prevList) => prevList.filter((v) => v.term !== term));
  }

  return (
    <VociContext.Provider value={{ vociList, addVoci, updateVoci, removeVoci }}>
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