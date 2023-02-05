import express from "express";
import { createUser } from "../model/adminUser/AdminUserModel.js";

const router = express.Router();

//admin registration

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await createUser(req.body);
    console.log(result)

    result?._id
      ? res.json({
          status: "success",
          message: "you have created as a admin",
        })
      : res.json({
          status: "error",
          message: "unable to create new admin, please try again later",
        });
  } catch (error) {
    error.errorCode = 500;
    next(error);
  }
});

//admin login

export default router;
