# conectar-sqlite

Librería para manejar datos de conexión y operaciones SQLite en Node.js.

---

## Instalación

Se agrega al proyecto con:
```bash
npm install conectar-sqlite
```

## Importación

```javascript
import { DatosConexion, GuardarDatos, Operaciones, PedirDatos } from 'conectar-sqlite';
```

## Uso rápido

### Configuración inicial (primera vez)

```javascript
import { PedirDatos, Operaciones } from 'conectar-sqlite';

// Configurar datos de conexión interactivamente
await PedirDatos();

// Usar las operaciones
const operaciones = new Operaciones();
operaciones.comprobar();
const conexion = operaciones.obtenerConexion();
```

### Uso programático (sin interacción)

```javascript
import { GuardarDatos, Operaciones } from 'conectar-sqlite';

// Guardar configuración programáticamente
await GuardarDatos('MiApp', 'MiAppDB.db', 'Respaldos', 'MiAppDB_Backup.db', './MiAppDB.db');

// Usar las operaciones
const operaciones = new Operaciones();
operaciones.comprobar();
const conexion = operaciones.obtenerConexion();
```

## Clases y funciones

### DatosConexion

Clase que representa los datos de conexión a la base de datos.

**Constructor:**
```javascript
new DatosConexion(carpetaAppdata, nombreBD, carpetaBackUp, backupBD, pathBDmain)
```

**Parámetros:**
- `carpetaAppdata` (string) - Carpeta principal para la app.
- `nombreBD` (string) - Nombre del archivo de la base de datos.
- `carpetaBackUp` (string) - Carpeta donde se guardarán los backups.
- `backupBD` (string) - Nombre del archivo de respaldo.
- `pathBDmain` (string) - Ruta de la base de datos inicial.

### GuardarDatos

Función asíncrona que guarda los datos de conexión en un archivo `datosConexion.json`.

```javascript
await GuardarDatos(carpetaAppdata, nombreBD, carpetaBackUp, backupBD, pathBDmain);
```

### PedirDatos

Función asíncrona que solicita los datos de conexión de forma interactiva desde la consola.

```javascript
await PedirDatos();
```

### Operaciones

Clase para manejar operaciones con la base de datos SQLite.

```javascript
const operaciones = new Operaciones();
```

**Métodos principales:**
- `comprobar()` - Crea carpetas y archivos de base de datos si no existen.
- `obtenerConexion()` - Devuelve la conexión abierta a SQLite.
- `Operaciones.datosConexionExisten()` - Método estático para verificar si existe la configuración.

**Ejemplo completo:**

```javascript
import { PedirDatos, Operaciones } from 'conectar-sqlite';

async function main() {
    try {
        // Verificar si existe configuración
        if (!Operaciones.datosConexionExisten()) {
            console.log('Primera vez usando la librería, configurando...');
            await PedirDatos();
        }
        
        // Crear instancia y usar
        const operaciones = new Operaciones();
        
        // Verificar estructura de carpetas
        const estructuraOk = operaciones.comprobar();
        if (!estructuraOk) {
            throw new Error('Error al verificar estructura de carpetas');
        }
        
        // Obtener conexión
        const conexion = operaciones.obtenerConexion();
        console.log('Conexión obtenida exitosamente');
        
        // Hacer operaciones con la base de datos...
        // conexion.run("SELECT * FROM tabla", ...)
        
        // Cerrar conexión
        conexion.close();
        
    } catch (error) {
        console.error('Error:', error.message);
    }
}

main();
```

## Demo

Para probar la librería, ejecuta:

```bash
node main.js
```

Esto ejecutará una demostración completa de la funcionalidad.

## Requisitos

- Node.js >= 14.0.0
- SQLite3

## Licencia

MIT