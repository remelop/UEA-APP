// screens/DashboardScreen.js - VERSIÓN CORREGIDA
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
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function DashboardScreen() {
  const navigation = useNavigation();
  const { user, userData, logout, updateUserData } = useAuth();
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
            updateUserData(data);
          }
        } catch (error) {
          console.error('Error obteniendo detalles:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [user]);

  const handleLogout = async () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres salir?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Sí, Salir', 
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut(auth);
              const result = await logout();
              if (result.success) {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Home' }]
                });
              } else {
                Alert.alert('Error', 'No se pudo cerrar sesión');
              }
            } catch (error) {
              Alert.alert('Error', error.message);
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Cargando datos...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>👋 ¡Bienvenido!</Text>
        <Text style={styles.subtitle}>Panel de Control</Text>
      </View>

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

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>1</Text>
          <Text style={styles.statLabel}>Cuenta Activa</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {userDetails?.role === 'admin' ? 'Todos' : 'Básico'}
          </Text>
          <Text style={styles.statLabel}>Permisos</Text>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <Text style={styles.sectionTitle}>Acciones Disponibles</Text>
        
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>📋 Ver Perfil</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>⚙️ Configuración</Text>
        </TouchableOpacity>
        
        {userDetails?.role === 'admin' && (
          <TouchableOpacity style={[styles.actionButton, styles.actionButtonAdmin]}>
            <Text style={styles.actionButtonText}>👥 Administrar Usuarios</Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>🚪 Cerrar Sesión</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Sesión iniciada el {new Date().toLocaleDateString('es-ES')}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6c757d',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#6c757d',
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
    paddingVertical: 6,
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
    fontSize: 12,
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
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007bff',
  },
  statLabel: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 4,
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
  logoutButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#6c757d',
    marginTop: 10,
  },
});