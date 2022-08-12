
const  { Product } =  require('./product.js')
const product = new Product('./products.json')
const express = require('express')
const pug = require('pug');

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

/* app.use('/css', express.static(__dirname, 'node_modules/bootstrap/dist/css'))
app.use('/js', express.static(__dirname, 'node_modules/bootstrap/dist/js'))
app.use('/js', express.static(__dirname, 'node_modules/jquery/dist')) */

app.set('view engine', 'pug')
app.set('views', './views')

app.get('/', (req, res) => {
    //res.sendFile(__dirname + '/public/index.html');
    res.render('home.pug');
});

app.get('/api/products/', async (req, res) => {    
    const products = await product.getAll()
    //const hayLista = allProducts.length > 0;
    res.render('products.pug', {
       products
      })

})

app.get('/api/products/:id', async (req, res) => {  
    let id = req.params.id
    //console.log(id) 
    const findProduct = product.getById(+id)
    res.send(findProduct);
})

app.post('/api/products/', async (req, res) => {   
    const allProducts = product.getAll()
    let newProduct = { ...req.body, id: allProducts.length + 1 };
    const product = product.save(newProduct) 
    res.send(product);
})

app.put('/api/products/:id', async (req, res) => {    
    //console.log(req.body + " - " + req.params.id)
      const edit = product.edit(req.body, +req.params.id) 
    res.send(edit);
})

app.delete('/api/products/:id', async (req, res) => {    
    //console.log(req.params.id)
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

 
