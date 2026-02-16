# 🗄️ Migración a SQLite - Documentación

## ✅ Cambios Realizados

Tu backend ahora usa **SQLite** para almacenar datos de forma persistente. Los datos ya NO se pierden al reiniciar el servidor.

---

## 📦 Dependencias Instaladas

```bash
npm install better-sqlite3
```

**¿Qué es better-sqlite3?**
- Driver SQLite para Node.js
- Más rápido que otros drivers (usa código nativo)
- Síncrono (más simple de usar)
- No requiere servidor de base de datos

---

## 📁 Archivos Modificados/Creados

### 1. **backend/index.js** ✏️ MODIFICADO
- Reemplazado array en memoria por SQLite
- Todas las operaciones CRUD ahora usan SQL

### 2. **backend/database.db** 🆕 NUEVO (se crea automáticamente)
- Archivo de base de datos SQLite
- Contiene todos los videojuegos
- Se crea automáticamente al iniciar el servidor

### 3. **backend/.gitignore** 🆕 NUEVO
- Evita subir `database.db` a Git
- Evita subir `node_modules/`

### 4. **backend/package.json** ✏️ ACTUALIZADO
- Agregada dependencia `better-sqlite3`

---

## 🔍 Comparación: Antes vs Después

### **ANTES (Array en Memoria)**

```javascript
let videojuegos = [
  { id: 1, nombre: "Fortnite", precio: 10, tamano: 20 }
];

app.get("/videojuegos", (req, res) => {
  res.json(videojuegos); // ❌ Se pierde al reiniciar
});

app.post("/videojuegos", (req, res) => {
  const nuevoJuego = { id: nextId++, nombre, precio, tamano };
  videojuegos.push(nuevoJuego); // ❌ Solo en memoria
  res.status(201).json(nuevoJuego);
});
```

**Problemas:**
- ❌ Datos se pierden al reiniciar el servidor
- ❌ No hay persistencia
- ❌ No escalable

---

### **DESPUÉS (SQLite)**

```javascript
const db = new Database("database.db");

// Crear tabla automáticamente
db.exec(`
  CREATE TABLE IF NOT EXISTS videojuegos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    precio REAL NOT NULL,
    tamano INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

app.get("/videojuegos", (req, res) => {
  const videojuegos = db.prepare("SELECT * FROM videojuegos").all();
  res.json(videojuegos); // ✅ Datos persistentes
});

app.post("/videojuegos", (req, res) => {
  const insert = db.prepare("INSERT INTO videojuegos (nombre, precio, tamano) VALUES (?, ?, ?)");
  const result = insert.run(nombre, precio, tamano);
  const nuevoJuego = db.prepare("SELECT * FROM videojuegos WHERE id = ?").get(result.lastInsertRowid);
  res.status(201).json(nuevoJuego); // ✅ Guardado en BD
});
```

**Ventajas:**
- ✅ Datos persistentes (no se pierden)
- ✅ Base de datos real
- ✅ Escalable
- ✅ Búsquedas más eficientes

---

## 🎯 Características Implementadas

### 1. **Creación Automática de Tabla**
```javascript
db.exec(`
  CREATE TABLE IF NOT EXISTS videojuegos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    precio REAL NOT NULL,
    tamano INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);
```

- La tabla se crea automáticamente si no existe
- `AUTOINCREMENT`: IDs se generan automáticamente
- `created_at`: Timestamp de creación

---

### 2. **Datos Iniciales**
```javascript
const count = db.prepare("SELECT COUNT(*) as count FROM videojuegos").get();
if (count.count === 0) {
  const insert = db.prepare("INSERT INTO videojuegos (nombre, precio, tamano) VALUES (?, ?, ?)");
  insert.run("Fortnite", 10, 20);
  insert.run("Call of Duty", 100, 200);
}
```

- Si la tabla está vacía, inserta 2 videojuegos de ejemplo
- Solo se ejecuta la primera vez

---

### 3. **Operaciones CRUD con SQL**

#### **GET - Obtener todos**
```javascript
const videojuegos = db.prepare("SELECT * FROM videojuegos ORDER BY id ASC").all();
```
- `.all()` devuelve un array con todos los registros

#### **POST - Crear**
```javascript
const insert = db.prepare("INSERT INTO videojuegos (nombre, precio, tamano) VALUES (?, ?, ?)");
const result = insert.run(nombre, precio, tamano);
const nuevoJuego = db.prepare("SELECT * FROM videojuegos WHERE id = ?").get(result.lastInsertRowid);
```
- `.run()` ejecuta el INSERT
- `result.lastInsertRowid` obtiene el ID del nuevo registro
- `.get()` devuelve un solo registro

#### **PUT - Actualizar**
```javascript
const update = db.prepare("UPDATE videojuegos SET nombre = ?, precio = ?, tamano = ? WHERE id = ?");
const result = update.run(nombre, precio, tamano, id);
if (result.changes === 0) {
  return res.status(404).json({ mensaje: "Juego no encontrado" });
}
```
- `result.changes` indica cuántos registros se modificaron
- Si es 0, el registro no existe

#### **DELETE - Eliminar**
```javascript
const deleteStmt = db.prepare("DELETE FROM videojuegos WHERE id = ?");
const result = deleteStmt.run(id);
if (result.changes === 0) {
  return res.status(404).json({ mensaje: "Juego no encontrado" });
}
```

---

### 4. **Cierre Seguro de la Base de Datos**
```javascript
process.on("SIGINT", () => {
  db.close();
  console.log("\n✅ Base de datos cerrada correctamente");
  process.exit(0);
});
```

- Cuando detienes el servidor (Ctrl+C), cierra la BD correctamente
- Previene corrupción de datos

---

## 🔒 Seguridad: Consultas Preparadas

### ❌ INCORRECTO (Vulnerable a SQL Injection)
```javascript
const query = `SELECT * FROM videojuegos WHERE id = ${id}`;
db.prepare(query).get();
```

### ✅ CORRECTO (Seguro)
```javascript
const query = "SELECT * FROM videojuegos WHERE id = ?";
db.prepare(query).get(id);
```

**¿Por qué?**
- Los `?` son placeholders seguros
- SQLite escapa automáticamente los valores
- Previene inyección SQL

---

## 🚀 Cómo Usar

### **1. Iniciar el Backend**
```bash
cd backend
npm start
```

**Salida esperada:**
```
✅ Datos iniciales insertados
✅ Base de datos SQLite conectada
🚀 Servidor corriendo en http://localhost:3000
📁 Base de datos: database.db
```

### **2. Verificar que Funciona**
- Abre `http://localhost:3000` → Verás "Servidor backend funcionando🚀 con SQLite"
- Abre `http://localhost:3000/videojuegos` → Verás los videojuegos en JSON

### **3. Usar el Frontend**
```bash
npm run dev
```

- El frontend sigue funcionando igual
- Ahora los datos se guardan en SQLite

---

## 📊 Estructura de la Base de Datos

### **Tabla: videojuegos**

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | INTEGER | ID único (auto-incremento) |
| `nombre` | TEXT | Nombre del videojuego |
| `precio` | REAL | Precio (número decimal) |
| `tamano` | INTEGER | Tamaño en GB |
| `created_at` | DATETIME | Fecha de creación (automática) |

### **Ejemplo de Registro**
```json
{
  "id": 1,
  "nombre": "Fortnite",
  "precio": 10,
  "tamano": 20,
  "created_at": "2026-02-16 15:32:04"
}
```

---

## 🛠️ Herramientas para Ver la Base de Datos

### **Opción 1: DB Browser for SQLite** (Recomendado)
- Descarga: https://sqlitebrowser.org/
- Interfaz gráfica
- Abre el archivo `backend/database.db`

### **Opción 2: Extensión de VS Code**
- Instala: "SQLite Viewer" o "SQLite"
- Click derecho en `database.db` → "Open Database"

### **Opción 3: Línea de Comandos**
```bash
cd backend
sqlite3 database.db
```

Comandos útiles:
```sql
.tables                    -- Ver tablas
.schema videojuegos        -- Ver estructura
SELECT * FROM videojuegos; -- Ver datos
.quit                      -- Salir
```

---

## 🐛 Solución de Problemas

### **Error: "Cannot find module 'better-sqlite3'"**
```bash
cd backend
npm install better-sqlite3
```

### **La base de datos no se crea**
- Verifica que tienes permisos de escritura en la carpeta `backend/`
- El archivo `database.db` se crea automáticamente al iniciar el servidor

### **Los datos no se guardan**
- Verifica que el servidor esté corriendo
- Revisa la consola del backend para ver errores
- Usa las DevTools del navegador (F12 → Network) para ver las peticiones

### **Error al compilar better-sqlite3**
- Necesitas herramientas de compilación:
  - Windows: `npm install --global windows-build-tools`
  - Mac: Xcode Command Line Tools
  - Linux: `build-essential`

---

## 📝 Notas Importantes

1. **Archivo database.db**
   - Se crea automáticamente en `backend/database.db`
   - Contiene todos los datos
   - NO lo subas a Git (ya está en `.gitignore`)

2. **Backup**
   - Para hacer backup, simplemente copia `database.db`
   - Para restaurar, reemplaza el archivo

3. **Migración de Datos**
   - Si ya tenías datos en el array, se perdieron
   - Los datos iniciales (Fortnite, Call of Duty) se insertan automáticamente

4. **Frontend**
   - NO requiere cambios
   - Sigue haciendo las mismas peticiones HTTP
   - Todo funciona transparentemente

---

## ✅ Resumen

| Aspecto | Antes | Después |
|---------|-------|---------|
| **Almacenamiento** | Array en memoria | SQLite (archivo) |
| **Persistencia** | ❌ No | ✅ Sí |
| **Reiniciar servidor** | ❌ Pierde datos | ✅ Conserva datos |
| **Escalabilidad** | ❌ Limitada | ✅ Mejor |
| **Búsquedas** | `.find()`, `.filter()` | SQL queries |
| **IDs** | Manual (`nextId++`) | Auto-incremento |

---

## 🎉 ¡Listo!

Tu aplicación ahora tiene una **base de datos real** con SQLite. Los datos se guardan permanentemente y no se pierden al reiniciar el servidor.

**Próximos pasos sugeridos:**
- ✅ Agregar más campos (género, desarrollador, etc.)
- ✅ Implementar búsqueda/filtrado
- ✅ Agregar validaciones más robustas
- ✅ Implementar paginación
