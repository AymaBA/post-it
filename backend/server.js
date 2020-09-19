const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require("cors")
const app = express();
const PORT = 5000

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "http://127.0.0.1:5500");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Access-Control-Allow-Credentials', 'true');
    next();
})
try {
	mongoose.connect('mongodb://localhost/onedayproject', { useNewUrlParser: true, useUnifiedTopology: true });
	mongoose.Promise = global.Promise;
	console.log("Connect to database");
} catch (error) {
	console.log("Error connect database : " + error);
}

app.use("/", require("./routes/post"));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
	extended: true
}));

app.listen(PORT, () => {
	console.log("Server running on port " + PORT);
});