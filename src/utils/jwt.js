import Jwt from "jsonwebtoken";
import { findAdminAndUpdate } from "../model/adminUser/AdminUserModel.js";
import { createSession } from "../model/session/SessionModel.js";

//payload must be an object
export const signAccessJWT = async (payload) => {
  const token = Jwt.sign(payload, process.env.ACCESS_JWT, { expiresIn: "15m" });

  //store in session table

  await createSession({ token });

  return token;
};

//verify token

export const verifyAccessJWT = (token) => {
  try {
    return Jwt.verify(token, process.env.ACCESS_JWT);
  } catch (error) {
    return error.message;
  }
};
export const verifyRefreshJWT = (token) => {
  try {
    return Jwt.verify(token, process.env.ACCESS_JWT);
  } catch (error) {
    return error.message;
  }
};

export const signRefreshJWT = async (payload) => {
  const token = Jwt.sign(payload, process.env.REFRESH_JWT, {
    expiresIn: "30d",
  });

  // store thr user in user table

  await findAdminAndUpdate(payload, { refreshJWT: token });
  return token;
};
