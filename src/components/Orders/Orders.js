import React, { useContext, useEffect, useState } from "react";
import "./Orders.css";
import { Card, Container, Table, Alert } from "react-bootstrap";
import { userContext } from "../../App";
import OrderItem from "../OrderItem/OrderItem";

const Orders = () => {
  const [loggedUser] = useContext(userContext);
  const [orders, setOrders] = useState([]);
  const [emptyOrder, setEmptyOrder] = useState(false);

  useEffect(() => {
    fetch(`https://kenakata.herokuapp.com/order?email=${loggedUser.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length <= 0) {
          setEmptyOrder(true);
        }
        setOrders(data);
      });
  }, [loggedUser.email]);

  return (
    <section className="orders">
      <Container>
        <h3 className="mb-4">My Order</h3>
        <Card className="shadow border-0 rounded">
          <Card.Body>
            <Table striped className="order-list">
              <thead className="table-dark">
                <tr>
                  <th>Ordered By</th>
                  <th>Product Details</th>
                  <th>Order Time</th>
                  <th>Total Cost</th>
                </tr>
              </thead>
              <tbody>
                {emptyOrder && (
                  <tr>
                    <td colSpan="4">
                      <Alert variant="warning">
                        <h5>You didn't make any order yet.</h5>
                      </Alert>
                    </td>
                  </tr>
                )}
                {orders.map((order, idx) => (
                  <OrderItem key={idx} order={order} />
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
};

export default Orders;
