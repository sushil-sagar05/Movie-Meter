const axios  = require('axios')
module.exports.recommendation = async (req, res, next) => {
    try {
        const user = req.user
        const flaskURL = `${process.env.flaskURL}/recommend/${user._id}`
        const response = await axios.get(flaskURL);
        res.status(200).json(response.data)
    } catch (error) {
        res.status(500).json({error:"Error getting recommondations"})
    }
}