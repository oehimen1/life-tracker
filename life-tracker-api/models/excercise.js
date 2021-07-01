const db = require("../db")
const { BadRequestError, NotFoundError } = require("../utils/errors")


class Excercise{
    static async createExcercise({ newExcercise, user }) {
        const requiredFields = ["name","category","duration","intensity"]
        requiredFields.forEach((field) => {
          if (!newExcercise?.hasOwnProperty(field)) {
            throw new BadRequestError(`Missing required field - ${field} - in request body.`)
          }
        })
    
        const results = await db.query(
          `
            INSERT INTO excercises(name, category, duration, intensity, user_id)
            VALUES ($1, $2, $3, $4, (SELECT id FROM users WHERE email = $5))
            RETURNING id,
                      name,
                      category,
                      duration,
                      intensity,
                      user_id AS "user_id",
                      timestamp;
          `,
          [newExcercise.name, newExcercise.category, newExcercise.duration, newExcercise.intensity, user.email]
        )
    
        return results.rows[0]
      }

      static async fetchAll() {
        const results = await db.query(
          `
          SELECT exc.id,
                 exc.name,
                 exc.category,
                 exc.duration,
                 exc.intensity,
                 exc.user_id AS "userId",
                 u.email AS "userEmail",
                 exc.timestamp AS "timestamp"    
          FROM excercises AS exc
          JOIN users AS u ON u.id = exc.user_id
          ORDER BY  exc.timestamp DESC     
          `
        )
    
        return results.rows
      }




}


module.exports = Excercise

