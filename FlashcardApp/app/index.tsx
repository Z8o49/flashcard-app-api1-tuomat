import React from 'react';
import { View, Text, Button } from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Willkommen zur Flashcard-App</Text>
      <Button title="Deck erstellen" onPress={() => router.push('/create')} />
      <Button title="Deck Detail (Beispiel)" onPress={() => router.push('/deck/123')} />
    </View>
  );
}