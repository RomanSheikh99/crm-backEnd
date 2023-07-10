const express = require('express');
const { searchLeads, searchFreshLeads, searchTrashLeads } = require('../controlers/search.controler');
const search = express();


search.get('/allLeads/:query', searchLeads)
search.get('/freshLeads/:query', searchFreshLeads)
search.get('/trashLeads/:query', searchTrashLeads)



module.exports = search;