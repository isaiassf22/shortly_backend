import db from "../dbconfig/database.js";



export async function getUserById(req, res) {
    const { user } = res.locals
  
    try {
      const visitResult = await db.query(
        `SELECT SUM(s."views") 
          FROM boxShortList s 
          WHERE s."userId" = $1`,
        [user.id]
      )
      const [visitCount] = visitResult.rows;
  
      const urlsResult = await db.query(
        `SELECT * FROM boxShortList s WHERE s."userId" = $1`,
        [user.id]
      );
      const userUrls = urlsResult.rows;
  
      res.send({
        id: user.id,
        name: user.name,
        visitCount: visitCount.sum || 0,
        shortenedUrls: userUrls,
      });
    } catch (error) {
      console.log(error)
      return res.status(500).send(error.message)
    }
  }
  
  export async function getRanking(req, res) {
    try {
      const { rows } = await db.query(`
      SELECT 
        u.id, 
        u.name, 
        COUNT(s.id) as "linksCount", 
        COALESCE(SUM(s."views"), 0) as "visitCount"
      FROM users u
      LEFT JOIN boxShortList s ON s."userId" = u.id
      GROUP BY u.id
      ORDER BY "visitCount" DESC
      LIMIT 10
    `)
      res.send(rows)
    } catch (error) {
      console.log(error)
      return res.status(500).send(error.message)
    }
  }
  