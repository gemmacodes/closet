import React, { useState } from "react";

// displays collapsible color checkbox list
export default function Colors({
  colors, handleChangeCheckbox
}) {

  const [displayFilterListColors, setDisplayFilterListColors] = useState(false);
  const [mouseOverFilterColors, setMouseOverFilterColors] = useState(false);

  const handleClickDisplayFilterColors = () => {
    setDisplayFilterListColors(!displayFilterListColors);
  };


  return (
    <div>
      <button
        type="button"
        onClick={handleClickDisplayFilterColors}
        onMouseEnter={() => setMouseOverFilterColors(true)}
        onMouseLeave={() => setMouseOverFilterColors(false)}
        className={
          !displayFilterListColors
            ? mouseOverFilterColors
              ? "collapsible-button active-collapsible-button"
              : "collapsible-button"
            : "collapsible-button active-collapsible-button"
        }
      >
        Colors
      </button>
      <div className={!displayFilterListColors ? "collapsible-content" : ""}>
        {colors && colors.map((color) => {
          return (
            <div>
            <label className="container-checkboxes">
              {color.name}
              <input
                type="checkbox"
                id={`color:${color.id}`}
                name="color"
                value={color.id}
                onChange={() => {handleChangeCheckbox("color", color.id)}}
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
