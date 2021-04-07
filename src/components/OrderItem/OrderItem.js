import React from "react";

const OrderItem = (props) => {
  const { name, email, productName, totalPrice, orderTime } = props.order;

  const orderDate = new Date(orderTime).toDateString();

  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{productName}</td>
      <td>{orderDate}</td>
      <td>{totalPrice}</td>
    </tr>
  );
};

export default OrderItem;
