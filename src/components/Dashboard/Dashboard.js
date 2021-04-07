import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Dashboard.css";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useEffect } from "react";
import { useState } from "react";

const Dashboard = () => {
  const [totalProduct, setTotalProduct] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        setTotalProduct(data);
      });
  }, []);

  return (
    <Container fluid>
      <div className="content">
        <Row>
          <Col lg={3} sm={6}>
            <Card className="text-white text-center dashboard-card" style={{ background: "#FF7044" }}>
              <Card.Body>
                <FontAwesomeIcon icon={["fas", "box-open"]} />
                <Card.Title>{totalProduct.length} Products</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Dashboard;
