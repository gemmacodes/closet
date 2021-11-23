import "./Closet.css";
import React, { useEffect, useState } from "react";
import FilterList from "./FilterList.js";
import Item from "./Item.js";
import Navbar from "./NavBar";
// import Masonry from 'react-masonry-css'

function Closet() {
  const [colors, setColors] = useState([]); // [{id: 1, name: "red", isChecked: false},...]
  const [seasons, setSeasons] = useState([]);
  const [categories, setCategories] = useState([]);

  const [filteredItems, setFilteredItems] = useState([]);

 
  // on page load, populate colors, seasons, and categories arrays  
  useEffect(() => {
    getColors();  
    getSeasons();
    getCategories();
  }, []);

  // calls getFilteredItems() whenever colors, seasons or categories changes
  useEffect(() => {
    getFilteredItems();
  }, [colors, seasons, categories]);


  // populates categories (array of objects) ex. [ {id:1, name:"bags"}, ...]
  const getCategories = () => {
    fetch("/categories")
      .then((response) => response.json())
      .then((response) => {
        setCategories(response.map((category) => ({...category, isChecked : false})));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // populates colors (array of objects) ex. [ {id:1, name:"beige"}, ...]
  const getColors = () => {
    fetch("/colors")
      .then((response) => response.json())
      .then((response) => {
        setColors(response.map((color) => ({...color, isChecked : false})));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // populates seasons (array of objects) ex. [ {id:1, name:"spring"}, ...]
  const getSeasons = () => {
    fetch("/seasons")
      .then((response) => response.json())
      .then((response) => {
        setSeasons(response.map((season) => ({...season, isChecked : false})));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function getFilteredItems() {

    const selectedCategoriesIds = categories.filter(category => category.isChecked).map(category => category.id).join(","); //"1,2,3"
    const selectedColorsIds = colors.filter(color => color.isChecked).map(color => color.id).join(","); //"2"
    const selectedSeasonsIds = seasons.filter(season => season.isChecked).map(season => season.id).join(","); //"3,4"

    const query = {}; // this object can have up to 3 properties {categories, colors, seasons}. eg. {"1,2,3", "2", "3,4"}

    if (selectedCategoriesIds.length !== 0) query.categories = selectedCategoriesIds; // eg. {"1,2,3"}
    if (selectedColorsIds.length !== 0) query.colors = selectedColorsIds;
    if (selectedSeasonsIds.length !== 0) query.seasons = selectedSeasonsIds;
    // query = {categories:"1,2,3", colors:"2", seasons:"3,4"}

    const finalQuery = []
    for (const key in query) {
        finalQuery.push( `${key}=${query[key]}`)  // eg. ["categories=1,2,3", "colors=2", "seasons=3,4"]
    }

    const filterQueryString = finalQuery.length !== 0 ? `?${finalQuery.join("&")}`: "all"; // eg. "?categories=1,2,3&colors=2&seasons=3,4"

    fetch(`/items/${filterQueryString}`) 
      .then((response) => response.json())
      .then((items) => {
        setFilteredItems(items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeCheckbox = (name, id) => {
    switch (name){
      case 'season':
        setSeasons((seasons) => (seasons.map(season => (season.id === id ? {...season, isChecked : !season.isChecked} : season))));
        break;
      case 'color':
        setColors((colors) => (colors.map(color => (color.id === id ? {...color, isChecked : !color.isChecked} : color))));
      break;
      case 'category':
        setCategories((categories) => (categories.map(category => (category.id === id ? {...category, isChecked : !category.isChecked} : category))));
      break;
    }
  };


  const deleteItem = (id) => {
    const selectedCategoriesIds = categories.filter(category => category.isChecked).map(category => category.id).join(","); 
    const selectedColorsIds = colors.filter(color => color.isChecked).map(color => color.id).join(",");
    const selectedSeasonsIds = seasons.filter(season => season.isChecked).map(season => season.id).join(",");

    const query = {}; // this object can have up to 3 properties {categories, colors, seasons}. eg. {"1,2,3", "2", "3,4"}

    if (selectedCategoriesIds.length !== 0) query.categories = selectedCategoriesIds; // eg. {"1,2,3"}
    if (selectedColorsIds.length !== 0) query.colors = selectedColorsIds;
    if (selectedSeasonsIds.length !== 0) query.seasons = selectedSeasonsIds;

    const finalQuery = []
    for (const key in query) {
        finalQuery.push( `${key}=${query[key]}`)  // eg. ["categories=1,2,3", "colors=2", "seasons=3,4"]
    }

    const filterQueryString = finalQuery.length !== 0 ? `?${finalQuery.join("&")}`: "all"; // eg. "?categories=1,2,3&colors=2&seasons=3,4"
    
    fetch(`/items/${id}/${filterQueryString}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => setFilteredItems(data));
  };

  // const handleClickResetForm = (event) => {
  //   event.preventDefault();
  //   setCategories(categories.map(category => ({...category, isChecked : false})));
  //   setColors(colors.map(color => ({...color, isChecked : false})));
  //   setSeasons(seasons.map(season => ({...season, isChecked : false})));
  // };

  return (
    <div>
      <div className="mb-3"><Navbar/></div>
      <div className="container">
      <div id="filter-and-items-container" className="row">
        <div id="filterContainer" >
          <FilterList
            categories={categories}
            colors={colors}
            seasons={seasons}
            handleChangeCheckbox={handleChangeCheckbox}
            // handleClickResetForm={handleClickResetForm}
          ></FilterList>
        </div>
        <div id="itemsContainer">
          {filteredItems.map((item) => {
            return (
              <Item
                item={item}
                key={item.id}
                onClick={(id) => deleteItem(id)} 
              ></Item>
            );
          })}
        </div>
      </div>
      </div>
    </div>
  );
}

export default Closet;
