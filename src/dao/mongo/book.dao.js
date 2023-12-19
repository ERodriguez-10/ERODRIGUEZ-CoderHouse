import bookModel from "../../models/book.model.js";

class BookDAO {
  constructor() {
    this.bookModel = bookModel;
  }

  async getBooks() {
    return await this.bookModel.find().lean();
  }

  async getBookById(id) {
    const productSelected = await this.bookModel.findById(id).lean();
    if (productSelected !== null) {
      return productSelected;
    } else {
      throw new Error("Product not found");
    }
  }

  getCategories() {
    return [
      "Art",
      "Autobiography",
      "Biography",
      "Children",
      "Comics",
      "Cooking",
      "Design",
      "Drama",
      "Fantasy",
      "Fiction",
      "Health",
      "History",
      "Horror",
      "Humor",
      "Manga",
      "Mystery",
      "Non-fiction",
      "Other",
      "Poetry",
      "Religion",
      "Romance",
      "Science",
      "Thriller",
      "Travel",
      "Young Adult",
    ];
  }

  async addBook(bookObject) {
    try {
      const bookCreated = await this.bookModel.create(bookObject);
      return bookCreated;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateBook(idBook, bookObject) {
    return await this.bookModel.updateOne({ _id: idBook }, bookObject);
  }

  async deleteBook(idBook) {
    return await this.bookModel.deleteOne({ _id: idBook });
  }
}

export default BookDAO;
