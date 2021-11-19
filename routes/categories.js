var express = require("express");
var router = express.Router();
var models = require("../models");

// WORKS gets all categories in Categories table
router.get("/", async function (req, res) {
  try {
    const categories = await models.Category.findAll();

    res.send(categories);
    
  } catch (error) {
    res.status(500).send(error);
  }
});


// WORKS gets items from a given category
router.get("/:id/items", async function (req, res) {
  const { id } = req.params;

  try {
    const category = await models.Category.findOne({
      where: {
        id,
      },
    });

    const items = await category.getItems();

    res.send(items);

  } catch (error) {
    res.status(500).send(error);
  }
});



module.exports = router;
