import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import axios from "axios";
import Noty from 'noty';

function Register() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    e.persist();
    setUser((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const register = () => {
    axios("/users/register", {
      method: "POST",
      data: user,
    })
      .then((result) => {
        navigate("/login");
        new Noty({
          theme: 'metroui',
          type: 'success',
          layout: 'center',
          text: 'Registration completed. Log in to start filling your closet!',
          timeout: 1000
        }).show();
      })
      .catch((error) => {
        console.log(error);
        new Noty({
          theme: 'metroui',
          type: 'error',
          layout: 'center',
          text: 'Ouch! Something went wrong. Try again!',
          timeout: 2000
        }).show();
      });
  };

  return (
    <div>
      <Navbar/>
      <div className="container mt-5">
      <h3 className="display-5 text-center mb-4">Register</h3>
      <div>
        <input
          value={user.username}
          onChange={handleChange}
          name="username"
          type="text"
          className="form-control mb-2"
          placeholder="Choose a username"
        />
        <input
          value={user.password}
          onChange={handleChange}
          name="password"
          type="password"
          className="form-control mb-2"
          placeholder="Choose a password"
        />
        </div>
        <div className="text-center p-4">
        <button className=" btn btn-dark" onClick={register}>
          Sign up
        </button>
        </div>
      </div>
    </div>
  );
}

export default Register;