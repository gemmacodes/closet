import React, { useState } from "react";
// import Category from "./Category.js";

// displays collapsible category checkbox list
export default function Categories({
  categories,
  handleChangeCheckedCategories,
  checkedStateCategories,
  isChecked
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
            // <Category
            //   category={category}
            //   key={`category:${category.id}`}
            //   isChecked={checkedStateCategories[category.id]}
            //   handleChangeCheckedCategories={() =>
            //     handleChangeCheckedCategories(category.id)
            //   }
            // ></Category>
            <div>
              <label className="container-checkboxes">
                {category.name}
                <input
                  type="checkbox"
                  id={`category:${category.id}`}
                  checked={isChecked}
                  onChange={handleChangeCheckedCategories}
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
