const newsAndEventsModels = require('../models/newsAndEventModels')

const fetchNewsAndEvents = async (req, res) => {
    try {
        const result = await newsAndEventsModels.newsAndEventsModel();

        return res.send(result);
    }
    catch(err){
        return res.status(500).json({success:false})
    }
        
   
}

module.exports = fetchNewsAndEvents;