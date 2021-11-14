const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Comment = new Schema({
  id: ObjectId,
  username: {type : String,  required: true},
  monumentShortName: {type : String , required : true},
  text: {type : String,  required: true},
});


module.exports = mongoose.model("Comment",Comment)