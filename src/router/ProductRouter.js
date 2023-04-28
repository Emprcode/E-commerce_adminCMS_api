import express from "express";
import { newProductValidation } from "../middleware/joiMiddleware.js";
import slugify from "slugify";
import multer from "multer";
import { createProduct, deleteSingleItem, getAllProducts } from "../model/product/ProductModel.js";
import { adminAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

const imgFolderPath = "public/img/products";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let error = null;
    //validation error
    cb(error, imgFolderPath);
  },
  filename: (req, file, cb) => {
    let error = null;

    const fullFileName = Date.now() + "_" + file.originalname;
    cb(error, fullFileName);
  },
});

const upload = multer({ storage });

router.post(
  "/", adminAuth,
  newProductValidation,
  upload.array("images", 5),
  async (req, res, next) => {
    try {
      console.log(req.body);

      //form data => req.body

      const newImages = req.files;
      //images
      const images = newImages.map((item, i) => item.path);
      req.body.images = images;
      req.body.thumbnail = images[0];

      req.body.slug = slugify(req.body.name, { trim: true, lower: true });
      const result = await createProduct(req.body);
      console.log(result)

      result?._id
        ? res.json({
            status: "success",
            message: "New Items added successfully!",
          })
        : res.json({
            status: "error",
            message: "Unable to add items, Please try again later.",
          });
    } catch (error) {
      if (error.message.includes("E11000 duplicate key error collection")) {
        error.message =
          "There is same items with same slug and sku, Pleae use different one";
      }
      next(error);
    }
  }
);

//get

router.get("/",   async (req, res, next) => {
  try {
    const result = await getAllProducts();
    res.json({
      status: "success",
      message: "here is the product list",
      result,
    });
    // console.log(result)
  } catch (error) {
    next(error);
  }
});

//delete

router.delete("/",   async (req, res, next) => {
  try {
    const result = await deleteSingleItem(req.body);

    result?._id ? res.json({
      status: "success",
      message: "The product deleted successfully",
    }) : res.json({
      status:"error",
      message:"Unable to delete product, Please try again later!"
    })
    // console.log(result)
  } catch (error) {
    next(error);
  }
});

export default router;
