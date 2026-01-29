import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OnboardingAccessScreen() {
  const navigation = useNavigation();

  const handleGetStarted = async () => {
    try {
      // Marcar onboarding como completado
      await AsyncStorage.setItem('@onboarding_completed', 'true');
      
      // Redirigir a Home
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }]
      });
    } catch (error) {
      console.error('Error guardando onboarding status:', error);
    }
  };

  const handleLoginDirect = async () => {
    try {
      await AsyncStorage.setItem('@onboarding_completed', 'true');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }]
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🎉</Text>
        
        <Text style={styles.title}>¡Todo Listo!</Text>
        
        <Text style={styles.description}>
          Ya puedes comenzar a usar el sistema de registro y autenticación.
        </Text>
        
        <View style={styles.optionsContainer}>
          <View style={styles.optionCard}>
            <Text style={styles.optionEmoji}>👤</Text>
            <Text style={styles.optionTitle}>Usuario Nuevo</Text>
            <Text style={styles.optionDescription}>
              Crea una cuenta para acceder al dashboard personalizado.
            </Text>
          </View>
          
          <View style={styles.optionCard}>
            <Text style={styles.optionEmoji}>🔑</Text>
            <Text style={styles.optionTitle}>Usuario Existente</Text>
            <Text style={styles.optionDescription}>
              Inicia sesión con tu cuenta para continuar donde quedaste.
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={handleGetStarted}
        >
          <Text style={styles.primaryButtonText}>Empezar Ahora</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.secondaryButtonText}>Atrás</Text>
        </TouchableOpacity>
        
        <View style={styles.loginPrompt}>
          <Text style={styles.loginText}>¿Ya tienes cuenta? </Text>
          <TouchableOpacity onPress={handleLoginDirect}>
            <Text style={styles.loginLink}>Inicia sesión aquí</Text>
          </TouchableOpacity>
        </View>
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
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  optionsContainer: {
    gap: 20,
  },
  optionCard: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  optionEmoji: {
    fontSize: 36,
    marginBottom: 16,
  },
  optionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#28a745',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  secondaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    color: '#666',
  },
  loginLink: {
    fontSize: 16,
    color: '#007bff',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});