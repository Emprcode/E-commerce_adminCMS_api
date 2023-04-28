import Joi from "joi";

const EMAIL = Joi.string().email({ minDomainSegments: 2 }).required();
const SHORT_STR = Joi.string().max(100);
const LONG_STR = Joi.string().max(500);
const NUMBER = Joi.number();

export const validationProcessor = (req, res, next, schema) => {
  try {
    const { error } = schema.validate(req.body);

    error
      ? res.json({
          status: "error",
          message: error,
        })
      : next();
  } catch (error) {
    next(error);
  }
};

//ADMIN REGISTER VALIDATION
export const adminRegistrationValidation = (req, res, next) => {
  const schema = Joi.object({
    fName: SHORT_STR.required(),
    lName: SHORT_STR.required(),
    address: SHORT_STR.allow("", null),
    phone: SHORT_STR.allow("", null),
    email: EMAIL,
    password: SHORT_STR.min(6).required(),
  });

  return validationProcessor(req, res, next, schema);
};

//EMAIL VERIFICATION VALIDATION
export const emailVerificationValidation = (req, res, next) => {
  const schema = Joi.object({
    verificationCode: SHORT_STR.required(),
    email: EMAIL,
  });
  return validationProcessor(req, res, next, schema);
};

//LOGIN VALIDATION
export const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    password: SHORT_STR.required(),
    email: EMAIL,
  });
  return validationProcessor(req, res, next, schema);
};


//add category validation

export const addCategoryValidation = (req, res, next) => {
  const schema = Joi.object({
    name: SHORT_STR.required(),
    
  });
  return validationProcessor(req, res, next, schema);
};
//update category validation

export const updateCategoryValidation = (req, res, next) => {
  const schema = Joi.object({
    _id: SHORT_STR.required(),
    name: SHORT_STR.required(),
    status: SHORT_STR.required(),
    
  });
  return validationProcessor(req, res, next, schema);
};
//update category validation

export const addPaymentOptionsValidation = (req, res, next) => {
  const schema = Joi.object({
    name: SHORT_STR.required(),
    description: SHORT_STR.required(),
    
  });
  return validationProcessor(req, res, next, schema);
};
//update category validation

export const updatePaymentOptionsValidation = (req, res, next) => {
  const schema = Joi.object({
    _id: SHORT_STR.required(),
    name: SHORT_STR.required(),
    status: SHORT_STR.required(),
    description: SHORT_STR.required(),
    
  });
  return validationProcessor(req, res, next, schema);
};

// add product  validation

export const newProductValidation = (req, res, next) => {
  const schema = Joi.object({
    status: SHORT_STR,
    name: SHORT_STR.required(),
    sku: SHORT_STR.required(),
    // parentCat: SHORT_STR.required(),
    price: NUMBER.required(),
    qty: NUMBER.required(),
    salesPrice: SHORT_STR,
    salesStartDate: SHORT_STR.allow("", null),
    salesEndDate: SHORT_STR.allow("", null),
    description: LONG_STR.required(),
    // thumbnail: LONG_STR.required(),


  })
  return validationProcessor(req, res, next, schema)
}