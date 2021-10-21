import React from "react";
import "../styles/pin.css";

function Pin(props) {
  return (
    <div className="pin">
      <div>
        <img alt={props.name} src="../../../icons/pin.png" />
        <span>{props.name}</span>
      </div>
    </div>
  );
}

export default Pin;
