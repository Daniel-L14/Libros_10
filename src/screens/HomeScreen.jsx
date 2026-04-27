import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Animated,
  ActivityIndicator
} from 'react-native';

export default function HomeScreen({ navigation }) {
  const [books, setBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://gutendex.com/books/?languages=es')
      .then(res => res.json())
      .then(data => {
        setBooks(data.results || []);
        setAllBooks(data.results || []);
        setLoading(false);
      });
  }, []);

  const buscar = (texto) => {
    setSearch(texto);

    if (texto === '') {
      setBooks(allBooks);
      return;
    }

    const filtrados = allBooks.filter(book =>
      book.title.toLowerCase().includes(texto.toLowerCase())
    );

    setBooks(filtrados);
  };

  const ordenar = () => {
    const ordenados = [...books].sort(
      (a, b) => b.download_count - a.download_count
    );
    setBooks(ordenados);
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={{ marginTop: 10 }}>Cargando libros...</Text>
      </View>
    );
  }

  const renderItem = ({ item, index }) => {
    const fadeAnim = new Animated.Value(0);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      delay: index * 50,
      useNativeDriver: true
    }).start();

    return (
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [30, 0]
              })
            }
          ]
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('Detalle', { book: item })}
        >
          <View style={styles.card}>
            <Image
              source={{
                uri:
                  item.formats?.['image/jpeg'] ||
                  'https://via.placeholder.com/100x150'
              }}
              style={styles.imagen}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.nombre}>{item.title}</Text>
              <Text style={styles.autor}>
                {item.authors?.[0]?.name || 'Autor desconocido'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Biblioteca</Text>

      <TextInput
        placeholder="Buscar libro..."
        value={search}
        onChangeText={buscar}
        style={styles.input}
      />

      <TouchableOpacity style={styles.boton} onPress={ordenar}>
        <Text style={styles.botonTexto}>Ordenar por descargas</Text>
      </TouchableOpacity>

      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Original')}
      >
        <Text style={styles.fabText}>🎲</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5'
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff'
  },
  boton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center'
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold'
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    elevation: 3
  },
  imagen: {
    width: 80,
    height: 120,
    borderRadius: 5,
    marginRight: 10
  },
  nombre: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  autor: {
    color: 'gray'
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#673AB7',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5
  },
  fabText: {
    color: '#fff',
    fontSize: 20
  }
});