
class Product {



    getData() {
       return data = JSON.parse(            
      {
        "title": "gorro birrete negro",
        "price": 1000.00,
        "thumbnail": "https://cdn2.iconfinder.com/data/icons/knowledge-is-power/60/graduation-hat-128.png",
        "id": 1
      },
      {
        "title": "gorro birrete azul",
        "price": 1200.00,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-and-school-8/48/Education-128.png",
        "id": 2
      },
      {
        "title": "gorro bonete clasico",
        "price": 1150.00,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/object-emoji/50/PartyHat-256.png",
        "id": 3
      })
    }
    

    async save(objData){   
        
        try {
        
            const dataParse = getData()
            let arrayProds = [ ...dataParse, {...objData, id: dataParse.length + 1}]
            await fs.promises.writeFile(this.ruta, JSON.stringify(arrayProds, null, 2), 'utf-8')    
            console.log(`El id del producto es insertado es: ${dataParse.length + 1}`)
        } catch (error) {
            console.log(error)
        }          
    }

    async getAll(){
        try {
           
            const dataParse = getData()
            console.log(dataParse)

        } catch (error) {
            console.log(error)
        }
    }


    async getById(id){
        try {
            const dataParse = getData()
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

    async deleteById(id){
        try {
            const dataParse = getData()
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



module.exports = Product
