const mongoose = require('mongoose');
const dev = require('./config');

const dbUrl = dev.db.url;

mongoose.connect(dbUrl)
.then(()=>{console.log('mongoDb is conected')})
.catch(err=>{
    console.log(err)
    process.exit(1)
})