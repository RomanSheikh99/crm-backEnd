const exp = require('express');
const {
    createUser,
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser,
    login,
    searchUsers,
    addRecords
} = require('../controlers/users.controler');
const router = exp.Router();

router.patch('/addRecords', addRecords)

router.post('/', createUser)
router.get('/', getAllUsers)
router.get('/:id', getOneUser)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)
router.post('/login', login)
router.get('/search/:query', searchUsers)




module.exports = router;