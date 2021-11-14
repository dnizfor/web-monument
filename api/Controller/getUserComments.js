const Comment = require("../models/Comment")


const getMonument = (req,res) => {

    Comment.find({username: req.body.username}).limit(20)
    .then((data)=>(
        res.status(200).json({"monument": data})
    ))
    .catch(err=>console.log(err))


    

}
module.exports = getMonument