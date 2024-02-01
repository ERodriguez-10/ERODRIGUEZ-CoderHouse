import { cartServices } from "#services/cart/index.services.js";

const getCartByUserIdController = async (req, res) => {
  const { uid } = req.params;

  try {
    const cartSelected = await cartServices.getCartByUserId(uid);
    res.status(200).json({ cartSelected: cartSelected });
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};

const createCartController = async (req, res) => {
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
    const newCart = await cartServices.createCart(productMap, userId);

    res
      .status(200)
      .json({ message: "Successfully created!", cartCreated: newCart });
  }
};

const getCartByCartIdController = async (req, res) => {
  const { cid } = req.params;

  try {
    const cartSelected = await cartServices.getCartByCartId(cid);
    res.status(200).json({ cartSelected: cartSelected });
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};

const updateCartController = async (req, res) => {
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
    await cartServices.updateCart(cid, productMap);
    res.status(200).json({ message: "Product updated successuflly" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const cleanCartByCartIdController = async (req, res) => {
  const { cid } = req.params;

  try {
    await cartServices.cleanCartByCartId(cid);
    res.status(200).json({ message: "Cart empty successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const addProductByCartIdController = async (req, res) => {
  const { cid, pid } = req.params;

  try {
    await cartServices.addProductByCartId(cid, pid);
    res.status(200).json({ message: "New product has added!" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const updateQuantityProductController = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    await cartServices.updateQuantityProduct(cid, pid, quantity);
    res.status(200).json({ message: "Quantity successufully updated" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProductByCartIdController = async (req, res) => {
  const { cid, pid } = req.params;

  try {
    await cartServices.deleteProductByCartId(cid, pid);
    res.status(200).json({ message: "Product removed successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export {
  getCartByUserIdController,
  createCartController,
  getCartByCartIdController,
  updateCartController,
  cleanCartByCartIdController,
  addProductByCartIdController,
  updateQuantityProductController,
  deleteProductByCartIdController,
};
