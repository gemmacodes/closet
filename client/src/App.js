import "./App.css";
import React, { useEffect, useState } from "react";
import FilterList from "./components/FilterList.js";
import Item from "./components/Item.js";
import Navbar from "./components/NavBar";
import Masonry from 'react-masonry-css'

function App() {
  const [colors, setColors] = useState([]); // [{id: 1, name: "red", isChecked: false},...]
  const [seasons, setSeasons] = useState([]);
  const [categories, setCategories] = useState([]);

  const [filteredItems, setFilteredItems] = useState([]);

  // const [checkedStateCategories, setCheckedStateCategories] = useState({});
  // const [checkedStateColors, setCheckedStateColors] = useState({});
  // const [checkedStateSeasons, setCheckedStateSeasons] = useState({});

  // this is an idea I had, instead of storing the 3 checkedStates in 3 different empty objects, do it in only one object containing that properties
  // const [checkedStateFilters, setCheckedStateFilters] = useState({
  //   categories: {},
  //   colors: {},
  //   seasons: {}
  // });

 
  // on page load, populate colors, seasons, categories and filteredItems arrays  
  useEffect(() => {
    getColors();  
    getSeasons();
    getCategories();
  }, []);

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
  //   setCheckedStateCategories({});
  //   setCheckedStateColors({});
  //   setCheckedStateSeasons({});
  // };

  return (
    <div>
      <div className="mb-3"><Navbar/></div>

      {/* <div className="text-center mt-4">
        <img src="https://cdn-icons.flaticon.com/png/512/3959/premium/3959060.png?token=exp=1637183899~hmac=ad944934feb2fb770d15419cb102b684" width="60" height="60" class="d-inline-block" alt="my closet logo"/>
        <br/>
        <a className="h1" style={{textDecoration: 'none' }} href="/">My closet</a>
      </div> */}

      <div className="container">
      <div id="filter-and-items-container" className="row">
        <div id="filterContainer" className="col-3-md">
          <FilterList
            categories={categories}
            colors={colors}
            seasons={seasons}
            handleChangeCheckbox={handleChangeCheckbox}
            // handleClickResetForm={handleClickResetForm}
          ></FilterList>
        </div>
        <div id="itemsContainer" className="col-9-md">
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

export default App;
