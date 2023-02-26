import CategorySchema from "./CategorySchema.js"

//post category
export const createCategory = (obj) => {
    return CategorySchema(obj).save()
}
//get category
export const getCategory = (filter) => {
    return CategorySchema.find(filter)
}
