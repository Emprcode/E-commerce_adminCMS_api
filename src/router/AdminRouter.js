import express from "express";
import { createUser } from "../model/adminUser/AdminUserModel.js";
import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from "../utils/bcrypt.js";
import { adminSignUPEmailVerification } from "../utils/emails.js";


const router = express.Router();

//admin registration

router.post("/", async (req, res, next) => {
  try {
    // console.log(req.body);
    req.body.password =  hashPassword(req.body.password)
    req.body.verificationCode = uuidv4();
    const result = await createUser(req.body);
    // console.log(result)


   if (result?._id) {
    //we need to create a unique url and send email to the client
    //process for the email
    const uniqueUrl = `http://localhost:8000/verify?c=${result.verificationCode}&email=${result.email}`;

    //call email service

    adminSignUPEmailVerification(result, uniqueUrl)

    
       res.json({
          status: "success",
          message: "We have sent an email verification linkto your email. Please check your email and follow your instruction to activate your account",
        })
        return }
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

//admin login

export default router;
