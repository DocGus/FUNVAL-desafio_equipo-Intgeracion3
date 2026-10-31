import { env } from "./config/env";
import app from "./app";

app.listen(env.port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${env.port}`);
  console.log(`Swagger disponible en http://localhost:${env.port}/api-docs`);
});
