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
      include: [{
        model: models.Season,
        through:{
          where: { 
            SeasonId: seasons 
          }
        } 
      },
      {
        model: models.Color,
        through:{
          where: { 
            ColorId: colors 
          }
        } 
      }]
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

// WIP: adds new items to items table on DB
router.post("/", async function (req, res) {
  try {
    const { category_id, color_ids, season_ids, image } = req.body;
    // INSERT INTO items (category_id, image) VALUES ("${category_id}", "${image}");
    // SELECT id FROM items ORDER BY id DESC LIMIT 1;
    // for(let i=0;i < season_ids.length;i++){
    // INSERT INTO items_to_seasons (item_id, season_id) VALUES ("${item_id.data[0].id}", "${season_ids[i]}");`
    // }
    // for(let i=0;i < color_ids.length;i++){
    // INSERT INTO items_to_colors (item_id, color_id) VALUES ("${item_id.data[0].id}", "${color_ids[i]}");`
    // }

    // inserts item into DB (category_id is only one value)
    // const item = await models.Item.create({ name: category_id, image: image })
    // // stores id last inserted item
    // const item_id = item.id;
    // // inserts item_id and season info in junction table (loop because season_ids is an array)
    // for(let i=0;i < season_ids.length;i++){
    //   //INSERT INTO items_to_seasons (item_id, season_id) VALUES ("${item_id.data[0].id}", "${season_ids[i]}");`
    //   await models.itemSeasons.create({ item_id: item_id, season_id: season_ids[i]});
    // }
    // // inserts item_id and color info in junction table (loop because color_ids is an array)
    // for(let i=0;i < color_ids.length;i++){
    //   //INSERT INTO items_to_colors (item_id, color_id) VALUES ("${item_id.data[0].id}", "${color_ids[i]}");`
    //   await models.itemColors.create({ item_id: item_id, color_id: color_ids[i]});
    // }

    const item = await models.Item.create({ image: image, CategoryId: category_id })
    if (season_ids) item.setSeasons(season_ids)
    if (color_ids) item.setColors(color_ids)

    res.status(201).send(item);
  } catch (error) {
    res.status(500).send(error);
  }
});

// // WIP: adds new items to items table on DB
// router.post("/items", async function (req, res) {
//   try {
//     const { category_id, color_ids, season_ids, image } = req.body;

//     // inserts item into DB (category_id is only one value)
//     await db(
//       `INSERT INTO items (category_id, image) VALUES ("${category_id}", "${image}");`
//     );

//     // stores id last inserted item
//     const item_id = await db("SELECT id FROM items ORDER BY id DESC LIMIT 1;")
   
//     // inserts item_id and season info in junction table (loop because season_ids is an array)
//     for(let i=0;i < season_ids.length;i++){
      
//       await db(
//         `INSERT INTO items_to_seasons (item_id, season_id) VALUES ("${item_id.data[0].id}", "${season_ids[i]}");`
//       );
//     }
    
//     // inserts item_id and color info in junction table (loop because color_ids is an array)
//     for(let i=0;i < color_ids.length;i++){
//       console.log("it gets here");
//     await db(
//       `INSERT INTO items_to_colors (item_id, color_id) VALUES ("${item_id.data[0].id}", "${color_ids[i]}");`
//     )};

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
//     res.status(201).send(results.data);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

router.delete("/items/:id", async function (req, res) {
  try {
    //first delete from junction tables
    await db(`DELETE FROM items_to_seasons WHERE item_id = ${+req.params.id};`);
    await db(`DELETE FROM items_to_colors WHERE item_id = ${+req.params.id};`);
    //then delete from parent table
    await db(`DELETE FROM items WHERE id = ${+req.params.id};`);
    
    const { categories } = req.query;
    const { colors } = req.query;
    const { seasons } = req.query;

    let results = null;

    // if no filters are selected, all items are returned
    if (
      (!categories || !categories.length) &&
      (!colors || !colors.length) &&
      (!seasons || !seasons.length)
    ) {
      results = await db("SELECT * FROM items ORDER BY id ASC;");  

    // if all filters are selected, items are selected according to those
    } else if (categories && colors && seasons) {
      const categoriesJoined = categories.join(",");
      const colorsJoined = colors.join(",");
      const seasonsJoined = seasons.join(",");
      results = await db(
        `SELECT * FROM items WHERE (category_id) IN (${categoriesJoined}) AND (color_id) IN (${colorsJoined}) AND (season_id) IN (${seasonsJoined});`
      );
    } else if (categories && colors) {
      const categoriesJoined = categories.join(",");
      const colorsJoined = colors.join(",");
      results = await db(
        `SELECT * FROM items WHERE (category_id) IN (${categoriesJoined}) AND (color_id) IN (${colorsJoined});`
      );
    } else if (categories && seasons) {
      const categoriesJoined = categories.join(",");
      const seasonsJoined = seasons.join(",");
      results = await db(
        `SELECT * FROM items WHERE (category_id) IN (${categoriesJoined}) AND (season_id) IN (${seasonsJoined});`
      );
    } else if (colors && seasons) {
      const colorsJoined = colors.join(",");
      const seasonsJoined = seasons.join(",");
      results = await db(
        `SELECT * FROM items WHERE (color_id) IN (${colorsJoined}) AND (season_id) IN (${seasonsJoined});`
      );
    } else if ((!colors || !colors.length) && (!seasons || !seasons.length)) {
      const categoriesJoined = categories.join(",");
      results = await db(
        `SELECT * FROM items WHERE (category_id) IN (${categoriesJoined});`
      );
    } else if (
      (!categories || !categories.length) &&
      (!seasons || !seasons.length)
    ) {
      const colorsJoined = colors.join(",");
      results = await db(
        `SELECT * FROM items WHERE (color_id) IN (${colorsJoined});`
      );
    } else if (
      (!categories || !categories.length) &&
      (!colors || !colors.length)
    ) {
      const seasonsJoined = seasons.join(",");
      results = await db(
        `SELECT * FROM items WHERE (season_id) IN (${seasonsJoined});`
      );
    }

    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;


