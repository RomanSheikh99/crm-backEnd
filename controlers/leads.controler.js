const {
  v4: uuidv4
} = require('uuid')
const bcrypt = require('bcrypt');
const xlsx = require('xlsx');


const Leads = require("../models/leads.model")


const importLeads = async (req, res) => {
  try {
    let leads = [];

    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const lastLeads = await Leads.find();
    let SL = lastLeads.length;

    data.map(d => {
      d.id = uuidv4();
      d.leadsNo = Number(SL + 1)
      leads.push(d)
      SL = SL + 1;
    })

    Leads.insertMany(leads)
    res.status(200).json(" DATA IMPORTED");
  } catch (error) {
    res.status(501).json({
      message: 'An error occurred'
    });
  }
}


const createNewLead = async (req, res) => {
  try {
    const leads = await Leads.find();
    const data = req.body;
    data.id = uuidv4();
    data.leadsNo = leads.length + 1;
    const newLead = new Leads(data)
    console.log(newLead)
    await newLead.save();
    res.status(200).json(newLead);
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred'
    });
  }
}


const getAllLeads = async (req, res) => {
  try {
    const leads = await Leads.find({trash: false});
    res.status(200).json(leads.reverse());
  } catch (error) {
    res.status(500).send(error.message);
  }
};


const getTrashLeads = async (req, res) => {
  try {
    const leads = await Leads.find({trash: true});
    res.status(200).json(leads.reverse());
  } catch (error) {
    res.status(500).send(error.message);
  }
};


const getFreshLeads = async (req, res) => {
  try {
    const leads = await Leads.find({trash: false , followerID: null});
    res.status(200).json(leads.reverse());
  } catch (error) {
    res.status(500).send(error.message);
  }
};


const getFolloUpLeads = async (req, res) => {
  try {
    const leads = await Leads.find({trash: false , followerID: req.params.id});
    res.status(200).json(leads.reverse());
  } catch (error) {
    res.status(500).send(error.message);
  }
};


const getAssignToLeads = async (req, res) => {
  try {
    const leads = await Leads.find({trash: false , assignToID: req.params.id});
    res.status(200).json(leads.reverse());
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getOneLead = async (req, res) => {
  try {
    const lead = await Leads.findOne({
      id: req.params.id
    });
    res.status(200).json(lead);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

const updateLead = async (req, res) => {
  try {
    const lead = await Leads.findOne({
      id: req.params.id
    });
    lead.email = req.body.email;
    lead.phone = req.body.phone;
    lead.designation = req.body.designation;
    lead.contactParson = req.body.contactParson;
    lead.category = req.body.category;
    lead.country = req.body.country;
    lead.website = req.body.website;
    lead.company = req.body.company;
    await lead.save();
    res.status(200).json(lead);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteLead = async (req, res) => {
  try {
    await Leads.deleteOne({
      id: req.params.id
    });
    res.status(200).json({
      message: "Lead Deleted"
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};


const addToTrashLead = async (req, res) => {
  try {
    const lead = await Leads.findOne({
      id: req.params.id
    });
    lead.trash = true;
    await lead.save();
    res.status(200).json(lead);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


const searchLeads = async (req, res) => {
  const value = req.params.query;
  try {
    const searchResults = await Leads.find({trash: false, $or: [
      { leadsNo: { $regex: value, $options: 'i' } },
      { email: { $regex: value, $options: 'i' } },
      { phone: { $regex: value, $options: 'i' } },
      { company: { $regex: value, $options: 'i' } },
      { website: { $regex: value, $options: 'i' } },
      { category: { $regex: value, $options: 'i' } },
      { country: { $regex: value, $options: 'i' } },
      { contactParson: { $regex: value, $options: 'i' } },
      { description: { $regex: value, $options: 'i' } },
      { minor: { $regex: value, $options: 'i' } },
      { followerName: { $regex: value, $options: 'i' } },
      { assignToName: { $regex: value, $options: 'i' } },
      { status: { $regex: value, $options: 'i' } },
      { possibility: { $regex: value, $options: 'i' } },
    ]});
    res.json(searchResults.reverse());
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while performing the search.' });
  }
};


const searchFreshLeads = async (req, res) => {
  const value = req.params.query;
  try {
    const searchResults = await Leads.find({trash: false,followerID: null, $or: [
      { leadsNo: { $regex: value, $options: 'i' } },
      { email: { $regex: value, $options: 'i' } },
      { phone: { $regex: value, $options: 'i' } },
      { company: { $regex: value, $options: 'i' } },
      { website: { $regex: value, $options: 'i' } },
      { category: { $regex: value, $options: 'i' } },
      { country: { $regex: value, $options: 'i' } },
      { contactParson: { $regex: value, $options: 'i' } },
      { description: { $regex: value, $options: 'i' } },
      { minor: { $regex: value, $options: 'i' } },
      { followerName: { $regex: value, $options: 'i' } },
      { assignToName: { $regex: value, $options: 'i' } },
      { status: { $regex: value, $options: 'i' } },
      { possibility: { $regex: value, $options: 'i' } },
    ]});
    res.json(searchResults.reverse());
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while performing the search.' });
  }
};


module.exports = {
  createNewLead,
  importLeads,
  getAllLeads,
  getOneLead,
  updateLead,
  deleteLead,
  addToTrashLead,
  getFreshLeads,
  getFolloUpLeads,
  getAssignToLeads,
  getTrashLeads,
  searchLeads,
  searchFreshLeads
};