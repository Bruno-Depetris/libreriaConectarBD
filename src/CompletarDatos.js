import fs from "fs";

export class DatosConexion {
    constructor(carpetaAppdata, nombreBD, carpetaBackUp, backupBD, pathBDmain) {
        this.carpetaAppdata = carpetaAppdata;
        this.nombreBD = nombreBD;
        this.carpetaBackUp = carpetaBackUp;
        this.backupBD = backupBD;
        this.pathBDmain = pathBDmain;
    }    
}

export async function GuardarDatos(carpetaAppdata, nombreBD, carpetaBackUp, backupBD, pathBDmain) {
    const datos = new DatosConexion(carpetaAppdata, nombreBD, carpetaBackUp, backupBD, pathBDmain);
    const datosJSON = JSON.stringify(datos, null, 2);
    const archivo = "datosConexion.json";
    fs.writeFileSync(archivo, datosJSON, "utf-8");
    console.log(`Datos de conexión guardados en ${archivo}`);
}
