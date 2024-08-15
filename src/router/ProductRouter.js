import express from "express";
import { newProductValidation } from "../middleware/joiMiddleware.js";
import slugify from "slugify";
import multer from "multer";
import {
  createProduct,
  deleteSingleItem,
  getAllProducts,
} from "../model/product/ProductModel.js";
import { adminAuth } from "../middleware/authMiddleware.js";
import { uploadFile } from "../utils/s3.js";
import cloudinary from "../utils/cloudinary.js";

const router = express.Router();

// const imgFolderPath = "public/img/products";
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     let error = null;
//     //validation error
//     cb(error, imgFolderPath);
//   },
//   filename: (req, file, cb) => {
//     let error = null;

//     const fullFileName = Date.now() + "_" + file.originalname;
//     cb(error, fullFileName);
//   },
// });

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/",
  adminAuth,
  upload.array("images", 5),
  newProductValidation,
  async (req, res, next) => {
    try {
      // const s3Images = await uploadFile(req.files);
      // console.log("s3Images", s3Images);
      // const images = s3Images.map((item, i) => item.Location);

      // req.body.images = images;
      // req.body.thumbnail = images[0];

      const b64 = Buffer?.from(req.files[0].buffer).toString("base64");
      let dataURI = "data:" + req.files[0].mimetype + ";base64," + b64;
      if (req.files) {
        const uploadedResponse = await cloudinary.uploader.upload(dataURI, {
          upload_preset: "acexsports",
        });

        //images

        const images = uploadedResponse.url;

        req.body.thumbnail = images;
        req.body.images = images;
      }

      req.body.slug = slugify(req.body.name, { trim: true, lower: true });

      const result = await createProduct(req.body);
      console.log(result);

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

router.get("/", async (req, res, next) => {
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

router.delete("/", async (req, res, next) => {
  try {
    const result = await deleteSingleItem(req.body);

    result?._id
      ? res.json({
          status: "success",
          message: "The product deleted successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to delete product, Please try again later!",
        });
    // console.log(result)
  } catch (error) {
    next(error);
  }
});

export default router;
