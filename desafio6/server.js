const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const  { Product } =  require('./product.js')
const express = require('express')
const { engine } = require('express-handlebars');

const app = express()

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.engine('.hbs', engine({ extname: '.hbs' }));

app.set('view engine', '.hbs')
app.set('views', './views')

const product = new Product('./products.json')
const messages =  new Product("./messages.json");

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/products/', async (req, res) => {    
    const products = await product.getAll()
    res.render('products', {
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


io.on('connection', async socket => {
    console.log('Un cliente se ha conectado')
    let allMessages = await messages.getAll()
    
    socket.emit('messages', allMessages);

    socket.on('new-message', async (data, cb) => {
  
        allMessages.push(data);
		const msg = {
			message: "mensaje nuevo",
			allMessages
		};

		const date = new Date().getTime();
		io.sockets.emit("server-message", msg)
		cb(date)
		await messages.save({
			id: date,
			mail: msg.mail,
			mensaje: msg.mensaje,
			fecha: msg.hora
		});

    });
 });


app.use( (err, req, res, next) => {
    console.error(err.stack)
    res.send({err})
})
  
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${server.address().port}`)
})