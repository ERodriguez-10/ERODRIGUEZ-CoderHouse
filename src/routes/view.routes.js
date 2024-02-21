import JwtStrategy from "#configs/auth/jwt.config.js";

import {
  cartServices,
  chatServices,
  productServices,
} from "#services/factory.js";

import UserDto from "#services/dto/user.dto.js";

import { passportCall } from "#utils/passport.js";

import { Router } from "express";
import {
  hasAdminPermission,
  hasUserPermission,
} from "../middlewares/hasPermissions.middleware.js";

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

  const userDto = new UserDto(req.user, avatarImg);

  res.render("profile", {
    tabTitle: "Bookify Store - Profile",
    fileCss: "css/styles.css",
    user: userDto,
    name: req.user.first_name,
    isUser: req.user.role === "user" ? true : false,
    isAdmin: req.user.role === "Admin" ? true : false,
  });
});

viewRouter.get(
  "/profile/my-products",
  passportCall(JwtStrategy),
  async (req, res) => {
    const productData = await productServices.getProducts(
      undefined,
      undefined,
      undefined,
      undefined
    );

    const payloadProducts = productData.payload;

    let productsView = payloadProducts.map((product) => {
      return Object.assign({}, product);
    });

    let avatarImg;

    if (req.user.avatar !== undefined) {
      avatarImg = req.user.avatar;
    } else {
      avatarImg = "https://i.imgur.com/6VBx3io.png";
    }

    res.render("userProducts", {
      tabTitle: "Bookify Store - Profile",
      fileCss: "css/styles.css",
      products: productsView,
      name: req.user.first_name,
      isUser: req.user.role === "user" ? true : false,
      isAdmin: req.user.role === "Admin" ? true : false,
    });
  }
);

viewRouter.get(
  "/chat",
  passportCall(JwtStrategy),
  hasUserPermission(),
  async (req, res) => {
    res.render("chat", {
      tabTitle: "Bookify Store",
      pageTitle: "Chat Room",
      messages: await chatServices.getMessages(),
      username: req.user.first_name,
      fileCss: "css/styles.css",
      name: req.user.first_name,
      isUser: req.user.role === "user" ? true : false,
      isAdmin: req.user.role === "Admin" ? true : false,
    });
  }
);

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
    isUser: req.user.role === "user" ? true : false,
    isAdmin: req.user.role === "Admin" ? true : false,
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
    name: req.user.first_name,
    isUser: req.user.role === "user" ? true : false,
    isAdmin: req.user.role === "Admin" ? true : false,
  });
});

viewRouter.get(
  "/adminPanel",
  passportCall(JwtStrategy),
  hasAdminPermission(),
  async (req, res) => {
    const productData = await productServices.getProducts();

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

    res.render("adminPanel", {
      tabTitle: "Bookify Store",
      pageTitle: "Real Time Products",
      products: productsView,
      controllers: productData,
      fileCss: "css/styles.css",
      name: req.user.first_name,
      nProduct: nProduct,
      pages: arrayPages,
      isUser: req.user.role === "user" ? true : false,
      isAdmin: req.user.role === "Admin" ? true : false,
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
    name: req.user.first_name,
    isUser: req.user.role === "user" ? true : false,
    isAdmin: req.user.role === "Admin" ? true : false,
  });
});

export default viewRouter;
