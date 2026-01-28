// App.js - Navegacion principal 
import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { StatusBar } from 'expo-status-bar'; 
import { AuthProvider } from './context/AuthContext'; 
 
// Importar pantallas 
import HomeScreen from './screens/HomeScreen'; 
import RegistroScreen from './screens/RegistroScreen'; 
import LoginScreen from './screens/LoginScreen'; 
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'; 
import DashboardScreen from './screens/DashboardScreen'; 
 
const Stack = createNativeStackNavigator(); 
 
function AppNavigator() { 
  return ( 
    <Stack.Navigator initialRouteName="Home"> 
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} /> 
      <Stack.Screen name="Registro" component={RegistroScreen} options={{ title: 'Crear Cuenta' }} /> 
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Iniciar Sesion' }} /> 
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: 'Recuperar Contrase¤a' }} /> 
      <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Dashboard' }} /> 
    </Stack.Navigator> 
  ); 
} 
 
export default function App() { 
  return ( 
    <AuthProvider> 
      <NavigationContainer> 
        <StatusBar style="auto" /> 
        <AppNavigator /> 
      </NavigationContainer> 
    </AuthProvider> 
  ); 
} 
