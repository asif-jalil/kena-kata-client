import "./assets/fontAwesome/library";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Admin from "./components/Admin/Admin";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Checkout from "./components/Checkout/Checkout";
import Login from "./components/Login/Login";
import { createContext, useState } from "react";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Orders from "./components/Orders/Orders";

export const userContext = createContext();

function App() {
  const [loggedUser, setLoggedUser] = useState({});

  return (
    <userContext.Provider value={[loggedUser, setLoggedUser]}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Header />
            <Home />
          </Route>
          <PrivateRoute path="/dashboard">
            <Admin />
          </PrivateRoute>
          <PrivateRoute path="/checkout">
            <Header />
            <Checkout />
          </PrivateRoute>
          <PrivateRoute path="/orders">
            <Header />
            <Orders />
          </PrivateRoute>
          <Route path="/login">
            <Header />
            <Login />
          </Route>
          <Route path="*">
            <Header />
          </Route>
        </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
