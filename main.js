// main.js - Punto de entrada principal de la librería conectar-sqlite

// Importar todas las clases y funciones de los módulos
import { DatosConexion, GuardarDatos } from './src/CompletarDatos.js';
import { Operaciones } from './src/Operaciones.js';
import { PedirDatos } from './src/PedirDatos.js';

// Exportar todas las funcionalidades de la librería
export {
    // Clase principal para datos de conexión
    DatosConexion,
    
    // Función para guardar datos de conexión
    GuardarDatos,
    
    // Clase para operaciones con SQLite
    Operaciones,
    
    // Función para pedir datos desde consola
    PedirDatos
};

// Exportación por defecto que incluye todo (opcional, para compatibilidad)
export default {
    DatosConexion,
    GuardarDatos,
    Operaciones,
    PedirDatos
};