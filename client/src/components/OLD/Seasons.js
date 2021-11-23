import React, { useState } from "react";

// displays collapsible category checkbox list
export default function Seasons({
  seasons,handleChangeCheckbox
}) {
  const [displayFilterListSeasons, setDisplayFilterListSeasons] =
    useState(false);
  const [mouseOverFilterSeasons, setMouseOverFilterSeasons] = useState(false);

  const handleClickDisplayFilterSeasons = () => {
    setDisplayFilterListSeasons(!displayFilterListSeasons);
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClickDisplayFilterSeasons}
        onMouseEnter={() => setMouseOverFilterSeasons(true)}
        onMouseLeave={() => setMouseOverFilterSeasons(false)}
        className={
          !displayFilterListSeasons
            ? mouseOverFilterSeasons
              ? "collapsible-button active-collapsible-button"
              : "collapsible-button"
            : "collapsible-button active-collapsible-button"
        }
      >
        Seasons
      </button>
      <div className={!displayFilterListSeasons ? "collapsible-content" : ""}>
        {seasons.map((season) => {
          return (
              <div>
              <label className="container-checkboxes">
                {season.name}
                <input
                  type="checkbox"
                  id={`season:${season.id}`}
                  value={season.id}
                  onChange={() => {handleChangeCheckbox("season", season.id)}}
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
