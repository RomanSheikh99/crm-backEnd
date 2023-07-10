const {
    v4: uuidv4
} = require('uuid')
const bcrypt = require('bcrypt');

const User = require("../models/user.model")


const login = async (req,res)=> {
  try {
    const user = await User.findOne({ email: req.body.email});
    if (!user) {
      return res.status(401).json({ message: 'Invalid email' });
    }
    const passwordMatch = await bcrypt.compare(req.body.pass, user.pass);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
}

const getAllUsers = async (req, res) => {
    try {
      const users = await User.find({role: { $ne: "ADMIN" }});
      res.status(200).json(users.reverse());
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

const getOneUser = async (req, res) => {
    try {
        const user = await User.findOne({ id: req.params.id });
        res.status(200).json(user);
      } catch (error) {
        res.status(500).send(error.message);
      }
}

const createUser = async (req, res) => {
    try {
        const newUser = new User({
            id: uuidv4(),
            name: req.body.name,
            email: req.body.email,
            phone: req.body?.phone ? req.body?.phone : '',
            role: req.body?.role ? req.body?.role : 'Marketer',
            showPass: req.body.pass,
            pass: await bcrypt.hash(req.body.pass, 10)
        })
        await newUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        console.log(error)
    }
}

const updateUser = async (req, res) => {
    try {
      const user = await User.findOne({ id: req.params.id });
      user.name = req.body.name;
      user.email = req.body.email;
      user.phone = req.body.phone;
      await user.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
  const deleteUser = async (req, res) => {
    try {
      await User.deleteOne({ id: req.params.id });
      res.status(200).json({ message: "user is deleted" });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
  const searchUsers = async (req, res) => {
    const value = req.params.query;
    try {
      const searchResults = await User.find({role: { $ne: "ADMIN" }, $or: [
        { name: { $regex: value, $options: 'i' } },
        { email: { $regex: value, $options: 'i' } },
        { phone: { $regex: value, $options: 'i' } },
      ]});
  
      res.json(searchResults.reverse());
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while performing the search.' });
    }
  };

  const newUsers = async (req,res) => {
    console.log("first")
  }


module.exports = {
    createUser, getAllUsers, getOneUser, updateUser, deleteUser , login , searchUsers,newUsers
};