var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

//model aplication for letters scheme
var Schema = mongoose.Schema;
//Define schema
var letterSchema = new Schema({
  _id:  Number,
	xml_id: String,
  docDate: String,
  docDateString: String,
  docAuthor: String,
  sender: String,
  addressee: String,
  sourceNote: String,
  docBody: String
}, { _id: false });
letterSchema.index({'$**':'text'});

//Export function to create "Letter" model class
letterSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Letter', letterSchema);
