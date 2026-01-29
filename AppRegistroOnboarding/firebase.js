// firebase.js - VERSIÓN CORREGIDA (usa tu sintaxis original)
import { initializeApp } from 'firebase/app';
import { initializeAuth, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Tu configuración - CORRIGE ESTOS DOMINIOS
const firebaseConfig = {
  apiKey: "AIzaSyA_v6i1aPohwsPBhVSMmCbLo_XZQrGQshU",
  authDomain: "appregistroweb.firebaseapp.com", // CAMBIA ESTO
  projectId: "appregistroweb",
  storageBucket: "appregistroweb.appspot.com", // CAMBIA ESTO
  messagingSenderId: "1098011517234",
  appId: "1:1098011517234:android:f4b65c876307526798772b",
  databaseURL: "https://appregistroweb.firebaseio.com" // AGREGA ESTO
};

// Inicializar Firebase
let app;
let auth;
let db;

try {
  app = initializeApp(firebaseConfig);
  console.log('✅ Firebase App inicializada');
  
  auth = initializeAuth(app, {
    persistence: browserLocalPersistence
  });
  console.log('✅ Firebase Auth configurado');
  
  db = getFirestore(app);
  console.log('✅ Firestore configurado');
  
} catch (error) {
  console.error('❌ Error configurando Firebase:', error);
}

export { app, auth, db };