import ProductSchema from "./ProductSchema.js"

//post category
export const addNewProduct = (obj) => {
    return ProductSchema(obj).save()
}
//get category
export const getProducts = () => {
    return ProductSchema.find()
}


//update
export const updateProduct = ({_id, ...updateObj}) => {
    return ProductSchema.findByIdAndUpdate(_id, updateObj, {new: true})
}

//delete
export const deleteProduct = (filter) => {
    return ProductSchema.findByIdAndDelete(filter)
}