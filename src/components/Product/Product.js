import React from "react";
import { Card, Col } from "react-bootstrap";
import "./Product.css";

const Product = (props) => {
  const { productName, productWeight, productPrice, imgURL } = props.product;

  return (
    <Col md={4} sm={6}>
      <Card className="product shadow">
        <div className="product-img">
          <img src={imgURL} alt="" />
        </div>
        <Card.Body>
          <Card.Title>{productName}</Card.Title>
          <Card.Subtitle>{productWeight}</Card.Subtitle>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <h4 className="product-price">${productPrice}</h4>
            <button
              onClick={() => {
                props.handleBuyNow(props.product);
              }}
              className="btn main-btn"
            >
              Buy Now
            </button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Product;
