import React from "react";
import { Route, Switch } from "react-router";
import AddProduct from "../AddProduct/AddProduct";
import AdminHeader from "../AdminHeader/AdminHeader";
import Dashboard from "../Dashboard/Dashboard";
import EditProduct from "../EditProduct/EditProduct";
import ManageProduct from "../ManageProduct/ManageProduct";
import Sidebar from "../Sidebar/Sidebar";
import "./Admin.css";

const Admin = () => {
  return (
    <main>
      <Sidebar />
      <section className="content-body">
        <Switch>
          <Route exact path="/dashboard">
            <AdminHeader title="Dashboard" />
            <Dashboard />
          </Route>
          <Route path="/dashboard/addProduct">
            <AdminHeader title="Add Product" />
            <AddProduct />
          </Route>
          <Route path="/dashboard/manageProduct">
            <AdminHeader title="Manage Product" />
            <ManageProduct />
          </Route>
          <Route path="/dashboard/editProduct/:id">
            <AdminHeader title="Edit Product" />
            <EditProduct />
          </Route>
        </Switch>
      </section>
    </main>
  );
};

export default Admin;
