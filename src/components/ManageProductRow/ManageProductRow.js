import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const ManageProductRow = (props) => {
  const { _id, productName, productWeight, productPrice } = props.product;

  return (
    <tr>
      <td>{productName}</td>
      <td>{productWeight}</td>
      <td>${productPrice}</td>
      <td>
        <Link to={`/dashboard/editProduct/${_id}`}>
          <span className="action edit">
            <FontAwesomeIcon icon={["fas", "edit"]} />
          </span>
        </Link>
        <span onClick={() => props.handleDeleteProduct(_id)} className="action delete">
          <FontAwesomeIcon icon={["fas", "trash-alt"]} />
        </span>
      </td>
    </tr>
  );
};

export default ManageProductRow;
