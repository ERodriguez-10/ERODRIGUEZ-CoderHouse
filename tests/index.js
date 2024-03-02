import { allPropertiesProductTest } from "#tests/allPropertiesProduct.test.js";
import { missingPropertiesProductTest } from "#tests/missingPropertiesProduct.test.js";

import { generateFakeProduct } from "#utils/fakerData.js";
import logger from "#utils/logger.js";

export default function tests() {
  logger.debug("Initializing tests");

  // Order properties
  // ----------------
  // generateFakeProduct(title, description, price, thumbnail, code, stock, category, status)

  const productGenerated = generateFakeProduct();

  allPropertiesProductTest(productGenerated);

  const missingProperty = generateFakeProduct({
    title: null,
    description: "This is not a valid product",
    price: null,
  });

  missingPropertiesProductTest(missingProperty);
}
