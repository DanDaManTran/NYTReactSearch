//setting up express
const express = require("express");
const app = express();
const path = require("path");
const Nyts = require("./../models/Nyt.js");


module.exports = function(app){
	app.get("/", function(req, res){
		res.sendFile(path.join(__dirname + "/../public/", "index.html"));
	});

	//something for heroku. Its a favicon stuff
	app.get("/favicon.ico", function(req, res){
		res.send(204);
	});

	app.post("/api/saved", function(req, res){
		var newArt = new Nyts(req.body);

		newArt.save(function(error, doc){
			if (error){
				res.send(error)
			}
		});
	});

	app.get("/api/saved", function(req, res){
		Nyts.find({}, function(error, doc) {
	    if (error) {
	      res.send(error);
	    } else{
				res.send(doc);
			}
	  });
	});

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
