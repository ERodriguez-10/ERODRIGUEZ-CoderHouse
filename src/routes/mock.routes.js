import { Router } from "express";

const mockRouter = Router();

mockRouter.get("/mockingproducts", (req, res) => {
  res.send("Hello World!");
});

export default mockRouter;
