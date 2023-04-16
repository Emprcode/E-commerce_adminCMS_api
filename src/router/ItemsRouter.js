import express from 'express'
import { newItemsValidation } from '../middleware/joiMiddleware.js';
import { createItems } from '../model/items/ItemsModel.js';

const router = express.Router()

router.post("/", newItemsValidation, async(req, res, next) => {
    try {
        console.log(req.body)
        const result = await createItems(req.body)

        result?._id ? res.json({
            status:"success",
            message:"New Items added successfully!"
        }) : res.json({
            status:"error",
            message:"Unable to add items, Please try again later."
        })
    } catch (error) {
        next(error)
        
    }
})

export default router;