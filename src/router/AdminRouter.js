import express from "express";
import {
  createUser,
  findAdmin,
  findAdminAndUpdate,
} from "../model/adminUser/AdminUserModel.js";
import { v4 as uuidv4 } from "uuid";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import {
  adminSignUpEmailVerification,
  otpNotification,
  resetPasswordNotification,
} from "../utils/emails.js";
import { otpGenerator } from "../utils/randomGenerator.js";
import { createSession, deleteSession } from "../model/session/SessionModel.js";
import {
  adminRegistrationValidation,
  emailVerificationValidation,
} from "../middleware/joiMiddleware.js";

const router = express.Router();

//admin registration

router.post("/", adminRegistrationValidation, async (req, res, next) => {
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

      adminSignUpEmailVerification(result, uniqueUrl);

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

router.post(
  "/email-verify",
  emailVerificationValidation,
  async (req, res, next) => {
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
  }
);

//admin login

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // check if email exist
    const admin = await findAdmin({ email });

    if (admin?.status === "inactive") {
      return res.json({
        status: "error",
        message: "User inactive, check your email and verify your account",
      });
    }

    //is password match

    if (admin?._id) {
      const isPasswordMatch = comparePassword(password, admin.password);

      if (isPasswordMatch) {
        admin.password = undefined;
        admin.__v = undefined;

        return res.json({
          status: "success",
          message: "Login Successful",
          admin,
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

//otp request

router.post("/request-otp", async (req, res, next) => {
  try {
    const { email } = req.body;

    if (email && typeof email === "string") {
      //does email exist
      const user = await findAdmin({ email });

      if (user?._id) {
        // create otp and store in new table
        const optLength = 6;
        const token = otpGenerator(optLength);

        const obj = {
          token,
          associate: email,
        };

        const result = await createSession(obj);

        //send that otp in email
        if (result?._id) {
          otpNotification({ fName: user.fName, email, token });
        }
      }
    }
    res.json({
      status: "success",
      message: "You will receive OTP in given email address",
    });
  } catch (error) {
    next(error);
  }
});

//otp
router.patch("/reset-password", async (req, res, next) => {
  try {
    const { email, password, otp } = req.body;
    //check if email and otp exist in db
    //delete the record

    const filter = { token: otp, associate: email };
    const result = await deleteSession(filter);
    // console.log(result)

    if (result?._id) {
      //encrypt the password
      //updateuser table with password by email
      const hashedPass = hashPassword(password);
      const user = await findAdminAndUpdate(
        { email },
        { password: hashedPass }
      );

      console.log(user);

      if (user?._id) {
        //send email notification
        resetPasswordNotification(user);
        return {
          status: "success",
          message: "your password has been updated",
        };
      }
    }

    res.json({
      status: "error",
      message: "Error",
    });
  } catch (error) {
    next(error);
  }
});
