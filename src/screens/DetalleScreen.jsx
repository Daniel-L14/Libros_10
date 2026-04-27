import { View, Text, StyleSheet, Animated, TouchableOpacity, Image } from 'react-native';
import { useContext, useRef, useEffect } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';

export default function DetalleScreen({ route }) {
  const { book } = route.params;
  const { addFavorite } = useContext(FavoritesContext);

  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{
          uri: book.formats?.['image/jpeg'] || 'https://via.placeholder.com/200x300'
        }}
        style={[styles.imagen, { transform: [{ scale: scaleAnim }] }]}
      />

      <Text style={styles.titulo}>{book.title}</Text>
      <Text style={styles.autor}>
        {book.authors?.[0]?.name || 'Autor desconocido'}
      </Text>
      <Text style={styles.descargas}>Descargas: {book.download_count}</Text>

      <TouchableOpacity style={styles.boton} onPress={() => addFavorite(book)}>
        <Text style={styles.botonTexto}>Agregar a favoritos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center' },
  imagen: { width: 200, height: 300, borderRadius: 10 },
  titulo: { fontSize: 20, fontWeight: 'bold', marginTop: 10, textAlign: 'center' },
  autor: { color: 'gray', marginBottom: 10 },
  descargas: { marginBottom: 20 },
  boton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 10
  },
  botonTexto: { color: '#fff', fontWeight: 'bold' }
});