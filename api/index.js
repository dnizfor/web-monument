const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 3001 || process.env.PORT
const cors = require('cors');
const route = require("./routes/route");
const redis = require("redis");
const client = redis.createClient();
require('dotenv').config()
const bodyParser = require('body-parser')

client.on("error", function(error) {
  console.error(error);
});

mongoose.connect(process.env.DB)
.then(()=> console.log("db"))
.catch(err=>console.log("err"))

app.use(cors())

app.use(bodyParser())



app.use("/",route)



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})