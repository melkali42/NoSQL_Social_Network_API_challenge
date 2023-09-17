const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3001; 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json());

mongoose.connect(
    process.env.MONGOBD_URI || "mongodb://localhost/social-network",
    {
        useFindAndModify: false, 
        UseNewUrlParser: true, 
        useUnifiedTopology: true, 
    }
);

mongoose.set("debug", true);

app.use(require("./routes"));

app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));