import express from "express";
import { addPaymentOptionsValidation, updatePaymentOptionsValidation } from "../middleware/joiMiddleware.js";
import {  createPaymentOptions, deletePaymentOptions, getPaymentOptions, updatePaymentOptions } from "../model/payment/PaymentOptionsModel.js";

const router = express.Router();

//add
router.post("/", addPaymentOptionsValidation, async (req, res, next) => {
  try {
    
    console.log(req.body);
    const result = await createPaymentOptions(req.body);

    result?._id
      ? res.json({
          status: "success",
          message: "New payment added successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to add payment, Please try again later",
        });
  } catch (error) {
    // if (error.message.includes("E11000 duplicate key error")) {
    //   error.message =
    //     "The payment method already exist, Please change the payment name and try again";
    //   error.errorCode = 200;
    // }
    next(error);
  }
});

//get
router.get("/", async (req, res, next) => {
  try {
    const result = await getPaymentOptions();

    res.json({
      status: "success",
      message: "payment added successfully",
      result,
    });
  } catch (error) {
    next(error);
  }
});

//update
router.put("/", updatePaymentOptionsValidation, async (req, res, next) => {
  try {

    console.log(req.body)

    const result = await updatePaymentOptions(req.body)
    console.log(result)

    result?._id ? 
    res.json({
      status: "success",
      message: "payment updated successfully",
      
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
    const result = await deletePaymentOptions(_id);

    result?._id ? res.json({
      status: "success",
      message: "Payment Option deleted successfully",
    }) : res.json({
      status:"error",
      message:"Unable to delete the payment option, Please try again later"
    })
  } catch (error) {
    next(error);
  }
});

export default router;
