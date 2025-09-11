const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
  image: { type: String }, 
});


module.exports = mongoose.model("User", userSchema);
