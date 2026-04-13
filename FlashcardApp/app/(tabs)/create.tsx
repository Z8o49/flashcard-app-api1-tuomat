import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import styles from '../styles';

const DECK_COLORS = [
  '#e74c3c', '#e67e22', '#f1c40f', '#2ecc71',
  '#1abc9c', '#3498db', '#9b59b6', '#e91e63',
  '#00bcd4', '#ff5722', '#8bc34a', '#673ab7',
];

function getRandomColor(): string {
  return DECK_COLORS[Math.floor(Math.random() * DECK_COLORS.length)];
}

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
        cards: [], // immer initialisieren
        color: getRandomColor(),
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
      <Text style={styles.createHeader}>Neues Deck erstellen</Text>
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