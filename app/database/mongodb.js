const mongoose = require("mongoose");
const DB_NAME = process.env.DB_DATABASE;
const DB_UNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

// mongodb+srv://sayedalidev7:8VeOVWIRNXFLmWGC@cluster0.33ks6.mongodb.net/rtkquery?retryWrites=true&w=majority&appName=Cluster0
// mongodb+srv://${DB_Name}:${DB_Password}@cluster0.33ks6.mongodb.net/${DB_Uname}?retryWrites=true&w=majority&appName=Cluster0

const databaseConnect = () => {
  mongoose
    .connect(
      `mongodb+srv://${DB_UNAME}:${DB_PASSWORD}@cluster0.eoce7vw.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
    )
    .then(() => console.log("Connected!"));
};

module.exports = databaseConnect;
