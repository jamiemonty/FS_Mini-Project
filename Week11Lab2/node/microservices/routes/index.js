let express = require('express');
let router = express.Router();

let Mongoose = require('mongoose').Mongoose;
let Schema = require('mongoose').Schema;

let oldMong = new Mongoose();
oldMong.connect('mongodb://127.0.0.1:27017/db');

// Define the Book schema
let bookSchema = new Schema({
  bookId: String,
  title: String,
  author: String,
  publishDate: String,
  coverImage: String,
  description: String
}, { collection: 'books' });

let books = oldMong.model('books', bookSchema);

// Admin server page
router.get('/', async function (req, res, next) {
  res.render('index');
});

// CREATE
router.post('/createBook', async function (req, res, next) {
  let retVal = { response: "fail" };
  await books.create(req.body, function (err, result) {
    if (!err) {
      retVal = { response: "success" };
    }
  });
  res.json(retVal);
});

// READ
router.post('/readBook', async function (req, res, next) {
  let data;
  if (req.body.cmd == 'all') {
    data = await books.find().lean();
  } else {
    data = await books.find({ _id: req.body._id }).lean();
  }
  res.json({ books: data });
});

// UPDATE
router.post('/updateBook', async function (req, res, next) {
  let retVal = { response: "fail" };
  await books.findOneAndUpdate({ _id: req.body._id }, req.body, function (err, result) {
    if (!err) {
      retVal = { response: "success" };
    }
  });
  res.json(retVal);
});

// DELETE
router.post('/deleteBook', async function (req, res, next) {
  let retVal = { response: "fail" };
  await books.deleteOne({ _id: req.body._id }, function (err, result) {
    if (!err) {
      retVal = { response: "success" };
    }
  });
  res.json(retVal);
});

// Helper endpoint: get all books
router.post('/getBooks', async function (req, res, next) {
  const result = await getBooks();
  res.json(result);
});

async function getBooks() {
  const data = await books.find().lean();
  return { books: data };
}

// Helper endpoint: save one book
router.post('/saveBook', async function (req, res, next) {
  const result = await saveBook(req.body);
  res.json(result);
});

async function saveBook(theBook) {
  console.log('theBook: ' + JSON.stringify(theBook));
  await books.create(theBook, function (err, result) {
    if (err) {
      console.log('Could not insert new book');
      return { saveBookResponse: "fail" };
    }
  });
  return { saveBookResponse: "success" };
}

module.exports = router;
