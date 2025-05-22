const mongoose = require("mongoose");

function connectdb(){

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
})

}

module.exports = connectdb
