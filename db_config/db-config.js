const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

//Mongo Options Config
const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
};

// Get Connection String from .env
const uri = `${process.env.db_host}`;

//Connect to mongoose
mongoose
    .connect(uri, options)
    .then(() => {
        console.log("Successfully connected to the database");
    })
    .catch(err => {
        console.log("Could not connect to the database. Exiting now...", err);
        process.exit();
    });
