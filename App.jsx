import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { FavoritesProvider } from './src/context/FavoritesContext';

import HomeScreen from './src/screens/HomeScreen';
import FavoritosScreen from './src/screens/FavoritosScreen';
import OriginalScreen from './src/screens/OriginalScreen';
import InfoScreen from './src/screens/InfoScreen';
import UsuarioScreen from './src/screens/UsuarioScreen';
import DetalleScreen from './src/screens/DetalleScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          elevation: 5
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Favoritos') iconName = 'heart';
          else if (route.name === 'Original') iconName = 'star';
          else if (route.name === 'Info') iconName = 'information-circle';
          else if (route.name === 'Usuario') iconName = 'person';

          return <Ionicons name={iconName} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favoritos" component={FavoritosScreen} />
      <Tab.Screen name="Original" component={OriginalScreen} />
      <Tab.Screen name="Info" component={InfoScreen} />
      <Tab.Screen name="Usuario" component={UsuarioScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={Tabs} options={{ headerShown: false }} />
          <Stack.Screen name="Detalle" component={DetalleScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}