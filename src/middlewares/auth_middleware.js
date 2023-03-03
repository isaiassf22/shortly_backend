import { userSchema } from "../schema/authSchema.js"

export async function userValidate (req,res,next){
    const user = req.body

    const {error,value}= userSchema.validate(user, {abortEarly:false})

    if (error){
        const boxErros= error.details.map((d)=>d.message)
        res.status(400).send(boxErros)
    }

    res.locals.user=user

    next()
}