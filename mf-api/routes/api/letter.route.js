var express = require('express')

var router = express.Router()

// Getting the letter controller
var letterController = require('../../controllers/letter.controller')

//Map each API to the controller functions
router.get('/', letterController.getDiaries)
router.get('/:id', letterController.getDiariesById)
router.post('/', letterController.createLetter)
router.put('/', letterController.updateLetter)
router.delete('/:id', letterController.removeLetter)

//Export the Router
module.exports = router
