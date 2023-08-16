const Leads = require("../models/leads.model")

const filterLeads = async (req, res) => {
  const pageSize = parseInt(req.query.pageModel?.pageSize); 
  const page = parseInt(req.query.pageModel?.page); 
  const {
    country,
    minor,
    status,
    category,
    possibility,
  } = req.query.params;
  let filter = {};
  filter.trash = false;

  if (country) {
    filter.country = country;
  }

  if (minor) {
    filter.minor = { $regex: minor , $options: 'i'};
  }
  if (status) {
    filter.status = status;
  }
  if (category) {
    filter.category = category;
  }
  if (possibility) {
    filter.possibility = possibility;
  }
  try {
    const totalCount = await Leads.countDocuments(filter);
    const skipCount = page  * pageSize;
    const leads = await Leads.find(filter).skip(skipCount).limit(pageSize);
    res.status(200).json({ data: leads, totalCount: totalCount});
  } catch (error) {
    res.status(500).send(error.message);
  }
};



module.exports = {
  filterLeads
}