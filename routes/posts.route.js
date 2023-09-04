const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

const posts = express();



const {
  
} = require('../controlers/posts.controler');
const posts = require('../models/posts.model');



posts.use(bodyParser.urlencoded({
    extended: true
}))

posts.use(express.static(path.resolve(__dirname, "public")));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/blogImages')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: storage
});



posts.post('/import', upload.single('file'), importposts);
posts.post('/', createNewLead)
posts.get('/checkValue', checkValue)

posts.get('/', allposts)
posts.get('/allposts', getAllposts)
posts.get('/freshposts', getFreshposts)
posts.get('/trashposts', getTrashposts)
posts.get('/followUp/:id', getFolloUpposts)
posts.get('/assignposts/:id', getAssignToposts)
posts.get('/favposts/:id', getFavposts)

posts.get('/:id', getOneLead)
posts.get('/getOneLeadBypostsNo/:id', getOneLeadBypostsNo)
posts.patch('/:id', updateLead)
posts.delete('/:id', deleteLead)
posts.delete('/delete/allposts', deleteAll)
posts.patch('/addToTrash/:id', addToTrashLead)
posts.patch('/assignTo/:id', assignTo)
posts.patch('/setStatus/:id', setStatus)
posts.patch('/setPosibility/:id', setPosibility)
posts.patch('/setNextFollowUp/:id', setNextFollowUp)
posts.patch('/setFollower/:id', setFollower)
posts.patch('/setFavOf/:id', setFavOf)
posts.patch('/addRemarks/:id', addRemarks)
posts.patch('/deleteRemark/:id', deleteRemark)


module.exports = posts;