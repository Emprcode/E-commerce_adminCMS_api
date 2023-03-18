import SessionSchema from "./SessionSchema.js"

//create new token
export const createSession = (obj) => {
    return SessionSchema(obj).save()
}
//get session
export const getSession = (filter) => {
    return SessionSchema.findOne(filter)
}
//delete token {token: otp & associate: email}
export const deleteSession = (filter) => {
    return SessionSchema.findOneAndDelete(filter)
}
