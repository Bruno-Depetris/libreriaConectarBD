# conectar-sqlite
Librería para gestionar conexiones SQLite, backups automáticos y operaciones de base de datos en Node.js de forma sencilla y multiplataforma.
El objetivo de esta libreria mantiene una base de uso limpia y entendible al momento de utilizar una base de datos en SQLITE.

[![npm version](https://badge.fury.io/js/conectar-sqlite.svg)](https://badge.fury.io/js/conectar-sqlite)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
---

## 🚀 Características

- ✅ **Gestión automática de carpetas** en AppData del sistema operativo // o .hiiden etc
- ✅ **Backups automáticos** de la base de datos
- ✅ **Multiplataforma** (Windows, macOS, Linux)
- ✅ **Verificación de integridad** de archivos 
- ✅ **Información detallada** de ubicaciones y estado // futura actualizacion a .txt

---

## 📦 Instalación

```bash
npm install conectar-sqlite
```

---

## 🛠️ Importación

### Importación individual
```javascript
import { DatosConexion, GuardarDatos, Operaciones, PedirDatos } from 'conectar-sqlite';
```

### Importación completa (recomendada)
```javascript
import conectarSqlite from 'conectar-sqlite';
```

---

## ⚡ Uso rápido

### Método más simple (recomendado)
```javascript
import conectarSqlite from 'conectar-sqlite';

// Inicialización automática completa ( LA BASE DE DATOS DEBE ESTAR EN LA RAIZ DEL PROGRAMA Y NO SE DEBE PONER EL .db)
const operaciones = await conectarSqlite.inicializar('./MiAppDB');

// O conexión directa
const db = await conectarSqlite.obtenerConexionRapida('./MiAppDB');

// Usar la base de datos
db.run("CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY, nombre TEXT)");
db.close();
```

### Configuración paso a paso

#### Primera vez (configuración interactiva)
```javascript
import { PedirDatos, Operaciones } from 'conectar-sqlite';

//  Configurar datos de conexión de forma interactiva
//Recomendable tener la BD en la raíz del proyecto: ./miBD.db
await PedirDatos();

//Usar las operaciones./
const operaciones = new Operaciones();
operaciones.comprobar(); // Crea estructura y muestra ubicaciones, comprueba en caso de que la misma no exista
const db = operaciones.obtenerConexion();
```

#### Configuración programática (sin interacción)
```javascript
import { GuardarDatos, Operaciones } from 'conectar-sqlite';

// Guardar configuración programáticamente (en caso de no funcionar agregar el .db)
await GuardarDatos('./MiAppDB');

// Usar las operaciones
const operaciones = new Operaciones();
operaciones.comprobar(); // Automáticamente muestra ubicación de la BD
const db = operaciones.obtenerConexion();
```

---

## 📚 API Detallada

### 🔧 DatosConexion

Clase que representa los datos de conexión a la base de datos.

```javascript
const datos = new DatosConexion(pathBDmain, cadenaConexion);
```

**Parámetros:**
- `pathBDmain` (string) - Ruta de la base de datos inicial (desde la raiz ./mibd)
- `cadenaConexion` (string) - Cadena de conexión SQLite (para poder realizar consultas)

### 💾 GuardarDatos

Función asíncrona que guarda los datos de conexión en `datosConexion.json`. //te quedan guardados los datos en un json 

```javascript
await GuardarDatos(pathBDmain);
```

**Parámetros:**
- `pathBDmain` (string) - Ruta de la base de datos inicial

### 🔍 PedirDatos

Función asíncrona que solicita los datos de conexión de forma interactiva.

```javascript
await PedirDatos(pathBDmain); // pathBDmain es opcional
```

### ⚙️ Operaciones

Clase principal para manejar operaciones con la base de datos SQLite.

```javascript
const operaciones = new Operaciones();
```

#### Métodos principales:

##### `comprobar()`
Crea carpetas y copia la base de datos si es necesario. **Automáticamente muestra la ubicación de la BD.**
Se recomienda iniciar el programa con esa funcion.

```javascript
operaciones.comprobar();

// Salida ejemplo:
// 📍 Ubicación de la base de datos:
//    Ruta completa: /home/usuario/.local/share/Predits/MiAppDB.db
//    Tamaño: 245.67 KB
//    Estado: ✅ Archivo encontrado y accesible
```

##### `mostrarUbicacionBD()`
Muestra la ubicación actual de la base de datos copiada

```javascript
operaciones.mostrarUbicacionBD();
```

##### `mostrarInformacionCompleta()`
Muestra información detallada de todas las rutas y estados de archivos . 
 
```javascript
operaciones.mostrarInformacionCompleta();
```

##### `crearBackUp()`
Crea un backup de la base de datos .

```javascript
const rutaBackup = operaciones.crearBackUp();
```

##### `obtenerConexion()`
Devuelve la conexión SQLite lista para usar .

```javascript
const db = operaciones.obtenerConexion();
```

---

## 📁 Estructura de carpetas

La librería organiza automáticamente los archivos según el sistema operativo :

### Windows
```
%APPDATA%/Predits/
├── MiAppDB.db (copia de trabajo)
└── ...

%USERPROFILE%/.config/BackUpAllPredits/
└── MiAppDB.db (backup)
```

### macOS
```
~/Library/Application Support/Predits/
├── MiAppDB.db (copia de trabajo)
└── ...

~/.config/BackUpAllPredits/
└── MiAppDB.db (backup)
```

### Linux
```
~/.local/share/Predits/
├── MiAppDB.db (copia de trabajo)
└── ...

~/.config/BackUpAllPredits/
└── MiAppDB.db (backup)
```

---

## 💡 Ejemplos completos

### Ejemplo básico con inicialización automática
```javascript
import conectarSqlite from 'conectar-sqlite';

async function main() {
    try {
        // Inicializar librería completa
        const operaciones = await conectarSqlite.inicializar('./MiAppDB.db');
        
        // Mostrar información detallada
        operaciones.mostrarInformacionCompleta();
        
        // Obtener conexión
        const db = operaciones.obtenerConexion();
        
        // Usar la base de datos
        db.serialize(() => {
            db.run("CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY, nombre TEXT)");
            db.run("INSERT INTO usuarios (nombre) VALUES (?)", ["Juan"]);
            
            db.each("SELECT * FROM usuarios", (err, row) => {
                console.log(`Usuario: ${row.nombre}`);
            });
        });
        
        db.close();
        console.log('✅ Operación completada');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

main();
```

### Ejemplo con verificación de configuración existente
```javascript
import { PedirDatos, Operaciones } from 'conectar-sqlite';
import fs from 'fs';

async function main() {
    try {
        // Verificar si existe configuración
        if (!fs.existsSync('datosConexion.json')) {
            console.log('🔧 Primera vez usando la librería, configurando...');
            await PedirDatos('./MiAppDB.db');
        }
        
        // Crear instancia y usar
        const operaciones = new Operaciones();
        
        // Verificar estructura de carpetas (muestra ubicaciones automáticamente)
        operaciones.comprobar();
        
        // Crear backup
        const rutaBackup = operaciones.crearBackUp();
        console.log(`💾 Backup disponible en: ${rutaBackup}`);
        
        // Obtener conexión
        const db = operaciones.obtenerConexion();
        console.log('🔗 Conexión obtenida exitosamente');
        
        // Realizar operaciones con la BD
        db.serialize(() => {
            db.run("CREATE TABLE IF NOT EXISTS productos (id INTEGER PRIMARY KEY, nombre TEXT, precio REAL)");
        });
        
        // Cerrar conexión
        db.close();
        console.log('✅ Proceso completado');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

main();
```

### Ejemplo con conexión rápida
```javascript
import conectarSqlite from 'conectar-sqlite';

// Una sola línea para obtener la conexión lista
const db = await conectarSqlite.obtenerConexionRapida('./datos.db');

// Usar directamente
db.run("INSERT INTO tabla (columna) VALUES (?)", ["valor"]);
db.close();
```

---

## 🧪 Testing y Demo

### Ejecutar demo completo
```bash
npm run test
```

### Ver funcionalidades disponibles
```bash
npm run demo
```

### Ejecutar directamente
```bash
node main.js
```

---

## 📋 Requisitos

- **Node.js** >= 14.0.0
- **SQLite3** (incluido como dependencia)

---

## 🤝 Dependencias

- `sqlite3` - ^5.1.7
- `prompt-sync` - ^4.2.0

---

## 📝 Licencia

MIT © [BrunoDepetris](https://github.com/Bruno-Depetris)

---

## 🐛 Reportar problemas

Si encuentras algún problema o tienes sugerencias, por favor enviame un gmail:

depetrisbruno@gmail.com
---

## 🌟 Características próximas

- [ ] Soporte para múltiples bases de datos
- [ ] Configuración de intervalos automáticos de backup
- [ ] Migración automática de esquemas
- [ ] Compresión de backups

---
¿Te gusta esta librería? ⭐ ¡Dale una estrella en GitHub! 