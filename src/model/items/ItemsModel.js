import ItemsSchema from "./ItemsSchema.js";

export const createItems = (obj) => {
  return ItemsSchema(obj).save();
};

export const getAllItems = () => {
  return ItemsSchema.find();
};
export const getSingleItems = ({ filter }) => {
  return ItemsSchema.findOne(filter);
};
export const updateItems = (_id, updateObj) => {
  return ItemsSchema.findByIdAndUpdate(_id, updateObj, { new: true });
};
export const deleteSingleItem = (filter) => {
  return ItemsSchema.findOneAndDelete(filter);
};

//idsArg must be an array of an _id
export const deleteItems = (idsArg) => {
  return ItemsSchema.deleteMany({
    _id: { $in: idsArg },
  });
};
