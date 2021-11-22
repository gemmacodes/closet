import React, { useState } from "react";
import SortIcon from "./../images/sort_icon.png";
import CloseSortIcon from "./../images/close_sort_icon.png";
import Categories from "./Categories.js";
import Colors from "./Colors.js";
import Seasons from "./Seasons.js";
import "./FilterList.css";

export default function FilterList({
  categories,
  // checkedStateCategories,
  // handleChangeCheckedCategories,
  colors,
  // checkedStateColors,
  // handleChangeCheckedColors,
  seasons,
  // checkedStateSeasons,
  // handleChangeCheckedSeasons,
  handleChangeCheckbox,
  handleClickResetForm,
}) {
  const [displayFilterList, setDisplayFilterList] = useState(false);
  const [mouseOverFormResetButton, setMouseOverFormResetButton] =
    useState(false);
  const [mouseOverFormDoneButton, setMouseOverFormDoneButton] = useState(false);

  const handleIconClick = () => {
    setDisplayFilterList(!displayFilterList);
  };

  return (
    <div id="filter-list" className="mt-5">
      {/* <div>
        {displayFilterList ? (
          <img
            src={CloseSortIcon}
            alt="close sort icon"
            onClick={handleIconClick}
            className="icon-sorted-list"
          />
        ) : (
          <img
            src={SortIcon}
            alt="sort icon"
            onClick={handleIconClick}
            className="icon-sorted-list"
          />
        )}
      </div> */}

      <form
        onReset={handleClickResetForm}
        // className={!displayFilterList ? "hidden-content-list" : ""}
      >
        <p>Search by...</p>
        <Categories
          categories={categories}
          handleChangeCheckbox={handleChangeCheckbox}
        ></Categories>
        <Colors
          colors={colors}
          handleChangeCheckbox={handleChangeCheckbox}
        ></Colors>
        <Seasons
          seasons={seasons}
          handleChangeCheckbox={handleChangeCheckbox}
        ></Seasons>
        <div id="filter-list-button-container">
          <button
            type="reset"
            id="reset-button"
            onMouseEnter={() => setMouseOverFormResetButton(true)}
            onMouseLeave={() => setMouseOverFormResetButton(false)}
            className={
              mouseOverFormResetButton
                ? "active-reset-button filter-list-button"
                : "filter-list-button"
            }
          >
            CLEAR ALL
          </button>
          <button
            type="button"
            onMouseEnter={() => setMouseOverFormDoneButton(true)}
            onMouseLeave={() => setMouseOverFormDoneButton(false)}
            onClick={handleIconClick}
            id="done-button"
            className={
              mouseOverFormDoneButton
                ? "active-done-button filter-list-button rounded "
                : "filter-list-button rounded"
            }
          >
            DONE
          </button>
        </div>
      </form>
    </div>
  );
}
