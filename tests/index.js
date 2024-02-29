import { allPropertiesProductTest } from "./allPropertiesProduct.test.js";
import { missingPropertiesProductTest } from "./missingPropertiesProduct.test.js";

import { generateFakeProduct } from "#utils/fakerData.js";

import logger from "#utils/logger.js";

export default function tests() {
  logger.debug("Initializing tests");

  // Order properties
  // ----------------
  // generateFakeProduct(title, description, price, thumbnail, code, stock, category, status)

  const productGenerated = generateFakeProduct();

  allPropertiesProductTest(productGenerated);

  const missingProperty = generateFakeProduct(
    null,
    "This is not a valid product",
    null
  );

  missingPropertiesProductTest(missingProperty);
}
