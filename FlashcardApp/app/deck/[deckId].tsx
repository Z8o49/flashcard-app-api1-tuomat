import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

  useEffect(() => {
    const loadDeck = async () => {
      try {
        const data = await AsyncStorage.getItem('decks');
        if (data) {
          const parsed = JSON.parse(data);
          const deckArray = Array.isArray(parsed) ? parsed : Object.values(parsed);

          const foundDeck = deckArray.find((d: Deck) => d.id === deckId);

          if (foundDeck) {
            // 🔹 Testkarten für Anzeige
            const tempCards = foundDeck.cards && foundDeck.cards.length > 0
              ? foundDeck.cards
              : [
                  { question: 'Was ist React Native?', answer: 'Framework für Apps' },
                  { question: 'Was ist useState?', answer: 'State Hook' },
                  { question: 'Was ist useEffect?', answer: 'Effect Hook' },
                ];

            setDeck(foundDeck);
            setCards(tempCards);

            // 🔹 AsyncStorage parallel aktualisieren (optional)
            if (!foundDeck.cards || foundDeck.cards.length === 0) {
              foundDeck.cards = tempCards;
              AsyncStorage.setItem('decks', JSON.stringify(deckArray)).catch(console.log);
            }
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
      <Text style={styles.deckTitle}>{deck.title}</Text>

      <FlatList
        data={cards}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.cardItem}>
            <Text style={styles.cardQuestion}>{item.question}</Text>
            <Text style={styles.cardAnswer}>{item.answer}</Text>
          </View>
        )}
      />
    </View>
  );
}