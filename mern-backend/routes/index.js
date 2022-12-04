var express = require('express');
var Book = require('../model/Book');

var router = express.Router();

// get/books credit @ https://www.youtube.com/watch?v=0T4GsMYnVN4

router.get("/books", async (req, res) => {
	try {
		const page = parseInt(req.query.page) - 1 || 0;
		const limit = parseInt(req.query.limit) || 6;
		const search = req.query.search || "";
		let sort = req.query.sort || "author";
		let genre = req.query.genre || "All";

		const genreOptions = [
            "Children",
            "Romance",
            "Thriller",
            "Young Adult",
            "General Fiction",
            "Science",
            "Food",
            "Humour",
            "Autobiography",
            "Biography",
            "Science Fiction & Fantasy",
            "Lifestyle",
            "General Interest",
            "Current Affairs",
            "Travel",           
		];

		genre === "All"
			? (genre = [...genreOptions])
			: (genre = req.query.genre);
		req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

		let sortBy = {};
		if (sort[1]) {
			sortBy[sort[0]] = sort[1];
		} else {
			sortBy[sort[0]] = "asc";
		}

		const books = await Book.find({ title: { $regex: search, $options: "i" } })
			.where("genre")
			.in(genre)
			.sort(sortBy)
			.skip(page * limit)
			.limit(limit);

		const total = await Book.countDocuments({
			genre: { $in: genre },
			title: { $regex: search, $options: "i" },
		});

		const response = {
			error: false,
			total,
			page: page + 1,
			limit,
			genres: genreOptions,
			books,
		};

		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: true, message: "Internal Server Error" });
	}
});


module.exports = router;
