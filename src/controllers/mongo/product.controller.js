import productModel from "../../models/product.model.js";

class ProductController {
  constructor() {
    this.productModel = productModel;
  }

  async getProducts(limit, page, sort, query) {
    // Validate filters
    let limitFilter = limit ?? 10;
    let pageFilter = page ?? 1;

    // If sort is undefined, not any sort. Else order by sort;
    let sortFilter;
    if (!sort) {
      sortFilter = "";
    } else {
      sort === "asc" ? (sortFilter = "asc") : (sortFilter = "desc");
    }

    // Validate query
    let queryFilter = query !== undefined ? query : "";

    // Variable to save results
    let productPaginate;

    // Case where queryFilter and sortFilter are passed
    if (queryFilter && sortFilter) {
      productPaginate = await this.productModel.paginate(
        { category: query },
        { limit: limitFilter, page: pageFilter, sort: { price: sortFilter } }
      );
    }

    // Case where only sortFilter are passed
    if (!queryFilter && sortFilter) {
      productPaginate = await this.productModel.paginate(
        {},
        { limit: limitFilter, page: pageFilter, sort: { price: sortFilter } }
      );
    }

    // Case where only queryFilter are passed
    if (queryFilter && !sortFilter) {
      productPaginate = await this.productModel.paginate(
        { category: query },
        { limit: limitFilter, page: pageFilter }
      );
    }

    // Case where no queryFilter or sortFilter are passed
    if (!queryFilter && !sortFilter) {
      productPaginate = await this.productModel.paginate(
        {},
        { limit: limitFilter, page: pageFilter }
      );
    }

    let nextLink;
    let prevLink;

    if (productPaginate.hasNextPage) {
      let nextPageNumber = Number(pageFilter) + 1;
      nextLink = `http://localhost:8080/api/products?limit=${limitFilter}&page=${nextPageNumber}`;
    }

    if (productPaginate.hasNextPage) {
      let prevPageNumber = Number(pageFilter) - 1;
      prevLink = `http://localhost:8080/api/products?limit=${limitFilter}&page=${prevPageNumber}`;
    }

    let responseObject = {
      status: productPaginate.totalDocs > 0 ? "success" : "error",
      payload: productPaginate.docs,
      totalPages: productPaginate.totalPages,
      prevPage: productPaginate.prevPage,
      nextPage: productPaginate.nextPage,
      page: productPaginate.page,
      hasPrevPage: productPaginate.hasPrevPage,
      hasNextPage: productPaginate.hasNextPage,
      prevLink: productPaginate.hasPrevPage ? prevLink : null,
      nextLink: productPaginate.hasNextPage ? nextLink : null,
    };

    return responseObject;
  }

  async getProductById(id) {
    const productSelected = await this.productModel.findById(id).lean();
    if (productSelected !== null) {
      return productSelected;
    } else {
      throw new Error("Product not found");
    }
  }

  async addProduct(product) {
    try {
      const productCreated = await this.productModel.create(product);
      return productCreated;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async updateProduct(id, product) {
    return await this.productModel.updateOne({ _id: id }, product);
  }

  async deleteProduct(id) {
    return await this.productModel.deleteOne({ _id: id });
  }
}

export default ProductController;
