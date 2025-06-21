const path = require ('path');
const fs = require('fs');
const  {Parser} = require('json2csv');

function exportarDatosCSV (data, fileName = 'dataAmazonSearch.csv', finalRoute = '../../archivosGenerados' ){
 if (!Array.isArray(data) || data.length === 0){
    console.log('No haya datos a exportar')
    return;
}
    const parser = new Parser ({fields:  ['tituloBusqueda', 'precio', 'precioLista', 'imgProducto'], defaultValue : 'No disponible'});
    const csv = parser.parse(data);
    
    if (!fs.existsSync(finalRoute)) {
        fs.mkdirSync(finalRoute, { recursive: true });
    }
    
    const rutaCompleta = path.join(finalRoute, fileName);
    fs.writeFileSync(rutaCompleta,csv, 'utf-8')

    console.log(`${fileName} creado en la ruta ${finalRoute}`)
}
module.exports = exportarDatosCSV;
