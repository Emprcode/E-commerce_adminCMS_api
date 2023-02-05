import AdminUserSchema from "./AdminUserSchema.js"

//create new admin-user
export const createUser = (userObj) => {
    return AdminUserSchema(userObj).save()
}

// find user by filter (filter must be an object)

export const findAdmin = (filter) => {
    return AdminUserSchema.findOne(filter)
}