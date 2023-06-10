const {
    v4: uuidv4
} = require('uuid')
const bcrypt = require('bcrypt');

const Leads = require("../models/leads.model")


const createNewLead = async (req, res) => {
    try {
        const data = req.body;
        data.id = uuidv4();
        const newLead = new Leads(data)
        await newLead.save();
        res.status(200).json(newLead);
    } catch (error) {
        console.log(error)
    }
}







const login = async (req,res)=> {
  try {
    // Check if user exists
    const user = await User.findOne({ email: req.body.email});
    if (!user) {
      return res.status(401).json({ message: 'Invalid email' });
    }
    // Check password
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
      const users = await User.find();
      res.status(200).json(users);
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



const updateUser = async (req, res) => {
    try {
      const user = await User.findOne({ id: req.params.id });
      user.name = req.body.name;
      user.age = Number(req.body.age);
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
  

module.exports = {
    createNewLead
};