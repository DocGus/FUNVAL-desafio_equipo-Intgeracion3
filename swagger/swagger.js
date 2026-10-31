const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "API REST E-commerce - Documentación",
    description:
      "API REST colaborativa con Node.js, Express y TypeScript. Incluye Users, Products, Categories, Orders y OrderItems.",
    version: "1.0.0",
  },
  host: "localhost:3000",
  basePath: "/",
  schemes: ["http"],

  securityDefinitions: {
    ApiKeyAuth: {
      type: "apiKey",
      in: "header",
      name: "x-api-key",
      description: "API Key necesaria para operaciones protegidas.",
    },
  },
};

const outputFile = "./swagger/swagger-output.json";

const endpointsFiles = [
  "./src/app.ts",
  "./src/routes/users.routes.ts",
  "./src/routes/products.routes.ts",
  "./src/routes/categories.routes.ts",
  "./src/routes/orders.routes.ts",
  "./src/routes/orderItems.routes.ts",
];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log("Documentación Swagger generada correctamente");
});
