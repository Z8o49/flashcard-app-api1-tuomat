import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },

  buttonRow: {
    marginBottom: 20,
    alignItems: 'center',
  },
  createButton: {
    backgroundColor: '#2575fc',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
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
  deckTitleDark: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  cardCount: {
    fontSize: 14,
    color: '#fff',
  },

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
    marginBottom: 15,
  },

  detailContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
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

  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#2575fc',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 25,
    width: '85%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default styles;