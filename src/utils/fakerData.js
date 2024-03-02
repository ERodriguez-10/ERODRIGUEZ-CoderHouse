import { faker } from "@faker-js/faker";

const EnumCategory = [
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
];

export const generateFakeProduct = (product = {}) => {
  const defaultProduct = {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price({ min: 0, max: 10000 }),
    thumbnail: faker.image.url(300, 300),
    code: faker.string.nanoid(21).toUpperCase(),
    stock: faker.number.int(200),
    category: EnumCategory[Math.floor(Math.random() * EnumCategory.length)],
    status: faker.datatype.boolean(),
  };

  return { ...defaultProduct, ...product };
};
