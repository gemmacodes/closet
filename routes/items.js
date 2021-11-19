var express = require("express");
var router = express.Router();
const db = require("../model/helper");
var models = require("../models");

// NEEDS FIXING: gets items from a given category AND color AND season
router.get("/", async function (req, res) {

  // const { categories, colors, seasons } = req.query;

  // if (categories) const categoriesJoined = categories.join(",")
  // else categoriesJoined = categories; 
  // if (seasons) const seasonsJoined = seasons.join(",")
  // else seasonsJoined = seasons; 
  // if (colors) const colorsJoined = colors.join(",")
  // else colorsJoined = colors; 


  try {
    const { categories } = req.query;
    const { colors } = req.query;
    const { seasons } = req.query;
    

    const items = await models.Item.findAll({
      where: {
        CategoryId: categories,
      },
      include: [
      {
        model: models.Season,
        through:{
          where: { 
            SeasonId: seasons
          }
        },
        required: true
      },
      {
        model: models.Color,
        through:{
          where: { 
            ColorId: colors
          }
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

// // NEEDS FIXING: gets items from a given category AND color AND season
// router.get("/items", async function (req, res) {
//   try {
//     const { categories } = req.query;
//     const { colors } = req.query;
//     const { seasons } = req.query;

//     let results = null;

//     // if no filters are selected, all items are returned
//     if (
//       (!categories || !categories.length) &&
//       (!colors || !colors.length) &&
//       (!seasons || !seasons.length)
//     ) {
//       results = await db("SELECT * FROM items ORDER BY id ASC;");  

//     // if all filters are selected, items are selected according to those
//     } else if (categories && colors && seasons) {
//       const categoriesJoined = categories.join(",");
//       const colorsJoined = colors.join(",");
//       const seasonsJoined = seasons.join(",");
//       results = await db(
//         `SELECT * FROM items WHERE (category_id) IN (${categoriesJoined}) AND (color_id) IN (${colorsJoined}) AND (season_id) IN (${seasonsJoined});`
//       );
//     } else if (categories && colors) {
//       const categoriesJoined = categories.join(",");
//       const colorsJoined = colors.join(",");
//       results = await db(
//         `SELECT * FROM items WHERE (category_id) IN (${categoriesJoined}) AND (color_id) IN (${colorsJoined});`
//       );
//     } else if (categories && seasons) {
//       const categoriesJoined = categories.join(",");
//       const seasonsJoined = seasons.join(",");
//       results = await db(
//         `SELECT * FROM items WHERE (category_id) IN (${categoriesJoined}) AND (season_id) IN (${seasonsJoined});`
//       );
//     } else if (colors && seasons) {
//       const colorsJoined = colors.join(",");
//       const seasonsJoined = seasons.join(",");
//       results = await db(
//         `SELECT * FROM items WHERE (color_id) IN (${colorsJoined}) AND (season_id) IN (${seasonsJoined});`
//       );
//     } else if ((!colors || !colors.length) && (!seasons || !seasons.length)) {
//       const categoriesJoined = categories.join(",");
//       results = await db(
//         `SELECT * FROM items WHERE (category_id) IN (${categoriesJoined});`
//       );
//     } else if (
//       (!categories || !categories.length) &&
//       (!seasons || !seasons.length)
//     ) {
//       const colorsJoined = colors.join(",");
//       results = await db(
//         `SELECT * FROM items WHERE (color_id) IN (${colorsJoined});`
//       );
//     } else if (
//       (!categories || !categories.length) &&
//       (!colors || !colors.length)
//     ) {
//       const seasonsJoined = seasons.join(",");
//       results = await db(
//         `SELECT * FROM items WHERE (season_id) IN (${seasonsJoined});`
//       );
//     }

//     res.send(results.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error);
//   }
// });

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

      const item = await models.Item.destroy({
        where: {
          id,
        },
      });
  
      res.send("Hello");
  
    } catch (error) {
      res.status(500).send(error);
    }
});

module.exports = router;


