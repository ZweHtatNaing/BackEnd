const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
    {
        fullName:{
            type: mongoose.Schema.Types.String,
            required: [true, "Full Name cannot be empty."],
        },
        appUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'AppUser',
            required: [true, "User must have an account"],
        }
    });
module.exports = {schema};