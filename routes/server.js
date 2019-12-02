const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config')
const bodyParser = require('body-parser');
const tokenList = {};
const app = express();
//hardcoded user info
const dbUser ={
  name:'xxx',
  password:'aaa'
}
//server check
module.exports.serverCheck = (req,res) =>{
  res.send("running server");
}
//dashboard
module.exports.dashboard =(req,res) => {
    // all secured routes goes here
    res.send('dashboard')
 }
