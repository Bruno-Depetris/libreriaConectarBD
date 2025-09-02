import fs from "fs";

export class DatosConexion {
    constructor(pathBDmain, cadenaConexion) {
        this.pathBDmain = pathBDmain;
        this.cadenaConexion = cadenaConexion;
    }
}

export async function GuardarDatos(pathBDmain) {
    let cadenaConexion;
    try {
        const sqlite3 = await import('sqlite3');
        cadenaConexion = `Data Source=${pathBDmain};Version=${sqlite3.VERSION};`;
    } catch {
        cadenaConexion = `Data Source=${pathBDmain};Version="^5.1.7";`;
    }

    const datos = new DatosConexion(pathBDmain, cadenaConexion);
    const datosJSON = JSON.stringify(datos, null, 2);
    const archivo = "datosConexion.json";
    fs.writeFileSync(archivo, datosJSON, "utf-8");
    console.log(`Datos de conexión guardados en ${archivo}`);
}
