# 🚀 Guía Rápida - Inicio del Proyecto

## ✅ Tu backend ahora usa SQLite

Los datos se guardan permanentemente en `backend/database.db`

---

## 🏃 Iniciar el Proyecto

### **Terminal 1 - Backend**
```bash
cd backend
npm start
```

**Salida esperada:**
```
✅ Datos iniciales insertados (solo la primera vez)
✅ Base de datos SQLite conectada
🚀 Servidor corriendo en http://localhost:3000
📁 Base de datos: database.db
```

### **Terminal 2 - Frontend**
```bash
npm run dev
```

**Salida esperada:**
```
VITE v... ready in ... ms

➜  Local:   http://localhost:5173/
```

---

## 🧪 Probar la Persistencia

1. Abre el frontend en `http://localhost:5173`
2. Agrega un nuevo videojuego (ej: "Minecraft", precio: 30, tamaño: 50)
3. **Detén el backend** (Ctrl+C en la terminal del backend)
4. **Reinicia el backend** (`npm start`)
5. Recarga el frontend
6. ✅ El videojuego que agregaste sigue ahí!

---

## 📁 Archivos Importantes

| Archivo | Descripción |
|---------|-------------|
| `backend/index.js` | Backend con SQLite |
| `backend/database.db` | Base de datos (se crea automáticamente) |
| `src/App.tsx` | Frontend React (sin cambios) |
| `MIGRACION_SQLITE.md` | Documentación completa |
| `RESUMEN_CAMBIOS.md` | Resumen de cambios |

---

## 🔍 Ver la Base de Datos

### **Opción 1: DB Browser for SQLite**
1. Descarga: https://sqlitebrowser.org/
2. Abre `backend/database.db`
3. Ve la tabla `videojuegos`

### **Opción 2: VS Code Extension**
1. Instala extensión "SQLite Viewer"
2. Click derecho en `backend/database.db` → "Open Database"

---

## 📊 Estructura de la Tabla

```sql
CREATE TABLE videojuegos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  precio REAL NOT NULL,
  tamano INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🐛 Solución de Problemas

### **Error: Cannot find module 'better-sqlite3'**
```bash
cd backend
npm install better-sqlite3
```

### **El servidor no inicia**
- Verifica que el puerto 3000 esté libre
- Revisa errores en la consola

### **El frontend no se conecta**
- Verifica que el backend esté corriendo
- Abre `http://localhost:3000/videojuegos` para ver los datos

---

## 📝 Comandos Útiles

```bash
# Instalar dependencias (si es necesario)
cd backend
npm install

# Iniciar backend
npm start

# Volver al directorio raíz
cd ..

# Iniciar frontend
npm run dev
```

---

## 🎉 ¡Listo!

Tu aplicación ahora tiene:
- ✅ Backend con SQLite
- ✅ Datos persistentes
- ✅ Frontend conectado
- ✅ CRUD completo funcionando

**¿Dudas?** Lee `MIGRACION_SQLITE.md` para más detalles.
