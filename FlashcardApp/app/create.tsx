import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export default function CreateDeckScreen() {
  const [title, setTitle] = useState('');

  const saveDeck = async () => {
    if (!title.trim()) {
      Alert.alert('Fehler', 'Bitte einen Titel eingeben');
      return;
    }

    try {
      const data = await AsyncStorage.getItem('decks');
      const decks = data ? JSON.parse(data) : [];

      // Neues Deck erstellen
      const newDeck = { id: Date.now().toString(), title };

      // Deck hinzufügen
      const updatedDecks = [...decks, newDeck];

      // Zurück in AsyncStorage speichern
      await AsyncStorage.setItem('decks', JSON.stringify(updatedDecks));

      // Zurück zur Startseite
      router.push('/');
    } catch (error) {
      console.log('Fehler beim Speichern:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Neues Deck erstellen</Text>

      <TextInput
        placeholder="Titel eingeben"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <Button title="Speichern" onPress={saveDeck} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
});