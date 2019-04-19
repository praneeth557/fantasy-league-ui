/**
 * Created by praneethrajreddyveerlapally on 4/18/19.
 */
const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/dist/falcons-fantasy-ui'));

app.listen(process.env.PORT || 8080);


// PathLocationStrategy
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/falcons-fantasy-ui/index.html'));
});

console.log("Console listening!");
