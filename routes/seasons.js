var express = require("express");
var router = express.Router();
var models = require("../models");

// WORKS gets all seasons in Seasons table
router.get("/", async function (req, res) {
  try {
    const seasons = await models.Season.findAll();

    res.send(seasons);
    
  } catch (error) {
    res.status(500).send(error);
  }
});


// WORKS gets items from a given season
router.get("/:id/items", async function (req, res) {
  const { id } = req.params;

  try {
    const season = await models.Season.findOne({
      where: {
        id,
      },
    });

    const items = await season.getItems();

    res.send(items);

  } catch (error) {
    res.status(500).send(error);
  }
});



module.exports = router;
