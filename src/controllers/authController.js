import db from "../dbconfig/database.js";
import bcrypt from "bcrypt"
import { v4 as uuidV4 } from 'uuid'

export async function signUp (req,res){
    const {name,email,password}=req.body
    const passwordHash = bcrypt.hashSync(password, 10)
    try{
        const userExists = await db.query(`
        SELECT * FROM users WHERE email=$1
        `,[email])
        if (userExists.rowCount > 0) {
            return res.sendStatus(409);
          }
      

        await db.query(`
            INSERT INTO users (name,email,password) VALUES ($1,$2,$3)
        `, [name,email,password])
        return res.status(201).send("created")
    }catch(err){
        res.status(500).send(err.message)
    }


}


export async function signIn(req,res){
 const user=res.local.user

const token = uuidV4()

 try{
    await db.query(`
    INSERT INTO tokenList (token,userId) VALUES($1)
    `,[token,user.id])

 }catch(err){
    console.log(err)
    res.sendStatus(500)
 }

}