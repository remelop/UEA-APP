import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function DashboardScreen() {
  const navigation = useNavigation();
  const { user, userData } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserDetails(data);
          }
        } catch (error) {
          console.error('Error obteniendo detalles:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        // Si no hay usuario, redirigir al login
        navigation.navigate('Login');
      }
    };

    fetchUserDetails();
  }, [user, navigation]);

  // Botón para volver al inicio (HomeScreen)
  const handleGoToHome = () => {
    navigation.navigate('Home');
  };

  // Si está cargando
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Cargando información...</Text>
      </View>
    );
  }

  // Si no hay usuario (no debería pasar)
  if (!user) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No hay sesión activa</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.backButtonText}>Ir a Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* HEADER CON BOTÓN DE VOLVER */}
      <View style={styles.topBar}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleGoToHome}
        >
          <Text style={styles.backButtonText}>← Inicio</Text>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Dashboard</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>👋 ¡Bienvenido!</Text>
        <Text style={styles.subtitle}>Panel de Control Principal</Text>
      </View>

      {/* TARJETA DE USUARIO */}
      <View style={styles.userCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {userDetails?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
          </Text>
        </View>
        
        <Text style={styles.userName}>
          {userDetails?.name || user?.email?.split('@')[0] || 'Usuario'}
        </Text>
        
        <Text style={styles.userEmail}>{user?.email}</Text>
        
        <View style={[
          styles.roleBadge,
          userDetails?.role === 'admin' ? styles.roleBadgeAdmin : styles.roleBadgeUser
        ]}>
          <Text style={styles.roleText}>
            {userDetails?.role === 'admin' ? 'ADMINISTRADOR' : 'USUARIO'}
          </Text>
        </View>
      </View>

      {/* ESTADÍSTICAS */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>1</Text>
          <Text style={styles.statLabel}>Cuenta Activa</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {userDetails?.role === 'admin' ? 'Admin' : 'User'}
          </Text>
          <Text style={styles.statLabel}>Tipo de Rol</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>✓</Text>
          <Text style={styles.statLabel}>Online</Text>
        </View>
      </View>

      {/* ACCIONES RÁPIDAS */}
      <View style={styles.actionsContainer}>
        <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => Alert.alert('Perfil', 'Ver y editar tu perfil de usuario')}
        >
          <Text style={styles.actionButtonText}>👤 Ver Mi Perfil</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => Alert.alert('Configuración', 'Ajustes de la aplicación')}
        >
          <Text style={styles.actionButtonText}>⚙️ Configuración</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('Registro')}
        >
          <Text style={styles.actionButtonText}>➕ Crear Nuevo Usuario</Text>
        </TouchableOpacity>
        
        {userDetails?.role === 'admin' && (
          <TouchableOpacity 
            style={[styles.actionButton, styles.actionButtonAdmin]}
            onPress={() => Alert.alert('Administración', 'Panel de administración de usuarios')}
          >
            <Text style={styles.actionButtonText}>👑 Panel Admin</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* INFORMACIÓN DE SESIÓN */}
      <View style={styles.sessionInfo}>
        <Text style={styles.sessionTitle}>Información de Sesión</Text>
        <Text style={styles.sessionText}>
          📅 Iniciada: {new Date().toLocaleDateString('es-ES', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </Text>
        <Text style={styles.sessionText}>
          🕒 Hora: {new Date().toLocaleTimeString('es-ES')}
        </Text>
        <Text style={styles.sessionText}>
          🔐 Estado: <Text style={styles.sessionStatusActive}>Sesión Activa</Text>
        </Text>
      </View>

      {/* BOTÓN PARA VOLVER AL INICIO (Home) */}
      <TouchableOpacity 
        style={styles.homeButton}
        onPress={handleGoToHome}
      >
        <Text style={styles.homeButtonText}>🏠 Volver al Inicio</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Sistema de Registro con Roles • v2.0 • {new Date().getFullYear()}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
    paddingTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6c757d',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#dc3545',
    marginBottom: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#6c757d',
    borderRadius: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSpacer: {
    width: 70,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
  },
  userCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#6c757d',
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007bff',
  },
  statLabel: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 4,
    textAlign: 'center',
  },
  actionsContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: '#f8f9fa',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  actionButtonAdmin: {
    backgroundColor: '#fff3cd',
    borderColor: '#ffeaa7',
  },
  actionButtonText: {
    fontSize: 16,
    color: '#495057',
  },
  sessionInfo: {
    backgroundColor: '#e3f2fd',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#bbdefb',
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0d47a1',
    marginBottom: 10,
  },
  sessionText: {
    fontSize: 14,
    color: '#1565c0',
    marginBottom: 6,
  },
  sessionStatusActive: {
    color: '#28a745',
    fontWeight: 'bold',
  },
  homeButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  homeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#6c757d',
    marginTop: 10,
    marginBottom: 20,
  },
});