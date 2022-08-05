const Product = require('./product.js')
const product = new Product()
const { urlencoded } = require('express')
const express = require('express')
const cookieParser = require('cookie-parser')
 

const app = express()
const routerProducts = Router()


routerProducts.get('/', (req, res) => {
    res.status(200)
    .json({ message: 'Bienvenido a la API de productos' })
  })


routerProducts.get('/:id', async (req, res) => {  
    const {id} = req  
    const findProduct = product.getById(+id)
    res.json(
        {
           findProduct
        }
    );
})

routerProducts.get('/', (req, res) => {    
    const allProduct = product.getAll()
    res.json(
        {
           allProduct
        }
    );
})

routerProducts.post('/', (req, res) => {   
    const findProduct = product.save(req) 
    res.json(
        {
            "Title": "Hola mundo usando rutas!"
        }
    );
})

routerProducts.put('/', (req, res) => {    
    res.json(
        {
            "Title": "Hola mundo usando rutas!"
        }
    );
})

routerProducts.delete('/:id', (req, res) => {    
    const {id} = req  
    const deleteProduct = product.deleteById(+id)
    res.json(
        {
            deleteProduct
        }
    );
})


app.use('/api/products', routerProducts)


app.use( (err, req, res, next) => {
    console.error(err.stack);
    res.send({err});
  })
  

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`escuchando en el puerto: ${server.address().port}`)
})

 
module.exports = router;
