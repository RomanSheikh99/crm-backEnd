const {
  v4: uuidv4
} = require('uuid')
const multer = require('multer');
const Posts = require("../models/post.model")

const upload = multer({ public: 'uploads/' });


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
    const lastLead = await Leads.findOne().sort({ _id: -1 });
    let SL = lastLead ? Number(lastLead.leadsNo) : 0;
    const data = req.body;
    data.id = uuidv4();
    data.leadsNo = SL + 1;
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
  const pageSize = parseInt(req.query.pageModel?.pageSize); 
  const page = parseInt(req.query.pageModel?.page); 
  try {
    const totalCount = await Leads.countDocuments({trash: false});
    const skipCount = page  * pageSize;
    let leads = await Leads.find({trash: false}).sort( { _id: -1 } ).skip(skipCount).limit(pageSize);
    if(leads.length < 1){
      leads = await Leads.find({trash: false}).sort( { _id: -1 } ).skip(0).limit(pageSize);
      res.status(200).json({ data: leads, totalCount: totalCount});
    }else{
      res.status(200).json({ data: leads, totalCount: totalCount});
    }
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
    lead.description = req.body.description;
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


module.exports = {
 
};