import express from "express";
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(async () => {
    const serverPort = process.env.SERVER_PORT;

    const app = express();
    app.use(express.json());

    app.get("/", (req, res) => {
      return res.json(`MY HUB API`);
    });

    return app.listen(serverPort, () =>
      console.log(`Server running on port ${serverPort}`)
    );
  })
  .catch((error) => console.log(error));
