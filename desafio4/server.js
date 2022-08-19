
const  { Product } =  require('./product.js')
const product = new Product('./products.json')
const express = require('express')
 

const app = express()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});



app.get('/api/products/:id', async (req, res) => {  
    let id = req.params.id
    //console.log(id) 
    const findProduct = product.getById(+id)
    res.send(findProduct);
})

app.get('/api/products/', async (req, res) => {    
    const allProducts = product.getAll()
    res.send(allProducts);
})

app.post('/api/products/', async (req, res) => {   
    //console.log(req.body)
    const allProducts = product.getAll()
    let newProduct = { ...req.body, id: allProducts.length + 1 };
    const findProduct = product.save(newProduct) 
    res.send(newProduct);
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

<<<<<<< HEAD
 
=======
 
>>>>>>> 1e9be6727ea3666a35bd072347d9fe47f783a2f7
