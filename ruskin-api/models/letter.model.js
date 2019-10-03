var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

//model aplication for letters scheme
var Schema = mongoose.Schema;
//Define schema
var letterSchema = new Schema({
  _id:  String,
  date:       String,
  notebook_url: String,
  volume_num: String,
  ms_num: Number,
  page: [{
    number: Number,
    folio_num: String,
    image: String,
    content: String,
    transcriber: String,
    hand: String,
  }],
}, { _id: false });
letterSchema.index({'$**':'text'});

//Export function to create "Letter" model class
letterSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Letter', letterSchema);
