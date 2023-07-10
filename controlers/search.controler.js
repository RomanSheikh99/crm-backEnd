const Leads = require("../models/leads.model")

const searchLeads = async (req, res) => {
    const value = req.params.query;
    try {
        const searchResults = await Leads.find({
            trash: false,
            $or: [{
                    company: {
                        $regex: value,
                        $options: 'i'
                    }
                },
                {
                    website: {
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
                {
                    description: {
                        $regex: value,
                        $options: 'i'
                    }
                },
                {
                    contactParson: {
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


const searchFreshLeads = async (req, res) => {
    const value = req.params.query;
    try {
        const searchResults = await Leads.find({
            trash: false,
            followerID: null,
            assignToID: null,
            $or: [{
                    company: {
                        $regex: value,
                        $options: 'i'
                    }
                },
                {
                    website: {
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
                {
                    description: {
                        $regex: value,
                        $options: 'i'
                    }
                },
                {
                    contactParson: {
                        $regex: value,
                        $options: 'i'
                    }
                },
            ]
        });
        res.json(searchResults.reverse());
    } catch (error) {
        res.status(500).json({
            error: 'An error occurred while  the search.'
        });
    }
};


const searchTrashLeads = async (req, res) => {
    const value = req.params.query;
    try {
        const searchResults = await Leads.find({
            trash: true,
            $or: [{
                    company: {
                        $regex: value,
                        $options: 'i'
                    }
                },
                {
                    website: {
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
                {
                    description: {
                        $regex: value,
                        $options: 'i'
                    }
                },
                {
                    contactParson: {
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
    searchLeads,
    searchFreshLeads,
    searchTrashLeads,
}