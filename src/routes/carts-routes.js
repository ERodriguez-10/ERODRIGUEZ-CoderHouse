import { Router } from "express";

import { CarritoManager } from "../pre-entrega-1.js";

const CarritoManagerOnline = new CarritoManager("cartList.json");

const cartRouter = Router();

cartRouter.get("/:cid", (req, res) => {
  const { cid } = req.params;

  try {
    const cartSelected = CarritoManagerOnline.getCartById(Number(cid));
    res.status(200).json(cartSelected);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
});

cartRouter.post("/", async (req, res) => {
  const { products } = req.body;

  if (!products) {
    res.status(400).json({
      error: "Please enter an array of products to create your cart.",
    });
  } else {
    const newCart = await CarritoManagerOnline.createCart(products);

    res.status(200).json({ message: "Successfully created!", cart: newCart });
  }
});

cartRouter.post("/:cid/product/:pid", (req, res) => {
  const { cid, pid } = req.params;

  try {
    CarritoManagerOnline.addProductToCart(Number(cid), Number(pid));
    res.status(200).json({ message: "New product has added!" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default cartRouter;
