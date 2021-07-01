const express = require("express")
const security = require("../middleware/security")
const Activity = require("../models/actitivity")
const router = express.Router()



router.get("/", security.requireAuthenticatedUser ,async(req, res, next) => {
    try {
        const duration = await Activity.fetchDuration()
        const calories = await Activity.fetchCalories()
        const sleepHours = await Activity.fetchSleepHours()
        return res.status(200).json({ duration, calories, sleepHours })
      } catch (err) {
        return next(err)
      }  
})
  module.exports = router;