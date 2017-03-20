//setting up express
const express = require("express");
const app = express();
const path = require("path");
const Nyts = require("./../models/Nyt.js");


module.exports = function(app){
	//defaut page for the load up
	app.get("/", function(req, res){
		res.sendFile(path.join(__dirname + "/../public/", "index.html"));
	});

	//something for heroku. Its a favicon stuff
	app.get("/favicon.ico", function(req, res){
		res.send(204);
	});

	//this will let you post on the database
	app.post("/api/saved", function(req, res){
		var newArt = new Nyts(req.body);

		newArt.save(function(error, doc){
			if (error){
				res.send(error)
			}
		});
	});

	//getting the database information for the display
	app.get("/api/saved", function(req, res){
		Nyts.find({}, function(error, doc) {
	    if (error) {
	      res.send(error);
	    } else{
				res.send(doc);
			}
	  });
	});

	//deleting what the user chooses to delete
	app.delete("/api/saved/:id", function(req, res){
		Nyts.findByIdAndRemove(req.params.id, function (error, doc) {
			if (error) {
				res.send(error);
			} else{
				res.send(doc);
			}
		});
	});
};
