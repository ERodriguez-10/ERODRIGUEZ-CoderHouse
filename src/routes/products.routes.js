import { Router } from "express";
import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from "#controllers/product/index.js";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const { limit, page, sort, query } = req.query;

  const productData = await getProducts(limit, page, sort, query);

  res.status(200).json({ productData });
});

productRouter.get("/:pid", async (req, res) => {
  const { pid } = req.params;

  try {
    const productFind = await getProductById(pid);
    res.status(200).json({ productSelected: productFind });
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
});

productRouter.post("/", async (req, res) => {
  const productReq = req.body;

  try {
    const productCreated = await addProduct(productReq);
    res.status(201).json({
      message: "Product succesfully created",
      productCreated: productCreated,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

productRouter.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const productReq = req.body;

  try {
    const updateProductResult = await updateProduct(pid, productReq);
    if (updateProductResult.modifiedCount === 0)
      throw new Error("Product not found");

    res.status(200).json({ message: "Product has modified" });
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
});

productRouter.delete("/:pid", async (req, res) => {
  const { pid } = req.params;

  try {
    await deleteProduct(pid);
    res.status(200).json({
      message: "Content successfully deleted!",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

export default productRouter;
