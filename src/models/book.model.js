import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const bookCollection = "products";

const bookSchema = new mongoose.Schema({
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
    ],
  },
  status: { type: Boolean, required: true, max: 100 },
});

bookSchema.plugin(mongoosePaginate);
const bookModel = mongoose.model(bookCollection, bookSchema);

export default bookModel;
