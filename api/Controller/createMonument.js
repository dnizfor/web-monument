const Monument = require("../models/Monument")
require('dotenv').config()
const redis = require("redis");
const client = redis.createClient();
var jwt = require('jsonwebtoken');

const createMonument = (req, res) => {



    const reqToken = req.body.token

    jwt.verify(reqToken, process.env.JWT_KEY, function (err, decoded) {
        console.log(decoded);
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

    console.log(req.body)




    Monument.findOne({ shortName: req.body.shortName })
        .then(result => {
            console.log(result)
            if (result === null) {

                Monument.create({
                    name: req.body.name,
                    shortName: req.body.shortName,
                    content: req.body.content,
                    path: req.body.url,
                })
                    .then((data) => {
                        res.status(200).json({ "shortName": data.shortName })

                    })
                    .catch(err => console.log(err))


            }
            else {
                res.status(204).json({ "error": "this short name already in use " })
                console.log("this short name already in use ")
            }
        })





}
module.exports = createMonument