const Monument = require("../models/Monument");
require("dotenv").config();
var jwt = require("jsonwebtoken");

const createMonument = (req, res) => {
  const reqToken = req.body.token;

  jwt.verify(reqToken, process.env.JWT_KEY, function (err, decoded) {
    console.log(decoded);
    if (err) {
      return res.status(203).json({ error: "Login Pls!" });
    }

    Monument.findOne({ shortName: req.body.shortName }).then((result) => {
      console.log(result);
      if (result === null) {
        Monument.create({
          name: req.body.name,
          shortName: req.body.shortName,
          content: req.body.content,
          path: req.body.url,
        })
          .then((data) => {
            res.status(200).json({ shortName: data.shortName });
          })
          .catch((err) => console.log(err));
      } else {
        res.status(204).json({ error: "this short name already in use " });
        console.log("this short name already in use ");
      }
    });
  });

  console.log(req.body);
};
module.exports = createMonument;
