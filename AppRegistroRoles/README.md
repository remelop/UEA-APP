# 📱 Sistema de Registro de Usuarios con Roles

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![Android](https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)

## 📋 Descripción del Proyecto

Sistema de autenticación y control de acceso desarrollado con **React Native + Expo + Firebase** para la asignatura de Desarrollo de Aplicaciones Móviles. Permite el registro de usuarios con selección de roles y control de acceso a áreas protegidas.

**🎯 Objetivo:** Desarrollar un sistema completo de autenticación con persistencia de datos, control de acceso por roles y interfaz multiplataforma.

## ✨ Características Principales

### ✅ Funcionalidades Implementadas
- **👤 Registro de Usuarios** con campos: Nombre, Email, Contraseña y Rol
- **🔐 Inicio de Sesión** con validación de credenciales
- **👑 Dashboard Protegido** según rol del usuario (Usuario/Administrador)
- **💾 Persistencia de Sesión** usando Firebase Auth
- **🗄️ Base de Datos Firestore** para almacenamiento de datos
- **📱 Interfaz Responsiva** para Web y Android
- **✅ Validación de Formularios** en tiempo real
- **🚪 Cierre de Sesión** con confirmación
- **🔒 Control de Acceso** a rutas protegidas
- **📧 Recuperación de Contraseña**

### 🎨 Interfaz de Usuario
- Diseño moderno y profesional
- Navegación intuitiva
- Feedback visual inmediato
- Adaptable a diferentes tamaños de pantalla

---

## 📸 Capturas de Pantalla

| **Pantalla de Inicio** | **Formulario de Registro** | **Dashboard** |
|------------------------|----------------------------|---------------|
| <img src="./screenshots/1-home.png" width="200"> | <img src="./screenshots/6-registro.png" width="200"> | <img src="./screenshots/8-dashboard-admin.png" width="200"> |

| **Inicio de Sesión** | **Confirmación Logout** | **Firebase Console** |
|----------------------|-------------------------|----------------------|
| <img src="./screenshots/2-login.png" width="200"> | <img src="./screenshots/5-logout-confirm.png" width="200"> | <img src="./screenshots/9-firebase-console.png" width="200"> |

---

## 🏗️ Estructura del Proyecto

AppRegistroRoles/
├── 📁 context/
│ └── AuthContext.js # Contexto global de autenticación
├── 📁 screens/
│ ├── HomeScreen.js # Pantalla inicial
│ ├── LoginScreen.js # Inicio de sesión
│ ├── RegistroScreen.js # Registro con roles
│ ├── ForgotPasswordScreen.js # Recuperación de contraseña
│ └── DashboardScreen.js # Área protegida
├── 📁 screenshots/ # Capturas de pantalla
│ ├── 1-home.png
│ ├── 2-login.png
│ ├── 3-login-exitoso.png
│ ├── 4-dashboard-user.png
│ ├── 5-logout-confirm.png
│ ├── 6-registro.png
│ ├── 7-registro-exitoso.png
│ ├── 8-dashboard-admin.png
│ └── 9-firebase-console.png
├── 📄 .env # Variables de entorno
├── 📄 .env.example # Ejemplo de configuración
├── 📄 .gitignore # Archivos ignorados por Git
├── 📄 App.js # Componente principal
├── 📄 app.json # Configuración Expo
├── 📄 firebase.js # Configuración Firebase
├── 📄 index.js # Punto de entrada
├── 📄 package.json # Dependencias y scripts
├── 📄 README.md # Este archivo
└── 📄 google-services.json # Configuración Android

-----------------------------------------------------------------


---

## 🚀 Instalación y Configuración

### Prerrequisitos

- **Node.js** (v16 o superior)
- **npm** o **yarn**
- **Expo CLI** (`npm install -g expo-cli`)
- **Android Studio** (para emulador) o dispositivo físico
- **Cuenta de Firebase**

### Paso 1: Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/AppRegistroRoles.git
cd AppRegistroRoles

-----------------------------------------------------------------
Instalar dependencias
bash
npm install
# o
yarn install
--------------------------------------------------------------------
Configurar Firebase
Crear proyecto en Firebase Console

Habilitar Authentication → Método Email/Contraseña

Habilitar Firestore Database → Crear base de datos en modo prueba

Copiar configuración del proyecto
--------------------------------------------------------------------------
Configurar variables de entorno
bash
# 1. Copiar archivo de ejemplo
cp .env.example .env

# 2. Editar .env con tus credenciales
nano .env
----------------------------------------------------------------------
Ejecutar la aplicación
bash
# Para desarrollo web
npm run web
# Abrir http://localhost:19006

# Para Android (con emulador activo)
npm run android

# Para iOS (requiere Mac)
npm run ios

# Modo desarrollo general
npm start
-----------------------------------------------------------------------
Configuración de Firebase
1. Crear proyecto en Firebase Console
Ir a Firebase Console

Crear nuevo proyecto "AppRegistroRoles"

Registrar aplicación web y Android

2. Habilitar servicios necesarios
Authentication → Método Email/Contraseña

Firestore Database → Crear base de datos en modo prueba

3. Configurar reglas de seguridad Firestore
javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /usuarios/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
4. Habilitar Firestore API en Google Cloud
Si aparece error de permisos, visitar:

text
https://console.developers.google.com/apis/api/firestore.googleapis.com/overview?project=tu_proyecto_id
Y hacer clic en "HABILITAR"
-----------------------------------------------------------------------------------------------------------
