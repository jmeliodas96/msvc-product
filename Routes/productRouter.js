

let product = require('../models/productModel')

/*const cote = require('cote');
const key = 'products';

const responder = new cote.Responder({
	key: key,
	name: `${key} responder`
}); */
/*
responder.on('getProductsDetails', (req, cb) => {
	
	console.log(req)

    product.find( { '_id' : { $in: req.productsIds} }, function(err,result){
        console.log(result);
        cb(result, result);
    }).catch(err => {
        console.log(err);
        cb(err, null);
    });
});
*/
let express = require('express');

const productRouter = express.Router();

productRouter.route('/list')
    .get((req, res) => {
        product.find({}, (err, products) => {
            res.json(products)
        })  
    })

productRouter.route('/')
    .post((req, res) => {
        let newproduct = new product(req.body);
        newproduct.save();
        res.status(201).send(newproduct) 
    })

// Middleware 
productRouter.use('/:productId', (req, res, next)=>{
    product.findById( req.params.productId, (err,product)=>{
        if(err)
            res.status(500).send(err)
        else {
            req.product = product;
            next()
        }
    })

})

productRouter.route('/:productId')
    .get((req, res) => {
        res.json(req.product)
    }) // end get products/:productId 
    .put((req,res) => {
        req.product.category = req.body.category;
        req.product.name = req.body.name;
        req.product.description = req.body.description;
        req.product.price = req.body.price;
        req.product.image = req.body.image;
    
        req.product.save()
        res.json(req.product)
    })
    .delete((req,res)=>{
        req.product.remove(err => {
            if(err){
                res.status(500).send(err)
            }
            else{
                res.status(204).send('removed')
            }
        })
    })//delete
	 
    module.exports = productRouter;