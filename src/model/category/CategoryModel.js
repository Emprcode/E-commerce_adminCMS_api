import CategorySchema from "./CategorySchema.js"

//post category
export const createCategory = (obj) => {
    return CategorySchema(obj).save()
}
//get category
export const getCategories = () => {
    return CategorySchema.find()
}


//update
export const updateCategory = (filter, updateObj) => {
    return CategorySchema.findOneAndUpdate(filter, updateObj, {new: true})
}

//delete
export const deleteCategory = (filter) => {
    return CategorySchema.findOneAndDelete(filter)
}