import { faker } from "@faker-js/faker";

export const generateFakeProduct = (
  title,
  description,
  price,
  thumbnail,
  code,
  stock,
  category,
  status
) => {
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

  return {
    title: title === null || title ? title : faker.commerce.productName(),
    description:
      description === null || description
        ? description
        : faker.commerce.productDescription(),
    price:
      price === null || price
        ? price
        : faker.commerce.price({ min: 0, max: 10000 }),
    thumbnail:
      thumbnail === null || thumbnail ? thumbnail : faker.image.url(300, 300),
    code: code === null || code ? code : faker.string.nanoid(21).toUpperCase(),
    stock: stock === null || stock ? stock : faker.number.int(200),
    category:
      category === null || category
        ? category
        : EnumCategory[Math.floor(Math.random() * EnumCategory.length)],
    status: status === null || status ? status : faker.datatype.boolean(),
  };
};
