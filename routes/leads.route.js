const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

const leads = express();

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
    searchLeads,
    searchFreshLeads
} = require('../controlers/leads.controler');



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

leads.post('/import', upload.single('file'), importLeads);

leads.post('/', createNewLead)

leads.get('/allLeads', getAllLeads)
leads.get('/freshLeads', getFreshLeads)
leads.get('/trashLeads', getTrashLeads)
leads.get('/followUp/:id', getFolloUpLeads)
leads.get('/assignLeads/:id', getAssignToLeads)

leads.get('/:id', getOneLead)
leads.patch('/:id', updateLead)
leads.patch('/addToTrash/:id', addToTrashLead)
leads.delete('/:id', deleteLead)

leads.get('/allLeads/:query', searchLeads)
leads.get('/freshLeads/:query', searchFreshLeads)

module.exports = leads;