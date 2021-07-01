const db = require("../db")
const { BadRequestError, NotFoundError } = require("../utils/errors")

class Sleep{

    //Creates A New Sleep Posts
    static async createNutrition({ newSleep, user }) {
        const requiredFields = ["start_time","end_time"]
        requiredFields.forEach((field) => {
          if (!newSleep?.hasOwnProperty(field)) {
            throw new BadRequestError(`Missing required field - ${field} - in request body.`)
          }
        })
    
        const results = await db.query(
          `
            INSERT INTO sleep("start_time", "end_time", user_id)
            VALUES ($1, $2,(SELECT id FROM users WHERE email = $3))
            RETURNING id,
                      start_time,
                      end_time,
                      user_id AS "user_id",
                      timestamp;
          `,
          [newSleep.start_time, newSleep.end_time, user.email]
        )
    
        return results.rows[0]
      }



    //Gets All Sleep Posts
    static async fetchAll() {

        const results = await db.query(
          `
          SELECT slp.id,
                 slp.start_time,
                 slp.end_time,
                 slp.user_id AS "userId",
                 u.email AS "userEmail",
                 slp.timestamp AS "timestamp"    
          FROM sleep AS slp
          JOIN users AS u ON u.id = slp.user_id
          ORDER BY  slp.timestamp DESC     
          `
        )
    
        return results.rows
      }







}

module.exports = Sleep