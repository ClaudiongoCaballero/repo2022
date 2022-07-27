const Container = require('./container.js')
const container = new Container('./productos.txt')
console.log(container.ruta)
const express = require('express')
const app = express()

app.use(express.json())

const PORT = 8080

app.get('/', (req,res) => {
    res.send('<h1>Holis</h1>')
})

app.get('/products', async (req, res) => {
    const products = container.getProducts()
    products.then (products => 
    res.json(products))
})

app.get('/randomProduct', async (req, res) => {
    const randomProduct = container.getRandomProduct()
    randomProduct.then( randomProduct =>
    res.json( randomProduct) ) 
})

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${server.address().port}`)
})
