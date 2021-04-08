import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";

const EditProduct = () => {
  const [imgName, setImgName] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [productStatus, setProductStatus] = useState({
    status: "",
    msg: "",
  });
  const [productInfo, setProductInfo] = useState({});
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    fetch(`http://localhost:5000/loadProduct/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProductInfo(data);
        reset();
      });
  }, [id]);

  const onSubmit = (data, event) => {
    setProductStatus({ status: "", msg: "" });
    const imgDetails = { ...data, imgURL: imgURL || productInfo.imgURL };

    if (uploadStatus === "uploading" || uploadStatus === "complete") {
      if (imgURL !== "") {
        fetch(`http://localhost:5000/updateProduct/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(imgDetails),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              setProductStatus({ status: "added", msg: "Product Added SuccessFully" });
            }
          });
      } else {
        setProductStatus({ status: "imgUploading", msg: "Please wait while image is uploading" });
      }
    } else {
      fetch(`http://localhost:5000/updateProduct/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(imgDetails),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setProductStatus({ status: "added", msg: "Product Edited SuccessFully" });
          }
        });
    }
  };

  const handleImageUpload = (event) => {
    setUploadStatus("uploading");
    setImgURL("");
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
                <input defaultValue={productInfo.productName} type="text" className="form-control" {...register("productName")} />
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <label htmlFor="">Product Weight</label>
                <input defaultValue={productInfo.productWeight} type="text" className="form-control" {...register("productWeight")} />
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <label htmlFor="">Product Price</label>
                <input defaultValue={productInfo.productPrice} type="number" className="form-control" {...register("productPrice")} />
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
                {uploadStatus === "" && (
                  <span>
                    <img className="position-absolute ml-2" width="50px" src={productInfo.imgURL} alt="" />
                  </span>
                )}
                {uploadStatus && uploadStatus === "uploading" && imgName && (
                  <Spinner className="ml-3" animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                )}
                {uploadStatus && uploadStatus === "complete" && imgName && (
                  <>
                    {/* <FontAwesomeIcon className="fa-2x ml-3 text-success" icon={["fas", "check-circle"]} />{" "} */}
                    <span>
                      <img className="position-absolute ml-2" width="50px" src={imgURL} alt="" />
                    </span>{" "}
                  </>
                )}
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

export default EditProduct;
