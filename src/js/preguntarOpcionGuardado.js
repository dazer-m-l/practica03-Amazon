//Importar Modulo 'readline' de node.js
const readline = require('readline');

function preguntarOpcionGuardado(){
    return new Promise((resolve)=>{
        //1.- Crear una interfaz de lectura con readline
        const rl = readline.createInterface({
            input : process.stdin, //Lee desde consola
            output : process.stdout //Muestra texto en consola
        });
        // Funcion Auxiliar para pregunta recursiva, entrada invalida
        function mostrarOpcionesGuardado(){
            console.log('\n1.- Archivo CSV');
            console.log('2.- Archivo JSON');
            console.log('3.- Archivo XLSX');
            console.log('4.- Salir sin guardar\n');
            rl.question("Ingrese su Opcion de Guardado (1, 2 ó 3) : ", (respuesta)=>{
                
                const opcionBusqueda = respuesta.trim();
                switch(opcionBusqueda){
                    case '1':
                    case '2':
                    case '3':
                        rl.close();
                        resolve(opcionBusqueda.trim());
                        break;
                    case '4':
                        rl.close();
                        resolve('Salir');
                        break;
                    default:
                        console.log("\n Opcion no válida, ingrese una opcion aceptable \n")
                        mostrarOpcionesGuardado();
                }
            }
        )}
        mostrarOpcionesGuardado();
    });
}
module.exports = preguntarOpcionGuardado;
