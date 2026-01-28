// screens/HomeScreen.js - VERSIÓN CORREGIDA
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { user, userData, isAuthenticated, logout } = useAuth();

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
      // El AuthContext ya maneja la navegación
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <View style={styles.container}>
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
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={handleRegister}
          >
            <Text style={styles.primaryButtonText}>Crear Cuenta</Text>
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

      <View style={styles.footer}>
        <Text style={styles.footerText}>Firebase Authentication</Text>
        <Text style={styles.footerSubtext}>Versión 1.0.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
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