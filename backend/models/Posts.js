const mongoose = require("mongoose");
const Shmema = mongoose.Schema;

const PostShema = new Shmema({
	title: {
		type: String,
		required: [true, "Title is required in for create article"]
	},
	content: {
		type: String,
		required: [true, "Content is required in for create article"]
	},
	image: {
		type: String,
		required: [true, "Image is required in for create article"]
	},
	date: {
		type: Date,
		default: Date.now
	}
});

const Posts = mongoose.model('posts', PostShema);
module.exports = Posts;