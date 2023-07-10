const express = require('express');
const { filterLeads } = require('../controlers/filter.controler');
const filter = express();


filter.get('/filterAllLeads', filterLeads)



module.exports = filter;