const exp = require('express');
const { createUser } = require('../controlers/users.controler');
// const getAllUser = require('../controlers/users.controler');
const router = exp.Router();

// router.get('/',getAllUser)
router.post('/',createUser)

module.exports = router;