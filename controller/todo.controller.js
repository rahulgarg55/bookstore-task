const HttpStatus = require('http-status-codes');

const Book = require('../models/todo');

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(HttpStatus.StatusCodes.OK).json(books);
  } catch (error) {
    res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: HttpStatus.StatusCodes.getStatusText(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR) });
  }
};

const getBookByNumber = async (req, res) => {
  const booknumber = req.params.booknumber;
  try {
    const book = await Book.findOne({ booknumber });
    if (book) {
      res.status(HttpStatus.StatusCodes.OK).json(book);
    } else {
      res.sendStatus(HttpStatus.StatusCodes.NOT_FOUND);
    }
  } catch (error) {
    res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: HttpStatus.StatusCodes.getStatusText(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR) });
  }
};

const createBook = async (req, res) => {
  const { booknumber, title, author } = req.body;
  const book = new Book({
    booknumber,
    title,
    author,
    createdOn: new Date(),
  });

  try {
    await book.save();
    res.status(HttpStatus.StatusCodes.CREATED).json(book);
  } catch (error) {
    res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: HttpStatus.StatusCodes.getStatusText(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR) });
  }
};

const updateBook = async (req, res) => {
  const booknumber = req.params.booknumber;
  const { title, author } = req.body;

  try {
    const book = await Book.findOne({ booknumber });

    if (book) {
      book.title = title;
      book.author = author;
      book.createdOn = new Date();
      await book.save();
      res.sendStatus(HttpStatus.StatusCodes.NO_CONTENT);
    } else {
      res.sendStatus(HttpStatus.StatusCodes.NOT_FOUND);
    }
  } catch (error) {
    res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: HttpStatus.StatusCodes.getStatusText(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR) });
  }
};

const deleteBook = async (req, res) => {
  const booknumber = req.params.booknumber;

  try {
    const book = await Book.findOne({ booknumber });

    if (book) {
      await book.deleteOne();
      res.sendStatus(HttpStatus.StatusCodes.NO_CONTENT);
    } else {
      res.sendStatus(HttpStatus.StatusCodes.NOT_FOUND);
    }
  } catch (error) {
    res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: HttpStatus.StatusCodes.getStatusText(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR) });
  }
};

module.exports = {
  getBooks,
  getBookByNumber,
  createBook,
  updateBook,
  deleteBook,
};
