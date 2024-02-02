import JwtStrategy from "#configs/auth/jwt.config.js";

import { cartServices } from "#services/cart/index.services.js";
import { chatServices } from "#services/chat/index.services.js";
import { productServices } from "#services/product/index.services.js";

import { passportCall } from "#utils/passport.js";

import { Router } from "express";

const viewRouter = Router();

// Routes

viewRouter.get("/", async (req, res) => {
  res.render("login", {
    tabTitle: "Bookify Store - Login",
    fileCss: "css/styles.css",
  });
});

viewRouter.get("/register", async (req, res) => {
  res.render("register", {
    tabTitle: "Bookify Store - Register",
    fileCss: "css/styles.css",
  });
});

viewRouter.get("/profile", passportCall(JwtStrategy), async (req, res) => {
  let avatarImg;

  if (req.user.avatar !== undefined) {
    avatarImg = req.user.avatar;
  } else {
    avatarImg = "https://i.imgur.com/6VBx3io.png";
  }

  res.render("profile", {
    tabTitle: "Bookify Store - Profile",
    fileCss: "css/styles.css",
    name: req.user.first_name,
    lastName: req.user.last_name,
    email: req.user.email,
    role: req.user.role,
    registerWith: req.user.registerWith,
    avatar: avatarImg,
  });
});

viewRouter.get("/chat", passportCall(JwtStrategy), async (req, res) => {
  const randomUser = `Anonymous${Math.floor(Math.random() * 1000000)}`;

  res.render("chat", {
    tabTitle: "Bookify Store",
    pageTitle: "Chat Room",
    messages: await chatServices.getMessages(),
    username: randomUser,
    fileCss: "css/styles.css",
  });
});

viewRouter.get("/products", passportCall(JwtStrategy), async (req, res) => {
  const { limit, page, sort, query } = req.query;

  const productData = await productServices.getProducts(
    limit,
    page,
    sort,
    query
  );

  const payloadProducts = productData.payload;

  let productsView = payloadProducts.map((product) => {
    return Object.assign({}, product);
  });

  const arrayPages = [];

  for (let i = 1; i <= productData.totalPages; i++) {
    arrayPages.push({
      page: i,
      limit: productData.limit,
      isActive: i === productData.page ? true : false,
    });
  }

  const nProduct =
    productData.page === "1"
      ? productData.docsPerPage
      : productData.limit * (productData.page - 1) + productData.docsPerPage;

  res.render("products", {
    tabTitle: "Bookify Store",
    pageTitle: "All products",
    products: productsView,
    controllers: productData,
    fileCss: "css/styles.css",
    name: req.user.first_name,
    email: req.user.email,
    role: req.user.role,
    nProduct: nProduct,
    pages: arrayPages,
  });
});

viewRouter.get("/product/:pid", passportCall(JwtStrategy), async (req, res) => {
  const { pid } = req.params;

  const productInfo = await productServices.getProductById(pid);

  res.render("productDetail", {
    tabTitle: "Bookify Store",
    pageTitle: "All products",
    product: productInfo,
    fileCss: "css/styles.css",
    name: req.user.user,
  });
});

viewRouter.get(
  "/realtimeproducts",
  passportCall(JwtStrategy),
  async (req, res) => {
    const payloadProducts = (await productServices.getProducts).payload;

    let productsView = payloadProducts.map((product) => {
      return Object.assign({}, product);
    });

    res.render("realTimeProducts", {
      tabTitle: "Bookify Store",
      pageTitle: "Real Time Products",
      products: productsView,
      fileCss: "css/styles.css",
    });
  }
);

viewRouter.get("/cart", passportCall(JwtStrategy), async (req, res) => {
  const userId = req.user.userId;

  const payloadCarts = await cartServices.getCartByUserId(userId);

  res.render("cart", {
    tabTitle: "Bookify Store",
    pageTitle: "Real Time Products",
    products: payloadCarts,
    fileCss: "css/styles.css",
  });
});

export default viewRouter;
