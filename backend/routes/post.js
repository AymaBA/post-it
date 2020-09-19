const express = require("express");
const bodyParser = require('body-parser');
const io = require("socket.io")(5100);
const http = require("http");

const router = express.Router();
const server = http.createServer(router);

const Posts = require("../models/Posts");

io.on("connect", socket=>{
	console.log("Client is connected");
})


router.use(bodyParser.json());

router.post("/posts", (req, res) => {
	
	const { title, content } = req.body;
	let errors = [];
	if (!title || !content) {
		errors.push({ msg: "Veuillez remplire tous les champs" })
	} else {
		const newPost = new Posts({
			title,
			content
		})
		newPost.save();
		io.emit("newArticle",newPost)
		console.log("Post send");
	}
	res.json({ "httpCode": 200, "errors": errors })
});

router.get("/posts", (req, res) => {
	let posts = Posts.find({}, (err , result) => {
		res.json(result);
		console.log("get article");
	}).sort({$natural: -1});
});

module.exports = router;