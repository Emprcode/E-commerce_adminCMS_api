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
export const updateCategory = ({_id, ...updateObj}) => {
    return CategorySchema.findByIdAndUpdate(_id, updateObj, {new: true})
}

//delete
export const deleteCategory = (_id) => {
    return CategorySchema.findByIdAndDelete(_id)
}