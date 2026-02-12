import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './context/AuthContext';

// Importar TODAS las pantallas
import OnboardingScreen from './screens/OnboardingScreen';
import OnboardingBenefitsScreen from './screens/OnboardingBenefitsScreen';
import OnboardingPermissionsScreen from './screens/OnboardingPermissionsScreen';
import OnboardingAccessScreen from './screens/OnboardingAccessScreen';
import HomeScreen from './screens/HomeScreen';
import RegistroScreen from './screens/RegistroScreen';
import LoginScreen from './screens/LoginScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import DashboardScreen from './screens/DashboardScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="Onboarding"
      screenOptions={{
        headerShown: false
      }}
    >
      {/* FLUJO DE ONBOARDING (4 pantallas) */}
      <Stack.Screen 
        name="Onboarding" 
        component={OnboardingScreen}
      />
      <Stack.Screen 
        name="OnboardingBenefits" 
        component={OnboardingBenefitsScreen}
      />
      <Stack.Screen 
        name="OnboardingPermissions" 
        component={OnboardingPermissionsScreen}
      />
      <Stack.Screen 
        name="OnboardingAccess" 
        component={OnboardingAccessScreen}
      />
      
      {/* PANTALLAS EXISTENTES */}
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          title: 'Inicio', 
          headerShown: true,
          headerBackVisible: false // ✅ NO mostrar botón atrás desde Home
        }} 
      />
      <Stack.Screen 
        name="Registro" 
        component={RegistroScreen} 
        options={{ 
          title: 'Crear Cuenta', 
          headerShown: true 
        }} 
      />
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ 
          title: 'Iniciar Sesión', 
          headerShown: true 
        }} 
      />
      <Stack.Screen 
        name="ForgotPassword" 
        component={ForgotPasswordScreen} 
        options={{ 
          title: 'Recuperar Contraseña', 
          headerShown: true 
        }} 
      />
      <Stack.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={{ 
          title: 'Dashboard', 
          headerShown: true,
          headerLeft: () => null // ✅ NO mostrar botón atrás en Dashboard
        }} 
      />
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