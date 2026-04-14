import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';
import DeckOptionsModal from '../../components/DeckOptionsModal';

type Deck = {
  id: string;
  title: string;
  cards?: { question: string; answer: string }[];
  color?: string;
};

export default function HomeScreen() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);
  const [editTitle, setEditTitle] = useState('');

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

  const openModal = (deck: Deck) => {
    setSelectedDeck(deck);
    setEditTitle(deck.title);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedDeck(null);
    setEditTitle('');
  };

  const saveTitle = async () => {
    if (!selectedDeck) return;
    const trimmed = editTitle.trim();
    if (!trimmed) {
      Alert.alert('Fehler', 'Titel darf nicht leer sein');
      return;
    }
    const updatedDecks = decks.map((d) =>
      d.id === selectedDeck.id ? { ...d, title: trimmed } : d
    );
    setDecks(updatedDecks);
    await AsyncStorage.setItem('decks', JSON.stringify(updatedDecks));
    setSelectedDeck({ ...selectedDeck, title: trimmed });
  };

  const saveColor = async (color: string) => {
    if (!selectedDeck) return;
    const updatedDecks = decks.map((d) =>
      d.id === selectedDeck.id ? { ...d, color } : d
    );
    setDecks(updatedDecks);
    await AsyncStorage.setItem('decks', JSON.stringify(updatedDecks));
    setSelectedDeck({ ...selectedDeck, color });
  };

  const deleteDeck = () => {
    if (!selectedDeck) return;
    Alert.alert(
      'Deck löschen',
      `Möchtest du das Deck "${selectedDeck.title}" wirklich löschen?`,
      [
        { text: 'Abbrechen', style: 'cancel' },
        {
          text: 'Löschen',
          style: 'destructive',
          onPress: async () => {
            const updatedDecks = decks.filter((d) => d.id !== selectedDeck.id);
            await AsyncStorage.setItem('decks', JSON.stringify(updatedDecks));
            setDecks(updatedDecks);
            closeModal();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={decks}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ flex: 1, margin: 10 }}
            onPress={() => router.push(`/deck/${item.id}`)}
            onLongPress={() => openModal(item)}
          >
            <LinearGradient
              colors={[item.color || '#ccc', '#fff']}
              style={styles.deckCard}
            >
              <Text style={styles.deckTitle}>{item.title}</Text>
              <Text style={styles.cardCount}>{item.cards?.length ?? 0} Karten</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.fab} onPress={() => router.push('/create')}>
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      <DeckOptionsModal
        visible={modalVisible}
        deck={selectedDeck}
        editTitle={editTitle}
        onChangeTitle={setEditTitle}
        onSaveTitle={saveTitle}
        onSaveColor={saveColor}
        onDelete={deleteDeck}
        onClose={closeModal}
      />
    </View>
  );
}