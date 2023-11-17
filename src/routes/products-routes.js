import { Router } from "express";
import { ProductManager, Product } from "../pre-entrega-1.js";

const ProductManagerOnline = new ProductManager("./src/data/productList.json");

const productRouter = Router();

productRouter.get("/", (req, res) => {
  const limit = req.query.limit;

  const productData = ProductManagerOnline.getProducts();

  if (limit) {
    res.json(productData.slice(0, limit));
  } else {
    res.json(productData);
  }
});

productRouter.get("/:pid", (req, res) => {
  const { pid } = req.params;

  if (isNaN(pid)) {
    res.status(400).json({ error: "Invalid ProductID. It must be number." });
  } else {
    try {
      const productFind = ProductManagerOnline.getProductById(pid);
      res.status(200).json(productFind);
    } catch (e) {
      res.status(404).json({ error: e.message });
    }
  }
});

productRouter.post("/", async (req, res) => {
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  } = req.body;

  const productBody = new Product(
    title,
    description,
    price,
    thumbnails,
    code,
    stock,
    category,
    status
  );

  try {
    await ProductManagerOnline.addProduct(productBody);
    res.status(201).json({ message: "Product succesfully created" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

productRouter.put("/:pid", async (req, res) => {
  const { pid } = req.params;

  if (isNaN(pid)) {
    res.status(400).json({ error: "Invalid ProductID. It must be number." });
  } else {
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    } = req.body;

    const bodyProduct = {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    };

    const newValuesProduct = Object.fromEntries(
      Object.entries(bodyProduct).filter(([key, value]) => value !== undefined)
    );

    try {
      ProductManagerOnline.getProductById(pid);
    } catch (e) {
      res.status(404).json({
        error: e.message,
      });
    }

    try {
      await ProductManagerOnline.updateProduct(pid, newValuesProduct);
      res.status(200).json({ message: "Product has modified" });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  }
});

productRouter.delete("/:pid", async (req, res) => {
  const { pid } = req.params;

  if (isNaN(pid)) {
    res.status(400).json({ error: "Invalid ProductID. It must be number." });
  } else {
    try {
      await ProductManagerOnline.deleteProduct(pid);
      res.status(200).json({
        message: "Content successfully deleted!",
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  }
});

export default productRouter;
