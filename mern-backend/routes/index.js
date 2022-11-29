var express = require('express');
var User = require('../model/User');
var Book = require('../model/Book');
var mongoose = require('mongoose');

var router = express.Router();

// get/books credit @ https://www.youtube.com/watch?v=0T4GsMYnVN4

router.get("/books", async (req, res) => {
	try {
		const page = parseInt(req.query.page) - 1 || 0;
		const limit = parseInt(req.query.limit) || 5;
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


// router.get('/books', function(req, res, next) {
//   let searchQuery = {};

//   if(req.query.title)
//     searchQuery = { title: req.query.title };

//   Book.find(searchQuery, function(err, books){
//     if (err) {
//       res.status(400);      
//       res.send();
//     }
//     console.log("returning the book.");
//     res.send(books);
//   })
// });

// router.post('/users', function(req, res, next) {
//   let newUser = new User(req.body);
//   newUser._id = mongoose.Types.ObjectId();

//   newUser.save(function(err) {
//     if (err) {
//       console.log("not saved!");
//       res.status(400);
//       res.send();
//     } else {
//       console.log("saved!");
//       res.send({ id : newUser._id });
//     }

//   });
// });


// router.post('/updateuser/:id',function(req, res) {

//   let id = req.params.id
//   let updatedUser = new User(req.body);
//   User.findByIdAndUpdate(id,
//       {
//         name:updatedUser.name,
//         age:updatedUser.age
//       }, function (err, docs) {
//         if (err) {
//           console.log("not saved!");
//           res.status(400);
//           res.send();
//         } else {
//           res.status(200).json({'users': 'user updated successfully'});
//           }
//       })
// });


module.exports = router;
