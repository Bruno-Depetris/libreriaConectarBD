# conectar-sqlite"
Librería para manejar datos de conexión y operaciones SQLite en Node.js.
---
## Instalación
Se agrega al proyecto con ->
npm install conectar-sqlite"

import { DatosConexion, GuardarDatos, Operaciones, PedirDatos } from 'conectar-sqlite';

## Clases y funciones
DatosConexion
Clase que representa los datos de conexión a la base de datos.

**Constructor:**
--> new DatosConexion(carpetaAppdata, nombreBD, carpetaBackUp, backupBD, pathBDmain)

Parámetros:
- carpetaAppdata (string) - Carpeta principal para la app.

- nombreBD (string) - Nombre del archivo de la base de datos.

- carpetaBackUp (string) - Carpeta donde se guardarán los backups.

- backupBD (string) - Nombre del archivo de respaldo.

- pathBDmain (string) - Ruta de la base de datos inicial.

# GuardarDatos
Función asíncrona que guarda los datos de conexión en un archivo datosConexion.json.

**await GuardarDatos(carpetaAppdata, nombreBD, carpetaBackUp, backupBD, pathBDmain);**


## Operaciones
Clase para manejar operaciones con la base de datos SQLite.

-> const operaciones = new Operaciones();

*Métodos principales:*
comprobar() → Crea carpetas y archivos de base de datos si no existen.
obtenerConexion() → Devuelve la conexión abierta a SQLite.

**ejemplo de uso**
import { DatosConexion, GuardarDatos, Operaciones } from 'conectar-sqlite';

await GuardarDatos('MiApp', 'MiAppDB.db', 'Respaldos', 'MiAppDB_Backup.db', './MiAppDB.db');

const operaciones = new Operaciones();
operaciones.comprobar();
const conexion = operaciones.obtenerConexion();
