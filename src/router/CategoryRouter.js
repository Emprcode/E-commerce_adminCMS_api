import express from "express";
import slugify from "slugify";
import { addCategoryValidation } from "../middleware/joiMiddleware.js";

import {
  createCategory,
  getCategories,
} from "../model/category/CategoryModel.js";

const router = express.Router();

//add
router.post("/", addCategoryValidation, async (req, res, next) => {
  try {
    req.body.slug = slugify(req.body.name, { lower: true, trim: true });
    //    const slug =  slugifyUrl(req.body.name)
    //    const data = {...req.body,slug }
    console.log(req.body);
    const result = await createCategory(req.body);

    result?._id
      ? res.json({
          status: "success",
          message: "New category added successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to add category, Please try again later",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      error.message =
        "The category slug already exist, Please change the category name and try again";
      error.errorCode = 200;
    }
    next(error);
  }
});

//get
router.get("/", async (req, res, next) => {
  try {
    const result = await getCategories();

    res.json({
      status: "success",
      message: "category added successfully",
      result,
    });
  } catch (error) {
    next(error);
  }
});

//update
router.put("/", async (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "category added successfully",
      result,
    });
  } catch (error) {
    next(error);
  }
});

//delete
router.delete("/", async (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "category added successfully",
      result,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
