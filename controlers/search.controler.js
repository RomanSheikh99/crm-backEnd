const Leads = require("../models/leads.model")

const searchLeads = async (req, res) => {
    const pageSize = parseInt(req.query.pageModel?.pageSize); 
    const page = parseInt(req.query.pageModel?.page); 
    const value = req.params.query;
    try {
        const totalCount = await Leads.countDocuments({
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
        const skipCount = page  * pageSize;
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
        }).skip(skipCount).limit(pageSize);
        res.status(200).json({ data: searchResults, totalCount: totalCount});
    } catch (error) {
        res.status(500).json({
            error: 'An error occurred while performing the search.'
        });
    }
};



const searchFavLeads = async (req, res) => {
    const pageSize = parseInt(req.query.pageModel?.pageSize); 
    const page = parseInt(req.query.pageModel?.page); 
    const value = req.params.query;
    try {
        const totalCount = await Leads.countDocuments({
            trash: false,
            favOf: req.params.id,
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
        const skipCount = page  * pageSize;
        const searchResults = await Leads.find({
            trash: false,
            favOf: req.params.id,
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
        }).skip(skipCount).limit(pageSize);
        res.status(200).json({ data: searchResults, totalCount: totalCount});
    } catch (error) {
        res.status(500).json({
            error: 'An error occurred while performing the search.'
        });
    }
};
const searchAssignToLeads = async (req, res) => {
    const pageSize = parseInt(req.query.pageModel?.pageSize); 
    const page = parseInt(req.query.pageModel?.page); 
    const value = req.params.query;
    try {
        const totalCount = await Leads.countDocuments({
            trash: false,
            assignToID: req.params.id,
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
        const skipCount = page  * pageSize;
        const searchResults = await Leads.find({
            trash: false,
            assignToID: req.params.id,
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
        }).skip(skipCount).limit(pageSize);
        res.status(200).json({ data: searchResults, totalCount: totalCount});
    } catch (error) {
        res.status(500).json({
            error: 'An error occurred while performing the search.'
        });
    }
};

const searchFolloUpLeads  = async (req, res) => {
    const pageSize = parseInt(req.query.pageModel?.pageSize); 
    const page = parseInt(req.query.pageModel?.page); 
    const value = req.params.query;
    try {
        const totalCount = await Leads.countDocuments({
            trash: false,
            followerID: req.params.id,
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
        const skipCount = page  * pageSize;
        const searchResults = await Leads.find({
            trash: false,
            followerID: req.params.id,
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
        }).skip(skipCount).limit(pageSize);
        res.status(200).json({ data: searchResults, totalCount: totalCount});
    } catch (error) {
        res.status(500).json({
            error: 'An error occurred while performing the search.'
        });
    }
};



const searchFreshLeads = async (req, res) => {
    const pageSize = parseInt(req.query.pageModel?.pageSize); 
    const page = parseInt(req.query.pageModel?.page); 
    const value = req.params.query;
    try {
        const totalCount = await Leads.countDocuments({
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
        const skipCount = page  * pageSize;
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
        }).skip(skipCount).limit(pageSize);
        res.status(200).json({ data: searchResults, totalCount: totalCount});
    } catch (error) {
        res.status(500).json({
            error: 'An error occurred while performing the search.'
        });
    }
};




const searchTrashLeads = async (req, res) => {
    const pageSize = parseInt(req.query.pageModel?.pageSize); 
    const page = parseInt(req.query.pageModel?.page); 
    const value = req.params.query;
    try {
        const totalCount = await Leads.countDocuments({
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
        const skipCount = page  * pageSize;
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
        }).skip(skipCount).limit(pageSize);
        res.status(200).json({ data: searchResults, totalCount: totalCount});
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
    searchFolloUpLeads,
    searchFavLeads,
    searchAssignToLeads
}