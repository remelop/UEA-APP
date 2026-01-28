// screens/RegistroScreen.js - VERSIÓN COMPLETA Y FUNCIONAL
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function RegistroScreen() {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'usuario'
  });
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!form.name.trim()) {
      Alert.alert('Error', 'El nombre es requerido');
      return false;
    }
    if (!form.email.trim()) {
      Alert.alert('Error', 'El email es requerido');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      Alert.alert('Error', 'Email inválido');
      return false;
    }
    if (!form.password) {
      Alert.alert('Error', 'La contraseña es requerida');
      return false;
    }
    if (form.password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    if (form.password !== form.confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // 1. Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        form.email.trim(), 
        form.password
      );
      const user = userCredential.user;

      // 2. Guardar datos adicionales en Firestore
      const userData = {
        uid: user.uid,
        name: form.name.trim(),
        email: form.email.trim(),
        role: form.role,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await setDoc(doc(db, 'users', user.uid), userData);

      Alert.alert(
        '✅ Registro Exitoso',
        `Cuenta creada como ${form.role === 'admin' ? 'Administrador' : 'Usuario'}`,
        [{ 
          text: 'OK', 
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Dashboard' }]
            });
          }
        }]
      );
      
    } catch (error) {
      let errorMessage = 'Error al registrar';
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'El email ya está en uso';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Email inválido';
          break;
        case 'auth/weak-password':
          errorMessage = 'Contraseña demasiado débil';
          break;
        default:
          errorMessage = error.message;
      }
      Alert.alert('❌ Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Crear Cuenta</Text>
          <Text style={styles.subtitle}>Regístrate y selecciona tu rol</Text>
        </View>

        {/* Nombre */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nombre Completo *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Juan Pérez"
            value={form.name}
            onChangeText={(text) => updateField('name', text)}
            autoCapitalize="words"
            editable={!loading}
          />
        </View>

        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={styles.input}
            placeholder="ejemplo@email.com"
            value={form.email}
            onChangeText={(text) => updateField('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
          />
        </View>

        {/* Contraseña */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Contraseña *</Text>
          <TextInput
            style={styles.input}
            placeholder="Mínimo 6 caracteres"
            value={form.password}
            onChangeText={(text) => updateField('password', text)}
            secureTextEntry
            editable={!loading}
          />
        </View>

        {/* Confirmar Contraseña */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirmar Contraseña *</Text>
          <TextInput
            style={styles.input}
            placeholder="Repite tu contraseña"
            value={form.confirmPassword}
            onChangeText={(text) => updateField('confirmPassword', text)}
            secureTextEntry
            editable={!loading}
          />
        </View>

        {/* Selección de Rol */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Tipo de Usuario *</Text>
          <View style={styles.roleContainer}>
            <TouchableOpacity
              style={[
                styles.roleButton,
                form.role === 'usuario' && styles.roleButtonActive
              ]}
              onPress={() => updateField('role', 'usuario')}
              disabled={loading}
            >
              <Text style={[
                styles.roleButtonText,
                form.role === 'usuario' && styles.roleButtonTextActive
              ]}>
                👤 Usuario
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roleButton,
                form.role === 'admin' && styles.roleButtonActive
              ]}
              onPress={() => updateField('role', 'admin')}
              disabled={loading}
            >
              <Text style={[
                styles.roleButtonText,
                form.role === 'admin' && styles.roleButtonTextActive
              ]}>
                👑 Administrador
              </Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.roleInfo}>
            Seleccionado: <Text style={styles.roleHighlight}>
              {form.role === 'admin' ? 'Administrador' : 'Usuario Regular'}
            </Text>
          </Text>
        </View>

        {/* Botón de Registro */}
        <TouchableOpacity
          style={[styles.registerButton, loading && styles.registerButtonDisabled]}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.registerButtonText}>
            {loading ? 'CREANDO CUENTA...' : 'REGISTRARSE'}
          </Text>
        </TouchableOpacity>

        {/* Enlaces */}
        <View style={styles.linksContainer}>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => navigation.navigate('Login')}
            disabled={loading}
          >
            <Text style={styles.linkText}>¿Ya tienes cuenta? Inicia Sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => navigation.goBack()}
            disabled={loading}
          >
            <Text style={styles.linkText}>← Volver al Inicio</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#f8f9fa',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  roleButton: {
    flex: 1,
    backgroundColor: '#e9ecef',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  roleButtonActive: {
    backgroundColor: '#007bff',
    borderColor: '#0056b3',
  },
  roleButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
  },
  roleButtonTextActive: {
    color: 'white',
  },
  roleInfo: {
    textAlign: 'center',
    fontSize: 14,
    color: '#6c757d',
    marginTop: 8,
  },
  roleHighlight: {
    fontWeight: 'bold',
    color: '#007bff',
  },
  registerButton: {
    backgroundColor: '#28a745',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 24,
  },
  registerButtonDisabled: {
    backgroundColor: '#6c757d',
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linksContainer: {
    alignItems: 'center',
  },
  linkButton: {
    paddingVertical: 10,
  },
  linkText: {
    color: '#007bff',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});