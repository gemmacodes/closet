var express = require("express");
var router = express.Router();
var models = require("../models");

// WORKS gets all colors in Colors table
router.get("/", async function (req, res) {
  try {
    const colors = await models.Color.findAll();

    res.send(colors);
    
  } catch (error) {
    res.status(500).send(error);
  }
});


// WORKS gets items from a given color
router.get("/:id/items", async function (req, res) {
  const { id } = req.params;

  try {
    const color = await models.Color.findOne({
      where: {
        id,
      },
      // include: models.Item // use this to get the color including the items (nested array of objects)
    });

    const items = await color.getItems();

    res.send(items);

  } catch (error) {
    res.status(500).send(error);
  }
});



module.exports = router;
