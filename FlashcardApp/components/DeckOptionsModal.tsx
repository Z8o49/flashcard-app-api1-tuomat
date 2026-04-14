import React from 'react';
import { Modal, View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import styles from '../app/styles';

type Deck = {
  id: string;
  title: string;
  cards?: { question: string; answer: string }[];
  color?: string;
};

type Props = {
  visible: boolean;
  deck: Deck | null;
  editTitle: string;
  onChangeTitle: (text: string) => void;
  onSaveTitle: () => void;
  onSaveColor: (color: string) => void;
  onDelete: () => void;
  onClose: () => void;
};

const DECK_COLORS = ['#FFD700', '#90EE90', '#87CEFA', '#FFB6C1', '#FFA07A', '#C8A2C8'];

export default function DeckOptionsModal({
  visible,
  deck,
  editTitle,
  onChangeTitle,
  onSaveTitle,
  onSaveColor,
  onDelete,
  onClose,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Deck bearbeiten</Text>

          <Text style={styles.subtitle}>Titel ändern:</Text>
          <TextInput
            value={editTitle}
            onChangeText={onChangeTitle}
            placeholder="Deck-Titel"
            style={styles.modalInput}
          />
          <Button title="Titel speichern" onPress={onSaveTitle} />

          <Text style={styles.subtitle}>Farbe wählen:</Text>
          <View style={styles.colorRow}>
            {DECK_COLORS.map((color) => (
              <TouchableOpacity
                key={color}
                onPress={() => onSaveColor(color)}
                style={[
                  styles.colorCircle,
                  { backgroundColor: color },
                  deck?.color === color && { borderColor: '#000' },
                ]}
              />
            ))}
          </View>

          <View style={{ marginTop: 16 }}>
            <Button title="Deck löschen" color="red" onPress={onDelete} />
          </View>

          <View style={{ marginTop: 8 }}>
            <Button title="Abbrechen" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
}