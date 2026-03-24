import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

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

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    flex: 1,
    margin: 10,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});