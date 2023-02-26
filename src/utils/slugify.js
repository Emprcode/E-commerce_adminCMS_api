import slugify from 'slugify'

export const slugifyUrl =  (data) => {
    try {
       return slugify(data)

    } catch (error) {
        next(error)
        
    }
}