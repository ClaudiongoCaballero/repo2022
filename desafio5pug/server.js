
const  { Product } =  require('./product.js')
const product = new Product('./products.json')
const express = require('express')
const router = express.Router();

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'pug')
app.set('views', './views')

app.get('/', (req, res) => {
    res.render('home.pug');
});

app.get('/api/products/', async (req, res) => {    
    const products = await product.getAll()
    res.render('products.pug', {
       products
      })

})

app.get('/api/products/:id', async (req, res) => {  
    let id = req.params.id
    const findProduct = product.getById(+id)
    res.send({product: findProduct});
})

app.post('/api/products', async (req, res) => {   
    const allProducts = await product.getAll()        
    const newProduct = {...req.body, id: allProducts.length + 1 }
    const productNuevo = product.save(newProduct) 
    res.json(productNuevo);
})

app.put('/api/products/:id', async (req, res) => {    
      const edit = product.edit(req.body, +req.params.id) 
    res.json(edit);
})

app.delete('/api/products/:id', async (req, res) => {    
    let id = req.params.id
    const deleteProduct = product.deleteById(+id)
    res.send(deleteProduct);
})


app.use( (err, req, res, next) => {
    console.error(err.stack);
    res.send({err});
  })
  

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${server.address().port}`)
})

 
