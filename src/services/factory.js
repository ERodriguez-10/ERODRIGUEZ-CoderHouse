import { configEnv } from "#configs/env.config.js";
import MongoSingleton from "#configs/db/mongodb-singleton.js";

let authServices;
let cartServices;
let chatServices;
let productServices;

async function initializeMongoService() {
  console.log("[SERVER]: Initializing MongoDB services");

  try {
    await MongoSingleton.getInstance();

    const { default: AuthServiceMongo } = await import(
      "#services/auth.services.js"
    );
    authServices = new AuthServiceMongo();

    const { default: CartServiceMongo } = await import(
      "#services/cart.services.js"
    );
    cartServices = new CartServiceMongo();

    const { default: ChatServiceMongo } = await import(
      "#services/chat.services.js"
    );
    chatServices = new ChatServiceMongo();

    const { default: ProductServiceMongo } = await import(
      "#services/product.services.js"
    );
    productServices = new ProductServiceMongo();
    console.log("[SERVER]: All services are loaded.");
  } catch (error) {
    console.error("[ERROR]: Failed initialize MongoDB: " + error);
    process.exit(1);
  }
}

switch (configEnv.PERSISTANCE) {
  case "mongodb":
    initializeMongoService();
    break;
  default:
    console.error("Persistance mode not valid: ", configEnv.PERSISTANCE);
    process.exit(1);
}

export { authServices, cartServices, chatServices, productServices };
