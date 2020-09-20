const express = require('express');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const path = require('path');
const Posts = require('../models/Posts');

const io = require('socket.io')(5100);
const router = express.Router();

io.on('connect', () => console.log('Client is connected'));

router.use(bodyParser.json());
router.use(fileupload());

router.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Access-Control-Allow-Credentials', 'true');
	next();
});

router.post('/posts', (req, res) => {
	const { title, content } = req.body;
	const errors = [];
	let succes = {success : false , msg: null};
	if (!(title && content && req.files)) {
		errors.push({ msg: 'Veuillez remplire tous les champs.' });
	} else {
		let file = req.files;
		console.log({ img: file.img.name });
		if (![".png", ".jpg", ".gif", ".jpeg"].includes(path.extname(file.img.name))) {
			errors.push({ msg: "Votre image n'est pas au bon format." });
		} else if (req.files.img.size > 2000000) {
			errors.push({ msg: "Votre image est trop grosse , la taille maximale est 2mo." });
		} else {

			const file = req.files.img;
			let newPost = new Posts({ title, content });
			const image = newPost._id + path.extname(file.name);

			file.mv(`./user-data/post-images/${image}`, err => {
				if (err){
					errors.push({ msg: 'L\'image n\'a pas été envoyée, veuillez réessayer.' });
				}
				else {
					succes = {success : true ,msg: "Post publié" }
					newPost = new Posts({ title, content, image: newPost._id + path.extname(file.name) });
					newPost.save();
					io.emit('newArticle', newPost);
					console.log('Post send');
				}
			});
		}
	}
	res.json({ succes, errors });
});

router.get('/posts', (req, res) => Posts.find({}, (err, result) => {
	res.json(result);
	console.log('GET article');
}).sort({ $natural: -1 }));

module.exports = router;