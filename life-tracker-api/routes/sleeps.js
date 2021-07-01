const express = require("express")
const security = require("../middleware/security")
const Sleep = require("../models/sleep")
const router = express.Router()

//Get All Sleep Posts
router.get("/", security.requireAuthenticatedUser ,async(req, res, next) => {
    try {
        const sleeps = await Sleep.fetchAll()
        return res.status(200).json({ sleeps })
      } catch (err) {
        return next(err)
      }  
})

//Create A Sleep Posts 
router.post("/create", security.requireAuthenticatedUser, async function (req, res, next) {
    try {
      const { user }= res.locals
      const sleeps = await Sleep.createSleep({  newSleep:req.body, user })
      return res.status(201).json({ sleeps })
    } catch (err) {
      next(err)
    }
  })

module.exports = router;