import morgan from "morgan";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

const PORT = process.env.PORT || 8000;

//middleware

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// router

app.use("/", (req, res, next) => {
  res.json({
    status: "success",
    message: "success",
  });
});

//error handler

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`your server is running at http://localhost:${PORT}`);
});
