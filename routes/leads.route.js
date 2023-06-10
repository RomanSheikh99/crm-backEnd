const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

const leads = express();

const {
    createNewLead, importLeads, getAllLeads, getOneLead, updateLead, addToTrashLead, deleteLead
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
leads.get('/', getAllLeads)
leads.get('/:id', getOneLead)
leads.patch('/:id', updateLead)
leads.patch('/:id', addToTrashLead)
leads.delete('/:id', deleteLead)

module.exports = leads;