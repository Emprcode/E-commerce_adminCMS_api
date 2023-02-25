import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import express from "express";
import cors from "cors";

import AdminRouter from "./src/router/AdminRouter.js";
import { connectDb } from "./src/config/DbConfig.js";

const app = express();

const PORT = process.env.PORT || 8000;

//middleware

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//db connect
connectDb();

// router
app.use("/api/v1/admin", AdminRouter);

app.use("/", (req, res, next) => {
  res.json({
    
    message: "you do not have access here",
  });
});

//global error handler
app.use((error, req, res, next) => {
  console.log(error);
  const errorCode = error.errorCode || 404;

  res.status(errorCode).json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`your server is running at http://localhost:${PORT}`);
});
