import "./config/DotEnvConfig.js";
import express from "express";
import { CorsConfig } from "./config/corsConfig.js";
import { AppConnect } from "./config/appConigRunner.js";
import { CustomErrorHandler } from "./middlewares/ErrorHandlerMiddleware.js";
import { AppError } from "./utils/AppError.js";
import { healthRouter } from "./routes/healthRouter.js";

const app = express();

CorsConfig(app);
app.use(express.json());

app.use("/api/health", healthRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(CustomErrorHandler);

AppConnect(app);