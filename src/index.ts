import express from "express";
import { AppDataSource } from "./data-source";

import authRoutes from "./routes/authRoutes";
import categoriesRoutes from "./routes/categoriesRoutes";
import transactionsRoutes from "./routes/transactionsRoutes";
import usersRoutes from "./routes/usersRoutes";

AppDataSource.initialize()
  .then(async () => {
    const serverPort = process.env.SERVER_PORT;

    const app = express();
    app.use(express.json());

    //routing middlewares
    app.use("/", authRoutes);
    app.use("/categories", categoriesRoutes);
    app.use("/users", usersRoutes);
    app.use("/transactions", transactionsRoutes);

    return app.listen(serverPort, () =>
      console.log(`Server running on port ${serverPort}`)
    );
  })
  .catch((error) => console.log(error));
