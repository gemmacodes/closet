import React, { useState } from "react";

// displays collapsible category checkbox list
export default function CheckboxList({
  name, listItems,handleChangeCheckbox
}) {
  const [displayFilterList, setDisplayFilterList] =
    useState(false);
  const [mouseOverFilter, setMouseOverFilter] = useState(false);

  const handleClickDisplayFilter = () => {
    setDisplayFilterList(!displayFilterList);
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClickDisplayFilter}
        onMouseEnter={() => setMouseOverFilter(true)}
        onMouseLeave={() => setMouseOverFilter(false)}
        className={
          !displayFilterList
            ? mouseOverFilter
              ? "collapsible-button active-collapsible-button"
              : "collapsible-button"
            : "collapsible-button active-collapsible-button"
        }
      >
        {name}
      </button>
      <div className={!displayFilterList ? "collapsible-content" : ""}>
        {listItems.map((item) => {
          return (
              <div>
              <label className="container-checkboxes">
                {item.name}
                <input
                  type="checkbox"
                  id={`${name}:${item.id}`}
                  value={item.id}
                  onChange={() => {handleChangeCheckbox(name, item.id)}}
                />
                <span className="checkmark"></span>​
              </label>
            </div>            
          );
        })}
      </div>
    </div>
  );
}
