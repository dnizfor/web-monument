const express = require("express")
const Router = express.Router()
const register = require("../Controller/register")
const login = require("../Controller/login")
const createMonument = require("../Controller/createMonument")
const createComment = require("../Controller/createComment")
const getComment = require("../Controller/getComment")
const getMonument = require("../Controller/getMonument")
const getUserComments = require("../Controller/getUserComments")



Router.post("/api/s/login",login)

Router.post("/api/s/register",register)

Router.post("/api/u/create",createMonument)

Router.post("/api/u/add-comment",createComment)

Router.post("/api/u/get-comment",getComment)

Router.post("/api/u/get-monument",getMonument)

Router.post("/api/u/get-user-comments",getUserComments)




module.exports = Router