const Apikey = require("../models/apikey.model");

const authenticate = async (req, res, next) => {
  //Add API key to headers
  let user_api_key = req.header("api-key");

  if (!user_api_key) {
    res.status(401).json({ status: "error", message: "Unauthorized" });
  }
  try {
    let account = await Apikey.findOne({ api_key: user_api_key });

    if (account) {      
      next();
    } else {
      //Reject request if API key doesn't match
      res.status(401).json({ status: "error", message: "Unauthorized" });
    }
  } catch (error) {
    console.log("Error");
    console.error(error.message);
  }
};
module.exports = authenticate;
