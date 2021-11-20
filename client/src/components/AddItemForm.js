import React, { useEffect, useState } from "react";
import "./AddItemForm.css";
import Select from 'react-select';
import Navbar from "./NavBar";
import Noty from 'noty';
import "../../node_modules/noty/lib/themes/metroui.css";
import "../../node_modules/noty/lib/noty.css";


export default function AddItemForm() {
  const [colors, setColors] = useState([]); // [{id: 1, name: "red", isChecked: false},...]
  const [seasons, setSeasons] = useState([]);
  const [categories, setCategories] = useState([]);


  // new item (newItem) to be posted to DB
  const [newItem, setNewItem] = useState({
    categoryId: 1,
    colorIds: 1,
    seasonIds: 1,
    image: "",
  });

  // on page load, populate colors, seasons, categories and filteredItems arrays  
  useEffect(() => {
    getColors();  
    getSeasons();
    getCategories();
  }, []);


  // populates categories (array of objects) ex. [ {id:1, name:"bags"}, ...]
  const getCategories = () => {
    fetch("/categories")
      .then((response) => response.json())
      .then((response) => {
        setCategories(response);
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
        setColors(response);
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
        setSeasons(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // changes newItem values for inputs
  const handleInputChange = (event) => {
    const { value, name } = event.target;
    setNewItem((state) => ({ ...state, [name]: value }));
  };

  // changes newItem values for multiple selectors
  const handleMultiChange = (selectedOptions, name) => {
    const valueArr = selectedOptions.map(selectedOption => selectedOption.value);
    setNewItem((state) => ({ ...state, [name]: valueArr}));
  };

  // on submit, calls addItem
  const handleSubmit = (event) => {
    event.preventDefault();
    addItem();
  };

  // WORKS!!  creates query and posts new item to DB. returns ???
  const addItem = async () => {
    try {
      const { categoryId, colorIds, seasonIds, image } = newItem;
      const response = await fetch(`/items/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryId: categoryId,
          colorIds: colorIds,
          seasonIds: seasonIds,
          image: image,
        }),
      });
      const data = await response.json();
      // setNewItem(data);
      new Noty({
        theme: 'metroui',
        type: 'success',
        layout: 'center',
        text: 'The item has been added to your closet, go check it out!',
        timeout: 2000
      }).show();
    } catch (error) {
      console.log(error);
      new Noty({
        theme: 'metroui',
        type: 'error',
        layout: 'center',
        text: 'Ouch! Something went wrong. Try again!',
        timeout: 2000
      }).show();
    }
  };

  return (
    <div>
      <Navbar/>
    <div className="container mb-3">
    <div className="row justify-contents-between mt-3" >
      <div className="col-md-3 py-5 rounded" style={{backgroundColor: "#C0C0C0"}}>
        <h3 className="display-5">Add item</h3>
        <label id="new-item-url-container">Add image URL</label>
            <input
              type="url"
              name="image"
              value={newItem.image}
              id="new-item-url"
              className="form-control mb-3"
              onChange={(event) => handleInputChange(event)}
              required
            />
        <label id="new-item-category-container"> Select a category</label>
            <Select
              name="categoryId"
              options={
                categories.map(category => {return {label:category.name, value:category.id}})
              }
              className="basic-select mb-3"
              classNamePrefix="select"
              onChange={(selectedOptions) => handleMultiChange([selectedOptions], "categoryId")}
            />
        <label className="item-select" id="new-item-color-container">Select color/s</label>
          <Select
            // defaultValue={[categories[2], categories[3]]}
            isMulti
            name="colorIds"
            options={
              colors.map(color => {return {label:color.name, value:color.id}})
            }
            className="basic-multi-select mb-3"
            classNamePrefix="select"
            onChange={(selectedOptions) => handleMultiChange(selectedOptions, "colorIds")}
          />
          <label id="new-item-season-container">Select season/s</label>
          <Select
            isMulti
            name="seasonIds"
            options={
              seasons.map(season => {return {label:season.name, value:season.id}})
            }
            className="basic-multi-select mb-3"
            classNamePrefix="select"
            onChange={(selectedOptions) => handleMultiChange(selectedOptions, "seasonIds")}
          />
          <button id="submit-button" className="btn btn-primary" onClick={handleSubmit}>SUBMIT</button>
        

      </div>
      <div className="col-md-1"></div>
      <div className="col-md-8 py-5 rounded" style={{backgroundColor: "#ffffff"}}>
      <img src={newItem.image} width="50%"/>
      </div>
    </div>
    </div>

  </div>
  );
}
