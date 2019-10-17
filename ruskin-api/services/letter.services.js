//Get mongoose model
var Letter = require('../models/letter.model')

//Saving the context of this module inside the _the variable
_this = this

//Async function to get the Letter list
exports.getLetters = async function(){

  //Try Catch the awaited promise to handle the error
  try {
    var letters = await Letter.find({}).sort({ _id: 1 });

    return letters;

  } catch (e) {
    //Return error message
    throw Error(e.message, "Error while Paginating letters")
  }
}

//Async function to get the Letter list by Id
exports.getLettersById = async function(id){

  //Try Catch the awaited promise to handle the error
  try {
    var letters = await Letter.findById({_id: id});

    return letters;

  } catch (e) {
    //Return error message
    throw Error(e.message, "Error while Paginating letters")
  }
}

exports.createLetter = async function(letter){
  //Creating a new mongoose object by using the new keyword
  var newLetter = new Letter({
    _id: string,
    years: [{
      year: number,
      letters: []
    }]
  })

  try {
    var savedLetter = await newLetter.save()
    //Saving the letter
    return savedLetter;
  }catch(e){
    //Return error message
    throw Error(e.message, "Error while creating letter")
  }
}

exports.updateLetter = async function(letter){
  var id = letter.id

  try {
    //Find the old letter object by the id
    var oldLetter = await Letter.findById(id);
  }catch(e){
    throw Error(e.message, "Error occured while finding the letter")
  }

  //If no old letter object exists return false
  if(!oldLetter){
    return false;
  }

  console.log(oldLetter)
  //Edit the letter object
  oldletter._id = letter._id
  oldLetter.years = letter.years


  console.log(oldLetter)

  try {
    var savedLetter = await oldLetter.save()
    return savedLetter;
  }catch(e){
    throw Error(e.message, "Error occured while updating the letter")
  }
}

exports.deleteLetter = async function(id){
  //Delete the letter
  try{
    var deleted = await Letter.remove({_id: id})
    if(deleted.result.n === 0){
      throw Error(e.message, "Letter could not be deleted")
    }
    return deleted
  }catch(e){
    throw Error(e.message, "Error occured while deleting the letter")
  }
}
