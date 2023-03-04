import express from "express";
import slugify from "slugify";
import { addCategoryValidation, updateCategoryValidation } from "../middleware/joiMiddleware.js";

import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
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
router.put("/", updateCategoryValidation,  async (req, res, next) => {
  try {

    console.log(req.body)

    const result = await updateCategory(req.body)
    console.log(result)

    result?._id ? 
    res.json({
      status: "success",
      message: "category updated successfully",
      
    }) : res.json({
      status:"error",
      message:"Unable to update, please try again later"
    })
  } catch (error) {
    next(error);
  }
});

//delete
router.delete("/:_id", async (req, res, next) => {
  try {

    const {_id} = req.params
    const result = await deleteCategory(_id);

    result?._id ? res.json({
      status: "success",
      message: "category deleted successfully",
    }) : res.json({
      status:"error",
      message:"Unable to delete the category, Please try again later"
    })
  } catch (error) {
    next(error);
  }
});

export default router;
