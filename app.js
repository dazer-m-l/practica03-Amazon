const puppeteer = require('puppeteer');

const preguntarOpcionGuardado = require('./src/js/preguntarOpcionGuardado');
const preguntarElemento = require('./src/js/preguntarElementoABuscar');

const exportarDatosCSV = require('./src/js/exportarCSV');
const exportarDatosAExcel = require('./src/js/exportarExcel');
const exportarDatosJSON = require('./src/js/exportarJSON');


(async () => {
    const elementoBuscar = await preguntarElemento();
    const url = `https://www.amazon.com.mx/s?k=${encodeURIComponent(elementoBuscar)}`;

    console.log(`::::: Iniciando búsqueda de ${elementoBuscar} en Amazon :::::`);

    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 420
    });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2',timeout:60000 });

    console.log("::::::::: Obteniendo información :::::::::");

    let productos = [];
    let btnSiguientePaginaActivo = true;

    while (btnSiguientePaginaActivo) {
        const productosObtenidos = await page.evaluate(() => {
            const resultados = Array.from(document.querySelectorAll('.puis-card-container.s-card-container'));
            return resultados.map((producto) => {
                const tituloBusqueda = producto.querySelector('h2 span')?.innerText || 'N/A';
                const precioInt = producto.querySelector('span.a-price-whole')?.innerText || '';
                const precioFloat = producto.querySelector('span.a-price-fraction')?.innerText || '00';
                const precioLista = producto.querySelector('span.a-price.a-text-price > span.a-offscreen')?.innerText || 'N/A';
                const imgProducto = producto.querySelector('img.s-image')?.src || 'No disponible';

                const precioIntLimpio = precioInt.replace(/\n/g, "").trim();
                const precioFloatLimpio = precioFloat.replace(/\n/g, "").trim();
                const precioListaLimpio = precioLista.replace(/\n/g, "").trim();

                return {
                    tituloBusqueda,
                    precio: `${precioIntLimpio}.${precioFloatLimpio}`,
                    precioLista: precioListaLimpio,
                    imgProducto
                };
            });
        });

        productos = [...productos, ...productosObtenidos];

        btnSiguientePaginaActivo = await page.evaluate(() => {
            const btnSiguiente = document.querySelector('.s-pagination-next');
            if (btnSiguiente && !btnSiguiente.classList.contains('s-pagination-disabled')) {
                btnSiguiente.click();
                return true;
            }
            return false;
        });

        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log('Productos scrapeados:', productos);
    await browser.close();
    console.log('Tarea terminada');
    
    //let mensaje = edad >= 18 ? "Eres mayor de edad" : "Eres menor de edad";
    let decition = await preguntarOpcionGuardado()
    if(decition === 'salir'){
        console.log('Usted ha salido sin guardar sus datos de búsqueda');
        process.exit();
    }

    switch(decition){
        case '1' :
            //Exportar a CSV
            exportarDatosCSV(productos, "dataAmazonSearch.csv", './dataCSV');
            console.log('CSV creado');
            break;
        case '2':
            //Exportar a JSON
            exportarDatosJSON(productos,"dataAmazonSearch.json",'./dataJSON');
            console.log('JSON Generado');
            break;
        case '3':
            // Exportar a Excel
            exportarDatosAExcel(productos, "resultadosAmazon.xlsx", "./dataXLSX", "Datos Obtenidos Amazon");
            console.log('XLSX creado');
            break;
    }   
})();
