import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import axios from "axios";

function Register() {
  const [user, setUser] = useState({
    username: "test",
    password: "test",
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
      })
      .catch((error) => console.log(error));
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
        />
        <input
          value={user.password}
          onChange={handleChange}
          name="password"
          type="password"
          className="form-control mb-2"
        />
        </div>
        <div className="text-center p-4">
        <button className=" btn btn-primary" onClick={register}>
          Sign up
        </button>
        </div>
      </div>
    </div>
  );
}

export default Register;