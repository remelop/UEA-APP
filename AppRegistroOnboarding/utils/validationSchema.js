import { z } from 'zod';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

// ✅ Validación REAL asíncrona contra Firestore
export const checkEmailExists = async (email) => {
  try {
    console.log(`🔍 Validando email: ${email}`);
    
    if (!email || !email.includes('@')) {
      console.log('Email no válido para validación');
      return true; // Dejar que Zod valide el formato
    }
    
    // Consultar Firestore para ver si el email ya existe
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email.toLowerCase().trim()));
    const querySnapshot = await getDocs(q);
    
    const exists = !querySnapshot.empty;
    console.log(`📊 Email ${email} existe: ${exists}`);
    
    // Devolver FALSE si existe (para que Zod muestre error)
    // Devolver TRUE si no existe (email disponible)
    return !exists;
    
  } catch (error) {
    console.error('❌ Error consultando Firestore:', error);
    // En caso de error, permitir el registro
    return true;
  }
};

// ✅ Esquema SIN validación asíncrona integrada (lo haremos manual)
export const registerSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'El nombre es requerido' })
    .min(2, { message: 'Mínimo 2 caracteres' })
    .max(50, { message: 'Máximo 50 caracteres' })
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, { 
      message: 'Solo letras y espacios' 
    })
    .transform((name) => name.trim()),

  email: z
    .string()
    .min(1, { message: 'El email es requerido' })
    .email({ message: 'Formato de email inválido' })
    .toLowerCase(),

  password: z
    .string()
    .min(1, { message: 'La contraseña es requerida' })
    .min(6, { message: 'Mínimo 6 caracteres' })
    .max(50, { message: 'Máximo 50 caracteres' })
    .regex(/[A-Z]/, { message: 'Al menos una letra mayúscula (A-Z)' })
    .regex(/[a-z]/, { message: 'Al menos una letra minúscula (a-z)' })
    .regex(/[0-9]/, { message: 'Al menos un número (0-9)' })
    .regex(/[^A-Za-z0-9]/, { message: 'Al menos un carácter especial (!@#$%^&*)' }),

  confirmPassword: z.string().min(1, { message: 'Confirma tu contraseña' }),
  
  role: z.enum(['usuario', 'admin'], {
    errorMap: () => ({ message: 'Selecciona un rol válido' })
  })
})
.refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword']
});

// ✅ Esquema para validación rápida
export const quickValidationSchema = z.object({
  name: z.string().min(1, 'Requerido'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
  confirmPassword: z.string().min(1, 'Requerido'),
  role: z.enum(['usuario', 'admin'])
});