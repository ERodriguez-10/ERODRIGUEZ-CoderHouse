import { Router } from "express";

import { getCartByUserId } from "#utils/fetch.js";
import { chatController } from "#controllers/chat/index.js";
import { productController } from "#controllers/product/index.js";
import { passportCall } from "#utils/passport.js";
import JwtStrategy from "#configs/jwt.config.js";

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

  if (req.session.passport !== undefined) {
    avatarImg = req.session.passport.user.avatar;
  } else {
    avatarImg = "https://i.imgur.com/6VBx3io.png";
  }

  res.render("profile", {
    tabTitle: "Bookify Store - Profile",
    fileCss: "css/styles.css",
    name: req.session.user,
    lastName: req.session.lastName,
    email: req.session.email,
    role: req.session.role,
    registerWith: req.session.registerWith,
    avatar: avatarImg,
  });
});

viewRouter.get("/chat", passportCall(JwtStrategy), async (req, res) => {
  const randomUser = `Anonymous${Math.floor(Math.random() * 1000000)}`;

  res.render("chat", {
    tabTitle: "Bookify Store",
    pageTitle: "Chat Room",
    messages: await chatController.getMessages(),
    username: randomUser,
    fileCss: "css/styles.css",
  });
});

viewRouter.get("/products", passportCall(JwtStrategy), async (req, res) => {
  const { limit, page, sort, query } = req.query;

  const productData = await productController.getProducts(
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
    name: req.user.user,
    email: req.user.email,
    role: req.user.role,
    nProduct: nProduct,
    pages: arrayPages,
  });
});

viewRouter.get("/product/:pid", passportCall(JwtStrategy), async (req, res) => {
  const { pid } = req.params;

  const productInfo = await productController.getProductById(pid);

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
    const payloadProducts = (await productController.getProducts()).payload;

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
  const userId = req.session.userId;

  const payloadCarts = await chatController.getCartByUserId(userId);

  res.render("cart", {
    tabTitle: "Bookify Store",
    pageTitle: "Real Time Products",
    products: payloadCarts,
    fileCss: "css/styles.css",
  });
});

export default viewRouter;
