// Require mongoose
var mongoose = require("mongoose");

// Create a Schema class with mongoose
var Schema = mongoose.Schema;

// Create a NytsScheme with the Schema class
var NytsScheme = new Schema({
  title: {
    type: String
  },
  url: {
    type: String
  },
	date:{
		type: String
	}
});

// Make a Nyts model with the NytsScheme
var Nyts = mongoose.model("Nyts", NytsScheme);

// Export the Note model
module.exports = Nyts;
