import express from "express";
import { AppDataSource } from "./data-source";
import categoriesRoutes from "./routes/categories.routes";

AppDataSource.initialize()
  .then(async () => {
    const serverPort = process.env.SERVER_PORT;

    const app = express();
    app.use(express.json());

    //routing middlewares
    app.use("/categories", categoriesRoutes);

    return app.listen(serverPort, () =>
      console.log(`Server running on port ${serverPort}`)
    );
  })
  .catch((error) => console.log(error));
