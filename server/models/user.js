const mongoose = require("mongoose");
const Scheme =  mongoose.Schema;

const UserScheme = new Scheme({
    name: {
        type: String,
        required: true
       },
       email: {
        type: String,
        required: true
       },
       password: {
        type: String,
        required: true
       },
       createdAt: {
        type: Date,
        default: Date.now
       },
       updatedAt: {
        type: Date,
        default: Date.now
       }
});

module.exports = mongoose.model("user", UserScheme )