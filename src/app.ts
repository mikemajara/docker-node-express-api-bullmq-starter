import express, { Application, Request, Response, Router } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

require("dotenv").config();

const app: Application = express();

const middlewares = require("./middlewares");

import routes from "./routes";
import api from "./api";

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

// app.use("/api", routes);
app.use("/api/v1", routes);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
