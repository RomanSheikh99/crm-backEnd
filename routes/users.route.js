const exp = require('express');
const {
    createUser,
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser,
    login,
    searchUsers,
    addRecords,
    addLoginUpdate,
    setTarget
} = require('../controlers/users.controler');
const router = exp.Router();

router.patch('/addRecords', addRecords)
router.patch('/addLoginUpdate/:id', addLoginUpdate)

router.post('/', createUser)
router.get('/', getAllUsers)
router.get('/:id', getOneUser)
router.patch('/:id', updateUser)
router.patch('/setTarget/:id', setTarget)
router.delete('/:id', deleteUser)
router.post('/login', login)
router.get('/search/:query', searchUsers)




module.exports = router;