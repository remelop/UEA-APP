import { 
  View, Text, StyleSheet, TouchableOpacity, 
  SafeAreaView, ScrollView 
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useCallback } from 'react';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { user, userData, isAuthenticated, logout } = useAuth();
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  // ⚠️ IMPORTANTE: QUITADO el useEffect que redirigía automáticamente
  // El usuario ahora decide si ir al Dashboard

  // Verificar si el onboarding ya fue completado
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const value = await AsyncStorage.getItem('@onboarding_completed');
        if (value !== null) {
          setOnboardingCompleted(true);
        }
      } catch (error) {
        console.error('Error leyendo onboarding status:', error);
      }
    };
    
    checkOnboardingStatus();
  }, []);

  // Redirigir al onboarding si no está completado
  useFocusEffect(
    useCallback(() => {
      const redirectIfNeeded = async () => {
        try {
          const value = await AsyncStorage.getItem('@onboarding_completed');
          if (value === null && !isAuthenticated) {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Onboarding' }]
            });
          }
        } catch (error) {
          console.error('Error en redirección:', error);
        }
      };
      
      redirectIfNeeded();
    }, [isAuthenticated, navigation])
  );

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleRegister = () => {
    navigation.navigate('Registro');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleDashboard = () => {
    navigation.navigate('Dashboard');
  };

  const handleLogout = async () => {
    try {
      await logout();
      // Después de logout, quedamos en Home (ya no autenticados)
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  // Función para resetear onboarding (útil para testing)
  const resetOnboarding = async () => {
    try {
      await AsyncStorage.removeItem('@onboarding_completed');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Onboarding' }]
      });
    } catch (error) {
      console.error('Error reseteando onboarding:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Sistema de Registro</Text>
          <Text style={styles.subtitle}>Control de acceso con roles</Text>
        </View>

        {isAuthenticated ? (
          <View style={styles.authenticatedContainer}>
            <View style={styles.welcomeCard}>
              <Text style={styles.welcomeIcon}>👋</Text>
              <Text style={styles.welcomeText}>¡Bienvenido de vuelta!</Text>
              <Text style={styles.userName}>{userData?.name || user?.email}</Text>
              <View style={[
                styles.roleBadge,
                userData?.role === 'admin' ? styles.roleBadgeAdmin : styles.roleBadgeUser
              ]}>
                <Text style={styles.roleText}>
                  {userData?.role === 'admin' ? 'Administrador' : 'Usuario'}
                </Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={handleDashboard}
            >
              <Text style={styles.primaryButtonText}>Ir al Dashboard</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={handleLogout}
            >
              <Text style={styles.secondaryButtonText}>Cerrar Sesión</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.unauthenticatedContainer}>
            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>Nuevas Funcionalidades</Text>
              <Text style={styles.infoItem}>✅ Flujo de Onboarding</Text>
              <Text style={styles.infoItem}>✅ Validaciones avanzadas con Zod</Text>
              <Text style={styles.infoItem}>✅ Validación asíncrona de email</Text>
              <Text style={styles.infoItem}>✅ Feedback accesible WCAG 2.2</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={handleRegister}
            >
              <Text style={styles.primaryButtonText}>Crear Cuenta (Zod)</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={handleLogin}
            >
              <Text style={styles.secondaryButtonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.linkButton}
              onPress={handleForgotPassword}
            >
              <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Solo mostrar en desarrollo/testing */}
        {__DEV__ && !isAuthenticated && (
          <TouchableOpacity 
            style={styles.devButton}
            onPress={resetOnboarding}
          >
            <Text style={styles.devButtonText}>🔄 Reiniciar Onboarding</Text>
          </TouchableOpacity>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>Firebase Authentication + Zod</Text>
          <Text style={styles.footerSubtext}>Versión 2.0.0 - Con validaciones avanzadas</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#6c757d',
    textAlign: 'center',
  },
  authenticatedContainer: {
    width: '100%',
    alignItems: 'center',
  },
  unauthenticatedContainer: {
    width: '100%',
    alignItems: 'center',
  },
  welcomeCard: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 32,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  welcomeIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 16,
  },
  roleBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  roleBadgeAdmin: {
    backgroundColor: '#dc3545',
  },
  roleBadgeUser: {
    backgroundColor: '#28a745',
  },
  roleText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoCard: {
    backgroundColor: '#e3f2fd',
    padding: 20,
    borderRadius: 12,
    marginBottom: 32,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: '#bbdefb',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0d47a1',
    marginBottom: 12,
    textAlign: 'center',
  },
  infoItem: {
    fontSize: 14,
    color: '#1565c0',
    marginBottom: 8,
    paddingLeft: 8,
  },
  primaryButton: {
    backgroundColor: '#007bff',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
    maxWidth: 400,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
    maxWidth: 400,
    borderWidth: 2,
    borderColor: '#007bff',
  },
  secondaryButtonText: {
    color: '#007bff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkButton: {
    paddingVertical: 12,
    marginTop: 8,
  },
  linkText: {
    color: '#007bff',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  devButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 30,
  },
  devButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    marginTop: 48,
    alignItems: 'center',
  },
  footerText: {
    color: '#6c757d',
    fontSize: 14,
  },
  footerSubtext: {
    color: '#adb5bd',
    fontSize: 12,
    marginTop: 4,
  },
});