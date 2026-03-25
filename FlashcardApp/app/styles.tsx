import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // ===== Global =====
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },

  // ===== HomeScreen =====
  buttonRow: {
    marginBottom: 20,
    alignItems: 'center',
  },
  createButton: {
    backgroundColor: '#2575fc',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deckCard: {
    borderRadius: 12,
    padding: 20,
    minHeight: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deckTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  cardCount: {
    fontSize: 14,
    color: '#fff',
  },

  // ===== CreateDeckScreen =====
  createHeader: {
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

  // ===== DetailScreen =====
  detailContainer: {
    flex: 1,
    padding: 20,
  },

  cardItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  cardQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  cardAnswer: {
    fontSize: 14,
    color: '#555',
  },
});

export default styles;