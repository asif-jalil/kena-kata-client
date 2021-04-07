import React, { useContext } from "react";
import "./Checkout.css";
import { Card, Container, Table, Alert } from "react-bootstrap";
import { useEffect } from "react";
import { useState } from "react";
import { userContext } from "../../App";

const Checkout = () => {
  const [cart, setCart] = useState({});
  const [status, setStatus] = useState(false);
  const [loggedUser] = useContext(userContext);

  useEffect(() => {
    const cartItem = JSON.parse(localStorage.getItem("cart"));
    setCart(cartItem);
  }, []);

  let totalPrice = 1 * cart?.productPrice;

  const handleCheckout = (event) => {
    setStatus(false);
    const order = { ...loggedUser, productName: cart.productName, price: cart.productPrice, weight: cart.productWeight, totalPrice, orderTime: new Date().toString() };

    fetch("https://kenakata.herokuapp.com/addOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          localStorage.removeItem("cart");
          setStatus(true);
          setCart({});
        }
      });
  };

  return (
    <section className="checkout">
      <Container>
        <h3 className="mb-4">Checkout</h3>
        <Card className="shadow border-0 checkout-box">
          <Card.Body>
            {status && (
              <Alert className="mb-3" variant="success">
                Thank You. Your order has been placed successfully.
              </Alert>
            )}
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {cart?.productName} - {cart?.productWeight}
                  </td>
                  <td>{status ? 0 : 1}</td>
                  <td>{cart ? cart.productPrice : 0}</td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <strong>Total</strong>
                  </td>
                  <td>{totalPrice ? totalPrice : 0}</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
        <div className="mt-3 d-flex justify-content-end">
          {status ? (
            <button disabled className="btn btn-lg main-btn">
              Checkout
            </button>
          ) : (
            <button onClick={handleCheckout} className="btn btn-lg main-btn">
              Checkout
            </button>
          )}
        </div>
      </Container>
    </section>
  );
};

export default Checkout;
