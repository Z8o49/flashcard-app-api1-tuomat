import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import styles from './styles';

type Deck = {
  id: string;
  title: string;
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

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={styles.header}>Willkommen zur Flashcard-App</Text>

      <Button title="Deck erstellen" onPress={() => router.push('/create')} />

      <FlatList
        data={decks}
        keyExtractor={(item) => item.id}
        numColumns={2}
        style={{ marginTop: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/deck/${item.id}`)}
          >
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}