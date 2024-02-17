export default class CartDto {
  constructor(cart) {
    this.products = cart.products;
    this.userId = cart.userId;
    this.hasPurchased = cart.hasPurchased;
  }
}
