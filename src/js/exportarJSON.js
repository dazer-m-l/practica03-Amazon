const fs = require('fs');
const path = require('path');

function exportarDatosJSON(data, fileName = "dataAmazonSearch.json",finalRoute = "../../dataJSON"){
    const rutaCompleta = path.join('./dataJSON', 'resultadosAmazon.json');

    if(!fs.existsSync('./dataJSON')){
        fs.mkdirSync('./dataJSON',{recursive : true});
    }
    fs.writeFileSync(rutaCompleta, JSON.stringify(data,null,2),'utf-8')
}

module.exports = exportarDatosJSON;