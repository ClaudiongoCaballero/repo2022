/*Manejo de archivos 

Formato: carpeta comprimida con el proyecto. 
Desafío entregable 
» Consigna: 
Implementar programa que contenga una clase llamada Contenedor que reciba el nombre del 
archivo con el que va a trabajar e implemente los siguientes métodos: 
• save(Object) : Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado. 
• getById(Number) : Object - Recibe un id y devuelve el objeto con ese id, o null si no está. 
• getA11( ) : Object H - Devuelve un array con los objetos presentes en el archivo. 
• deleteById(Number): void - Elimina del archivo el objeto con el id buscado. 
• deleteAll(): void - Elimina todos los objetos presentes en el archivo. 


» Aspectos a incluir en el entregable: - 
El método save incorporará al producto un id numérico, 
que deberá ser siempre uno más que el id del último objeto agregado (o id 1 si 
    es el primer objeto que se agrega) 
y no puede estar repetido. 
- Tomar en consideración el contenido previo del archivo, en caso de utilizar uno 
existente. Implementar el manejo de archivos con el módulo fs de node.js, 
utilizando promesas con async/await y manejo de errores. Probar el módulo creando un 
contenedor de productos, que se guarde en el archivo: 
"productos.txt" Incluir un llamado de prueba a cada método, y mostrando por 
pantalla según corresponda 
para verificar el correcto funcionamiento del módulo construído. 

El formato de cada producto será : 
{
    title: (nombre del producto), 
    price: (precio), 
    thumbnail: (url de la foto del producto) 
} 

*/

const fs = require('fs')

class Contenedor {

    constructor(ruta){
        this.ruta = ruta
    }

    async save(objData){   
         
        try {
            let data = await fs.promises.readFile(this.ruta, 'utf8')
            const dataParse = JSON.parse(data)
            // console.log(JSON.parse(data))
            let arrayProds = [ ...dataParse, {...objData, id: dataParse.length + 1}]
            await fs.promises.writeFile(this.ruta, JSON.stringify(arrayProds, null, 2), 'utf-8')    
            console.log(`El id del producto es insertado es: ${dataParse.length + 1}`)
        } catch (error) {
            console.log(error)
        }          
    }
    // devolver el id de un producto
    async getById(id){
        try {
            let data = await fs.promises.readFile(this.ruta, 'utf8')
            const dataParse = JSON.parse(data)
            let producto = dataParse.find(producto => producto.id === id)
            if (producto) {
                console.log(producto)                
            } else {
                console.log('No existe el producto')                
            }
            // return producto
        } catch (error) {
            console.log(error)
        }
    }

    // devolver todos los productos
    async getAll(){
        try {
            let data = await fs.promises.readFile(this.ruta, 'utf8')
            const dataParse = JSON.parse(data)
            console.log(dataParse)
            // return dataParse
        } catch (error) {
            console.log(error)
        }
    }

    // borrar un producto por id
    async deleteById(id){
        try {
            let data = await fs.promises.readFile(this.ruta, 'utf8')
            const dataParse = JSON.parse(data)
            let producto = dataParse.find(producto => producto.id === id)
            if (producto) {
                let arrayProds = dataParse.filter(producto => producto.id !== id)
                await fs.promises.writeFile(this.ruta, JSON.stringify(arrayProds, null, 2), 'utf-8')    
                console.log(`El producto con id ${id} ha sido borrado`)
            } else {
                console.log('No existe el producto')                
            }
            // return producto
        } catch (error) {
            console.log(error)
        }
    } 

    // borrar todos los productos
    async deleteAll(){
        try {            
            let arrayProds = []
            await fs.promises.writeFile(this.ruta, JSON.stringify(arrayProds, null, 2), 'utf-8')    
            console.log('Todos los productos han sido borrados')
        } catch (error) {
            console.log(error)
        }
    }
    

}

module.exports = Contenedor
