export const allPropertiesProductTest = (productGenerated) => {
  console.log("=================================");
  console.log("[Test #1]: A product should have all properties to be created.");

  const hasNonNullProperties = (product) => {
    return Object.keys(product).every((key) => product[key] !== null);
  };

  hasNonNullProperties(productGenerated)
    ? console.log("[Result #1]: Test OK.")
    : console.log("[Result #1]: Test FAILED");

  console.log("=================================");
};
