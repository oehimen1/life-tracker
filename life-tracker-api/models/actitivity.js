
const db = require("../db")
const { BadRequestError, NotFoundError } = require("../utils/errors")



class Activity{

    static async fetchCalories() {

        const results = await db.query(
            `
            (
                SELECT calories
                FROM nutrition
                JOIN users AS u ON u.id = nutrition.user_id
            )
             `
        )
        return results.rows 
    }


    static async fetchSleepHours() {

        const results = await db.query(
            `
            (
                SELECT end_time - start_time
                FROM sleep 
                JOIN users AS u ON u.id = sleep.user_id
            )
             `
        )
        return results.rows 
    }

        
    static async fetchDuration() {
        const results = await db.query(
            `
            (
                SELECT duration
                FROM excercises 
                JOIN users AS u ON u.id = excercises.user_id
            )
            `
        )
        return results.rows 
    }
          
}

module.exports = Activity

    