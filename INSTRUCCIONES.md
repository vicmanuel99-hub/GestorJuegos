# 🎮 Gestor de Videojuegos - Instrucciones

## ✅ Cambios Realizados

Tu aplicación React ahora está **completamente conectada con el backend**. Los cambios incluyen:

### 1. **Importación de useEffect**
   - Se agregó `useEffect` para cargar datos automáticamente al iniciar la app

### 2. **URL del API**
   - Configurada en: `http://localhost:3000/videojuegos`

### 3. **Funciones Conectadas al Backend**

#### 📥 **GET - Cargar videojuegos**
- Se ejecuta automáticamente al montar el componente
- Función: `cargarVideojuegos()`

#### ➕ **POST - Crear videojuego**
- Se ejecuta al hacer clic en "Agregar"
- Envía los datos al backend y actualiza la lista

#### ✏️ **PUT - Actualizar videojuego**
- Se ejecuta al hacer clic en "Actualizar" (modo edición)
- Actualiza el videojuego en el servidor

#### 🗑️ **DELETE - Eliminar videojuego**
- Se ejecuta al hacer clic en "Eliminar"
- Elimina el videojuego del servidor

### 4. **Estado de Carga**
- Se agregó un indicador visual "⏳ Cargando..." que aparece durante las operaciones

### 5. **Manejo de Errores**
- Todos los errores de red se capturan y muestran al usuario

---

## 🚀 Cómo Ejecutar la Aplicación

### **Paso 1: Iniciar el Backend**
```bash
cd backend
npm start
```
El servidor debe estar corriendo en `http://localhost:3000`

### **Paso 2: Iniciar el Frontend** (en otra terminal)
```bash
npm run dev
```
La aplicación React se abrirá en `http://localhost:5173` (o el puerto que Vite asigne)

---

## 🔍 Verificación

1. **Backend funcionando**: Abre `http://localhost:3000` en tu navegador
   - Deberías ver: "Servidor backend funcionando🚀"

2. **Frontend conectado**: Abre la aplicación React
   - Los videojuegos se cargarán automáticamente desde el backend
   - Todas las operaciones (agregar, editar, eliminar) se sincronizarán con el servidor

---

## 📝 Notas Importantes

- **CORS habilitado**: El backend ya tiene CORS configurado para permitir peticiones desde el frontend
- **Datos en memoria**: Los datos se almacenan en memoria del servidor (se pierden al reiniciar)
- **Puerto del backend**: Asegúrate de que el puerto 3000 esté disponible

---

## 🐛 Solución de Problemas

### Error: "Error al cargar los videojuegos del servidor"
- ✅ Verifica que el backend esté corriendo en `http://localhost:3000`
- ✅ Revisa la consola del navegador para más detalles

### Los cambios no se guardan
- ✅ Abre las DevTools del navegador (F12) y revisa la pestaña "Network"
- ✅ Verifica que las peticiones HTTP se estén enviando correctamente

### CORS Error
- ✅ El backend ya tiene `app.use(cors())` configurado
- ✅ Si persiste, reinicia el servidor backend
