// context/AuthContext.js - VERSIÓN REAL CON FIREBASE
import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth, db } from '../firebase';
import { 
  onAuthStateChanged, 
  signOut as firebaseSignOut 
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Obtener datos adicionales de Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            // Datos por defecto si no existe en Firestore
            setUserData({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              name: firebaseUser.email.split('@')[0],
              role: 'usuario'
            });
          }
        } catch (error) {
          console.error('Error obteniendo datos de usuario:', error);
          setUserData({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.email.split('@')[0],
            role: 'usuario'
          });
        }
        setUser(firebaseUser);
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setUserData(null);
      return { success: true };
    } catch (error) {
      console.error('Error cerrando sesión:', error);
      return { success: false, error: error.message };
    }
  };

  const updateUserData = (data) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  return (
    <AuthContext.Provider value={{
      user,           // Firebase user object
      userData,       // Datos adicionales de Firestore (nombre, rol, etc.)
      loading,
      logout,
      updateUserData,
      isAuthenticated: !!user,
      isAdmin: userData?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
};