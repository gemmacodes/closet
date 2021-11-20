import React, { useState } from "react";
import "./AddItemForm.css";
// import Navbar from "./NavBar";


export default function AddItemForm({
  categories,
  colors,
  seasons,
  checkedStateCategories,
  checkedStateColors,
  checkedStateSeasons,
  setFilteredItems,
}) {
  

  // new item (newItem) to be posted to DB
  const [newItem, setNewItem] = useState({
    category_id: 1,
    color_id: 1,
    season_id: 1,
    image: "",
  });

  // changes new item values based on form selectors
  const handleInputChange = (event) => {
    const { value, name } = event.target;
    setNewItem((state) => ({ ...state, [name]: value }));
  };

  // on submit, calls addItem
  const handleSubmit = (event) => {
    event.preventDefault();
    addItem();
  };

  // NEEDS FIXING!!  creates query and posts new item to DB. returns
  const addItem = async () => {
    const filterQueryString = Object.keys(checkedStateCategories)
      .filter((category) => checkedStateCategories[category])
      .map((category) => `categories[]=${category}`)
      .concat(
        Object.keys(checkedStateColors)
          .filter((color) => checkedStateColors[color])
          .map((color) => `colors[]=${color}`)
      )
      .concat(
        Object.keys(checkedStateSeasons)
          .filter((season) => checkedStateSeasons[season])
          .map((season) => `seasons[]=${season}`)
      )
      .join("&");

    try {
      const { category_id, color_id, season_id, image } = newItem;
      const response = await fetch(`/api/items/?${filterQueryString}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category_id: category_id,
          color_id: color_id,
          season_id: season_id,
          image: image,
        }),
      });
      const data = await response.json();
      setFilteredItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* <Navbar/> */}
    <form onSubmit={handleSubmit} id="add-item-form">
      <div className="justify-contents-between rounded" style={{backgroundColor: "#C0C0C0"}}>
        <label id="new-item-url-container">
          Add image URL
          <input
            type="url"
            name="image"
            value={newItem.image}
            id="new-item-url"
            className="form-control"
            onChange={(event) => handleInputChange(event)}
            required
          />
        </label>
      {/* </div>

      <div> */}
        <label id="new-item-category-container">
          Select a category
          <select
            name="category_id"
            className="form-control"
            value={newItem.category_id}
            id="new-item-category"
            onChange={(event) => handleInputChange(event)}
            required
          >
            {categories.map((category) => {
              return (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </label>
      {/* </div>

      <div> */}
        {" "}
        <label className="item-select" id="new-item-color-container">
          Select color/s
          <select
            name="color_id"
            value={newItem.color_id}
            id="new-item-color"
            className="form-control"
            onChange={(event) => handleInputChange(event)}
            required
          >
            {colors.map((color) => {
              return (
                <option value={color.id} key={color.id}>
                  {color.name}
                </option>
              );
            })}
          </select>
        </label>
        <label id="new-item-season-container">
          Select season/s
          <select
            name="season_id"
            value={newItem.season_id}
            id="new-item-season"
            className="form-control"
            onChange={(event) => handleInputChange(event)}
          >
            {seasons.map((season) => {
              return (
                <option value={season.id} key={season.id}>
                  {season.name}
                </option>
              );
            })}
          </select>
        </label>
      {/* </div> */}
      <button id="submit-button" className="rounded">SUBMIT</button>
      </div>
    </form>
    </div>
  );
}
