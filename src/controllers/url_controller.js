import { nanoid } from "nanoid"
import db from "../dbconfig/database.js"

export async function shortenUrl (req,res){
    const {id} =res.locals.user

    const  {url}  = req.body

  const shortUrl = nanoid(8)

  try {
    await db.query(
      `
    INSERT INTO boxShortlyList (original_url, "short_url", "userId")
    VALUES ($1, $2, $3)
  `,
      [url, shortUrl, id]
    );

    res.status(201).send({ shortUrl })
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message)
  }
}

export async function getUrlId(req, res) {
    const { id } = req.params;
  
    try {
      const result = await db.query(`SELECT * FROM boxShortlyList WHERE id = $1`, [id])
  
      if (result.rowCount === 0) return res.sendStatus(404)
  
      const [url] = result.rows
  
      
  
      res.send(url)
    } catch (error) {
      console.log(error)
      
      return res.status(500).send(error.message)
    }
  }
  
  export async function openShortUrl(req, res) {
    const { shortUrl } = req.params;
    try {
      const result = await db.query(
        `
      SELECT * 
      FROM boxShortlyList 
      WHERE short_url = $1`,
        [shortUrl]
      );
      if (result.rowCount === 0) {
        return res.sendStatus(404)
      }
  
      const [url] = result.rows
  
      await db.query(
        `
      UPDATE boxShortlyList
      SET "views" = "views" + 1
      WHERE id = $1`,
        [url.id]
      )
  
      res.redirect(url.url)
    } catch (error) {
      console.log(error)
      return res.status(500).send(error.message)
    }
  }

  export async function deleteUrl(req, res) {
    const { id } = req.params;
    const { user } = res.locals;
  
    try {
      const result = await db.query(`SELECT * FROM boxShortList WHERE id = $1`, [id])
  
      if (result.rowCount === 0) return res.sendStatus(404)
  
      const [url] = result.rows
  
      if (url.userId !== user.id) return res.sendStatus(401)
  
      await db.query("DELETE FROM boxShortList WHERE id=$1", [id])
  
      res.sendStatus(204) 
    } catch (error) {
      console.log(error)
      return res.status(500).send(error.message)
    }
  }
  