import express from 'express'

const router = express.Router()

router.post("/", (req, res, next) => {
    try {
        console.log(req.body)
    } catch (error) {
        next(error)
        
    }
})

export default router;