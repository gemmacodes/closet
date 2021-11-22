import React, { useState} from "react";
import axios from "axios";
import Navbar from "./NavBar";

function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { username, password } = credentials;


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

    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
  };

  // const requestData = async () => {
  //   try {
  //     const { data } = await axios.get("/users/profile", {
  //       headers: {
  //         authorization: "Bearer " + localStorage.getItem("token"), //getItem retrieves token from local storage
  //       },
  //     });

  //     console.log(data.message);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
        />
        <input
          value={password}
          onChange={handleChange}
          name="password"
          type="password"
          className="form-control mb-2"
        />
        </div>
        <div className="text-center p-4">
        <button className="btn btn-primary me-3" onClick={login}>
          Log in
        </button>
        <button className="btn btn-outline-dark me-3" onClick={logout}>
          Log out
        </button>
        {/* <button className=" btn btn-outline-primary" onClick={requestData}>
          Request protected data
        </button> */}
        </div>
      </div>
    </div>
  );
}

export default Login;