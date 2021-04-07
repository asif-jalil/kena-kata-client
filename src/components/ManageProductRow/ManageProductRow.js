import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ManageProductRow = (props) => {
  const { _id, productName, productWeight, productPrice } = props.product;

  return (
    <tr>
      <td>{productName}</td>
      <td>{productWeight}</td>
      <td>${productPrice}</td>
      <td>
        <span className="action edit">
          <FontAwesomeIcon icon={["fas", "edit"]} />
        </span>
        <span onClick={() => props.handleDeleteProduct(_id)} className="action delete">
          <FontAwesomeIcon icon={["fas", "trash-alt"]} />
        </span>
      </td>
    </tr>
  );
};

export default ManageProductRow;
