import React from "react";
import "../styles/pin.css";

function Pin(props) {
  const tracking_state = props.tracking_state === 1;
  const stolen_state = props.stolen_state === 1;
  const sim_removed = props.sim_removed === 1;

  const getPath = () => {
    let imageDir = "/images/";
    if (sim_removed) {
      return imageDir + "removed.png";
    }
    if (stolen_state) {
      return imageDir + "stolen.png";
    }
    if (tracking_state) {
      return imageDir + "passive.png";
    }
    return imageDir + "not.png";
  };

  return (
    <>
      {props.lat !== -1 && props.lng !== -1 && (
        <div className="pin">
          <div>
            <img alt={props.name} src={getPath()} />
            <span>{props.name}</span>
          </div>
        </div>
      )}
    </>
  );
}

export default Pin;
