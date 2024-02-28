import { Router } from "express";
import { generateFakeProduct } from "../utils/fakerData.js";

const mockRouter = Router();

mockRouter.get("/mockingproducts", (req, res) => {
  const mockProductsArray = [];

  for (let i = 0; i < 50; i++) {
    mockProductsArray.push(generateFakeProduct());
  }

  res.status(200).json({ message: "OK", products: mockProductsArray });
});

export default mockRouter;
