import React, { useState } from "react";
// import Color from "./Color.js";

// displays collapsible color checkbox list
export default function Colors({
  colors,
  handleChangeCheckedColors,
  checkedStateColors,
  isChecked
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
        {colors.map((color) => {
          return (
            // <Color
            //   color={color}
            //   key={`color:${color.id}`}
            //   handleChangeCheckedColors={() =>
            //     handleChangeCheckedColors(color.id)
            //   }
            //   isChecked={checkedStateColors[color.id]}
            // ></Color>
            <div>
            <label className="container-checkboxes">
              {color.name}
              <input
                type="checkbox"
                id={`color:${color.id}`}
                name="color"
                value={color.id}
                checked={"color" === color.id ? true : false}
                onChange={handleChangeCheckedColors}
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
