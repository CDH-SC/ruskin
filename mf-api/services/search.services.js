//Get mongoose model
var Diary = require('../models/diary.model')

_this = this

exports.searchDiaries = async function(search){
  try {
    // Search for whole words
    var searchTerm = new RegExp(
        search.split(" ").map(function(word) {
            return "\\b" + word + "\\b"
        }).join("|")
    );

    // Search parameters
    var pipeline = [
      {
        // Use Mongo Full Text Search to find diaries containing search terms
        $match: {
          $text: { $search: search }
        }
      },
      {
        // Break diary page array into seperate documents for searching
        $unwind: "$page"
      },
      {
        // Search content of each diary page for the search terms
        $match: {
          "page.content": {$regex: searchTerm, $options: "i"}
        }
      },
      {
        // Set which fields to return from search
        $project: {
          "_id": 1,
          "notebook_url": 1,
          "page.folio_num": 1,
          "page.content": 1,
          "page.image": 1,
          "page.number": 1,
        }
      }
    ];
    var searchResults = await Diary.aggregate(pipeline)
    return searchResults;
  }catch(e){
    throw Error(e.message, "Error while searching")
  }
}
