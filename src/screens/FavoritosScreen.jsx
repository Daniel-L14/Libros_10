import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';

export default function FavoritosScreen() {
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Favoritos</Text>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nombre}>{item.title}</Text>

            <TouchableOpacity onPress={() => removeFavorite(item.id)}>
              <Text style={styles.eliminar}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2
  },
  nombre: { fontWeight: 'bold' },
  eliminar: { color: 'red', marginTop: 5 }
});