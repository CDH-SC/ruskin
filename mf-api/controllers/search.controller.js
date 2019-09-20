var SearchService = require('../services/search.services')

_this = this

exports.searchDiaries = async function(req, res){

  var search = req.params.search;
  try {
    var searchResults = await SearchService.searchDiaries(search)

    // Return searchResults with relevent status code
    return res.status(200).json({status: 200, data: searchResults, message: "Successfully searched diaries"});

  }catch(e){
    // Return error status code with error message
    return res.status(400).json({status: 400, message: e.message});
  }
}
