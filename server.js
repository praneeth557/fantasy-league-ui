/**
 * Created by praneethrajreddyveerlapally on 4/18/19.
 */
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

//get router
var router = express.Router();

//options for cors midddleware
const options = {
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "http://localhost:8080",
  preflightContinue: false
};

//use cors middleware
router.use(cors(options));

//add your routes

//enable pre-flight
router.options("*", cors(options));

app.use(express.static(__dirname + '/dist/falcons-fantasy-ui'));

app.listen(process.env.PORT || 8080);


// PathLocationStrategy
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/falcons-fantasy-ui/index.html'));
});

console.log("Console listening!");
