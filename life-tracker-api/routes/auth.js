const express = require("express")
const User = require("../models/user")
const tokens = require("../utils/tokens")
const { createUserJwt } = require("../utils/tokens")
const security = require("../middleware/security")
const router = express.Router()

router.get("/me", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const { user } = res.locals
    const userL = await User.fetchUserByEmail(user.email)
    // const orders = await Order.listOrdersForUser(user)
    const publicUser = User.makePublicUser(userL)
    return res.status(200).json({ user: publicUser })
  } catch (err) {
    next(err)
  }
})

//To Login
router.post("/login", async (req, res, next) => {
  try {
    const user = await User.login(req.body)
    const token = tokens.createUserJwt(user)
    return res.status(200).json({ user, token })
  } catch (err) {
    next(err)
  }
})

// To Register 
router.post("/register", async (req, res, next) => {
  try {
    // , isAdmin: false }
    const user = await User.register(req.body)
    const token = tokens.createUserJwt(user)
    return res.status(201).json({ user, token })
  } catch (err) {
    next(err)
  }
})

module.exports = router