import { configEnv } from "#configs/env.config.js";
import MongoSingleton from "#configs/db/mongodb-singleton.js";

import AuthRepository from "#services/repository/auth.repository.js";
import CartRepository from "#services/repository/cart.repository.js";
import ChatRepository from "#services/repository/chat.repository.js";
import ProductRepository from "#services/repository/product.repository.js";

let authServices;
let cartServices;
let chatServices;
let productServices;

import logger from "#utils/logger.js";

async function initializeMongoService() {
  try {
    await MongoSingleton.getInstance();

    const { default: AuthServiceMongo } = await import(
      "#services/dao/mongo/auth.dao.js"
    );
    let authDao = new AuthServiceMongo();
    authServices = new AuthRepository(authDao);

    const { default: CartServiceMongo } = await import(
      "#services/dao/mongo/cart.dao.js"
    );
    let cartDao = new CartServiceMongo();
    cartServices = new CartRepository(cartDao);

    const { default: ChatServiceMongo } = await import(
      "#services/dao/mongo/chat.dao.js"
    );
    let chatDao = new ChatServiceMongo();
    chatServices = new ChatRepository(chatDao);

    const { default: ProductServiceMongo } = await import(
      "#services/dao/mongo/product.dao.js"
    );
    let productDao = new ProductServiceMongo();
    productServices = new ProductRepository(productDao);

    logger.info("[Server] - All services working with MongoDB are loaded.");
  } catch (error) {
    logger.error("[ERROR]: Failed initialize MongoDB: " + error);
    process.exit(1);
  }
}

switch (configEnv.PERSISTANCE) {
  case "mongodb":
    logger.info("[Config] - Environment Mode Option: " + configEnv.MODE);
    logger.info("[Config] - Persistence Mode Option: " + configEnv.PERSISTANCE);
    logger.info("[Config] - Test Mode Option: " + configEnv.TESTS);

    initializeMongoService();
    break;
  default:
    logger.error("Persistance mode not valid: ", configEnv.PERSISTANCE);
    process.exit(1);
}

export { authServices, cartServices, chatServices, productServices };
