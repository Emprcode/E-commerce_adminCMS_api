import Joi from "joi";

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
export const adminRegistrationValidation = (req, res, next) => {
  const schema = Joi.object({
    fName: Joi.string().required(),
    lName: Joi.string().required(),
    address: Joi.string().allow("", null),
    phone: Joi.string().allow("", null),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(6).required(),
  });

  return validationProcessor(req, res, next, next);
};
export const emailVerificationValidation = (req, res, next) => {
  const schema = Joi.object({
    verificationCode: Joi.string().required(),

    email: Joi.string().email({ minDomainSegments: 2 }).required(),
  });
  return validationProcessor(req, res, next, next);
};
