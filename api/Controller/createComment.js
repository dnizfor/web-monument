const Comment = require("../models/Comment");
require("dotenv").config();
var jwt = require("jsonwebtoken");

const createCommit = (req, res) => {
  console.log(req.body);

  let username;
  const reqToken = req.body.token;

  if (reqToken === "") {
    return res.status(203).json({ error: "Login Pls!" });
  }
  console.log(reqToken);

  jwt.verify(reqToken, process.env.JWT_KEY, function (err, decoded) {
    username = decoded.username;

    if (err) {
      return res.status(203).json({ error: "Login Pls!" });
    }

    Comment.create({
      username: username,
      monumentShortName: req.body.MonumentShortName,
      text: req.body.text,
    })
      .then(() => res.status(200).json({ response: true }))
      .catch((err) => console.log(err));
  });
};
module.exports = createCommit;
