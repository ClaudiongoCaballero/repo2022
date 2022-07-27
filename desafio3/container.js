const fs = require('fs')

class Container {

    constructor(ruta){
        this.ruta = ruta
    }


    async getProducts() {
        try {
            let data = await fs.promises.readFile(this.ruta, "utf-8")
            let dataParsedJSON = JSON.parse(data)
            return dataParsedJSON
        } catch (error) {
            console.log(error)
        }
    }

    async getRandomProduct() {
        try {
            let data = await fs.promises.readFile(this.ruta, "utf-8")
            let dataParsedJSON = JSON.parse(data)
            let min = 1
            let id = Math.floor(Math.random() * (dataParsedJSON.length - min + 1)) + min;
            let producto = dataParsedJSON.find(producto => producto.id === id)
            if (producto) {
                console.log(producto)                
            } else {
                console.log('No existe el producto')                
            }
            return producto
        } catch (error) {
            console.log(error)
        }
    }

}


module.exports = Container
