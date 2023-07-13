const Leads = require("../models/leads.model")

const filterLeads = async (req, res) => {
  const {
    country,
    minor,
    status,
    category,
    possibility,
  } = req.query;
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
    const leads = await Leads.find(filter);
    res.status(200).json(leads.reverse());
  } catch (error) {
    res.status(500).send(error.message);
  }
};



module.exports = {
  filterLeads
}