import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-regular-svg-icons";

function UserRow(props) {
  const user = props.user;

  const handleDelete = (e) => {
    e.preventDefault();
    props.handleDelete(user.user_id);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    props.handleEdit(user);
  };

  return (
    <tr>
      <td>{user.user_id}</td>
      <td>{user.first_name}</td>
      <td>{user.last_name}</td>
      <td>{user.primary_num}</td>
      <td>{user.secondary_num}</td>
      <td>{user.email}</td>
      <td>{user.account_type ? "Admin" : "User"}</td>
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

export default UserRow;
