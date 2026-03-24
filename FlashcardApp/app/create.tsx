import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export default function CreateDeckScreen() {
  const [title, setTitle] = useState('');

  const saveDeck = async () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      Alert.alert('Fehler', 'Bitte einen Titel eingeben');
      return;
    }

    try {
      const data = await AsyncStorage.getItem('decks');
      const decks = data ? JSON.parse(data) : [];

      const newDeck = {
        id: Date.now().toString(),
        title: trimmedTitle,
        cards: [
          { question: 'Was ist React Native?', answer: 'Ein Framework zur App-Entwicklung mit JavaScript.' },
          { question: 'Was macht useState?', answer: 'Es speichert lokale Zustände in einer Komponente.' },
          { question: 'Wofür ist AsyncStorage?', answer: 'Zum Speichern von Daten lokal auf dem Gerät.' }
        ]
      };

      const updatedDecks = [...decks, newDeck];

      await AsyncStorage.setItem('decks', JSON.stringify(updatedDecks));

      router.push('/');
    } catch (error) {
      console.log(error);
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