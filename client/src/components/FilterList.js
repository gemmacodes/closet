import React, { useState } from "react";
import Categories from "./Categories.js";
import Colors from "./Colors.js";
import Seasons from "./Seasons.js";
import "./FilterList.css";

export default function FilterList({
  categories,
  colors,
  seasons,
  handleChangeCheckbox,
  handleClickResetForm,
}) {
  // const [displayFilterList, setDisplayFilterList] = useState(false);
  // const [mouseOverFormResetButton, setMouseOverFormResetButton] =
  //   useState(false);
  // const [mouseOverFormDoneButton, setMouseOverFormDoneButton] = useState(false);


  return (
    <div id="filter-list" className="mt-5">

      <form
        onReset={handleClickResetForm}
      >
        <p><i>Search by...</i></p>
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
        {/* <div id="filter-list-button-container">
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
        </div> */}
      </form>
    </div>
  );
}
