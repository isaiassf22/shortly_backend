import joi from 'joi'


 export const userSchema= joi.object({
    name: joi.string().min(3).max(30).required,
    email: joi.string().max(50).required,
    password: joi.string().min(3).max(15).required,
    confirm_password: joi.ref('password')
})

 