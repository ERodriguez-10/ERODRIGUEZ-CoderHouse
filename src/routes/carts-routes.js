import { Router } from "express";
import CartDAO from "../dao/mongo/cart.dao.js";

const CartsInstance = new CartDAO();

const cartRouter = Router();

cartRouter.get("/", async (req, res) => {
  const carts = await CartsInstance.getCarts();
  res.status(200).json({ cartList: carts });
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
    const newCart = await CartsInstance.createCart(productMap);

    res
      .status(200)
      .json({ message: "Successfully created!", cartCreated: newCart });
  }
});

cartRouter.get("/:cid", async (req, res) => {
  const { cid } = req.params;

  try {
    const cartSelected = await CartsInstance.getCartById(cid);
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
    await CartsInstance.updateProductInCart(cid, productMap);
    res.status(200).json({ message: "Product updated successuflly" });
  } catch (error) {
    res.status(400).json({ error });
  }
});

cartRouter.delete("/:cid", async (req, res) => {
  const { cid } = req.params;

  try {
    await CartsInstance.deleteAllProductsInCart(cid);
    res.status(200).json({ message: "Cart empty successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;

  try {
    await CartsInstance.addProductToCart(cid, pid);
    res.status(200).json({ message: "New product has added!" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

cartRouter.put("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    await CartsInstance.updateQuantityProductInCart(cid, pid, quantity);
    res.status(200).json({ message: "Quantity successufully updated" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

cartRouter.delete("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;

  try {
    await CartsInstance.deleteProductToCart(cid, pid);
    res.status(200).json({ message: "Product removed successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export default cartRouter;
