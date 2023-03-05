import PaymentOptionsSchema from "./PaymentOptionsSchema.js"

//post Payment
export const createPaymentOptions = (obj) => {
    return PaymentOptionsSchema(obj).save()
}
//get Payment
export const getPaymentOptions = () => {
    return PaymentOptionsSchema.find()
}


//update
export const updatePaymentOptions = ({_id, ...updateObj}) => {
    return PaymentOptionsSchema.findByIdAndUpdate(_id, updateObj, {new: true})
}

//delete
export const deletePaymentOptions = (_id) => {
    return PaymentOptionsSchema.findByIdAndDelete(_id)
}