import React from "react";
import "../styles/dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-regular-svg-icons";

function PhoneRow(props) {
  const phone = props.phone;

  const handleDelete = (e) => {
    e.preventDefault();
    props.handleDelete(phone.phone_id);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    props.handleEdit(phone);
  };

  return (
    <tr>
      <td>{phone.phone_id}</td>
      <td>{phone.name}</td>
      <td>{phone.phone_number}</td>
      <td>{phone.secondary_number}</td>
      <td>{phone.latitude}</td>
      <td>{phone.longitude}</td>
      <td className={phone.status}>{phone.status}</td>
      <td>
        <FontAwesomeIcon icon={faEdit} className="icon" onClick={handleEdit} />
        <FontAwesomeIcon
          icon={faTrashAlt}
          className="icon"
          onClick={handleDelete}
        />
      </td>
    </tr>
  );
}

export default PhoneRow;
