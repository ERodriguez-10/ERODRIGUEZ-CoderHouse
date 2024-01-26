import { cartController } from "#controllers/cart/index.controller.js";

import { Router } from "express";

const cartRouter = Router();

cartRouter.get("/user/:uid", async (req, res) => {
  const { uid } = req.params;

  try {
    const cartSelected = await cartController.getCartByUserId(uid);
    res.status(200).json({ cartSelected: cartSelected });
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
});

cartRouter.post("/", async (req, res) => {
  const { products, userId } = req.body;

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
    const newCart = await cartController.createCart(productMap, userId);

    res
      .status(200)
      .json({ message: "Successfully created!", cartCreated: newCart });
  }
});

cartRouter.get("/:cid", async (req, res) => {
  const { cid } = req.params;

  try {
    const cartSelected = await cartController.getCartByCartId(cid);
    res.status(200).json({ cartSelected: cartSelected });
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
});

cartRouter.put("/:cid", async (req, res) => {
  const { cid } = req.params;
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
  }

  try {
    await cartController.updateCart(cid, productMap);
    res.status(200).json({ message: "Product updated successuflly" });
  } catch (error) {
    res.status(400).json({ error });
  }
});

cartRouter.delete("/:cid", async (req, res) => {
  const { cid } = req.params;

  try {
    await cartController.cleanCartByCartId(cid);
    res.status(200).json({ message: "Cart empty successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;

  try {
    await cartController.addProductByCartId(cid, pid);
    res.status(200).json({ message: "New product has added!" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

cartRouter.put("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    await cartController.updateQuantityProduct(cid, pid, quantity);
    res.status(200).json({ message: "Quantity successufully updated" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

cartRouter.delete("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;

  try {
    await cartController.deleteProductByCartId(cid, pid);
    res.status(200).json({ message: "Product removed successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export default cartRouter;
