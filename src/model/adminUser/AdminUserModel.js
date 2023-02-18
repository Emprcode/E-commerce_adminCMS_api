import AdminUserSchema from "./AdminUserSchema.js"

//create new admin-user
export const createUser = (userObj) => {
    return AdminUserSchema(userObj).save()
}

// find user by filter (filter must be an object)

export const findAdmin = (filter) => {
    return AdminUserSchema.findOne(filter)
}

//find by filter and update
export const findAdminAndUpdate = (filter, obj) => {
    return AdminUserSchema.findOneAndUpdate(filter, obj, {new: true})
}


