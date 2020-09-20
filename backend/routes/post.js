const express = require("express");
const bodyParser = require('body-parser');
const fileupload = require("express-fileupload");
const path = require("path");
const io = require("socket.io")(5100);
const http = require("http");

const router = express.Router();
const server = http.createServer(router);

const Posts = require("../models/Posts");

io.on("connect", socket=>{
	console.log("Client is connected");
})


router.use(bodyParser.json());
router.use(fileupload())

router.post("/posts", (req, res) => {
	const { title, content } = req.body;
	let file = req.files;
	let errors = [];
	if (!title || !content || !file) {
		errors.push({ msg: "Veuillez remplire tous les champs" })
	} else {
		let file = req.files.img;
		
		let newPost = new Posts({
			title,
			content
		})
		const image = newPost._id+path.extname(file.name);
		file.mv("./user-data/post-images/"+image, (err, result)=>{
			if(err){
				errors.push({msg : "L'image ne c'est pas envoyé veuillez réesayer"})
			}else{
				const image = newPost._id+path.extname(file.name);
				console.log(image);
				 newPost = new Posts({
					title,
					content,
					image
				})
				newPost.save();
				io.emit("newArticle",newPost)
				console.log("Post send");
			}
		});
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