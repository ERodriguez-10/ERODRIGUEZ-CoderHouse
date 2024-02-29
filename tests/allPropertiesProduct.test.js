import logger from "#utils/logger.js";

export const allPropertiesProductTest = (productGenerated) => {
  logger.debug("=================================");
  logger.debug(
    "[Test #1] - A product should have all properties to be created."
  );

  const hasNonNullProperties = (product) => {
    return Object.keys(product).every((key) => product[key] !== null);
  };

  hasNonNullProperties(productGenerated)
    ? logger.debug("[Result #1] - Test OK.")
    : logger.debug("[Result #1] - Test FAILED");

  logger.debug("=================================");
};
