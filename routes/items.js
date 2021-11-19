var express = require("express");
var router = express.Router();
const db = require("../model/helper");
var models = require("../models");
const { Sequelize } = require('sequelize');


// WORKS: gets all items with color AND season
router.get("/all", async function (req, res) {

  try {
    const items = await models.Item.findAll({
      include: 
      [
        models.Season, 
        models.Color
      ]
    });

    res.send(items);
    
  } catch (error) {
    res.status(500).send(error);
  }
});

// WORKS? gets items from a given category AND color AND season
router.get("/", async function (req, res) {

  try {
    const { categories, colors, seasons } = req.query;
    let selectedCategories = [];
    let selectedSeasons = [];
    let selectedColors = [];

// if categories / seasons / colors are not in the query (no related checkboxes were selected), assumes all checkboxes were selected
    
    if (!categories){
      const categoryList = await models.Category.findAll(
        {
          attributes: ['id']
        }
      );
      selectedCategories = categoryList.map(e => e.dataValues.id);  // turns categoryList into an array of values [1,2,3,4,5....]

    } else {selectedCategories = categories.split(",")};


    if (!seasons) { 
      const seasonList = await models.Season.findAll(
        {
          attributes: ['id']
        }
      );
      selectedSeasons = seasonList.map(e => e.dataValues.id);  // turns seasonList into an array of values [1,2,3,4,5....]

    } else {selectedSeasons = seasons.split(",")};

    if (!colors) { 
      const seasonList = await models.Color.findAll(
        {
          attributes: ['id']
        }
      );
      selectedColors = colorList.map(e => e.dataValues.id);  // turns seasonList into an array of values [1,2,3,4,5....]

    } else {selectedColors = colors.split(",")};

// finds all items matching color, season and category filters

    const items = await models.Item.findAll({
      where: {
        CategoryId: selectedCategories  // this property is in the Items table
      },
      include: [
      {
        model: models.Season,
        through:{
          where: { 
            SeasonId: selectedSeasons // this property is not in the Items table
          }
        },
        required: true
      },
      {
        model: models.Color,
        through:{
          where: { 
            ColorId: selectedColors // this property is not in the Items table
          },
        },
        required: true 
      }
    ]
    });

    res.send(items);
    
  } catch (error) {
    res.status(500).send(error);
  }
});


// WORKS! adds new items to items table on DB; returns new item
router.post("/", async function (req, res) {
  try {
    const { category_id, color_ids, season_ids, image } = req.body;
  
    const item = await models.Item.create({ image: image, CategoryId: category_id })
    if (season_ids) await item.setSeasons(season_ids) //season_ids is expected to be an ARRAY
    if (color_ids) await item.setColors(color_ids)
    res.status(201).send(item);

  } catch (error) {
    res.status(500).send(error);
  }
});

// WIP! WORKS deletes item by id; returns ????
router.delete("/:id", async function (req, res) {
  try {
      const { id } = req.params;

      await models.Item.destroy({
        where: {
          id,
        },
      });
    
      res.send("Deleted!");
  
    } catch (error) {
      res.status(500).send(error);
    }
});

module.exports = router;


