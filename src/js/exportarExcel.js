const  XLSX = require ('xlsx');
const path = require('path');
const fs = require ('fs');

/**
 * Exporta un arreglo a un archivo de Excel (.xlsx)
 * @param{Array<Object>} datos - Arreglo de productos u objetos
 * @param{string} nombreArchivo - Nombre del archivo a Guardad (Ej: Resultados.xlsx)
 * @param{string} carpetaDestino - Carpeta/Directorio donde se guarda el archivo (Ej: './archivosGenerados')
 * @param{string} nombreHoja - Nombre de la hoja de libro de Excel (Ej: "Resultados")
 */

function exportarDatosAExcel(datos,nombreArchivo = "resultados.xlsx", carpetaDestino = "../../archivosGenerados",nombreHoja = "resultados"){
    if (!Array.isArray(datos || datos.lenght === 0)){
        console.log('No hay datos a exportar');
        return
    }
    //Asegurar que la carpeta existe
    if(!fs.existsSync(carpetaDestino)){
        fs.mkdirSync(carpetaDestino,
            {recursive  : true})
    }
    //Crear ruta completa al archivo
    const rutaCompleta = path.join(carpetaDestino,nombreArchivo);

    //Crear Archivo
    console.log(`Creando archivo XLSX ${nombreArchivo}`);
        const workssheet =XLSX.utils.json_to_sheet(datos);
        const worksbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(
            worksbook,workssheet, nombreHoja
        );
        XLSX.writeFile(worksbook, rutaCompleta);
    console.log(`${nombreArchivo} creado en la ubicacion ${rutaCompleta}`)
}

module.exports = exportarDatosAExcel;