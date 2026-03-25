import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles';

type Deck = {
  id: string;
  title: string;
  cards?: { question: string; answer: string }[];
  color?: string;
};

export default function HomeScreen() {
  const [decks, setDecks] = useState<Deck[]>([]);

  const loadDecks = async () => {
    const data = await AsyncStorage.getItem('decks');
    if (data) {
      const parsed = JSON.parse(data);
      const deckArray = Array.isArray(parsed) ? parsed : Object.values(parsed);
      setDecks(deckArray);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadDecks();
    }, [])
  );

  const handleLongPress = (deck: Deck) => {
    Alert.alert('Deck-Optionen', `Optionen für: ${deck.title}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.createButton} onPress={() => router.push('/create')}>
          <Text style={styles.createButtonText}>+ Deck erstellen</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={decks}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ flex: 1, margin: 10 }}
            onPress={() => router.push(`/deck/${item.id}`)}
            onLongPress={() => handleLongPress(item)}
          >
            <LinearGradient
              colors={[item.color || '#6a11cb', '#2575fc']}
              style={styles.deckCard}
            >
              <Text style={styles.deckTitle}>{item.title}</Text>
              <Text style={styles.cardCount}>{item.cards?.length ?? 0} Karten</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}