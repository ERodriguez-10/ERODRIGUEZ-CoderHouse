import mongoose from "mongoose";

const productCollection = "products";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, max: 100 },
  description: { type: String, required: true, max: 250 },
  price: { type: Number, required: true, min: 0, max: 1000000 },
  thumbnail: { type: String, required: true },
  code: { type: String, required: true, max: 21, unique: true },
  stock: { type: Number, required: true },
  category: {
    type: String,
    required: true,
    max: 50,
    enum: [
      "Drama",
      "Horror",
      "Fiction",
      "Non-fiction",
      "Design",
      "History",
      "Biography",
      "Poetry",
      "Children",
      "Cooking",
      "Travel",
      "Health",
      "Science",
      "Art",
      "Religion",
      "Comics",
      "Manga",
      "Fantasy",
      "Romance",
      "Thriller",
      "Mystery",
      "Young Adult",
      "Humor",
      "Autobiography",
      "Other",
    ],
  },
  status: { type: Boolean, required: true, max: 100 },
});

const productModel = mongoose.model(productCollection, productSchema);

export default productModel;
