import React, { useState } from "react";
import axios from "axios";
import Navbar from "./NavBar";
import Noty from 'noty';

import { useNavigate } from "react-router-dom";

function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { username, password } = credentials;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const login = async () => {
    try {
      // get token when login successful
      const { data } = await axios.post("/users/login", credentials);

      //store it locally
      localStorage.setItem("token", data.token);
      console.log(data.message, data.token);

      new Noty({
        theme: 'metroui',
        type: 'success',
        layout: 'center',
        text: 'Log in successful. Welcome!',
        timeout: 1000,
        callbacks: {
          afterClose: function () {
            window.location.href = "/closet";
          }
        }
      }).show();

    } catch (error) {
      console.log(error);
      new Noty({
        theme: 'metroui',
        type: 'error',
        layout: 'center',
        text: 'Ouch! Something went wrong. Try again!',
        timeout: 2000
      }).show();
    }
  };


  const logout = () => {
    localStorage.removeItem("token");
  };

  return (
    <div>
      <Navbar/>
      <div className="container mt-5">
        <h3 className="display-5 text-center mb-4">Login</h3>
        <div className="mb-2">
        <input
          value={username}
          onChange={handleChange}
          name="username"
          type="text"
          className="form-control mb-2"
          placeholder="What's your username?"
        />
        <input
          value={password}
          onChange={handleChange}
          name="password"
          type="password"
          className="form-control mb-2"
          placeholder="What's your password?"
        />
        </div>
        <div className="text-center p-4">
        <button className="btn btn-dark me-3" onClick={login}>
          Log in
        </button>
        <button className="btn btn-outline-dark me-3" onClick={logout}>
          Log out
        </button>
        </div>
      </div>
    </div>
  );
}

export default Login;