import ProductSchema from "./ItemsSchema.js";

export const createProduct = (obj) => {
  return ProductSchema(obj).save();
};

export const getAllProducts = () => {
  return ProductSchema.find();
};
export const getSingleProduct = ({ filter }) => {
  return ProductSchema.findOne(filter);
};
export const updateProduct = (_id, updateObj) => {
  return ProductSchema.findByIdAndUpdate(_id, updateObj, { new: true });
};
export const deleteSingleItem = (filter) => {
  return ProductSchema.findOneAndDelete(filter);
};

//idsArg must be an array of an _id
export const deleteProduct = (idsArg) => {
  return ProductSchema.deleteMany({
    _id: { $in: idsArg },
  });
};
