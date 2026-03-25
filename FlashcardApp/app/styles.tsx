import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // ===== HomeScreen =====
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    flex: 1,
    margin: 10,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  // ===== CreateDeckScreen =====
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
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
    marginBottom: 20,
  },
});

export default styles;