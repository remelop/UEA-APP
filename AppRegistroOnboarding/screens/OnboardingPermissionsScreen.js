import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function OnboardingPermissionsScreen() {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState(false);
  const [location, setLocation] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🔧</Text>
        
        <Text style={styles.title}>Permisos Necesarios</Text>
        
        <Text style={styles.description}>
          Para una mejor experiencia, necesitamos algunos permisos. Puedes cambiarlos después en Configuración.
        </Text>
        
        <View style={styles.permissionsContainer}>
          <View style={styles.permissionCard}>
            <View style={styles.permissionHeader}>
              <Text style={styles.permissionEmoji}>🔔</Text>
              <View style={styles.permissionText}>
                <Text style={styles.permissionTitle}>Notificaciones</Text>
                <Text style={styles.permissionSubtitle}>Alertas importantes y actualizaciones</Text>
              </View>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#ddd', true: '#4CAF50' }}
              thumbColor={notifications ? '#fff' : '#fff'}
            />
          </View>
          
          <View style={styles.permissionCard}>
            <View style={styles.permissionHeader}>
              <Text style={styles.permissionEmoji}>📍</Text>
              <View style={styles.permissionText}>
                <Text style={styles.permissionTitle}>Ubicación (Opcional)</Text>
                <Text style={styles.permissionSubtitle}>Para funciones geolocalizadas</Text>
              </View>
            </View>
            <Switch
              value={location}
              onValueChange={setLocation}
              trackColor={{ false: '#ddd', true: '#4CAF50' }}
              thumbColor={location ? '#fff' : '#fff'}
            />
          </View>
          
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>
              💡 Estos permisos mejoran tu experiencia pero no son obligatorios para usar la aplicación.
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.footer}>
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.secondaryButtonText}>Atrás</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => navigation.navigate('OnboardingAccess')}
          >
            <Text style={styles.primaryButtonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.skipButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.skipButtonText}>Omitir permisos</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 64,
    textAlign: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  permissionsContainer: {
    gap: 16,
  },
  permissionCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  permissionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  permissionEmoji: {
    fontSize: 24,
    marginRight: 16,
  },
  permissionText: {
    flex: 1,
  },
  permissionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  permissionSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  infoCard: {
    backgroundColor: '#e3f2fd',
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#bbdefb',
  },
  infoText: {
    fontSize: 14,
    color: '#1565c0',
    lineHeight: 20,
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: '#007bff',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginLeft: 8,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  secondaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  skipButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#6c757d',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});