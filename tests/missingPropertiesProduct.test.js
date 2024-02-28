export const missingPropertiesProductTest = (productGenerated) => {
  console.log(
    "[Test #2]: If a product has a missing property or is null shouldn't be created."
  );

  const hasNonNullProperties = (product) => {
    return Object.keys(product).every((key) => product[key] !== null);
  };

  hasNonNullProperties(productGenerated)
    ? console.log("[Result #2]: Test FAILED")
    : console.log("[Result #2]: Test OK.");

  console.log("=================================");
};
