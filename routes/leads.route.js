const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

const leads = express();

const searchRouter = require('./search.route');
const filterRouter = require('./filter.route');


const {
    createNewLead,
    importLeads,
    getAllLeads,
    getOneLead,
    updateLead,
    addToTrashLead,
    deleteLead,
    getFreshLeads,
    getFolloUpLeads,
    getAssignToLeads,
    getTrashLeads,
    getFavLeads,
    assignTo,
    allLeads,
} = require('../controlers/leads.controler');
const Leads = require('../models/leads.model');



leads.use(bodyParser.urlencoded({
    extended: true
}))

leads.use(express.static(path.resolve(__dirname, "public")));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: storage
});


leads.use(searchRouter);
leads.use(filterRouter);

leads.post('/import', upload.single('file'), importLeads);
leads.post('/', createNewLead)

leads.get('/', allLeads)
leads.get('/allLeads', getAllLeads)
leads.get('/freshLeads', getFreshLeads)
leads.get('/trashLeads', getTrashLeads)
leads.get('/followUp/:id', getFolloUpLeads)
leads.get('/assignLeads/:id', getAssignToLeads)
leads.get('/favLeads/:id', getFavLeads)

leads.get('/:id', getOneLead)
leads.patch('/:id', updateLead)
leads.delete('/:id', deleteLead)
leads.patch('/addToTrash/:id', addToTrashLead)
leads.patch('/assignTo/:id', assignTo)



module.exports = leads;