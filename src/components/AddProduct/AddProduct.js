import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./AddProduct.css";
import { Container, Alert, Row, Col, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useState } from "react";

const AddProduct = () => {
  const [imgName, setImgName] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [productStatus, setProductStatus] = useState({
    status: "",
    msg: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, event) => {
    setProductStatus({ status: "", msg: "" });
    const imgDetails = { ...data, imgURL };

    if (uploadStatus === "uploading" || uploadStatus === "complete") {
      if (imgURL !== "") {
        fetch("https://kenakata.herokuapp.com/addProduct", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(imgDetails),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              setProductStatus({ status: "added", msg: "Product Added SuccessFully" });
              setImgName("");
              setUploadStatus("");
              setImgURL("");
              event.target.reset();
            }
          });
      } else {
        setProductStatus({ status: "imgUploading", msg: "Please wait while image is uploading" });
      }
    } else {
      setProductStatus({ status: "imgUploading", msg: "Image is not uploaded yet." });
    }
  };

  const handleImageUpload = (event) => {
    setUploadStatus("uploading");
    let img = event.target.files[0];
    let imgName = new Date().getTime();
    setImgName(img?.name);
    let imgData = new FormData();
    imgData.set("key", "567e4a930b4eeed62a161ed30dc0e954");
    imgData.append("image", img);
    imgData.append("name", imgName);

    fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: imgData,
    })
      .then((res) => res.json())
      .then((data) => {
        setUploadStatus("complete");
        setImgURL(data.data.display_url);
      });
  };

  return (
    <Container fluid>
      <div className="content">
        {productStatus?.status === "added" && <Alert variant="success">{productStatus?.msg}</Alert>}
        {productStatus?.status === "imgUploading" && <Alert variant="danger">{productStatus?.msg}</Alert>}
        <form id="add-product-form" className="add-product-form" onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={6}>
              <div className="mb-3">
                <label htmlFor="">Product Name</label>
                <input type="text" className="form-control" {...register("productName", { required: true })} />
                {errors.productName && <span className="error">This field is required</span>}
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <label htmlFor="">Product Weight</label>
                <input type="text" className="form-control" {...register("productWeight", { required: true })} />
                {errors.productWeight && <span className="error">This field is required</span>}
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <label htmlFor="">Product Price</label>
                <input type="number" className="form-control" {...register("productPrice", { required: true })} />
                {errors.productPrice && <span className="error">This field is required</span>}
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <label htmlFor="">Product Image</label> <br />
                <label className="product-upload" htmlFor="product-img">
                  <FontAwesomeIcon icon={["fas", "cloud-upload-alt"]} />
                  Upload Image
                  <input id="product-img" onChange={handleImageUpload} type="file" />
                </label>
                <span>{imgName && imgName}</span>
                {uploadStatus && uploadStatus === "uploading" && imgName && (
                  <Spinner className="ml-3" animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                )}
                {uploadStatus && uploadStatus === "complete" && imgName && <FontAwesomeIcon className="fa-2x ml-3 text-success" icon={["fas", "check-circle"]} />}
              </div>
            </Col>
            <Col sm={12}>
              <button type="submit" className="btn main-btn">
                Add Event
              </button>
            </Col>
          </Row>
        </form>
      </div>
    </Container>
  );
};

export default AddProduct;
