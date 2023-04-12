const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = (req, res) => {
  User.findOne({ username: req.body.username }).then((data) => {
    if (data === null) {
      res.status(204).json({ error: " username or password false " });
    } else {
      bcrypt.compare(req.body.password, data.password).then(function (result) {
        if (result) {
          const token = jwt.sign(
            { username: req.body.username },
            process.env.JWT_KEY
          );
          res.status(200).json({ token: token });
        } else {
          res.status(204).send(" username or password false ");
        }
      });
    }
  });
};

module.exports = login;
