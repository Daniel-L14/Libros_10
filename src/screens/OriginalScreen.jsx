import { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Animated } from 'react-native';

export default function OriginalScreen() {
  const [book, setBook] = useState(null);
  const fade = useRef(new Animated.Value(0)).current;

  const generar = () => {
    fade.setValue(0);

    fetch('https://gutendex.com/books')
      .then(res => res.json())
      .then(data => {
        const random = data.results[Math.floor(Math.random() * data.results.length)];
        setBook(random);

        Animated.timing(fade, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }).start();
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Recomendación</Text>

      {book && (
        <Animated.View style={{ opacity: fade }}>
          <Image
            source={{
              uri: book.formats?.['image/jpeg'] || 'https://via.placeholder.com/120x180'
            }}
            style={styles.img}
          />
          <Text style={styles.nombre}>{book.title}</Text>
        </Animated.View>
      )}

      <TouchableOpacity style={styles.boton} onPress={generar}>
        <Text style={styles.botonTexto}>Recomendar libro</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  img: { width: 120, height: 180, borderRadius: 10 },
  nombre: { textAlign: 'center', marginTop: 10 },
  boton: { backgroundColor: '#673AB7', padding: 12, borderRadius: 10, marginTop: 20 },
  botonTexto: { color: '#fff' }
});