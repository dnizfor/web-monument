const Comment = require("../models/Comment")
require('dotenv').config()


const getComment = (req,res) => {

    console.log(req.body.MonumentShortName)

    Comment.find({monumentShortName: req.body.MonumentShortName}).limit(20)
    .then((data)=>{
        res.status(200).json({"comments": data})
        console.log(data)
    })
    .catch(err=>console.log(err))


    

}
module.exports = getComment