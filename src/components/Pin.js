import React from "react";
import "../styles/pin.css";

function Pin(props) {
  console.log(
    "/images/" + (props.status !== "" ? props.status : props.tracking) + ".png"
  );
  return (
    <div className="pin">
      <div>
        <img
          alt={props.name}
          src={
            "/images/" +
            (props.status !== "" ? props.status : props.tracking) +
            ".png"
          }
        />
        <span>{props.name}</span>
      </div>
    </div>
  );
}

export default Pin;
