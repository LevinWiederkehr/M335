import { Link, Stack } from 'expo-router';
import { VociProvider } from '../context/vociContext';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function RootLayout() {
  return (
    <VociProvider>
      <Stack
        screenOptions={{
          headerStyle: {
          backgroundColor: '#722F37',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Meine Vokabeln",
            headerRight: () => (
              <Link href="/addVoci" asChild>
                <TouchableOpacity style={{ marginRight: 16 }}>
                  <Ionicons name="add" size={28} color="#fff" />
                </TouchableOpacity>
              </Link>
            ),
          }}
        />

        <Stack.Screen
          name="learn"
          options={{
            title: "Vokabeln lernen",
          }}
        />
        <Stack.Screen
          name="addVoci"
          options={{
            title: "Neue Vokabel",
          }}
        />
        <Stack.Screen
          name="editVoci"
          options={{
            title: "Vokabel bearbeiten",
          }}
        />
      </Stack>
    </VociProvider>
  );
}

const styles = StyleSheet.create({
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
  }
});