const express = require("express")
const security = require("../middleware/security")
const Nutrition = require("../models/nutrition")
const router = express.Router()


//Get All Nutrition Posts
router.get("/", security.requireAuthenticatedUser ,async(req, res, next) => {
    try {
        const nutrients = await Nutrition.fetchAll()
        return res.status(200).json({ nutrients })
      } catch (err) {
        return next(err)
      }  
})

//Create A Sleep Posts
router.post("/create", security.requireAuthenticatedUser, async function (req, res, next) {
    try {
      const { user }= res.locals
      const nutrients = await Nutrition.createNutrition({  newNutrient:req.body, user })
      return res.status(201).json({ nutrients })
    } catch (err) {
      next(err)
    }
  })

module.exports = router