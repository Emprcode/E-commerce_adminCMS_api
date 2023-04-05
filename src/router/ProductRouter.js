import express from "express";
import { addNewProduct } from "../model/product/ProductModel";

const router = express.Router();

// add new product

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await addNewProduct(req.body);

    result?._id
      ? res.json({
          status: "success",
          message: "New Product added Successfully!",
        })
      : res.json({
          status: "error",
          message: "Unable to add new product, Please try again later",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
