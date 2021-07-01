const db = require("../db")
const { BadRequestError, NotFoundError } = require("../utils/errors")

class Nutrition{


//Create A Nutrition Posts
static async createNutrition({ newNutrient, user }) {
    const requiredFields = ["name", "category", "quantity", "calories", "image_url"]
    requiredFields.forEach((field) => {
      if (!newNutrient?.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing required field - ${field} - in request body.`)
      }
    })

    const results = await db.query(
      `
        INSERT INTO nutrition("name", "category", "quantity", "calories", "image_url", "user_id")
        VALUES ($1, $2, $3, $4, $5 ,(SELECT id FROM users WHERE email = $6))
        RETURNING id,
                  name,
                  category,
                  quantity,
                  calories,
                  image_url,
                  user_id AS "user_id",
                  timestamp;
      `,
      [newNutrient.name, newNutrient.category, newNutrient.quantity, newNutrient.calories, newNutrient.image_url ,user.email]
    )
     return results.rows[0]
  }





//Gets All Nutrition Posts
static async fetchAll() {
    const results = await db.query(
      `
      SELECT ntr.id,
             ntr.name,
             ntr.category,
             ntr.quantity,
             ntr.calories,
             ntr.image_url,
             ntr.user_id AS "userId",
             u.email AS "userEmail",
             ntr.timestamp AS "timestamp"    
      FROM nutrition AS ntr
      JOIN users AS u ON u.id = ntr.user_id
      ORDER BY  ntr.timestamp DESC     
      `
    )
    return results.rows
  }



}


module.exports = Nutrition