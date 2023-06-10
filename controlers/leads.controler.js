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
    res.status(500).json({
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
    const leads = await Leads.find();
    res.status(200).json(leads);
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
    lead = req.body;
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


module.exports = {
  createNewLead,
  importLeads,
  getAllLeads,
  getOneLead,
  updateLead,
  deleteLead,
  addToTrashLead,
};