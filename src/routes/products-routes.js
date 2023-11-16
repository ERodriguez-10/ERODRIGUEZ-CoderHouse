import { Router } from "express";
import { ProductManager, Product } from "../pre-entrega-1.js";

const ProductManagerOnline = new ProductManager("productList.json");

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

  try {
    const productFind = ProductManagerOnline.getProductById(pid);
    return res.status(200).json(productFind);
  } catch (e) {
    return res.status(404).json({ error: e.message });
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
    return res.status(201).json({ message: "Product succesfully created" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

productRouter.put("/:pid", async (req, res) => {
  const { pid } = req.params;
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
    return res.status(404).json({
      error: e.message,
    });
  }

  try {
    await ProductManagerOnline.updateProduct(pid, newValuesProduct);
    return res.status(200).json({ message: "Product has modified" });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

productRouter.delete("/:pid", async (req, res) => {
  const { pid } = req.params;

  try {
    await ProductManagerOnline.deleteProduct(pid);
    return res.status(200).json({
      message: "Content successfully deleted!",
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

export default productRouter;
