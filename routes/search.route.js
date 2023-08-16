const express = require('express');
const { searchLeads, searchFreshLeads, searchTrashLeads, searchFolloUpLeads, searchAssignToLeads, searchFavLeads } = require('../controlers/search.controler');
const search = express();


search.get('/allLeads/:query', searchLeads)
search.get('/freshLeads/:query', searchFreshLeads)
search.get('/trashLeads/:query', searchTrashLeads)
search.get('/followUp/:id/:query', searchFolloUpLeads)
search.get('/assignLeads/:id/:query', searchAssignToLeads)
search.get('/favLeads/:id/:query', searchFavLeads)



module.exports = search;