import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddItemForm from "./components/AddItemForm";
import Login from "./components/Login";

import AuthProvider from "./components/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";


ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/closet" element={<PrivateRoute><App/></PrivateRoute>}/>
          <Route path="/new" element={<PrivateRoute><AddItemForm /></PrivateRoute>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
