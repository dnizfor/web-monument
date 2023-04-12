const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = (req, res) => {
  User.findOne({ username: req.body.username })
  .then((data) => {
    console.log(data);

    if (data === null) {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
          User.create({
            username: req.body.username,
            mail: req.body.mail,
            password: hash,
          })
            .then((userData) => {
              const token = jwt.sign(
                { username: req.body.username },
                process.env.JWT_KEY
              );
              client.set(req.body.username, token);
              res.status(200).json({ token: token });
            })
            .catch((err) => console.log(err));
        });
      });
    } else {
      res.status(204).end();
    }
  });
};

module.exports = register;
