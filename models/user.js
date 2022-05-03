//This handles communication with db
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

//exported routes/users.js
module.exports = mongoose.model("User", userSchema);