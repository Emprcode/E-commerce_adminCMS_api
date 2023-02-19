import express from "express";
import {
  createUser,
  findAdmin,
  findAdminAndUpdate,
} from "../model/adminUser/AdminUserModel.js";
import { v4 as uuidv4 } from "uuid";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { adminSignUPEmailVerification } from "../utils/emails.js";

const router = express.Router();

//admin registration

router.post("/", async (req, res, next) => {
  try {
    // console.log(req.body);
    req.body.password = hashPassword(req.body.password);
    req.body.verificationCode = uuidv4();
    const result = await createUser(req.body);
    // console.log(result)

    if (result?._id) {
      //we need to create a unique url and send email to the client
      //process for the email
      const uniqueUrl = `http://localhost:3000/verify?c=${result.verificationCode}&email=${result.email}`;

      //call email service

      adminSignUPEmailVerification(result, uniqueUrl);

      res.json({
        status: "success",
        message:
          "We have sent an email verification linkto your email. Please check your email and follow your instruction to activate your account",
      });
      return;
    }
    res.json({
      status: "error",
      message: "unable to create new admin, please try again later",
    });
  } catch (error) {
    error.errorCode = 500;
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.errorCode = 200;
      error.message =
        "There is already an account exist associated with this email.";
    }
    next(error);
  }
});

// email verification

router.post("/email-verify", async (req, res, next) => {
  try {
    console.log(req.body);
    const obj = {
      status: "active",
      verificationCode: "",
      isEmailVerified: true,
    };
    const result = await findAdminAndUpdate(req.body, obj);

    if (result?._id) {
      res.json({
        status: "success",
        message: "Your email is verified, You can login now!",
      });
      return;
    }

    res.json({
      status: "error",
      message: "Invalid link",
    });
  } catch (error) {
    next(error);
  }
});

//admin login

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // check if email exist
    const result = await findAdmin({ email });

    if (result?.status === "inactive") {
      return res.json({
        status: "error",
        message: "User inactive, check your email and verify your account",
      });
    }

    //is password match

    if (result?._id) {
      const isPasswordMatch = comparePassword(password, result.password);

      if (isPasswordMatch) {
        result.password = undefined;
        result.__v = undefined;

        return res.json({
          status: "success",
          message: "Login Successful",
          result,
        });
      }
    }

    res.json({
      status: "error",
      message: "Invalid logging details",
    });
  } catch (error) {
    next(error);
  }
});
export default router;
