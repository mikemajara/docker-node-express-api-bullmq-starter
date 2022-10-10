import express, { Application, Request, Response, Router } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

require("dotenv").config();

const app: Application = express();

const middlewares = require("./middlewares");

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

app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
