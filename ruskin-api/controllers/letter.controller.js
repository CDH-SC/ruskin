//Accessing the Letter service
var LetterService = require('../services/letter.services')

//Saving the context of this module inside the _the variable
_this = this


//Async Controller fuction to get letter list
exports.getLetters = async function(req, res){

  try {
    var letters = await LetterService.getLetters({})

    //Return letters list with appropriate HTTP status code and message
    return res.status(200).json({status: 200, data: letters, message: "Successfully recieved letters"});

  } catch(e){
    //Return error response with code and error message
    return res.status(400).json({status: 400, message: e.message});
  }
}

//Async Controller fuction to get letter list by Id
exports.getLettersById = async function(req, res){

  //Require id
  var id = req.params.id;

  try {
    var letters = await LetterService.getLettersById(id)

    //Return letters list with appropriate HTTP status code and message
    return res.status(200).json({status: 200, data: letters, message: "Successfully recieved letters"});

  }catch(e){
    //Return error response with code and error message
    return res.status(400).json({status: 400, message: e.message});
  }
}

//Async controller function to create letter
exports.createLetter = async function(req, res){

  //Require body contains form values
  var letter = {
    _id: req.body._id,
    years: req.body.years,
  }
  try {
    //Calling service function with new object from request body
    var createdLetter = await LetterService.createLetter(letter)
    return res.status(201).json({status: 201, data: createdLetter, message: "Successfully created letter"})

  }catch(e){
    //Return error response with code and error message
    return res.status(400).json({status: 400, message: "Letter creation was unsuccessful"})
  }
}

//Async controller function to update letter
exports.updateLetter = async function(req, res){
  //Id required for the update
  if(!req.body._id){
    return res.status(400).json({status: 400., message: "Id must be present"})
  }

  var id = req.body._id;
  console.log(req.body)

  var letter = {
    id,
    _id: req.body._id ? req.body._id : null,
    years: req.body.years ? req.body.years : null,
  }

  try {
    var updatedLetter = await LetterService.updateLetter(letter)
    return res.status(200).json({status: 200, data: updatedLetter, message: "Successfully updated letter"})

  }catch(e){
    //Return error response with code and error message
    return res.status(400).json({status: 400., message: e.message})
  }
}

//Async controller function to remove letter
exports.removeLetter = async function(req, res){
  //Require id
  var id = req.params.id;

  try {
    var deleted = await LetterService.deleteLetter(id)
    return res.status(204).json({status:204, message: "Successfully deleted letter"})

  }catch(e){
    //Return error response with code and error message
    return res.status(400).json({status: 400, message: e.message})
  }
}
