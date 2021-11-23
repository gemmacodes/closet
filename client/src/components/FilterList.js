import React, { useState } from "react";
import CheckboxList from "./CheckboxList.js";
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
        <CheckboxList
          name="Categories"
          listItems={categories}
          handleChangeCheckbox={handleChangeCheckbox}
        ></CheckboxList>
        <CheckboxList
          name="Colors"
          listItems={colors}
          handleChangeCheckbox={handleChangeCheckbox}
        ></CheckboxList>
        <CheckboxList
          name="Seasons"
          listItems={seasons}
          handleChangeCheckbox={handleChangeCheckbox}
        ></CheckboxList>
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
