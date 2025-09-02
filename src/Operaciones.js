import fs from "fs";
import path from "path";
import os from "os";
import sqlite3Pkg from 'sqlite3';
const sqlite3 = sqlite3Pkg.verbose();

export class Operaciones {
    constructor() {
        this.appName = "Predits";
        this.backupFolderName = "BackUpAllPredits";

        const datosPath = path.join(process.cwd(), "datosConexion.json");
        let datos = {};
        if (fs.existsSync(datosPath)) {
            datos = JSON.parse(fs.readFileSync(datosPath, "utf-8"));
        } else {
            throw new Error("No se encontró datosConexion.json");
        }

        this.dbFileName = path.basename(datos.pathBDmain);
        this.carpetaAppdata = this.getAppDataPath(this.appName);
        this.pathDB = datos.pathBDmain;
        this.pathDBAppData = path.join(this.carpetaAppdata, this.dbFileName);
        this.backupPath = path.join(os.homedir(), ".config", this.backupFolderName, this.dbFileName);
    }
    // Obtener la ruta de AppData según el sistema operativo (esta de prueba)
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
        if (!fs.existsSync(this.carpetaAppdata)) {
            fs.mkdirSync(this.carpetaAppdata, { recursive: true });
            console.log("La carpeta no existía, fue creada con éxito");
        } else {
            console.log("Carpeta encontrada con éxito");
        }

        if (!fs.existsSync(this.pathDBAppData)) {
            if (fs.existsSync(this.pathDB)) {
                fs.copyFileSync(this.pathDB, this.pathDBAppData);
                console.log("Base de datos copiada exitosamente");
                this.mostrarUbicacionBD();
            } else {
                console.log("El archivo de base de datos original no se encuentra en la ruta especificada.");
            }
        } else {
            console.log("La base de datos ya existe en AppData");
            this.mostrarUbicacionBD();
        }
    }

    mostrarUbicacionBD() {
        console.log("📍 Ubicación de la base de datos:");
        console.log(`   Ruta completa: ${this.pathDBAppData}`);
        console.log(`   Carpeta AppData: ${this.carpetaAppdata}`);
        console.log(`   Nombre del archivo: ${this.dbFileName}`);
        if (fs.existsSync(this.pathDBAppData)) {
            const stats = fs.statSync(this.pathDBAppData);
            console.log(`   Tamaño: ${(stats.size / 1024).toFixed(2)} KB`);
            console.log(`   Última modificación: ${stats.mtime.toLocaleString()}`);
            console.log("   Estado: ✅ Archivo encontrado y accesible");
        } else {
            console.log("   Estado: ❌ Archivo no encontrado en la ubicación especificada");
        }
    }

    mostrarInformacionCompleta() {

        console.log("\n=== INFORMACIÓN COMPLETA DE LA BASE DE DATOS ===");
        console.log(`🏠 Aplicación: ${this.appName}`);
        console.log(`💾 Nombre del archivo: ${this.dbFileName}`);
        console.log("\n📂 RUTAS:");
        console.log(`   Original: ${this.pathDB}`);
        console.log(`   AppData: ${this.pathDBAppData}`);
        console.log(`   Backup: ${this.backupPath}`);
        console.log("\n🔍 ESTADO DE ARCHIVOS:");
        if (fs.existsSync(this.pathDB)) {
            const statsOriginal = fs.statSync(this.pathDB);
            console.log(`   ✅ Original: Existe (${(statsOriginal.size / 1024).toFixed(2)} KB)`);
        } else {
            console.log("   ❌ Original: No encontrado");
        }
        if (fs.existsSync(this.pathDBAppData)) {
            const statsAppData = fs.statSync(this.pathDBAppData);
            console.log(`   ✅ AppData: Existe (${(statsAppData.size / 1024).toFixed(2)} KB)`);
        } else {
            console.log("   ❌ AppData: No encontrado");
        }
        if (fs.existsSync(this.backupPath)) {
            const statsBackup = fs.statSync(this.backupPath);
            console.log(`   ✅ Backup: Existe (${(statsBackup.size / 1024).toFixed(2)} KB)`);
        } else {
            console.log("   ❌ Backup: No encontrado");
        }
        console.log("================================================\n");
    }

    crearBackUp() {
        try {
            const backupFolderPath = path.dirname(this.backupPath);
            if (!fs.existsSync(backupFolderPath)) {
                fs.mkdirSync(backupFolderPath, { recursive: true });
                console.log("La carpeta de respaldo no existía, fue creada con éxito");
            }
            if (!fs.existsSync(this.backupPath)) {
                if (fs.existsSync(this.pathDBAppData)) {
                    fs.copyFileSync(this.pathDBAppData, this.backupPath);
                    console.log("backUpCreado");
                    console.log(`💾 Backup guardado en: ${this.backupPath}`);
                } else {
                    console.log("El archivo no se encuentra en ruta especificada");
                }
            } else {
                console.log("El backup ya existe");
                console.log(`💾 Backup existente en: ${this.backupPath}`);
            }
            return this.backupPath;
        } catch (error) {
            console.log("HUBO UN ERROR", error);
            return "error";
        }
    }

    obtenerConexion() {
        try {
            const db = new sqlite3.Database(this.pathDBAppData);
            console.log(`🔗 Conexión establecida con: ${this.pathDBAppData}`);
            return db;
        } catch (error) {
            console.log(`Error al obtener la conexión: ${error.message}`);
            throw error;
        }
    }
}
