import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function OnboardingBenefitsScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🚀</Text>
        
        <Text style={styles.title}>Beneficios</Text>
        
        <View style={styles.benefitsContainer}>
          <View style={styles.benefitCard}>
            <Text style={styles.benefitEmoji}>🔐</Text>
            <Text style={styles.benefitTitle}>Seguridad</Text>
            <Text style={styles.benefitDescription}>
              Autenticación cifrada con Firebase. Tus datos siempre protegidos.
            </Text>
          </View>
          
          <View style={styles.benefitCard}>
            <Text style={styles.benefitEmoji}>👥</Text>
            <Text style={styles.benefitTitle}>Roles Flexibles</Text>
            <Text style={styles.benefitDescription}>
              Sistema de permisos: Usuario regular o Administrador con acceso completo.
            </Text>
          </View>
          
          <View style={styles.benefitCard}>
            <Text style={styles.benefitEmoji}>📊</Text>
            <Text style={styles.benefitTitle}>Dashboard Intuitivo</Text>
            <Text style={styles.benefitDescription}>
              Panel personalizado según tu rol con estadísticas y acciones rápidas.
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
            onPress={() => navigation.navigate('OnboardingPermissions')}
          >
            <Text style={styles.primaryButtonText}>Siguiente</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.skipButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.skipButtonText}>Saltar al inicio</Text>
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
    marginBottom: 32,
  },
  benefitsContainer: {
    gap: 16,
  },
  benefitCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  benefitEmoji: {
    fontSize: 36,
    marginBottom: 12,
  },
  benefitTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  benefitDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
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