import { Router } from "express";
import CartDAO from "../dao/mongo/cart.dao.js";

const CartsInstance = new CartDAO();

const cartRouter = Router();

cartRouter.get("/", async (req, res) => {
  const listOfCarts = await CartsInstance.getCarts();
  res.status(200).json({ listOfCarts });
});

cartRouter.get("/:cid", async (req, res) => {
  const { cid } = req.params;

  try {
    const cartFinded = await CartsInstance.getCartById(cid);
    res.status(200).json({ cartFinded });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

cartRouter.post("/", async (req, res) => {
  const { products } = req.body;

  const productMap = products.map((p) => {
    return {
      productId: p,
      quantity: 1,
    };
  });

  if (!products || !Array.isArray(products)) {
    return res.status(400).json({
      error: "Please send an array of products to create your cart.",
    });
  } else {
    const cartCreated = await CartsInstance.createCart(productMap);

    res
      .status(200)
      .json({ message: "Cart successfully created!", cartCreated });
  }
});

cartRouter.post("/:cid/book/:bid", async (req, res) => {
  const { cid, bid } = req.params;

  try {
    await CartsInstance.addProductToCart(cid, bid);
    res.status(200).json({ message: "New product has added!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default cartRouter;
