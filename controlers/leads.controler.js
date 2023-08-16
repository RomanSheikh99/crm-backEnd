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

    const lastLead = await Leads.findOne().sort({ _id: -1 });
    let SL = lastLead ? Number(lastLead.leadsNo) : 0;
    

    importedLeads.map(lead => {
      lead.id = uuidv4();
      lead.leadsNo = SL + 1;
      lead.category = "VFX/3D/2D/CGI";
      leads.push(lead)
      SL = SL + 1;
    })

    Leads.insertMany(leads)
    res.status(200).json(leads);
  } catch (error) {
    res.status(501).json({
      message: 'An error occurred while importing lead'
    });
  }
}


const deleteAll = async (req, res) => {
  try {
    await Leads.deleteMany({});
    res.status(200).json({
      message: "All Leads Deleted"
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};



const createNewLead = async (req, res) => {
  try {
    const count = await Leads.countDocuments();
    const data = req.body;
    data.id = uuidv4();
    data.leadsNo = count + 1;
    const newLead = new Leads(data)
    await newLead.save({
      ordered: true,
      position: 0
    });
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
  const pageSize = parseInt(req.query.pageModel?.pageSize); 
  const page = parseInt(req.query.pageModel?.page); 
  try {
    const totalCount = await Leads.countDocuments({trash: false});
    const skipCount = page  * pageSize;
    const leads = await Leads.find({trash: false}).sort( { _id: -1 } ).skip(skipCount).limit(pageSize);
    res.status(200).json({ data: leads, totalCount: totalCount});
  } catch (error) {
    res.status(500).send(error.message);
  }
};


const getTrashLeads = async (req, res) => {
  const pageSize = parseInt(req.query.pageModel?.pageSize); 
  const page = parseInt(req.query.pageModel?.page); 
  try {
     const totalCount = await Leads.countDocuments({trash: true});
    const skipCount = page  * pageSize;
    const leads = await Leads.find({trash: true}).sort( { _id: -1 } ).skip(skipCount).limit(pageSize);
    res.status(200).json({ data: leads, totalCount: totalCount});
  } catch (error) {
    res.status(500).send(error.message);
  }
};


const getFreshLeads = async (req, res) => {
  const pageSize = parseInt(req.query.pageModel?.pageSize); 
  const page = parseInt(req.query.pageModel?.page); 
  try {
     const totalCount = await Leads.countDocuments({trash: false , followerID: null, assignToID: null});
    const skipCount = page  * pageSize;
    const leads = await Leads.find({trash: false , followerID: null, assignToID: null}).sort( { _id: -1 } ).skip(skipCount).limit(pageSize);
    res.status(200).json({ data: leads, totalCount: totalCount});
  } catch (error) {
    res.status(500).send(error.message);
  }
};


const getFolloUpLeads = async (req, res) => {
  const pageSize = parseInt(req.query.pageModel?.pageSize); 
  const page = parseInt(req.query.pageModel?.page); 
  try {
     const totalCount = await Leads.countDocuments({trash: false , followerID: req.params.id});
    const skipCount = page  * pageSize;
    const leads = await Leads.find({trash: false , followerID: req.params.id}).sort( { _id: -1 } ).skip(skipCount).limit(pageSize);
    res.status(200).json({ data: leads, totalCount: totalCount});
  } catch (error) {
    res.status(500).send(error.message);
  }
};


const getAssignToLeads = async (req, res) => {
  const pageSize = parseInt(req.query.pageModel?.pageSize); 
  const page = parseInt(req.query.pageModel?.page); 
  try {
     const totalCount = await Leads.countDocuments({trash: false , assignToID: req.params.id});
    const skipCount = page  * pageSize;
    const leads = await Leads.find({trash: false , assignToID: req.params.id}).sort( { _id: -1 } ).skip(skipCount).limit(pageSize);
    res.status(200).json({ data: leads, totalCount: totalCount});
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getFavLeads = async (req, res) => {
  const pageSize = parseInt(req.query.pageModel?.pageSize); 
  const page = parseInt(req.query.pageModel?.page); 
  try {
    const totalCount = await Leads.countDocuments({trash: false , favOf: req.params.id});
    const skipCount = page  * pageSize;
    const leads = await Leads.find({trash: false , favOf: req.params.id}).sort( { _id: -1 } ).skip(skipCount).limit(pageSize);
    res.status(200).json({ data: leads, totalCount: totalCount});
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getOneLeadByLeadsNo = async (req, res) => {
  try {
    const lead = await Leads.findOne({
      leadsNo: req.params.id
    });
    res.status(200).json(lead);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
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
    lead.followerID = null;
    lead.followerName = null;
    lead.assignToName = req.body.name;
    lead.assignToID = req.body.id;
    await lead.save();
    res.status(200).json(lead);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const setStatus = async (req, res) => {
  try {
    const lead = await Leads.findOne({
      id: req.params.id
    });
    lead.status = req.body.status;
    await lead.save();
    res.status(200).json(lead);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const setPosibility = async (req, res) => {
  try {
    const lead = await Leads.findOne({
      id: req.params.id
    });
    lead.possibility = req.body.possibility;
    await lead.save();
    res.status(200).json(lead);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const setNextFollowUp = async (req, res) => {
  try {
    const lead = await Leads.findOne({
      id: req.params.id
    });
    lead.nextFollowUP = req.body.nfup;
    await lead.save();
    res.status(200).json(lead);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const setFollower = async (req, res) => {
  try {
    const lead = await Leads.findOne({
      id: req.params.id
    });
    lead.followerID = req.body.id;
    lead.followerName = req.body.name;
    await lead.save();
    res.status(200).json(lead);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const setFavOf = async (req, res) => {
  try {
    const lead = await Leads.findOne({
      id: req.params.id
    });
    lead.favOf = req.body.id;
    await lead.save();
    res.status(200).json(lead);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


const addRemarks = async (req, res) => {
  try {
    const lead = await Leads.findOne({
      id: req.params.id
    });
    const remark = req.body;
    remark.id = uuidv4();
    remark.date = Date.now();
    lead.remarks.unshift(remark)
    lead.updated = Date.now();
    await lead.save();
    res.status(200).json(lead);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteRemark = async (req, res) => {
  try {
    const lead = await Leads.findOne({
      id: req.params.id
    });
    const newRemarks = lead.remarks.filter(remark=> remark.id != req.body.id);
    lead.remarks = newRemarks;
    await lead.save();
    res.status(200).json(lead);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


const checkValue = async (req, res) => {

  const {path,value} = req.query;
  const filter = {}

  if(path == 'company'){
    filter.company = value;
  }
  if(path == 'website'){
    filter.website = value;
  }
  if(path == 'phone'){
    filter.phone = value;
  }
  if(path == 'email'){
    filter.email = value;
  }

  try {
    const lead = await Leads.findOne(filter);
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
  setStatus,
  setPosibility,
  setNextFollowUp,
  setFollower,
  setFavOf,
  addRemarks,
  checkValue,
  deleteRemark,
  deleteAll,
  getOneLeadByLeadsNo
};