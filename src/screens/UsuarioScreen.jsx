import { View, Text, StyleSheet, Image } from 'react-native';

export default function UsuarioScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://i.pravatar.cc/150' }}
        style={styles.avatar}
      />

      <Text style={styles.nombre}>Daniel Latorre</Text>
      <Text style={styles.email}>daniel@email.com</Text>

      <View style={styles.card}>
        <Text>Proyecto académico</Text>
        <Text>App de libros con API</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  nombre: { fontSize: 20, fontWeight: 'bold' },
  email: { color: 'gray', marginBottom: 20 },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    elevation: 3
  }
});