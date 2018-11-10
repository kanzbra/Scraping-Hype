//set up express, mongoose, and express-handlebars

var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

//set up a port
var PORT = process.env.PORT || 3000;

//iniate express to be used and routes to be rendered
var app = express();
var routes = require("./routes");

//convert to json and allow files to be accessed
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//give access to where front-end would be
app.use(express.static("public"));

//initiate handebars and define the main html page
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//give access to routes
app.use(routes);

//gives access to deployed database if not a local database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//build connection to mongo DB
mongoose.connect(MONGODB_URI);

//establish connection to build port
app.listen(PORT, function() {
    console.log("Congrats, the awsoeme connection has been made on port: " + PORT);
});