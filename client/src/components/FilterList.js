import React from "react";
import CheckboxList from "./CheckboxList.js";
import "./FilterList.css";

export default function FilterList({
  categories,
  colors,
  seasons,
  handleChangeCheckbox,

}) {

  return (
    <div id="filter-list" className="mt-5">

      <form>
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
      </form>
    </div>
  );
}
