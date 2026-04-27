import { View, Text, StyleSheet } from 'react-native';

export default function InfoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Sobre la App</Text>

      <View style={styles.card}>
        <Text style={styles.subtitulo}>Funcionalidad</Text>
        <Text>Consulta libros desde una API gratuita.</Text>
        <Text>Permite buscar, filtrar y guardar favoritos.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitulo}>Tecnología</Text>
        <Text>React Native + Expo</Text>
        <Text>API: Gutendex</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitulo}>San Agustín</Text>
        <Text>
          Parque arqueológico en Colombia famoso por sus esculturas precolombinas.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3
  },
  subtitulo: { fontWeight: 'bold', marginBottom: 5 }
});