import db from "../dbconfig/database.js";



export async function session (req,res,next){
    const {authorization}=req.headers
    const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send("No token.");
  }

  try {
    const { rows: sessions } = await db.query(
      `SELECT *  FROM tokenList WHERE token = $1`,
      [token]
    );
    const [session] = sessions;

    if (!session) {
      return res.status(401).send("Session not found.");
    }

    const { rows: users } = await db.query(
      `SELECT * FROM users WHERE id = $1 `,
      [session.userId]
    );
    const [user] = users;

    if (!user) {
      return res.status(401).send("not found.");
    }

    res.locals.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500); 
  }
}
