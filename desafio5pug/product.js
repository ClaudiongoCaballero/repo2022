const fs = require('fs')

class Product {


    constructor(ruta){
        this.ruta = ruta
    }


    async #readFile() {
        let products = [];
        let productsJson;
        try {
            products = await fs.promises.readFile(this.ruta, 'utf-8');
        } catch (error) {
            console.error('No se encontro el archivo')
        }
        if (products === '') products = '[]';
        productsJson = JSON.parse(products);
        return productsJson;
    }


    async save(objData){   
        
        try {
            const data = await fs.promises.readFile(this.ruta, 'utf-8');
            const dataParse = JSON.parse(data)
            let arrayProds = [ ...dataParse, {...objData}]
            await fs.promises.writeFile(this.ruta, JSON.stringify(arrayProds, null, 2), 'utf-8')    
            console.log(`El id del producto es insertado es: ${dataParse.length + 1}`)
            return `El id del producto es insertado es: ${dataParse.length + 1}`
        } catch (error) {
            console.log(error)
        }          
    }

    async getAll() {
        const productsJson = await this.#readFile();
        if (productsJson !== []) {
            console.log(productsJson)
            return productsJson;
        } else {
            console.warn("No hay productos")
            return null;
        }
    }


    async getById(id){
        try {
            const data = await fs.promises.readFile(this.ruta, 'utf-8');
            const dataParse = JSON.parse(data)
            let producto = dataParse.find(producto => producto.id === id)
            if (producto) {
                console.log(producto)          
            } else {
                console.log('No existe el producto')                
            }
        } catch (error) {
            console.log(error)
        }
    }

    async edit(objData, id){
        try {
            const data = await fs.promises.readFile(this.ruta, 'utf-8');
            const dataParse = JSON.parse(data)
            let producto = dataParse.find(producto => producto.id === id)
            if (producto) {
                let arrayProds1 = dataParse.filter(producto => producto.id !== id)
                let arrayProds2 = [ ...arrayProds1, {...objData, id: producto.id}]
                await fs.promises.writeFile(this.ruta, JSON.stringify(arrayProds2, null, 2), 'utf-8')    
                console.log(`El producto con id:${producto.id} ha sido actualizado`)
            } else {
                console.log('No existe el producto')                
            }
        } catch (error) {
            console.log(error)
        }
    }

    async deleteById(id){
        try {
            const data = await fs.promises.readFile(this.ruta, 'utf-8');
            const dataParse = JSON.parse(data)
            let producto = dataParse.find(producto => producto.id === id)
            if (producto) {
                let arrayProds = dataParse.filter(producto => producto.id !== id)
                await fs.promises.writeFile(this.ruta, JSON.stringify(arrayProds, null, 2), 'utf-8')    
                console.log(`El producto con id ${id} ha sido borrado`)
            } else {
                console.log('No existe el producto')                
            }
        } catch (error) {
            console.log(error)
        }
    } 

}

module.exports =   { Product }
