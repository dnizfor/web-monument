const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
  id: ObjectId,
  username: {type : String,  required: true,unique : true},
  password: {type : String,  required: true},
  mail: {type : String,  required: true},
});


module.exports = mongoose.model("User",User)