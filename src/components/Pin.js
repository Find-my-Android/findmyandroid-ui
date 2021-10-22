import React from "react";
import "../styles/pin.css";

function Pin(props) {
  const status = props.status.toLowerCase();
  const tracking = props.tracking.toLowerCase();

  return (
    <div className="pin">
      <div>
        <img
          alt={props.name}
          src={"/images/" + (status !== "" ? status : tracking) + ".png"}
        />
        <span>{props.name}</span>
      </div>
    </div>
  );
}

export default Pin;
