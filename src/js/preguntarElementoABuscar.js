//Importar Modulo 'readline' de node.js
const readline = require('readline');

function preguntarElemento(){
    return new Promise((resolve)=>{
        //1.- Crear una interfaz de lectura con readline
        const rl = readline.createInterface({
            input : process.stdin, //Lee desde consola
            output : process.stdout //Muestra texto en consola
        });
        // Funcion Auxiliar para pregunta recursiva, entrada invalida
        function hacerPregunta(){
            rl.question("¿Que producto deseas buscar en Amazon?", (respuesta)=>{
                const argumentoBusqueda = respuesta.trim();
                if(argumentoBusqueda === '' || argumentoBusqueda.length<3){
                    console.log('Entrada Invalida. No puede estar vacio o tener solo espacios, ingrese al menos 3 caracteres.\n');
                    hacerPregunta();
                }else{
                    rl.close();
                    resolve(argumentoBusqueda);
                }
            }
        )}
        hacerPregunta();
    });
}

module.exports = preguntarElemento;