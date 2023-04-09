import express from "express";
import {
  addNewProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../model/product/ProductModel.js";
import slugify from "slugify";

const router = express.Router();

// add new product

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.name, { lower: true, trim: true });
    console.log(req.body)
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

//get all products
router.get("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await getProducts();

    res.json({
      status: "success",
      message: "All product fetched successfully!",
      result,
    });
  } catch (error) {
    next(error);
  }
});

//update  products
router.put("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await updateProduct(req.body);
    result?._id
      ? res.json({
          status: "success",
          message: "All product fetched successfully!",
        })
      : res.json({
          status: "error",
          message: "unable to update now, Please try again later",
        });
  } catch (error) {
    next(error);
  }
});

//get all products
router.delete("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await deleteProduct(req.body);

    res.json({
      status: "success",
      message: "All product fetched successfully!",
      result,
    });
  } catch (error) {
    next(error);
  }
});
export default router;
