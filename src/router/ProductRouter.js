import express from "express";
import { newItemsValidation } from "../middleware/joiMiddleware.js";
import { createItems } from "../model/items/ItemsModel.js";
import slugify from "slugify";
import { getAllItems } from "../model/items/ItemsModel.js";
import multer from "multer";

const router = express.Router();

const imgFolderPath = "public/img/items";
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
  "/",
  upload.array("images"),
  newItemsValidation,
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
      const result = await createItems(req.body);

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
    const result = await getAllItems();
    res.json({
      status: "success",
      message: "here is the product list",
      result,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
