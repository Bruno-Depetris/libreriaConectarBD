import { DatosConexion, GuardarDatos } from "./CargarDatos.js";
import promptSync from "prompt-sync";
import fs from "fs";

const prompt = promptSync();

export async function PedirDatos(pathBDmain) {

    if (!fs.existsSync("datosConexion.json")) {
        //si o si con la bd en la raiz
        if (!pathBDmain) {
            pathBDmain = prompt(
                "Ingrese la ruta completa de la base de datos inicial (ubicada en la raiz del proyecto) (Ej: ./MiAppDB.db): ",
                "./MiAppDB.db"
            );
        }

        await GuardarDatos(pathBDmain);

        const misDatos = new DatosConexion(pathBDmain);

        console.log("Instancia de DatosConexion:", misDatos);
    } else {
        console.log("El archivo datosConexion.json ya existe. No se sobrescribirá.");
    }
}
