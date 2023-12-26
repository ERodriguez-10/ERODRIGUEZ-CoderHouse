import { Router } from "express";

import BookDAO from "../dao/mongo/book.dao.js";
import ChatDAO from "../dao/mongo/chat.dao.js";

import bookModel from "../models/book.model.js";

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
  const { limit, page, sort, query, status } = req.query;

  var currentUrl = new URL(
    req.protocol + "://" + req.get("host") + req.originalUrl
  );

  const limitOption = limit !== undefined ? parseInt(limit) : 10;
  const pageOption = page !== undefined ? parseInt(page) : 1;
  const sortOption = sort !== undefined ? parseInt(sort) : null;
  const queryOption = query !== undefined ? query : null;
  const statusOption = status !== undefined ? status : null;

  const options = {
    lean: true,
    limit: limitOption,
    page: pageOption,
  };

  if (sortOption !== null) {
    options.sort = { price: sortOption };
  }

  console.log(options);

  let productData = await bookModel.paginate(
    {},
    { limit: 4, page: 2, sort: { price: -1 }, lean: true }
  );

  console.log(productData);

  if (status) {
    productData = productData.filter((product) => {
      if (status === "available") {
        return product.status === true;
      } else if (status === "unavailable") {
        return product.status === false;
      }
    });
  }

  res.render("books", {
    tabTitle: "Bookify Store",
    pageTitle: "All products",
    products: productData.docs,
    fileCss: "css/output.css",
    categories: BooksInstance.getCategories(),
    currentUrl: currentUrl.href,
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
