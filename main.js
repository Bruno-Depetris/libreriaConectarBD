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

// Función demo/test que se ejecuta cuando se llama directamente al archivo
async function demo() {
    console.log('=== DEMO DE CONECTAR-SQLITE ===\n');
    
    try {
        // Verificar si ya existen los datos de conexión
        if (!Operaciones.datosConexionExisten()) {
            console.log('No se encontró configuración. Iniciando configuración inicial...\n');
            await PedirDatos();
        } else {
            console.log('Configuración encontrada. Usando datos existentes.\n');
        }
        
        // Crear instancia de operaciones
        const operaciones = new Operaciones();
        
        console.log('Verificando y creando estructura de carpetas...');
        const resultado = operaciones.comprobar();
        
        if (resultado) {
            console.log('✓ Estructura verificada correctamente');
            
            console.log('\nObteniendo conexión a la base de datos...');
            const conexion = operaciones.obtenerConexion();
            console.log('✓ Conexión obtenida exitosamente');
            
            // Cerrar la conexión
            conexion.close((err) => {
                if (err) {
                    console.error('Error al cerrar la conexión:', err.message);
                } else {
                    console.log('✓ Conexión cerrada correctamente');
                }
            });
            
            console.log('\n=== DEMO COMPLETADA ===');
        } else {
            console.log('✗ Error al verificar la estructura');
        }
        
    } catch (error) {
        console.error('Error durante la demo:', error.message);
    }
}

// Ejecutar demo si este archivo es ejecutado directamente
if (import.meta.url === `file://${process.argv[1]}`) {
    demo();
}