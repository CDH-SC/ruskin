var express = require('express')

var router = express.Router()
//require route variables here
var diaries = require('./api/diary.route')
var letters = require('./api/letter.route')
var entries = require('./api/entry.route')
var searchResults = require('./api/search.route')

//add route modules here
router.use('/diaries', diaries);
router.use('/letters', letters);
router.use('/entries', entries);
router.use('/search', searchResults);


module.exports = router;
