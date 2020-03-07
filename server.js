 let express  = require( 'express');
let mongoose = require( 'mongoose');
let bodyParser = require( 'body-parser');
let productRouter = require( './Routes/productRouter');

const app = express();
const port = process.env.PORT || 3001;
// Connecting to the database
const db = mongoose.connect("mongodb://localhost:27017/products", { useNewUrlParser: true });

// setting body parser middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API routes
app.use('/api/products', productRouter);

// Running the server
app.listen(port, () => {
	console.log(`msvc-product listening http://localhost:${port}`)
})

