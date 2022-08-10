
const  { Product } =  require('./product.js')
const product = new Product('./products.json')
const { urlencoded } = require('express')
const express = require('express')
const cookieParser = require('cookie-parser')
 

const app = express()


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});



app.get('/api/products/:id', async (req, res) => {  
    const {id} = req  
    const findProduct = product.getById(+id)
    res.json(
        {
           findProduct
        }
    );
})

app.get('/api/products/', (req, res) => {    
    const allProducts = product.getAll()
    res.json(
        {
           allProducts
        }
    );
})

app.post('/api/products/:id', (req, res) => {   
    const allProducts = product.getAll()
    let newProduct = { ...req.body, id: allProducts.length + 1 };
    const findProduct = product.save(newProduct) 
    res.json(
        {
            "Title": "product saved!"
        }
    );
})

app.put('/api/products/:id', (req, res) => {    
    
    const findProduct = product.getById(+id)
    const edit = product.save(findProduct) 
    res.json(
        {
            edit
        }
    );
})

app.delete('/api/products/:id', (req, res) => {    
    const {id} = req  
    const deleteProduct = product.deleteById(+id)
    res.json(
        {
            deleteProduct
        }
    );
})



app.use( (err, req, res, next) => {
    console.error(err.stack);
    res.send({err});
  })
  

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`escuchando en el puerto: ${server.address().port}`)
})

 
