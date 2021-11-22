var express = require("express");
var router = express.Router();
var models = require("../models");
var jwt = require("jsonwebtoken");
var userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn.js");
require("dotenv").config();
var bcrypt = require("bcrypt");
const saltRounds = 10;

const supersecret = process.env.SUPER_SECRET;

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, saltRounds);

    await models.User.create({ username: username, password: hash })

    res.send({ message: "Registration successful" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const results = await models.User.findAll({
      where: {
        username: username
      },
    });
    
    const user = results; 
     
    if (user.length) {
      const user_id = user[0].dataValues.id;  //[0].dataValues because of Sequelize

      const correctPassword = await bcrypt.compare(password, user[0].dataValues.password);

      if (!correctPassword) throw new Error("Incorrect password");

      var token = jwt.sign({ user_id }, supersecret);
      res.send({ message: "Login successful, here is your token", token });
    } else {
      throw new Error("User does not exist");
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get("/dashboard", userShouldBeLoggedIn, (req, res) => {
  res.send({
    message: "Here is the PROTECTED data for user " + req.user_id,
    // future update: SELECT * FROM items WHERE user_id = user id
  });
});

module.exports = router;