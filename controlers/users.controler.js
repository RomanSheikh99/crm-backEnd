const {
  v4: uuidv4
} = require('uuid')
const bcrypt = require('bcrypt');

const User = require("../models/user.model");
const Leads = require("../models/leads.model");
const moment = require('moment/moment');


const login = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email
    });
    if (!user) {
      return res.status(401).json({
        message: 'Invalid email'
      });
    }
    const passwordMatch = await bcrypt.compare(req.body.pass, user.pass);
    if (!passwordMatch) {
      return res.status(401).json({
        message: 'Invalid password'
      });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred'
    });
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      role: {
        $ne: "ADMIN"
      }
    });
    res.status(200).json(users.reverse());
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getOneUser = async (req, res) => {
  try {
    const user = await User.findOne({
      id: req.params.id
    });
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
    res.status(501).json(error);
  }
}

const updateUser = async (req, res) => {
  try {
    const user = await User.findOne({
      id: req.params.id
    });
    user.name = req.body.name;
    user.email = req.body.email;
    user.phone = req.body.phone;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


const setTarget = async (req, res) => {
  try {
    const user = await User.findOne({
      id: req.params.id
    });
    user.quarterlyTarget = req.body.quarterlyTarget;
    user.monthlyTarget = req.body.monthlyTarget;
    user.dailyCallTarget = req.body.dailyCallTarget;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const followLeads = await Leads.find({
      followerID: req.params.id
    })
    if (followLeads) {
      followLeads.map(lead => {
        lead.followerName = null;
        lead.followerID = null;
        lead.save();
      })
    }
    await User.deleteOne({
      id: req.params.id
    });
    res.status(200).json({
      message: "user is deleted"
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const calculateYearQuarter = (dateString) => {
  const date = moment(dateString);
  const quarter = date.quarter();
  const year = date.year();

  return `${year}_Q${quarter} `;
};



const addRecords = async (req, res) => {
  const {
    status,
    possibility,
    followerId
  } = req.body;
  const quarterTitle = calculateYearQuarter(moment().startOf('day'));
  const monthTitle = moment().format('MMM YYYY');
  const dailyTitle = moment().format("DD MMM YYYY");
  try {
    const user = await User.findOne({
      id: followerId
    });
    const quarter = user.quarter.find((q) => q.title == quarterTitle)
    if (quarter?.title) {
      quarter.target = user.quarterlyTarget
      quarter.bit.push({
        status: status,
        possibility: possibility,
      })
    } else if (!quarter) {
      user.quarter.push({
        title: quarterTitle,
        target: user.quarterlyTarget,
        bit: [{
          status: status,
          possibility: possibility,
        }]
      })
    }
    const month = user.month.find((m) => m.title == monthTitle)
    if (month?.title) {
      month.target = user.monthlyTarget
      month.bit.push({
        status: status,
        possibility: possibility,
      })
    } else if (!month) {
      user.month.push({
        title: monthTitle,
        target: user.monthlyTarget,
        bit: [{
          status: status,
          possibility: possibility,
        }]
      })
    }
    const daily = user.daily.find((day) => day.title == dailyTitle)
    if (daily?.title) {
      daily.callTarget = user.dailyCallTarget
      daily.bit.push({
        status: status,
        possibility: possibility,
      })
    } else if (!daily) {
      user.daily.push({
        title: dailyTitle,
        target: user.dailyCallTarget,
        bit: [{
          status: status,
          possibility: possibility,
        }]
      })
    }

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      error: 'An error occurred while performing the search.'
    });
  }
};

const addLoginUpdate = async (req, res) => {
  console.log(req.body.localTime);
  const id = req.params.id;
  const date = new Date(req.body.localTime);
  console.log("localtime : ", moment(req.body.localTime).format('hh:mm A'))
  const dailyTitle = moment(date).format("DD MMM YYYY");
  try {
    const user = await User.findOne({
      id: id
    });

    if (user.daily.length) {

      for(let i = 0; i < user.daily.length -1; i++){
        if(user.daily[i].title == user.daily[i+1].title){
          const newDays = user.daily.filter(day=> day._id != user.daily[i+1]._id)
          user.daily = newDays;
          user.save()
        }
      }
    }

    const daily = user.daily.find((day) => day.title == dailyTitle)
    if (daily?.title) {
      daily.lastUpdate = moment(date).format('hh:mm A');
    } else if (!daily) {
      user.daily.push({
        title: dailyTitle,
        target: user.dailyCallTarget,
        firstLogin: moment(date).format('hh:mm A'),
        lastUpdate: moment(date).format('hh:mm A'),
      })
    }

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'An error occurred'
    });
  }
};


const searchUsers = async (req, res) => {
  const value = req.params.query;
  try {
    const searchResults = await User.find({
      role: {
        $ne: "ADMIN"
      },
      $or: [{
          name: {
            $regex: value,
            $options: 'i'
          }
        },
        {
          email: {
            $regex: value,
            $options: 'i'
          }
        },
        {
          phone: {
            $regex: value,
            $options: 'i'
          }
        },
      ]
    });

    res.json(searchResults.reverse());
  } catch (error) {
    res.status(500).json({
      error: 'An error occurred while performing the search.'
    });
  }
};







module.exports = {
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
};