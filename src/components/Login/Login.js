import React, { useContext } from "react";
import "./Login.css";
import googleIcon from "../../assets/img/google.svg";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { userContext } from "../../App";
import { useHistory, useLocation } from "react-router";

firebase.initializeApp(firebaseConfig);

const Login = () => {
  const [loggedUser, setLoggedUser] = useContext(userContext);
  const history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleProvider = new firebase.auth.GoogleAuthProvider();

  const handleGoogleLogin = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        const user = result.user;
        const name = user.displayName;
        const email = user.email;
        const photo = user.photoURL;
        const userInfo = { name, email, photo };
        setLoggedUser(userInfo);
        history.replace(from);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Logout successfully");
        setLoggedUser({});
        history.push("/");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <section className="login">
      <Container>
        {!loggedUser.email && (
          <div className="social-login">
            <h3 className="text-center mb-4">Login With</h3>
            <p className="text-center">
              <span onClick={handleGoogleLogin} className="login-btn">
                <img width="50" src={googleIcon} alt="" />
              </span>
            </p>
          </div>
        )}

        {loggedUser.email && (
          <Row>
            <Col md={{ span: 4, offset: 4 }}>
              <Card className="text-center shadow border-0">
                <Card.Body>
                  <img src={loggedUser.photo} alt={loggedUser.name} className="mb-3" style={{ maxWidth: "150px" }} />
                  <Card.Title>{loggedUser?.name}</Card.Title>
                  <Card.Subtitle>{loggedUser?.email}</Card.Subtitle>
                  <Button className="mt-3" onClick={handleLogout} variant="danger">
                    Logout
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </section>
  );
};

export default Login;
