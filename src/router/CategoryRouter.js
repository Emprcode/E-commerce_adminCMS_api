import express from 'express'

import { createCategory, getCategory } from '../model/category/CategoryModel.js'
import { slugifyUrl } from '../utils/slugify.js'

const router  = express.Router()

router.post("/category", async(req, res, next)=> {
    try {
        
       const slug =  slugifyUrl(req.body.catName)
       const data = {...req.body,slug }
       console.log(data, slug)
        const result = await createCategory(data)

        result?._id ? res.json({
            status:"success",
            message:"category added successfully"
        })
        : res.json({
            status:"error",
            message:"Unable to add category, Please try again later"
        })
    } catch (error) {
        next(error)
        
    }
})
router.get("/category", async(req, res, next)=> {
    try {
        
     
        const result = await getCategory()

       res.json({
            status:"success",
            message:"category added successfully",
            result
        })
    
    } catch (error) {
        next(error)
        
    }
})




export default router;