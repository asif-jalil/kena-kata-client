import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Col, Container, FormControl, InputGroup, Row, Spinner, Alert } from "react-bootstrap";
import { useHistory } from "react-router";
import Product from "../Product/Product";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [emptyProduct, setEmptyProduct] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setEmptyProduct(false);
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.length <= 0) {
          setEmptyProduct(true);
        } else {
          setProducts(data);
        }
        setLoader(false);
      });
  }, []);

  const handleBuyNow = (product) => {
    history.push("/checkout");
    localStorage.setItem("cart", JSON.stringify(product));
  };

  return (
    <section className="home py-5">
      <Container>
        <Row>
          <Col lg={{ span: 6, offset: 3 }}>
            <div className="home-search pb-5">
              <form action="">
                <InputGroup className="mb-3">
                  <FormControl placeholder="Search Here" />
                  <InputGroup.Append>
                    <button className="btn main-btn">Search</button>
                  </InputGroup.Append>
                </InputGroup>
              </form>
            </div>
          </Col>
        </Row>

        {loader ? (
          <Spinner className="loader" animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          <Row>
            {emptyProduct && (
              <Col>
                <Alert variant="warning">
                  <h2>The store has no product yet</h2>
                </Alert>
              </Col>
            )}
            {products.map((product, idx) => (
              <Product key={idx} product={product} handleBuyNow={handleBuyNow} />
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
};

export default Home;
