import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';

type Card = {
  question: string;
  answer: string;
};

type Deck = {
  id: string;
  title: string;
  cards?: Card[];
};

export default function DeckDetailScreen() {
  const { deckId } = useLocalSearchParams();

  const [deck, setDeck] = useState<Deck | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    const loadDeck = async () => {
      try {
        const data = await AsyncStorage.getItem('decks');
        if (data) {
          const parsed = JSON.parse(data);
          const deckArray = Array.isArray(parsed) ? parsed : Object.values(parsed);
          const foundDeck = deckArray.find((d: Deck) => d.id === deckId);
          if (foundDeck) {
            setDeck(foundDeck);
            setCards(foundDeck.cards ?? []);
          } else {
            setDeck(null);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadDeck();
  }, [deckId]);

  const saveCard = async () => {
    if (!question.trim() || !answer.trim()) {
      Alert.alert('Fehler', 'Bitte Frage und Antwort eingeben');
      return;
    }

    const newCard: Card = { question: question.trim(), answer: answer.trim() };
    const updatedCards = [...cards, newCard];

    try {
      const data = await AsyncStorage.getItem('decks');
      if (data) {
        const parsed = JSON.parse(data);
        const deckArray = Array.isArray(parsed) ? parsed : Object.values(parsed);
        const updatedDecks = deckArray.map((d: Deck) =>
          d.id === deckId ? { ...d, cards: updatedCards } : d
        );
        await AsyncStorage.setItem('decks', JSON.stringify(updatedDecks));
        setCards(updatedCards);
        setQuestion('');
        setAnswer('');
        setModalVisible(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <View style={styles.detailContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!deck) {
    return (
      <View style={styles.detailContainer}>
        <Text>Deck nicht gefunden</Text>
      </View>
    );
  }

  return (
    <View style={styles.detailContainer}>
      <Text style={styles.deckTitleDark}>{deck.title}</Text>

      <FlatList
        data={cards}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <View style={styles.cardItem}>
            <Text style={styles.cardQuestion}>{item.question}</Text>
            <Text style={styles.cardAnswer}>{item.answer}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Neue Karte</Text>
            <TextInput
              placeholder="Frage"
              value={question}
              onChangeText={setQuestion}
              style={styles.input}
            />
            <TextInput
              placeholder="Antwort"
              value={answer}
              onChangeText={setAnswer}
              style={styles.input}
            />
            <TouchableOpacity style={styles.createButton} onPress={saveCard}>
              <Text style={styles.createButtonText}>Speichern</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 10, alignItems: 'center' }}>
              <Text style={{ color: '#888' }}>Abbrechen</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}