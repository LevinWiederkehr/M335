import { Text, View, StyleSheet, Pressable, Animated } from "react-native";
import Voci from "../models/voci";
import { useRef, useState } from "react";
import { useRouter } from "expo-router";
import { useVoci } from "../context/vociContext";

export default function LearnScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [currentKnownCount, setCurrentKnownCount] = useState(0);
  const [currentNotKnownCount, setCurrentNotKnownCount] = useState(0);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  const { vociList } = useVoci();
  const currentVoci = vociList[currentIndex];

  const toggleTranslation = () => {
    if (showTranslation) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
            toValue: 50,
            duration: 200,
            useNativeDriver: true,
        })
      ]).start(() => setShowTranslation(false));
    }
    else {
      showTranslationAnimated();
    }
    };

  const showTranslationAnimated = () => {
    setShowTranslation(true);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
  };

  const handleNext = () => {
    fadeAnim.setValue(0);
    slideAnim.setValue(50);
    setShowTranslation(false);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex >= vociList.length) {
        router.push("/");
        return prevIndex;
      }
      return nextIndex;
    });
  };

  const handleKnown = () => {
    setCurrentKnownCount((prevCount) => prevCount + 1);
    handleNext();
  };

  const handleNotKnown = () => {
    setCurrentNotKnownCount((prevCount) => prevCount + 1);
    handleNext();
  };

  return (
    <View style={ styles.container }>
      <Text style={ styles.Progress}>Gewusst: {currentKnownCount} | Nicht Gewusst: {currentNotKnownCount}</Text>
      <Text style={{ fontSize: 32, fontWeight: "bold", color: "#fff" }}>Vokabeln lernen</Text>
      <View style={ styles.Card }>
        <Text style={ styles.Progress }>{currentIndex + 1}/{vociList.length}</Text>
        <Text style={ styles.CardText }>{currentVoci.term}</Text>
        {showTranslation && <Animated.Text style={[styles.CardText, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>{currentVoci.translation}</Animated.Text>}
      </View>
          <Pressable onPress={toggleTranslation} style={ styles.fab }>
            <Text style={ styles.fabText }>{showTranslation ? "Verbergen" : "Übersetzung anzeigen"}</Text>
          </Pressable>
      {showTranslation && <Pressable onPress={handleKnown} style={ styles.fabKnown }>
        <Text style={ styles.fabText }>Gewusst</Text>
      </Pressable>}
      {showTranslation && <Pressable onPress={handleNotKnown} style={ styles.fabNotKnown }>
        <Text style={ styles.fabText }>Nicht Gewusst</Text>
      </Pressable>}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#25292e",
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    Card: {
        backgroundColor: "#722F37",
        alignItems: "center",
        justifyContent: "center",
        padding: 120,
        marginTop: 32,
        borderRadius: 16,
        shadowColor: "#fff",
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 4,
    },
    CardText: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#fff",
    },
    Progress: {
        position: "absolute",
        top: 16,
        left: 16,
        fontSize: 24,
        color: "#fff",
    },
    fab: {
        backgroundColor: "#722F37",
        marginTop: 32,
        width: 180,
        height: 60,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#fff",
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 4,
    },
    fabKnown: {
        backgroundColor: "#4CAF50",
        marginTop: 16,
        width: 180,
        height: 60,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#fff",
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 4,
    },
    fabNotKnown: {
        backgroundColor: "#f44336",
        marginTop: 16,
        width: 180,
        height: 60,
        borderRadius: 10,
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
