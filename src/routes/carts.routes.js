import {
  getCartByUserIdController,
  createCartController,
  getCartByCartIdController,
  updateCartController,
  cleanCartByCartIdController,
  addProductByCartIdController,
  postPaymentController,
  updateQuantityProductController,
  deleteProductByCartIdController,
} from "#controllers/cart.controller.js";

import { Router } from "express";

const cartRouter = Router();

cartRouter.post("/", createCartController);

cartRouter.get("/:cid", getCartByCartIdController);

cartRouter.put("/:cid", updateCartController);

cartRouter.delete("/:cid", cleanCartByCartIdController);

cartRouter.get("/user/:uid", getCartByUserIdController);

cartRouter.post("/:cid/purchase", postPaymentController);

cartRouter.put("/:cid/product/:pid", updateQuantityProductController);

cartRouter.post("/:cid/product/:pid", addProductByCartIdController);

cartRouter.delete("/:cid/product/:pid", deleteProductByCartIdController);

export default cartRouter;
