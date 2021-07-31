const express = require("express")
const security = require("../middleware/security")
const Excercise = require("../models/excercise")
const router = express.Router()


//Get All Excercise Entries
router.get("/", security.requireAuthenticatedUser, async function (req, res, next) {
    try {
      const user = res.locals.user
      const excercises = await Excercise.fetchAll({ user })
      return res.status(200).json({ excercises })
    } catch (err) {
      return next(err)
    }
  })

  //Create New Excercise Entries
  router.post("/create", security.requireAuthenticatedUser, async function (req, res, next) {
    try {
      const  user = res.locals.user
      const excercises = await Excercise.createExcercise({ user, newExcercise:req.body })
      return res.status(200).json({ excercises })
    } catch (err) {
      next(err)
    }
  })

  module.exports=router;