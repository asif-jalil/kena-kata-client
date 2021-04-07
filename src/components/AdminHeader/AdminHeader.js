import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import "./AdminHeader.css";
import firebase from "firebase/app";
import "firebase/auth";
import { Button } from "react-bootstrap";
import { userContext } from "../../App";
import { useHistory } from "react-router";

const AdminHeader = ({ title }) => {
  const [loggedUser, setLoggedUser] = useContext(userContext);
  const history = useHistory();

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
    <header className="d-flex bg-white justify-content-between align-items-center px-4 py-3">
      <h4>{title}</h4>
      <div className="d-flex align-items-center">
        <h6 className="mb-0 mr-3">{loggedUser?.name}</h6>
        <Button onClick={handleLogout} variant="danger" size="sm">
          Logout <FontAwesomeIcon icon={["fas", "sign-out-alt"]} />
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
