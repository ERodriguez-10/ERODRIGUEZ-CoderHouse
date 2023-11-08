import express from "express";

import { ProductManager } from "./desafio-3.js";

const app = express();
const PORT = 8080;

const ProductManagerOnline = new ProductManager("./src/data/productList.json");

app.get("/", (req, res) => {
  res.send("<h1>Welcome to ProductManager Server!</h1>");
});

app.get("/products", (req, res) => {
  const limit = req.query.limit;

  const productData = ProductManagerOnline.getProducts();

  if (limit) {
    res.json(productData.slice(0, limit));
  } else {
    res.json(productData);
  }
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;

  const productFind = ProductManagerOnline.getProductById(id);

  res.json(productFind);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
