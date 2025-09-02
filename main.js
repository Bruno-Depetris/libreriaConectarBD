import { DatosConexion, GuardarDatos } from './src/CargarDatos.js';
import { Operaciones } from './src/Operaciones.js';
import { PedirDatos } from './src/PedirDatos.js';

export {
    DatosConexion,
    Operaciones,
    GuardarDatos,
    PedirDatos
};

export default {
    DatosConexion,
    Operaciones,
    GuardarDatos,
    PedirDatos,
    async inicializar(pathBDmain = null) {
        try {
            await PedirDatos(pathBDmain);
            const operaciones = new Operaciones();
            operaciones.comprobar();
            const backupPath = operaciones.crearBackUp();
            console.log('Librería inicializada correctamente');
            console.log(`Backup creado en: ${backupPath}`);
            return operaciones;
        } catch (error) {
            console.error('Error al inicializar la librería:', error.message);
            throw error;
        }
    },
    async obtenerConexionRapida(pathBDmain = null) {
        try {
            const operaciones = await this.inicializar(pathBDmain);
            return operaciones.obtenerConexion();
        } catch (error) {
            console.error('Error al obtener conexión rápida:', error.message);
            throw error;
        }
    }
};

if (import.meta.url === `file://${process.argv[1]}`) {
    console.log('🚀 Ejecutando demo de la librería conectar-sqlite');
    console.log('📦 Funcionalidades disponibles:');
    console.log('  - DatosConexion: Clase para manejar datos de conexión');
    console.log('  - Operaciones: Clase principal para operaciones de BD');
    console.log('  - GuardarDatos: Función para guardar configuración (pathBDmain)');
    console.log('  - PedirDatos: Función para solicitar datos al usuario (pathBDmain opcional)');
    console.log('');
    console.log('💡 Ejemplo de uso:');
    console.log('import conectarSqlite from "conectar-sqlite";');
    console.log('const operaciones = await conectarSqlite.inicializar("./mi-base.db");');
    console.log('const db = operaciones.obtenerConexion();');
    console.log('');
    console.log('🔧 Ejecutando demo rápido...');
    (async () => {
        try {
            const demoPath = './demoDB';
            console.log(`📝 Usando BD demo: ${demoPath}`);
            const { default: conectarSqlite } = await import('./main.js');
            const operaciones = await conectarSqlite.inicializar(demoPath);
            operaciones.mostrarInformacionCompleta();
            console.log('✅ Demo completado exitosamente');
        } catch (error) {
            console.error('❌ Error en demo:', error.message);
        }
    })();
}
