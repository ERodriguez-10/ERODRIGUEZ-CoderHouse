import { productServices } from "#services/factory.js";

const getProductsController = async (req, res) => {
  const { limit, page, sort, query } = req.query;

  const productData = await productServices.getProducts(
    limit,
    page,
    sort,
    query
  );

  res.status(200).json({ productData });
};

const getProductByIdController = async (req, res) => {
  const { pid } = req.params;

  try {
    const productFind = await productServices.getProductById(pid);
    res.status(200).json({ productSelected: productFind });
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};

const addProductController = async (req, res) => {
  const productReq = req.body;

  try {
    const productCreated = await productServices.addProduct(productReq);
    res.status(201).json({
      message: "Product succesfully created",
      productCreated: productCreated,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProductController = async (req, res) => {
  const { pid } = req.params;
  const productReq = req.body;

  try {
    const updateProductResult = await productServices.updateProduct(
      pid,
      productReq
    );
    if (updateProductResult.modifiedCount === 0)
      throw new Error("Product not found");

    res.status(200).json({ message: "Product has modified" });
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
};

const deleteProductController = async (req, res) => {
  const { pid } = req.params;

  try {
    await productServices.deleteProduct(pid);
    res.status(200).json({
      message: "Content successfully deleted!",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export {
  getProductsController,
  getProductByIdController,
  addProductController,
  updateProductController,
  deleteProductController,
};
