import { userSchema } from "../schema/authSchema.js"
import db from "../dbconfig/database.js"
import bcrypt from "bcrypt"
import { v4 as uuidV4 } from "uuid"


export async function userValidate (req,res,next){
    const user = req.body

    const {error,value}= userSchema.validate(user, {abortEarly:false})

    if (error){
        const boxErros= error.details.map((d)=>d.message)
       return res.status(400).send(boxErros)
    }

    res.locals.user=user

    next()
}


export async function signInValidate(req,res,next){
    const {email,password}=req.body
   
    try{
        const check= await db.query(`
            select * from users email=$1
        `,[email])
        if(check.rowCount>0){
             const decryptPassword = bcrypt.compareSync(password,check[0].password)
             if(decryptPassword){
              const token = uuidV4()
              await db.query(`
              INSERT INTO  tokenList (userId,token) VALUES ($1,$2)
              `,[check[0].id,token])

              res.send(token)

             }else{
                return  res.sendStatus(401)
             }

        }



        res.local.user=check
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
    next()
}

