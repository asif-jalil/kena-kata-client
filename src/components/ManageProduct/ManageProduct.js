import React from "react";
import "./ManageProduct.css";
import { Container, Table, Alert } from "react-bootstrap";
import { useEffect } from "react";
import { useState } from "react";
import ManageProductRow from "../ManageProductRow/ManageProductRow";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState(false);
  const [emptyProduct, setEmptyProduct] = useState(false);

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
      });
  }, [status]);

  const handleDeleteProduct = (id) => {
    setStatus(false);
    fetch(`http://localhost:5000/deleteProduct/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setStatus(true);
        }
      });
  };

  return (
    <Container fluid>
      <div className="content">
        {status && <Alert variant="success">You have successfully deleted a product</Alert>}
        <Table hover className="volunteer-list">
          <thead className="bg-light">
            <tr>
              <th>Product Name</th>
              <th>Weight</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {emptyProduct && (
              <tr>
                <td colSpan="4">
                  <Alert variant="warning">
                    <h5>The store has no product yet</h5>
                  </Alert>
                </td>
              </tr>
            )}
            {products.map((product, idx) => (
              <ManageProductRow key={idx} product={product} handleDeleteProduct={handleDeleteProduct} />
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default ManageProduct;
