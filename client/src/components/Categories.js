import React, { useState } from "react";


// displays collapsible category checkbox list
export default function Categories({
  categories, handleChangeCheckbox, getFilteredItems 
}) {
  const [displayFilterListCategories, setDisplayFilterListCategories] =
    useState(false);
  const [mouseOverFilterCategories, setMouseOverFilterCategories] =
    useState(false);

  const handleClickDisplayFilterCategories = () => {
    setDisplayFilterListCategories(!displayFilterListCategories);
  };


  return (
    <div>
      <button
        type="button"
        onClick={handleClickDisplayFilterCategories}
        onMouseEnter={() => setMouseOverFilterCategories(true)}
        onMouseLeave={() => setMouseOverFilterCategories(false)}
        className={
          !displayFilterListCategories
            ? mouseOverFilterCategories
              ? "collapsible-button active-collapsible-button"
              : "collapsible-button"
            : "collapsible-button active-collapsible-button"
        }
      >
        Categories
      </button>
      <div
        className={!displayFilterListCategories ? "collapsible-content" : ""}
      >
        {categories.map((category) => {
          return (
            <div>
              <label className="container-checkboxes"> 
                {category.name}
                <input
                  type="checkbox"
                  id={`category:${category.id}`}
                  key={category.id}
                  onChange={() => {handleChangeCheckbox("category", category.id)}}
                />
                <span className="checkmark"></span>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}


