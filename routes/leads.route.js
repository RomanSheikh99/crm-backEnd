const exp = require('express');
const { createNewLead } = require('../controlers/leads.controler');
const router = exp.Router();

router.post('/', createNewLead)
// router.get('/', getAllUsers)
// router.get('/:id', getOneUser)
// router.patch('/:id', updateUser)
// router.delete('/:id', deleteUser)
// router.post('/login', login)

module.exports = router;