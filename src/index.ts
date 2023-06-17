import express from "express";
import { AppDataSource } from "./data-source";

import authRoutes from "./routes/auth.routes";
import categoriesRoutes from "./routes/categories.routes";
import usersRoutes from "./routes/users.routes";

AppDataSource.initialize()
  .then(async () => {
    const serverPort = process.env.SERVER_PORT;

    const app = express();
    app.use(express.json());

    //routing middlewares
    app.use("/categories", categoriesRoutes);
    app.use("/users", usersRoutes);
    app.use("/", authRoutes);

    return app.listen(serverPort, () =>
      console.log(`Server running on port ${serverPort}`)
    );
  })
  .catch((error) => console.log(error));
