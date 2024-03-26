import swaggerJsDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Bookify Store - OpenAPI 3.0",
      description:
        "Here you have all the endpoints available at Bookify Store Server. This is a backend for an e-commerce. You have role system, CRUD for products, payments support.",
      version: "1.12.0",
      contact: {
        email: "erodriguez.rrii@gmail.com",
      },
      license: {
        name: "Apache 2.0",
        url: "http://www.apache.org/licenses/LICENSE-2.0.html",
      },
    },
    servers: [
      {
        url: "http://localhost:8080/api/v1",
      },
    ],
  },
  apis: ["./**/*.yaml"],
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;
