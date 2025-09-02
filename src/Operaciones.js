import fs from "fs";
import path from "path";
import os from "os";
import sqlite3Pkg from 'sqlite3';
const sqlite3 = sqlite3Pkg.verbose();

export class Operaciones {

    constructor() {
        this.carpetaAppdata = null;
        this.nombreBD = null;
        this.carpetaBackUp = null;
        this.backupBD = null;
        this.pathBDmain = null;
        this.baseDatos = null;
        this.datosConexionCargados = false;
    }

    // Método privado para cargar los datos de conexión
    _cargarDatosConexion() {
        if (this.datosConexionCargados) {
            return; // Ya están cargados
        }

        const archivo = path.join(process.cwd(), "datosConexion.json");
        
        if (!fs.existsSync(archivo)) {
            throw new Error(`El archivo datosConexion.json no existe. Ejecuta primero PedirDatos() para crearlo.`);
        }

        try {
            const datosJSON = fs.readFileSync(archivo, "utf-8");
            const datos = JSON.parse(datosJSON);
            
            this.carpetaAppdata = datos.carpetaAppdata;
            this.nombreBD = datos.nombreBD;
            this.carpetaBackUp = datos.carpetaBackUp;
            this.backupBD = datos.backupBD;
            this.pathBDmain = datos.pathBDmain;
            this.datosConexionCargados = true;
        } catch (error) {
            throw new Error(`Error al leer datosConexion.json: ${error.message}`);
        }
    }

    getAppDataPath(appName) {
        const platform = os.platform();
        const homeDir = os.homedir();

        switch (platform) {
            case 'win32':
                return path.join(process.env.APPDATA || path.join(homeDir, 'AppData', 'Roaming'), appName);
            case 'darwin':
                return path.join(homeDir, 'Library', 'Application Support', appName);
            case 'linux':
            default:
                return path.join(homeDir, '.local', 'share', appName);
        }
    }

    comprobar() {
        // Cargar datos de conexión antes de usarlos
        this._cargarDatosConexion();

        try {
            if (!fs.existsSync(this.carpetaAppdata)) {
                fs.mkdirSync(this.carpetaAppdata, { recursive: true });
            }
            if (!fs.existsSync(path.join(this.carpetaAppdata, this.nombreBD))) {
                fs.copyFileSync(this.pathBDmain, path.join(this.carpetaAppdata, this.nombreBD));
            }
            if (!fs.existsSync(path.join(this.carpetaAppdata, this.carpetaBackUp))) {
                fs.mkdirSync(path.join(this.carpetaAppdata, this.carpetaBackUp));
            }
            if (!fs.existsSync(path.join(this.carpetaAppdata, this.carpetaBackUp, this.backupBD))) {
                fs.copyFileSync(this.pathBDmain, path.join(this.carpetaAppdata, this.carpetaBackUp, this.backupBD));
            }
            return true;
        } catch (error) {
            console.error(`Error en comprobar(): ${error.message}`);
            return false;
        }
    }

    obtenerConexion() {
        // Cargar datos de conexión antes de usarlos
        this._cargarDatosConexion();

        try {
            const cadenaConexion = path.join(this.carpetaAppdata, this.nombreBD);
            const conexion = new sqlite3.Database(cadenaConexion, (err) => {
                if (err) {
                    console.error(`Error al obtener la conexión: ${err.message}`);
                    throw err;
                }
            });
            return conexion;
        } catch (error) {
            console.error(`Error al obtener la conexión: ${error.message}`);
            throw error;
        }
    }

    // Método para verificar si los datos de conexión existen
    static datosConexionExisten() {
        const archivo = path.join(process.cwd(), "datosConexion.json");
        return fs.existsSync(archivo);
    }
}