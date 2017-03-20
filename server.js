const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

//setting up the bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//setting up the paths for the assets files
app.use(express.static(path.join(__dirname, "/public/")));

//setting up the routes from the controllers.js
require("./controllers/controllers.js")(app);

//syncing with mongojs
const mongoose = require("mongoose");
mongoose.Promise = Promise;
//***************depending if you are doing a local host or heroku this depends on the switch
// mongoose.connect("mongodb://localhost/nyt");
mongoose.connect("mongodb://heroku_07v30h7b:3195cv4gnm9t6p9pv6mg6108hh@ds137100.mlab.com:37100/heroku_07v30h7b")
//***************************************************************************************************
var db = mongoose.connection;
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

//setting up the PORT
app.listen(PORT);
