const mongoose = require("mongoose")
const { Schema } = mongoose

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String
})

module.exports = mongoose.model("user", UserSchema)
