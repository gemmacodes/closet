import React from "react";
import "./Item.css";

// item card with delete button included
export default function Item({ item, onClick }) {
  return (
    <div className="clothElement">
      <img src={item.image} alt="item" className="item-image" />
      <button id="delete-item-button" className="btn btn-primary btn-sm " onClick={() => onClick(item.id)}>
        Delete
      </button>
      <div>{item.color}</div>​
    </div>
  );
}
