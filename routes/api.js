var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// WORKS gets category list
router.get("/categories", async function (req, res) {
  try {
    const results = await db("SELECT * FROM categories ORDER BY id ASC;");

    res.send(results.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// WORKS gets color list
router.get("/colors", async function (req, res) {
  try {
    const results = await db("SELECT * FROM colors ORDER BY id ASC;");
    res.send(results.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// WORKS gets season list
router.get("/seasons", async function (req, res) {
  try {
    const results = await db("SELECT * FROM seasons ORDER BY id ASC;");
    res.send(results.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// WORKS gets items from a given category
router.get("/categories/:id/items", async function (req, res) {
  try {
    const results = await db(
      `SELECT * FROM items WHERE category_id=${+req.params.id} ORDER BY id ASC;`
    );
    res.send(results.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// NEEDS FIXING: gets items from a given category AND color AND season
router.get("/items", async function (req, res) {
  try {
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
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});


// WIP: adds new items to items table on DB
router.post("/items", async function (req, res) {
  try {
    // const { category_id, color_id, season_id, image } = req.body;

    const { category_id } = req.body;
    const { color_ids } = req.body;
    const { season_ids } = req.body;
    const { image } = req.body;

    // inserts item into DB
    await db(
      `INSERT INTO items (category_id, image) VALUES ("${category_id}", "${image}");`
    );

    // stores id last inserted item
    const item_id = await db("SELECT id FROM items ORDER BY id DESC LIMIT 1;")
   
    // inserts item_id and season info in junction table
    for(let i=0;i < season_ids.length;i++){
      
      await db(
        `INSERT INTO items_to_seasons (item_id, season_id) VALUES ("${item_id.data[0].id}", "${season_ids[i]}");`
      );
    }
    
    // inserts item_id and color info in junction table
    for(let i=0;i < color_ids.length;i++){
      console.log("it gets here");
    await db(
      `INSERT INTO items_to_colors (item_id, color_id) VALUES ("${item_id.data[0].id}", "${color_ids[i]}");`
    )};

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
    res.status(201).send(results.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/items/:id", async function (req, res) {
  try {
    await db(`DELETE FROM items_to_seasons WHERE item_id = ${+req.params.id};`);
    await db(`DELETE FROM items_to_colors WHERE item_id = ${+req.params.id};`);
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
