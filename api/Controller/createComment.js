const Comment = require("../models/Comment")
require('dotenv').config()
const redis = require("redis");
const client = redis.createClient();
var jwt = require('jsonwebtoken');

const createCommit = (req,res) => {

    console.log(req.body)

    let username ;
    const reqToken = req.body.token

    if(reqToken === ""){
        return res.status(203).json({ "error": "Login Pls!" })
    }
    console.log(reqToken)

    
    jwt.verify(reqToken, process.env.JWT_KEY, function (err, decoded) {
        
        username = decoded.username

        if (!err) {
            client.get(decoded.username, (err, redisToken) => {
                if (redisToken !== reqToken) {

                    return res.status(203).json({ "error": "Login Pls!" })
                }
                
                
            })



        }else{
            return res.status(203).json({ "error": "Login Pls!" })
        }
    });
    console.log(` ===========` ,username)
    Comment.create({
        username: username,
        monumentShortName: req.body.MonumentShortName,
        text: req.body.text,
    })
.then(()=>res.status(200).json({"response":true}))
.catch(err=>console.log(err))
   


    

}
module.exports = createCommit