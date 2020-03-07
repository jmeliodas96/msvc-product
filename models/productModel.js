let mongoose = require('mongoose')

const Schema = mongoose.Schema; 

const productModel = new Schema({
	Id:{ type: Number },
	Name: { type: String },
	Description: { type: String },
	Price: { type: Number },
	ImageName: {type: String }
});

module.exports = mongoose.model('product', productModel)