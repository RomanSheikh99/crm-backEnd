const {
  v4: uuidv4
} = require('uuid')
const xlsx = require('xlsx');

const Leads = require("../models/leads.model")


const importLeads = async (req, res) => {
  try {
    let leads = [];

    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const importedLeads = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const lastLeads = await Leads.findOne().sort({ _id: -1 });
    let SL = Number(lastLeads.leadsNo + 1);

    importedLeads.map(lead => {
      lead.id = uuidv4();
      lead.leadsNo = Number(SL + 1)
      leads.push(lead)
      SL = SL + 1;
    })

    Leads.insertMany(leads)
    res.status(200).json(leads);
  } catch (error) {
    res.status(501).json({
      message: 'An error occurred'
    });
  }
}


const createNewLead = async (req, res) => {
  try {
    const lastLeads = await Leads.findOne().sort({ _id: -1 });
    const data = req.body;
    data.id = uuidv4();
    data.leadsNo = Number(lastLeads.leadsNo + 1);
    const newLead = new Leads(data)
    await newLead.save();
    res.status(200).json(newLead);
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred'
    });
  }
}


const allLeads = async (req, res) => {
  try {
    const leads = await Leads.find();
    res.status(200).json(leads.reverse());
  } catch (error) {
    res.status(500).send(error.message);
  }
};

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
    const leads = await Leads.find({trash: false , followerID: null, assignToID: null});
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

const getFavLeads = async (req, res) => {
  try {
    const leads = await Leads.find({trash: false , favOf: req.params.id});
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

const assignTo = async (req, res) => {
  try {
    const lead = await Leads.findOne({
      id: req.params.id
    });
    lead.assignToName = req.body.name;
    lead.assignToID = req.body.id;
    await lead.save();
    res.status(200).json(lead);
  } catch (error) {
    res.status(500).send(error.message);
  }
};





module.exports = {
  allLeads,
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
  getFavLeads,
  assignTo,
};