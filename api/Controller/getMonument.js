const Monument = require("../models/Monument")


const getMonument = (req,res) => {

    Monument.findOne({shortName: req.body.MonumentShortName})
    .then((data)=>(
        res.status(200).json({"monument": data})
    ))
    .catch(err=>console.log(err))


    

}
module.exports = getMonument