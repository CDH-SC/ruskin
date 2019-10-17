var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

//model aplication for letters scheme
var Schema = mongoose.Schema;
//Define schema
var letterSchema = new Schema({
  _id:  String,
  years: [{
  	year: Number,
  	letters: [{
  		date: String,
	    author: String,
	    addressee: String,
	    letter_num: Number,
	    content: String
  	}]
  }],
}, { _id: false });
letterSchema.index({'$**':'text'});

//Export function to create "Letter" model class
letterSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Letter', letterSchema);
