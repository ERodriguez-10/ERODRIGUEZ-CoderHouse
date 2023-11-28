import { Router } from "express";
import path from "node:path";

import { CarritoManager } from "../pre-entrega-1.js";

import __dirname from "../utils.js";

// Build a flexible path compatible with all platforms
const jsonFilePath = path.join(__dirname, "data", "cartList.json");
const CarritoManagerOnline = new CarritoManager(jsonFilePath);

const cartRouter = Router();

cartRouter.get("/:cid", (req, res) => {
  const { cid } = req.params;

  if (isNaN(cid)) {
    res.status(400).json({ error: "CartID must be a number" });
  } else {
    try {
      const cartSelected = CarritoManagerOnline.getCartById(Number(cid));
      res.status(200).json(cartSelected);
    } catch (e) {
      res.status(404).json({ error: e.message });
    }
  }
});

cartRouter.post("/", async (req, res) => {
  const { products } = req.body;

  if (!products || !Array.isArray(products)) {
    return res.status(400).json({
      error: "Please send an array of products to create your cart.",
    });
  } else {
    const newCart = await CarritoManagerOnline.createCart(products);

    res.status(200).json({ message: "Successfully created!", cart: newCart });
  }
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;

  if (isNaN(cid) || isNaN(pid)) {
    res
      .status(400)
      .json({ error: "Invalid CartID or ProductID. They must be numbers." });
  } else {
    try {
      await CarritoManagerOnline.addProductToCart(Number(cid), Number(pid));
      res.status(200).json({ message: "New product has added!" });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
});

export default cartRouter;
