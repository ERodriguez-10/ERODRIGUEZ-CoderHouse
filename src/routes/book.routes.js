import { Router } from "express";
import BookDAO from "../dao/mongo/book.dao.js";

const BooksInstance = new BookDAO();

const bookRouter = Router();

bookRouter.get("/", async (req, res) => {
  const { limit, page, sort, query } = req.query;

  limit ? parseInt(limit) : 10;
  page ? parseInt(page) : 1;
  sort ? sort : null;
  query ? query : null;

  const listOfBooks = await BooksInstance.getBooks();

  if (limit) {
    res.status(200).json(listOfBooks.slice(0, limit));
  } else {
    res.status(200).json({ listOfBooks });
  }
});

bookRouter.get("/:pid", async (req, res) => {
  const { pid } = req.params;

  try {
    const bookFinded = await BooksInstance.getBookById(pid);
    res.status(200).json({ bookFinded });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

bookRouter.post("/", async (req, res) => {
  const bookObject = req.body;

  try {
    const bookCreated = await BooksInstance.addBook(bookObject);
    res.status(201).json({
      message: "Book succesfully created",
      bookCreated,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

bookRouter.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const bookObject = req.body;

  try {
    const bookUpdated = await BooksInstance.updateBook(pid, bookObject);
    if (bookUpdated.modifiedCount === 0) throw new Error("Book not found");

    res.status(200).json({ message: "Book has modified" });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

bookRouter.delete("/:pid", async (req, res) => {
  const { pid } = req.params;

  try {
    await BooksInstance.deleteBook(pid);
    res.status(200).json({
      message: "Book successfully deleted!",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

export default bookRouter;
