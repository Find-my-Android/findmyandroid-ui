import React from "react";
import "../styles/pin.css";

function Pin(props) {
  const tracking_state = props.tracking_state === 1;
  const stolen_state = props.stolen_state === 1;
  const sim_removed = props.sim_removed === 1;

  const getPath = () => {
    let imageDir = "/images/";
    if (tracking_state) {
      if (stolen_state) {
        if (sim_removed) {
          return imageDir + "removed.png";
        } else {
          return imageDir + "stolen.png";
        }
      } else {
        return imageDir + "passive.png";
      }
    }
    return imageDir + "not.png";
  };

  return (
    <div className="pin">
      <div>
        <img alt={props.name} src={getPath()} />
        <span>{props.name}</span>
      </div>
    </div>
  );
}

export default Pin;
