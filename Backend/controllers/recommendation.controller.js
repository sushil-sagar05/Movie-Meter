const axios  = require('axios')
module.exports.recommendation = async (req, res, next) => {
    try {
        console.log("APi hit")
        const user = req.user
        console.log(user)
        const flaskURL = `${process.env.flaskURL}/recommend/${user._id}`
        console.log(flaskURL)
        const response = await axios.get(flaskURL);
        console.log(response)
        res.status(200).json(response.data)
    } catch (error) {
            console.error("Flask Request Error:", error.message);
            if (error.response) {
                console.error("Status:", error.response.status);
                console.error("Data:", error.response.data);
            }
            res.status(500).json({ error: "Error getting recommendations" });
        }
}