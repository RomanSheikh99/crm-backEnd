const {
    v4: uuidv4
} = require('uuid')
const User = require("../models/user.model")

const getAllUser = (req, res) => {
    res.send('all user')
}

const getOneUser = (req, res) => {
    res.send(' one user')
}

const deleteUser = (req, res) => {
    res.send('all user')
}

const updateUser = (req, res) => {
    res.send('all user')
}

const createUser = async (req, res) => {
    try {
        const newUser = new User({
            id: uuidv4(),
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
            password: req.body.password,
        })
        await newUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createUser
};