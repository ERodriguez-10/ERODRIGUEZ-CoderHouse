import { Router } from "express";

import BookDAO from "../dao/mongo/book.dao.js";
import ChatDAO from "../dao/mongo/chat.dao.js";

const BooksInstance = new BookDAO();
const ChatsInstance = new ChatDAO();

const viewRouter = Router();

viewRouter.get("/", async (req, res) => {
  res.render("home", {
    tabTitle: "Bookify Store",
    pageTitle: "All products",
    products: (await BooksInstance.getBooks()).slice(0, 8),
    fileCss: "css/output.css",
  });
});

viewRouter.get("/chat", async (req, res) => {
  const randomUser = `Anonymous${Math.floor(Math.random() * 1000000)}`;

  res.render("chat", {
    tabTitle: "Bookify Store",
    pageTitle: "Chat Room",
    messages: await ChatsInstance.getChats(),
    username: randomUser,
    fileCss: "css/output.css",
  });
});

viewRouter.get("/books", async (req, res) => {
  const { limit, page, sort, query } = req.query;

  limit ? parseInt(limit) : 10;
  page ? parseInt(page) : 1;
  sort ? sort : null;
  query ? query : null;

  let productData = await BooksInstance.getBooks();

  if (sort === "price-desc") {
    productData = productData.sort((a, b) => b.price - a.price);
  } else if (sort === "price-asc") {
    productData = productData.sort((a, b) => a.price - b.price);
  }

  if (limit) {
    productData = productData.slice(0, limit);
  }

  res.render("books", {
    tabTitle: "Bookify Store",
    pageTitle: "All products",
    products: productData,
    fileCss: "css/output.css",
    categories: BooksInstance.getCategories(),
  });
});

viewRouter.get("/book/:id", async (req, res) => {
  const product = await BooksInstance.getBookById(req.params.id);

  res.render("bookDetail", {
    tabTitle: "Bookify Store",
    pageTitle: product.name,
    product,
    fileCss: "css/output.css",
  });
});

viewRouter.get("/cart", async (req, res) => {
  res.render("cart", {
    tabTitle: "Bookify Store",
    pageTitle: "Cart",
    fileCss: "css/output.css",
  });
});

viewRouter.get("/realtimebooks", async (req, res) => {
  res.render("realTimeBooks", {
    tabTitle: "Bookify Store",
    pageTitle: "Real Time Products",
    products: await BooksInstance.getBooks(),
    fileCss: "css/output.css",
  });
});

export default viewRouter;
