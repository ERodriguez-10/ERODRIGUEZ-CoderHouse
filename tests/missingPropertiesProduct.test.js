import logger from "#utils/logger.js";

export const missingPropertiesProductTest = (productGenerated) => {
  logger.debug(
    "[Test #2] - If a product has a missing property or is null shouldn't be created."
  );

  const hasNonNullProperties = (product) => {
    return Object.keys(product).every((key) => product[key] !== null);
  };

  hasNonNullProperties(productGenerated)
    ? logger.debug("[Result #2] - Test FAILED")
    : logger.debug("[Result #2] - Test OK.");

  logger.debug("=================================");
};
