const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
    {
        username: {
            type: mongoose.Schema.Types.String,
            required: [true, "username cannot be empty."],
            index: { unique: true }
        },
        password: {
            type: mongoose.Schema.Types.String,
            required: [true, "password cannot be empty."],
        }
    });
module.exports = {schema};