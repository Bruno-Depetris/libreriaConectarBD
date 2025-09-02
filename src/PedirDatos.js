// src/PedirDatos.js
import { DatosConexion, GuardarDatos } from "./CompletarDatos.js";
import promptSync from "prompt-sync";
import fs from "fs";

const prompt = promptSync();

export async function PedirDatos() {

    if (!fs.existsSync("datosConexion.json")) {
        const carpetaAppdata = prompt("Ingrese la carpeta AppData (Ej: MiApp): ", "MiApp");
        const nombreBD = prompt("Ingrese el nombre de la base de datos (Ej: MiAppDB.db): ", "MiAppDB.db");
        const carpetaBackUp = prompt("Ingrese la carpeta de respaldo (Ej: Respaldos): ", "Respaldos");
        const backupBD = prompt("Ingrese el nombre del archivo de respaldo (Ej: MiAppDB_Backup.db): ", "MiAppDB_Backup.db");
        const pathBDmain = prompt("Ingrese la ruta completa de la base de datos inicial (ubicada en la raiz del proyecto) (Ej: ./MiAppDB.db): ", "./MiAppDB.db");

        await GuardarDatos(carpetaAppdata, nombreBD, carpetaBackUp, backupBD, pathBDmain);

        const misDatos = new DatosConexion(carpetaAppdata, nombreBD, carpetaBackUp, backupBD, pathBDmain);
        console.log("Instancia de DatosConexion:", misDatos);
    } else {
        console.log("El archivo datosConexion.json ya existe. No se sobrescribirá.");
    }
    
}
