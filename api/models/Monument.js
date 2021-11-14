const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Monument = new Schema({
  id: ObjectId,
  name: {type : String , required : true},
  shortName : {type : String , required : true, unique:true},
  content: {type : String , required : true},
  path: {type : String , required : true},
  like : {type : String , default : 0},
});

module.exports = mongoose.model("Monument",Monument)